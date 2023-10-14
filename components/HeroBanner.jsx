import config from '../lib/config';
const heroimages = config.heroItems.map(item => item.label);
import React from 'react'
import Image from 'next/image'
import {CgShoppingCart} from 'react-icons/cg'
import headerImg from '../src/assets/header.png'
import featured1 from '../src/assets/featured/Featured1.png';
import featured2 from '../src/assets/featured/Featured2.png';
import featured3 from '../src/assets/featured/Featured3.png';
import featured4 from '../src/assets/featured/Featured4.png';
import Link from 'next/link';


const heroLabels = config.heroItems.map(item => item.label);


const HeroBanner = () => {
  return (
    <header className='header'>
        <div className='header-left-side'>
            <div className='header-content'>
                <span>{heroLabels[0]}</span>
                 <h1>{heroLabels[1]}</h1>
                 <p>{heroLabels[2]}</p>
                <Link href='/products'>
                     <button className='btn' type='button'><CgShoppingCart size={26} />  Start Shopping</button>
                </Link>
            </div>

            <div className='header-featured'>
                <Image src={featured1} width={100} height={35} alt='img' />
                <Image src={featured2} width={100} height={35} alt='img' />
                <Image src={featured3} width={100} height={35} alt='img' />
                <Image src={featured4} width={100} height={35} alt='img' />
            </div>
        </div>

        <div className='header-right-side'>
            <div className='header-circle'>
                <Image className='header-img' src={headerImg} width={650} height={650} alt='header image' />
            </div>
        </div>
    </header>
  )
}

export default HeroBanner