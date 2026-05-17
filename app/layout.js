import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: { default: 'Techo Connect — Yagi Antenna Sri Lanka', template: '%s | Techo Connect' },
  description: 'Boost your 4G/LTE signal with Techo Connect Yagi antennas. Specially engineered for Sri Lankan carrier frequencies. Fast island-wide delivery.',
  keywords: 'yagi antenna Sri Lanka, 4G signal booster, LTE antenna, Dialog Mobitel SLT antenna booster',
  
  // ── 🌟 NEW: BASE DOMAIN URL FOR ABSOLUTE METADATA PREVIEWS ──
  metadataBase: new URL('https://techoconnect.com.lk'),

  // ── 🌟 NEW: EXPLICIT FAVICON CONFIGURATION MAPPINGS ──
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },

  openGraph: {
    title: 'Techo Connect — Yagi Antenna Sri Lanka',
    description: 'Boost your 4G/LTE signal. Engineered for Sri Lankan carriers.',
    locale: 'en_LK',
    type: 'website',
    // ── 🌟 NEW: OPEN GRAPH SOCIAL COVER PREVIEW IMAGE ARRAY ──
    images: [
      {
        url: '/cover.webp', // Points straight to your public/cover.jpg file
        width: 1200,
        height: 630,
        alt: 'Techo Connect Yagi Antenna Sri Lanka Social Preview Banner',
      },
    ],
  },

  // ── 🌟 NEW: TWITTER RICH EMBED PREVIEW COMPATIBILITY ──
  twitter: {
    card: 'summary_large_image',
    title: 'Techo Connect — Yagi Antenna Sri Lanka',
    description: 'Boost your 4G/LTE signal. Engineered for Sri Lankan carriers.',
    images: ['/cover.webp'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem' }, success: { iconTheme: { primary: '#0AAD6E', secondary: 'white' } } }} />
      </body>
    </html>
  )
}