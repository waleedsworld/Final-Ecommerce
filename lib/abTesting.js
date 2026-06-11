// Lightweight, dependency-free A/B testing harness.
//
// Design goals:
//  - Zero external dependencies (no analytics SDK, no cookies library).
//  - Deterministic, sticky variant assignment per visitor so a returning
//    visitor always sees the same variant of an experiment.
//  - SSR-safe: every browser-only access is guarded so it can be imported
//    from server components / getStaticProps without crashing.
//  - Pluggable event sink: events are forwarded to window.dataLayer (GTM),
//    a custom `window.__ab_track` hook, or buffered for later inspection.
//
// Add or edit experiments in the `experiments` map below. Each experiment
// declares its variants and (optionally) their relative weights.

export const experiments = {
  // Hero call-to-action copy test.
  hero_cta: {
    variants: ['start_shopping', 'shop_the_sale'],
    // Optional weights, one per variant. Defaults to an even split.
    weights: [0.5, 0.5],
  },
};

const VISITOR_KEY = 'ab_visitor_id';
const ASSIGN_KEY = 'ab_assignments';
const MAX_BUFFER = 100;

const isBrowser = () => typeof window !== 'undefined';

// FNV-1a 32-bit hash — small, fast, and stable across runtimes. We use it to
// bucket a visitor into a variant deterministically from their id.
const hashString = (str) => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  // Coerce to an unsigned 32-bit integer.
  return hash >>> 0;
};

const readJSON = (key, fallback) => {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Storage may be unavailable (private mode, quota). Fail silently —
    // assignment still works for the current session, just isn't persisted.
  }
};

const randomId = () => {
  if (isBrowser() && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

// Returns a stable per-browser visitor id, creating one on first call.
export const getVisitorId = () => {
  if (!isBrowser()) return 'ssr';
  let id;
  try {
    id = window.localStorage.getItem(VISITOR_KEY);
  } catch (err) {
    id = null;
  }
  if (!id) {
    id = randomId();
    writeJSON(VISITOR_KEY, id);
    // getVisitorId stores the raw string, so overwrite the JSON-quoted value.
    try {
      window.localStorage.setItem(VISITOR_KEY, id);
    } catch (err) {
      /* ignore */
    }
  }
  return id;
};

// Deterministically choose a variant for `experimentKey` given a visitor id.
const bucket = (experimentKey, definition, visitorId) => {
  const variants = definition.variants || [];
  if (variants.length === 0) return null;

  const weights =
    Array.isArray(definition.weights) && definition.weights.length === variants.length
      ? definition.weights
      : variants.map(() => 1);
  const totalWeight = weights.reduce((sum, w) => sum + (w > 0 ? w : 0), 0);
  if (totalWeight <= 0) return variants[0];

  // Map the hash into the [0, 1) interval, then walk the weighted buckets.
  const point = (hashString(`${experimentKey}:${visitorId}`) / 0x100000000) * totalWeight;
  let cumulative = 0;
  for (let i = 0; i < variants.length; i += 1) {
    cumulative += weights[i] > 0 ? weights[i] : 0;
    if (point < cumulative) return variants[i];
  }
  return variants[variants.length - 1];
};

// Returns the sticky variant for an experiment, assigning (and persisting)
// one on first access. Unknown experiments resolve to null.
export const getVariant = (experimentKey) => {
  const definition = experiments[experimentKey];
  if (!definition) return null;

  const assignments = readJSON(ASSIGN_KEY, {});
  const existing = assignments[experimentKey];
  // Honour a stored assignment only if it is still a valid variant.
  if (existing && definition.variants.includes(existing)) return existing;

  const variant = bucket(experimentKey, definition, getVisitorId());
  if (isBrowser()) {
    assignments[experimentKey] = variant;
    writeJSON(ASSIGN_KEY, assignments);
  }
  return variant;
};

// Returns every currently-known assignment as { experimentKey: variant }.
export const getAssignments = () => {
  const stored = readJSON(ASSIGN_KEY, {});
  const result = {};
  Object.keys(experiments).forEach((key) => {
    result[key] = stored[key] || getVariant(key);
  });
  return result;
};

// Forwards an analytics event to whatever sink is available and always keeps a
// small in-memory buffer (handy for debugging / assertions in tests).
export const trackEvent = (name, props = {}) => {
  if (!name) return;
  const payload = { event: name, ts: Date.now(), ...props };

  if (isBrowser()) {
    // 1) Google Tag Manager style data layer.
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }
    // 2) Optional user-supplied hook for custom pipelines.
    if (typeof window.__ab_track === 'function') {
      try {
        window.__ab_track(payload);
      } catch (err) {
        /* never let a sink break the app */
      }
    }
    // 3) Ring buffer for inspection.
    if (!Array.isArray(window.__ab_events)) window.__ab_events = [];
    window.__ab_events.push(payload);
    if (window.__ab_events.length > MAX_BUFFER) window.__ab_events.shift();
  }

  return payload;
};

// Convenience helper: fire a canonical "experiment_exposure" event so your
// analytics can measure which variant a visitor actually saw.
export const trackExposure = (experimentKey, variant) => {
  const resolved = variant || getVariant(experimentKey);
  return trackEvent('experiment_exposure', {
    experiment: experimentKey,
    variant: resolved,
  });
};
