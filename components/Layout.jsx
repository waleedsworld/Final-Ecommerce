import React from 'react'
import Head from 'next/head'
import { Footer, Navbar } from '../components'

const Layout = ({children}) => {
  return (
    <div className='layout'>
        <Head>
            <title>Dine Market — Wardrobe Staples, Reimagined</title>
            <meta
                name='description'
                content='Dine Market is a modern clothing store for Female, Male, and Kids — premium everyday staples with secure Stripe checkout.'
            />
            <meta name='theme-color' content='#0D0D0D' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='robots' content='index, follow' />
            <meta name='keywords' content='clothing, fashion, ecommerce, female, male, kids, apparel, Dine Market' />
            <meta property='og:site_name' content='Dine Market' />
            <meta property='og:title' content='Dine Market' />
            <meta
                property='og:description'
                content='Premium everyday clothing for the whole family. New season, up to 40% off.'
            />
            <meta property='og:type' content='website' />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content='Dine Market' />
            <meta
                name='twitter:description'
                content='Premium everyday clothing for the whole family. New season, up to 40% off.'
            />
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <header>
            <Navbar />
        </header>
        <main className='main-container'>
            {children}
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default Layout