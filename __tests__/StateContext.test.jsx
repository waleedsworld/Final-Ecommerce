import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { StateContext, useStateContext } from '../context/StateContext';

// react-hot-toast touches the DOM/animation frames; stub it so the cart logic
// can be exercised in isolation.
jest.mock('react-hot-toast', () => ({
  toast: { success: jest.fn(), loading: jest.fn(), error: jest.fn() },
}));

const wrapper = ({ children }) => <StateContext>{children}</StateContext>;

const makeProduct = (overrides = {}) => ({
  _id: 'p1',
  name: 'Alpaca Hoodie',
  price: 100,
  ...overrides,
});

describe('StateContext cart logic', () => {
  it('starts with an empty cart and sensible defaults', () => {
    const { result } = renderHook(() => useStateContext(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.totalQty).toBe(0);
    expect(result.current.qty).toBe(1);
  });

  it('adds a new product to the cart and updates totals', () => {
    const { result } = renderHook(() => useStateContext(), { wrapper });

    act(() => {
      result.current.onAdd(makeProduct(), 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toMatchObject({ _id: 'p1', quantity: 2 });
    expect(result.current.totalPrice).toBe(200);
    expect(result.current.totalQty).toBe(2);
  });

  it('increments quantity when the same product is added again', () => {
    const { result } = renderHook(() => useStateContext(), { wrapper });
    const product = makeProduct();

    act(() => {
      result.current.onAdd(product, 1);
    });
    act(() => {
      result.current.onAdd(product, 3);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(4);
    expect(result.current.totalPrice).toBe(400);
    expect(result.current.totalQty).toBe(4);
  });

  it('removes a product and subtracts its contribution from the totals', () => {
    const { result } = renderHook(() => useStateContext(), { wrapper });
    const a = makeProduct({ _id: 'a', price: 50 });
    const b = makeProduct({ _id: 'b', price: 20 });

    act(() => {
      result.current.onAdd(a, 2); // 100
    });
    act(() => {
      result.current.onAdd(b, 1); // 20
    });
    act(() => {
      result.current.onRemove(a);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]._id).toBe('b');
    expect(result.current.totalPrice).toBe(20);
    expect(result.current.totalQty).toBe(1);
  });

  it('increases an item quantity via toggleCartItemQuantity("inc")', () => {
    const { result } = renderHook(() => useStateContext(), { wrapper });

    act(() => {
      result.current.onAdd(makeProduct({ price: 30 }), 1);
    });
    act(() => {
      result.current.toggleCartItemQuantity('p1', 'inc');
    });

    const item = result.current.cartItems.find((i) => i._id === 'p1');
    expect(item.quantity).toBe(2);
    expect(result.current.totalPrice).toBe(60);
    expect(result.current.totalQty).toBe(2);
  });

  it('decreases an item quantity but never below one', () => {
    const { result } = renderHook(() => useStateContext(), { wrapper });

    act(() => {
      result.current.onAdd(makeProduct({ price: 30 }), 2);
    });
    act(() => {
      result.current.toggleCartItemQuantity('p1', 'dec');
    });

    expect(result.current.cartItems.find((i) => i._id === 'p1').quantity).toBe(1);
    expect(result.current.totalPrice).toBe(30);

    // A further decrement must be a no-op because quantity is already 1.
    act(() => {
      result.current.toggleCartItemQuantity('p1', 'dec');
    });
    expect(result.current.cartItems.find((i) => i._id === 'p1').quantity).toBe(1);
  });
});

describe('StateContext product quantity controls', () => {
  it('incQty increases the standalone quantity', () => {
    const { result } = renderHook(() => useStateContext(), { wrapper });

    act(() => result.current.incQty());
    act(() => result.current.incQty());

    expect(result.current.qty).toBe(3);
  });

  it('decQty decreases but floors at one', () => {
    const { result } = renderHook(() => useStateContext(), { wrapper });

    act(() => result.current.incQty()); // qty = 2
    act(() => result.current.decQty()); // qty = 1
    act(() => result.current.decQty()); // stays 1

    expect(result.current.qty).toBe(1);
  });
});
