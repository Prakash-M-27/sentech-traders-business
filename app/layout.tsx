import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sen Tech — Make room for good days',
  description: 'Beautiful calendars and paper goods designed to bring a little more intention to every day.',
  generator: 'v0.app',
  icons: {
    icon: '/sentech_logo_180x180.png',
    apple: '/sentech_logo_180x180.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f9faf7',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
