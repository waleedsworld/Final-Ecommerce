import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import {HiOutlineTrash} from 'react-icons/hi'
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const {cartItems, totalPrice, totalQty, onRemove, toggleCartItemQuantity} = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <h2>Shopping Cart</h2>
      <div className='cart-container'>
        <div className='cart-items'>
          {cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} aria-hidden='true' />
              <h1>Your shopping bag is empty</h1>
              <Link href='/products'>
                <button type='button' className='btn'>Continue Shopping</button>
              </Link>
            </div>
          )}

          {cartItems.length >= 1 && cartItems.map((item) => (
            <div key={item._id} className='item-card'>
              <div className='item-image'>
                <img src={urlFor(item?.image[0])} alt={item.name} />
              </div>
              <div className='item-details'>
                <div className='name-and-remove'>
                  <h3>{item.name}</h3>
                  <button
                    type='button'
                    onClick={() => onRemove(item)}
                    className='remove-item'
                    aria-label={`Remove ${item.name} from cart`}
                  >
                  <HiOutlineTrash size={28} />
                  </button>
                </div>
                <p className='item-tag'>Dress</p>
                <p className='delivery-est'>Delivery Estimation</p>
                <p className='delivery-days'>5 Working Days</p>
                <div className='price-and-qty'>
                  <span className='price'>${item.price * item.quantity}</span>
                  <div>
                    <button type='button' className='minus' aria-label={`Decrease quantity of ${item.name}`} onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></button>
                    <span className='num' aria-live='polite'>{item.quantity}</span>
                    <button type='button' className='plus' aria-label={`Increase quantity of ${item.name}`} onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></button>
                  </div>
                </div>
              </div>
            </div>
            ))}    
        </div>

        {cartItems.length >= 1 && (
        <div className='order-summary'>
          <h3>Order Summary</h3>
          <div className='qty'>
            <p>Quantity</p>
            <span>{totalQty} Product</span>
          </div>
          <div className='subtotal'>
            <p>Sub Total</p>
            <span>${totalPrice}</span>
          </div>
          {/* <div className='total'>
            <p>Total</p>
            <span>${totalPrice}</span>
          </div>  */}
          <div>
            <button className='btn' type='button' onClick={handleCheckout}>Process to Checkout</button>
          </div>         
        </div>
        )}  

      </div>
    </div>
  )
}

export default Cart