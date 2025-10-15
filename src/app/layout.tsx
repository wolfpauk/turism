import type { Metadata } from 'next'
import { Inter, Playfair_Display, Roboto_Condensed } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
})

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto-condensed',
  weight: ['300', '400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Туры в Дагестан | Незабываемые путешествия по Кавказу',
  description: 'Организуем экскурсионные туры, активный отдых и культурные поездки в Дагестане. Джиппинг, треккинг, рафтинг и многое другое.',
  keywords: 'туры в Дагестан, экскурсии, активный отдых, джиппинг, треккинг, рафтинг, Кавказ',
  authors: [{ name: 'Dagestan Tours' }],
  creator: 'Dagestan Tours',
  publisher: 'Dagestan Tours',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    title: 'Туры в Дагестан | Незабываемые путешествия по Кавказу',
    description: 'Организуем экскурсионные туры, активный отдых и культурные поездки в Дагестане.',
    siteName: 'Dagestan Tours',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Туры в Дагестан',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Туры в Дагестан | Незабываемые путешествия по Кавказу',
    description: 'Организуем экскурсионные туры, активный отдых и культурные поездки в Дагестане.',
    images: ['/og-image.jpg'],
    creator: '@dagestan_tours',
  },
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} ${robotoCondensed.variable}`}>
      <body className="min-h-screen bg-neutral-white font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}