import React from 'react'
import Image from 'next/image'
import event1 from '../src/assets/event1.png' 
import event2 from '../src/assets/event2.png' 
import event3 from '../src/assets/event3.png' 
import config from '../lib/config';
const eventtext = config.eventtext.map(item => item.label);

const small_Promotions = eventtext[0]
const large_Promotions = eventtext[1]

const block1 = eventtext[2]
const block1B = eventtext[3]
const block1c = eventtext[4]

const Block2 = eventtext[5]
const Block2_b = eventtext[6]
const Block2_c = eventtext[7]

const product1 = eventtext[8]
const product1_cost = eventtext[9]
const product1_cost_on_sale = eventtext[10]

const product2 = eventtext[11]
const product2_cost = eventtext[12]
const product2_cost_on_sale = eventtext[13]

const EventsBanner = () => {
  return (
    <section className='event-container'>
      <div className='subtitle'>
        <span>{small_Promotions}</span>
        <h2>{large_Promotions}</h2>
      </div>

      <div className='event-banner'>
        <div className='event-banner-left'>
          <div className='event-card'>
            <div className='content'>
              <h3>{block1} <span>{block1B}</span></h3>
              <p>{block1c}</p>
            </div>
            <Image src={event1} alt='event' />
          </div>

          <div className='event-card'>
            <h3>{Block2}</h3>
            <p>{Block2_b}</p>
            <button>{Block2_c}</button>
          </div>
        </div>

        <div className='event-banner-right'>
          <div className='event-banner-right-1'>
            <div className='details'>
              <p>{product1}</p>
              <div className='price'>
                <span>{product1_cost}</span>
                <span>{product1_cost_on_sale}</span>
              </div>
            </div>
            <Image src={event2} alt='event' />
          </div>

          <div className='event-banner-right-2'>
            <div className='details'>
              <p>{product2}</p>
              <div className='price'>
                <span>{product2_cost}</span>
                <span>{product2_cost_on_sale}</span>
              </div>
            </div>
            <Image src={event3} alt='event' />
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default EventsBanner