// Extend Jest matchers with @testing-library/jest-dom assertions.
import '@testing-library/jest-dom';

// The storefront persists the cart to localStorage, which jsdom shares across
// every test in a file. Clear it before each test so cases stay isolated.
beforeEach(() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
});
