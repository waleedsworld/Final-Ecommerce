import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Warm up the connection to the Sanity image CDN so product
            imagery starts downloading sooner. */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
