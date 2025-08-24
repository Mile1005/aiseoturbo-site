import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AISEO Turbo - Speed up your search marketing goals achievement with our comprehensive SEO tools" />
        <meta name="keywords" content="SEO, audit, analysis, backlinks, rank tracker, keyword research" />
        <meta name="author" content="AISEO Turbo" />
        <meta property="og:title" content="AISEO Turbo - SEO Tools" />
        <meta property="og:description" content="Speed up your search marketing goals achievement with our comprehensive SEO tools" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aiseoturbo.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AISEO Turbo - SEO Tools" />
        <meta name="twitter:description" content="Speed up your search marketing goals achievement with our comprehensive SEO tools" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://aiseoturbo.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
