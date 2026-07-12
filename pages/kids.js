import React from 'react'
import Link from 'next/link'
import {client} from '../lib/client'
import { AllProducts, Seo } from '../components'

const kids = ({AllKidsProducts}) => {
    if (!AllKidsProducts || AllKidsProducts.length === 0) {
        return (
            <div className='Allproducts-container'>
                <div className='empty-listing'>
                    <h2>Nothing in Kids’ yet</h2>
                    <p>New pieces are on their way — check back soon.</p>
                    <Link href='/products'><button type='button' className='btn'>Browse all products</button></Link>
                </div>
            </div>
        )
    }
    return (
        <div className='Allproducts-container'>
            <Seo
                title='Kids Clothing'
                description="Shop Dine Market's kids' collection — durable, comfortable everyday staples with secure Stripe checkout."
                path='/kids'
            />
            {AllKidsProducts ?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product" && category == "Kids"]';
    const AllKidsProducts = await client.fetch(query);

    return {
      props: { AllKidsProducts }
    }
}

export default kids
