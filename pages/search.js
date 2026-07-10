import React from 'react'
import Head from 'next/head'
import { client } from '../lib/client'
import { AllProducts } from '../components'

// Search results page. The navbar search box submits to /search?q=<term>,
// and this page runs a server-side GROQ query that matches the term against a
// product's name, tags, or category (case-insensitive) before rendering the
// hits with the same card grid used by the category pages.
const search = ({ results, term }) => {
  return (
    <>
      <Head>
        <title>{term ? `Search: ${term}` : 'Search'} — Dine Market</title>
      </Head>
      <div className='search-results-heading'>
        {term ? (
          <h2>{results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{term}&rdquo;</h2>
        ) : (
          <h2>Search our collection</h2>
        )}
      </div>
      {results.length > 0 ? (
        <div className='Allproducts-container'>
          {results.map((prod) => (
            <AllProducts key={prod._id} allproducts={prod} />
          ))}
        </div>
      ) : (
        <div className='search-empty'>
          <h3>No products matched your search.</h3>
          <p>Try a different keyword, size, or category.</p>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const term = (query.q || '').toString().trim();

  if (!term) {
    return { props: { results: [], term: '' } };
  }

  // `match` performs a case-insensitive wildcard search in GROQ; wrapping the
  // term in asterisks turns it into a "contains" match across the three fields.
  const groq =
    '*[_type == "product" && (name match $wildcard || tags match $wildcard || category match $wildcard)]';
  const results = await client.fetch(groq, { wildcard: `*${term}*` });

  return {
    props: { results, term },
  };
}

export default search
