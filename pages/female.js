import React from 'react'
import Link from 'next/link'
import {client} from '../lib/client'
import { AllProducts, Seo } from '../components'

const female = ({AllFemaleProducts}) => {
    if (!AllFemaleProducts || AllFemaleProducts.length === 0) {
        return (
            <div className='Allproducts-container'>
                <div className='empty-listing'>
                    <h2>Nothing in Women’s yet</h2>
                    <p>New pieces are on their way — check back soon.</p>
                    <Link href='/products'><button type='button' className='btn'>Browse all products</button></Link>
                </div>
            </div>
        )
    }
    return (
        <div className='Allproducts-container'>
            <Seo
                title='Female Clothing'
                description="Shop Dine Market's women's collection — premium everyday staples from XS to XL with secure Stripe checkout."
                path='/female'
            />
            {AllFemaleProducts?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product" && category == "Female"]';
    const AllFemaleProducts = await client.fetch(query);

    return {
      props: { AllFemaleProducts }
    }
}

export default female
