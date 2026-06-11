import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  experiments,
  getVariant,
  getAssignments,
  trackEvent,
  trackExposure,
} from '../lib/abTesting';

// React bindings for the A/B testing harness in lib/abTesting.js.
//
// Variant assignment is resolved on the client after mount so that server and
// first client render agree (avoids hydration mismatches). Before mount every
// experiment reports its first (control) variant.

const ExperimentContext = createContext({
  ready: false,
  assignments: {},
  getVariant: () => null,
  track: () => {},
});

const controlAssignments = () => {
  const result = {};
  Object.keys(experiments).forEach((key) => {
    const def = experiments[key];
    result[key] = def && def.variants ? def.variants[0] : null;
  });
  return result;
};

export const ExperimentProvider = ({ children }) => {
  // Start from deterministic control variants so SSR and the initial client
  // render produce identical markup, then hydrate the real assignments.
  const [assignments, setAssignments] = useState(controlAssignments);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAssignments(getAssignments());
    setReady(true);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      assignments,
      getVariant: (key) => assignments[key] ?? getVariant(key),
      track: trackEvent,
    }),
    [ready, assignments]
  );

  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>;
};

// Hook for a single experiment. Returns the assigned variant plus helpers.
// Automatically fires an exposure event once the real variant is resolved.
export const useExperiment = (experimentKey) => {
  const { ready, getVariant: resolve, track } = useContext(ExperimentContext);
  const variant = resolve(experimentKey);

  useEffect(() => {
    if (ready && variant) trackExposure(experimentKey, variant);
  }, [ready, variant, experimentKey]);

  return {
    variant,
    ready,
    // True when the visitor is in `name` (nice for readable JSX conditionals).
    isVariant: (name) => variant === name,
    // Track a conversion / interaction tied to this experiment + variant.
    track: (name, props = {}) =>
      track(name, { experiment: experimentKey, variant, ...props }),
  };
};

// Escape hatch for components that only need the raw event tracker.
export const useTrackEvent = () => {
  const { track } = useContext(ExperimentContext);
  return track;
};
