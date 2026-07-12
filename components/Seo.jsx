import React from 'react'
import Head from 'next/head'

// Reusable per-page SEO/social block. The Layout provides sensible sitewide
// defaults; individual pages render this to override title/description and add
// canonical + Open Graph / Twitter tags for richer link previews.
const SITE_NAME = 'Dine Market'

const Seo = ({
  title,
  description,
  image,
  path = '',
  type = 'website',
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonical = path ? `https://dinemarket.example.com${path}` : undefined

  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name='description' content={description} />}
      {canonical && <link rel='canonical' href={canonical} />}
      {noindex && <meta name='robots' content='noindex, nofollow' />}

      <meta property='og:site_name' content={SITE_NAME} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={fullTitle} />
      {description && <meta property='og:description' content={description} />}
      {canonical && <meta property='og:url' content={canonical} />}
      {image && <meta property='og:image' content={image} />}

      <meta name='twitter:card' content={image ? 'summary_large_image' : 'summary'} />
      <meta name='twitter:title' content={fullTitle} />
      {description && <meta name='twitter:description' content={description} />}
      {image && <meta name='twitter:image' content={image} />}
    </Head>
  )
}

export default Seo
