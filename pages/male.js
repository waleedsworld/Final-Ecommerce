import React from 'react'
import {client} from '../lib/client'
import { AllProducts, Seo } from '../components'

const male = ({AllMaleProducts}) => {
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
