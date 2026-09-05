import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: { 
    default: 'Techo Connect | Yagi Antenna Sri Lanka', 
    template: '%s | Techo Connect' 
  },
  description: 'Boost your 4G/LTE signal with Techo Connect Yagi antennas. Handcrafted and specially engineered for Sri Lankan carrier frequencies (Dialog, Mobitel, SLT, Hutch). Fast island-wide delivery.',
  keywords: [
    'yagi antenna Sri Lanka', 
    '4G signal booster', 
    'LTE antenna', 
    'Dialog Mobitel SLT antenna booster',
    'Swisstek Aluminium Antenna',
    'Signal Hardware Sri Lanka'
  ],
  authors: [{ name: 'Techo Connect' }],
  creator: 'Techo Traders (Pvt) Ltd',
  publisher: 'Techo Connect',
  
  // ── 🌟 BASE DOMAIN URL FOR ABSOLUTE METADATA PREVIEWS ──
  metadataBase: new URL('https://connect.techotraders.com.lk'),

  // ── 🌟 EXPLICIT FAVICON CONFIGURATION MAPPINGS ──
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },

  // ── 🌟 SEARCH ENGINE CRAWLER RULES ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Techo Connect — Yagi Antenna Sri Lanka',
    description: 'Transform weak 4G signals into high-speed internet with handcrafted Swisstek Aluminium Yagi antennas.',
    siteName: 'Techo Connect',
    locale: 'en_LK',
    type: 'website',
    // ── 🌟 OPEN GRAPH SOCIAL COVER PREVIEW IMAGE ──
    images: [
      {
        url: '/cover.webp', // Points straight to your public/cover.webp file
        width: 1200,
        height: 630,
        alt: 'Techo Connect Yagi Antenna Sri Lanka Social Preview Banner',
      },
    ],
  },

  // ── 🌟 TWITTER RICH EMBED PREVIEW COMPATIBILITY ──
  twitter: {
    card: 'summary_large_image',
    title: 'Techo Connect — Yagi Antenna Sri Lanka',
    description: 'Boost your 4G/LTE signal. Engineered for Sri Lankan carriers.',
    images: ['/cover.webp'],
  },
}

// ── 🌟 LOCAL BUSINESS STRUCTURED DATA FOR GOOGLE INDEXING ──
export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Techo Connect',
    image: 'https://connect.techotraders.com.lk/cover.webp',
    '@id': 'https://connect.techotraders.com.lk',
    url: 'https://connect.techotraders.com.lk',
    telephone: '+94706656007',
    priceRange: 'LKR 3700 - LKR 5800',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kallady',
      addressLocality: 'Batticaloa',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.717,
      longitude: 81.700,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '17:00',
    },
    sameAs: [
      'https://www.facebook.com/techotraders',
      'https://www.tiktok.com/@techotraders',
      'https://www.youtube.com/@ThivaharanS',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Inject JSON-LD directly into the HTML Head */}
        <LocalBusinessJsonLd />
      </head>
      <body>
        {children}
        <Toaster 
          position="top-center" 
          toastOptions={{ 
            style: { fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.875rem' }, 
            success: { iconTheme: { primary: '#0AAD6E', secondary: 'white' } } 
          }} 
        />
      </body>
    </html>
  )
}