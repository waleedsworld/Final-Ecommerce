import React from 'react'
import Image from 'next/image'
import logo from '../src/assets/logo/Logo.png'
import {GrFacebookOption, GrTwitter, GrLinkedinOption} from 'react-icons/gr'
import config from '../lib/config';
const footertext = config.footertext.map(item => item.label);

const slogon = footertext[0]

const copywriting = footertext[1]
// const subheading1 = footertext[1]
// const subheading2 = footertext[1]
// const subheading3 = footertext[1]
// const subheading4 = footertext[1]
// const subheading5 = footertext[1]
const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <div className='logo'>
          <Image src={logo} width={180} height={30} alt='logo' />
          <p>{slogon}</p>
          <div className='icon-container'>
            <div><GrTwitter size={20} /></div>
            <div><GrFacebookOption size={20} /></div>
            <div><GrLinkedinOption size={20} /></div>
          </div>
        </div>

        <div className='footer-links'>
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>How it Works</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className='footer-links'>
          <h3>Support</h3>
          <ul>
            <li>Support Carrer</li>
            <li>24h Service</li>
            <li>Quick Chat</li>
          </ul>
        </div>

        <div className='footer-links'>
          <h3>Contact</h3>
          <ul>
            <li>Whatsapp</li>
            <li>Support 24h</li>
          </ul>
        </div>
      </div>

      <div className='copyright'>
        <p>{copywriting}</p>
      </div>
    </footer>
  )
}

export default Footer