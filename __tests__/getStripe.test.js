// Verify the Stripe loader memoises its promise (a single loadStripe call
// shared across every checkout) instead of re-initialising per invocation.
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() => Promise.resolve({ id: 'stripe-instance' })),
}));

describe('getStripe', () => {
  beforeEach(() => {
    // Reset the module registry so getStripe's internal `stripePromise`
    // starts undefined for every test.
    jest.resetModules();
  });

  it('returns the same promise on repeated calls (singleton)', () => {
    const { loadStripe } = require('@stripe/stripe-js');
    loadStripe.mockClear();
    const getStripe = require('../lib/getStripe').default;

    const first = getStripe();
    const second = getStripe();

    expect(first).toBe(second);
    expect(loadStripe).toHaveBeenCalledTimes(1);
  });

  it('passes the public Stripe key from the environment to loadStripe', () => {
    process.env.NEXT_PUBLIC_STRIPE_KEY = 'pk_test_123';
    const { loadStripe } = require('@stripe/stripe-js');
    loadStripe.mockClear();
    const getStripe = require('../lib/getStripe').default;

    getStripe();

    expect(loadStripe).toHaveBeenCalledWith('pk_test_123');
  });
});
