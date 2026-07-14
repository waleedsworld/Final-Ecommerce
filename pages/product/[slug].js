import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import {CgShoppingCart} from 'react-icons/cg'
import { useStateContext } from '../../context/StateContext';
import { Seo } from '../../components';

const ProductDetails = ({products, product}) => {
    const { image, name, details, price, tags, care, slug } = product;
    const [index, setIndex] = useState(0);
    const {decQty, incQty, qty, onAdd} = useStateContext();

    // Guard against products that have no `care` block yet so the page
    // renders instead of throwing on `care.length`.
    const careList = (care || [])
        .map((entry) => entry?.children?.[0]?.text)
        .filter(Boolean);

    const productDescription =
        details?.[0]?.children?.[0]?.text ||
        `Buy ${name} at Dine Market — premium everyday clothing with secure Stripe checkout.`;

    return (
        <div className='products'>
            <Seo
                title={name}
                description={productDescription}
                image={image && image[0] ? urlFor(image[0]).width(1200).height(630).url() : undefined}
                path={slug?.current ? `/product/${slug.current}` : undefined}
                type='product'
            />
            <div className='product-detail-container'>
                <div className='product-images'>
                    <div className='small-images-container'>
                        {image?.map((item, ind) => (
                            <img
                            key={ind}
                            src={urlFor(item)}
                            alt={`${name} thumbnail ${ind + 1}`}
                            loading='lazy'
                            decoding='async'
                            className='small-image'
                            onMouseEnter={() => setIndex(ind)} />
                        ))}
                    </div>
                    <div className='big-image-container'>
                        <img src={urlFor(image && image[index])} alt={name} decoding='async' />
                    </div>
                </div>
                <div className='product-details'>
                    <div className='name-and-category'>
                        <h3>{name}</h3>
                        <span>{tags}</span>   
                    </div>
                    <div className='size'>
                        <p>SELECT SIZE</p>
                        <ul>
                            <li>XS</li>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                            <li>XL</li>
                        </ul>
                    </div>
                    <div className='quantity-desc'>
                        <h4>Quantity: </h4>
                        <div>
                            <button type='button' className='minus' aria-label='Decrease quantity' onClick={decQty}><AiOutlineMinus /></button>
                            <span className='num' aria-live='polite'>{qty}</span>
                            <button type='button' className='plus' aria-label='Increase quantity' onClick={incQty}><AiOutlinePlus /></button>
                        </div>
                    </div>
                    <div className='add-to-cart'>
                        <button className='btn' type='button' onClick={() => onAdd(product, qty)}><CgShoppingCart size={20} />Add to Cart</button>
                        <p className='price'>${price}.00</p>  
                    </div>
                </div>
            </div>

            <div className='product-desc-container'>
                <div className='desc-title'>
                    <div className="desc-background">
                        Overview
                    </div>
                    <h2>Product Information</h2>  
                </div>
                <div className='desc-details'>
                    <h4>PRODUCT DETAILS</h4>
                    <p>{details?.[0]?.children?.[0]?.text}</p>
                </div>
                <div className='desc-care'>
                    <h4>PRODUCT CARE</h4>
                    <ul>
                    {careList.map((list, careIndex) => (
                        <li key={careIndex}>{list}</li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails

export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery)
  
    return {
      props: { products, product }
    }
}

// Generates `/product/1` and `/product/2`
export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
      paths,
      fallback: 'blocking'
    }
}
