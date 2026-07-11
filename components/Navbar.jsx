import React, { useState } from 'react'
import Image from 'next/image'
import {CiSearch} from 'react-icons/ci'
import {CgShoppingCart} from 'react-icons/cg'
import logo from '../src/assets/logo/Logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router';
import {RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { useStateContext } from '../context/StateContext';
import config from '../lib/config';

const Navbar = ({Searchproducts}) => {
  const {showCart, setShowCart, totalQty} = useStateContext();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Submit the search box to the /search results page. Empty queries are
  // ignored so we never navigate to an empty result set.
  const handleSearch = (event) => {
    event.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <nav>
      <Link href='/'>
        <Image src={logo} width={140} height={25} alt='logo' />
      </Link>
      <ul className='nav-links'>
        {config.navbarItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <li>{item.label}</li>
          </Link>
        ))}
      </ul>

        <form className='search-bar' onSubmit={handleSearch}>
          <button type='submit' className='search-submit' aria-label='Search'>
            <CiSearch aria-hidden='true' />
          </button>
          <input
            type='text'
            aria-label='Search products'
            placeholder='What are you looking for'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </form>

      {showCart ?
      <Link href='/cart'>
        <button className='cart' aria-label={`View cart, ${totalQty} items`} onClick={() => setShowCart(false)}>
          <CgShoppingCart size={22} aria-hidden='true' />
          <span className='cart-item-qty'>{totalQty}</span>
        </button>
      </Link>
      :
      <button className='cart' aria-label={`View cart, ${totalQty} items`} onClick={() => setShowCart(true)}>
        <CgShoppingCart size={22} aria-hidden='true' />
        <span className='cart-item-qty'>{totalQty}</span>
      </button>
      }

      <div className='navbar-smallscreen'>
        <button
          type='button'
          className='menu-toggle'
          aria-label='Open menu'
          aria-expanded={toggleMenu}
          onClick={() => setToggleMenu(true)}
        >
          <RiMenu3Line color='black' fontSize={27} aria-hidden='true' />
        </button>
        {toggleMenu && (
          <div className='navbar-smallscreen_overlay' role='dialog' aria-modal='true' aria-label='Site menu'>
            <Link href='/'>
              <Image className='logo-small' src={logo} width={140} height={25} alt='logo' />
            </Link>
            <button
              type='button'
              className='close_icon'
              aria-label='Close menu'
              onClick={() => setToggleMenu(false)}
            >
              <RiCloseLine fontSize={27} aria-hidden='true' />
            </button>
            <ul className='navbar-smallscreen_links'>
              <Link href='/cart'>
                  <button className='cart-small-screen' onClick={() => setShowCart(false)}>   
                    <CgShoppingCart size={22} />
                    <span className='cart-item-qty'>{totalQty}</span> 
                  </button>
              </Link> 
              {config.navbarItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <li>{item.label}</li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar