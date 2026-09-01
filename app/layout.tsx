import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SEN TECH — Make Room for Good Days | Artisanal Calendars & Paper Goods',
  description:
    'Artisanal daily calendars, bespoke corporate editions, and handcrafted wooden frames designed to bring mindful intention to everyday spaces.',
  keywords: [
    'Sen Tech',
    'sentechtraders',
    'daily calendars',
    'premium desk calendar',
    'wall calendar 2026',
    'custom corporate calendars',
    'stationery brand india',
    'trichy calendars',
  ],
  authors: [{ name: 'SEN TECH' }],
  creator: 'SEN TECH',
  metadataBase: new URL('https://sentechtraders.com'),
  openGraph: {
    title: 'SEN TECH — Make Room for Good Days',
    description:
      'Artisanal calendars and paper goods crafted with archival stock, tactile gold foil, and sustainable solid wood mounts.',
    url: 'https://sentechtraders.com',
    siteName: 'SEN TECH',
    images: [
      {
        url: '/header_image.png',
        width: 1200,
        height: 630,
        alt: 'SEN TECH Premium Calendars',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/sentech_logo_180x180.png',
    apple: '/sentech_logo_180x180.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${jakarta.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-paper-white text-ink-primary font-sans antialiased selection:bg-brand-emerald selection:text-white overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
