import React from 'react'
import Link from 'next/link'
import {client} from '../lib/client'
import { AllProducts, Seo } from '../components'

const male = ({AllMaleProducts}) => {
    if (!AllMaleProducts || AllMaleProducts.length === 0) {
        return (
            <div className='Allproducts-container'>
                <div className='empty-listing'>
                    <h2>Nothing in Men’s yet</h2>
                    <p>New pieces are on their way — check back soon.</p>
                    <Link href='/products'><button type='button' className='btn'>Browse all products</button></Link>
                </div>
            </div>
        )
    }
    return (
        <div className='Allproducts-container'>
            <Seo
                title='Male Clothing'
                description="Shop Dine Market's men's collection — premium everyday staples from XS to XL with secure Stripe checkout."
                path='/male'
            />
            {AllMaleProducts?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product" && category == "Male"]';
    const AllMaleProducts = await client.fetch(query);

    return {
      props: { AllMaleProducts }
    }
}

export default male
