import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

// localStorage key used to persist the shopping bag between visits.
const CART_STORAGE_KEY = 'dine-market-cart';

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  // Rehydrate the cart from localStorage once, on the client only.
  // getServerSideProps runs on the server where `window` is undefined, so we
  // guard the read and only run it after the component has mounted.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored);
      if (parsed && Array.isArray(parsed.cartItems)) {
        setCartItems(parsed.cartItems);
        setTotalPrice(parsed.totalPrice || 0);
        setTotalQty(parsed.totalQty || 0);
      }
    } catch (error) {
      // Corrupted/oversized payload — start with an empty bag instead of crashing.
      console.warn('Could not restore saved cart:', error);
    }
  }, []);

  // Persist the cart whenever its contents or totals change so a page reload
  // (or coming back tomorrow) keeps the shopper's bag intact.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ cartItems, totalPrice, totalQty })
      );
    } catch (error) {
      console.warn('Could not save cart:', error);
    }
  }, [cartItems, totalPrice, totalQty]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQty((prevTotalQty) => prevTotalQty + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
        return cartProduct;
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQty(prevTotalQty => prevTotalQty - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQty(prevTotalQty => prevTotalQty + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQty(prevTotalQty => prevTotalQty - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        totalQty,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setTotalPrice,
        setTotalQty 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);