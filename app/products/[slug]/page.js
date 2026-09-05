import { notFound } from 'next/navigation'
import { mainProducts } from '../../../lib/data'
import { formatLKR } from '../../../lib/utils'
import ProductDetailClient from './ProductDetailClient'

// ── 🌟 DYNAMIC SEO METADATA GENERATOR ──
export async function generateMetadata({ params }) {
  const { slug } = params
  const product = mainProducts.find((p) => p.slug === slug)

  if (!product) {
    return { title: 'Product Not Found | Techo Connect' }
  }

  const minPrice = Math.min(...product.variants.map((v) => v.price))
  const mainImage = `https://connect.techotraders.com.lk/products/${product.slug}/${product.variants[0].id}-1.webp`

  return {
    title: `${product.name} — 4G LTE Yagi Antenna`,
    description: `${product.description} Handcrafted with Swisstek Aluminium for Sri Lankan carriers (Dialog, Mobitel, SLT, Hutch). Starting at ${formatLKR(minPrice)}.`,
    keywords: [
      product.name,
      `${product.name} Sri Lanka`,
      'Yagi Antenna Sri Lanka',
      '4G Signal Booster',
      'Swisstek Aluminium Antenna',
      ...(product.compatible || [])
    ],
    metadataBase: new URL('https://connect.techotraders.com.lk'),
    openGraph: {
      title: `${product.name} | Techo Connect`,
      description: `${product.description} Specially engineered for Sri Lankan carrier frequencies.`,
      url: `https://connect.techotraders.com.lk/products/${product.slug}`,
      siteName: 'Techo Connect',
      locale: 'en_LK',
      type: 'website',
      images: [
        {
          url: mainImage,
          width: 800,
          height: 800,
          alt: `${product.name} Yagi Antenna`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Techo Connect`,
      description: product.description,
      images: [mainImage],
    },
  }
}

// ── 🌟 PRODUCT SCHEMA (JSON-LD) FOR GOOGLE SHOPPING / SEARCH ──
function ProductJsonLd({ product }) {
  const minPrice = Math.min(...product.variants.map((v) => v.price))
  const maxPrice = Math.max(...product.variants.map((v) => v.price))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [
      `https://connect.techotraders.com.lk/products/${product.slug}/${product.variants[0].id}-1.webp`
    ],
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Techo Connect'
    },
    offers: {
      '@type': 'AggregateOffer',
      url: `https://connect.techotraders.com.lk/products/${product.slug}`,
      priceCurrency: 'LKR',
      lowPrice: minPrice,
      highPrice: maxPrice,
      offerCount: product.variants.length,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Techo Connect'
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function ProductDetailPage({ params }) {
  const { slug } = params
  const product = mainProducts.find((p) => p.slug === slug)

  if (!product) notFound()

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductDetailClient product={product} />
    </>
  )
}