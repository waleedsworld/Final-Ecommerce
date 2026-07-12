import React from 'react'
import Link from 'next/link'
import {client} from '../lib/client'
import { AllProducts, Seo } from '../components'

const products = ({Allproducts}) => {
    if (!Allproducts || Allproducts.length === 0) {
        return (
            <div className='Allproducts-container'>
                <div className='empty-listing'>
                    <h2>No products yet</h2>
                    <p>New pieces are on their way — check back soon.</p>
                    <Link href='/'><button type='button' className='btn'>Back to Home</button></Link>
                </div>
            </div>
        )
    }
    return (
        <div className='Allproducts-container'>
            <Seo
                title='All Products'
                description='Browse the full Dine Market catalogue — premium everyday clothing for Female, Male, and Kids with secure Stripe checkout.'
                path='/products'
            />
            {Allproducts?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const Allproducts = await client.fetch(query);

    return {
      props: { Allproducts }
    }
}

export default products
