import React from 'react'
import Image from 'next/image'
import img from '../src/assets/feature.png'
import Link from 'next/link'
import config from '../lib/config';
const fearturestext = config.fearturestext.map(item => item.label);


const openning_line = fearturestext[0]
const background_text = fearturestext[1]



const point1 = fearturestext[2]
const point1B = fearturestext[3]



const point2 = fearturestext[4]
const point2_b = fearturestext[5]

const point3 = fearturestext[6]
const point3_b = fearturestext[7]

const point4 = fearturestext[8]
const point4_b = fearturestext[9]

const small_description = fearturestext[10]

const FeaturesBanner = () => {
  return (
    <section className='features-section'>
      <div className='title'>
        <h1>{openning_line}</h1>
      </div>

      <div className='content'>
        <div className='left'>
          <div className="feature-background">
            {background_text}
          </div>
          <div>
            <h3>{point1}</h3>
            <p>{point1B}</p>
          </div>
          <div>
            <h3>{point2}</h3>
            <p>{point2_b}</p>
          </div>
          <div>
            <h3>{point3}</h3>
            <p>{point3_b}</p>
          </div>
          <div>
            <h3>{point4}</h3>
            <p>{point4_b}</p>
          </div>
        </div>

        <div className='right'>
          <Image src={img} width={300} height={350} alt='img' />
          <div>
            <p>{small_description}</p>
            <Link href={'/products'}>
              <button className='btn' type='button'>See All Product</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesBanner