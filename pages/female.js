import React from 'react'
import {client} from '../lib/client'
import { AllProducts, Seo } from '../components'

const female = ({AllFemaleProducts}) => {
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
