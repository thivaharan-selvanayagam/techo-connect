import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: { default: 'Techo Connect — Yagi Antenna Sri Lanka', template: '%s | Techo Connect' },
  description: 'Boost your 4G/LTE signal with Techo Connect Yagi antennas. Specially engineered for Sri Lankan carrier frequencies. Fast island-wide delivery.',
  keywords: 'yagi antenna Sri Lanka, 4G signal booster, LTE antenna, Dialog Mobitel SLT antenna booster',
  openGraph: {
    title: 'Techo Connect — Yagi Antenna Sri Lanka',
    description: 'Boost your 4G/LTE signal. Engineered for Sri Lankan carriers.',
    locale: 'en_LK',
    type: 'website',
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
