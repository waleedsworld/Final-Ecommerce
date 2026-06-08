import React from 'react'
import {client} from '../lib/client'
import { AllProducts, Seo } from '../components'

const kids = ({AllKidsProducts}) => {
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
