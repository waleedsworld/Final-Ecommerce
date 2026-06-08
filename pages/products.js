import React from 'react'
import {client} from '../lib/client'
import { AllProducts, Seo } from '../components'

const products = ({Allproducts}) => {
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
    console.log(Allproducts)
  
    return {
      props: { Allproducts }
    }
}

export default products
