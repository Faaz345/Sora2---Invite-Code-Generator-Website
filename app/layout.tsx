import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Logo from '@/components/Logo'
import BackgroundVideo from '@/components/BackgroundVideo'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://getsora2.vercel.app'),
  title: 'Get Sora 2 Invite Codes Free - OpenAI Video Generator Access 2025',
  description: 'Get free Sora 2 invite codes instantly. Access OpenAI\'s revolutionary AI video generator. Generate stunning videos from text with Sora 2. Free codes available daily - no waitlist required.',
  keywords: ['Sora 2', 'Sora 2 invite code', 'OpenAI Sora', 'free Sora access', 'AI video generator', 'text to video AI', 'Sora 2 codes', 'get Sora invite', 'OpenAI video AI', 'free AI tools'],
  authors: [{ name: 'GetSora2' }],
  creator: 'GetSora2',
  publisher: 'GetSora2',
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
    type: 'website',
    locale: 'en_US',
    url: 'https://getsora2.vercel.app',
    title: 'Get Free Sora 2 Invite Codes - OpenAI Video AI Access',
    description: 'Generate stunning AI videos with Sora 2. Get your free invite code now and access OpenAI\'s most advanced text-to-video AI technology. No waitlist, instant access.',
    siteName: 'GetSora2',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Sora 2 AI Video Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Free Sora 2 Invite Codes - AI Video Generator',
    description: 'Access OpenAI Sora 2 for free. Generate amazing videos from text instantly. Get your invite code now.',
    images: ['/icon.png'],
    creator: '@GetSora2',
  },
  alternates: {
    canonical: 'https://getsora2.vercel.app',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Verification */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3262729392815"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        {/* PropellerAds Multitag */}
        <Script
          src="https://fpyf8.com/88/tag.min.js"
          data-zone="175584"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        
        {/* Adsterra Popunder */}
        <Script
          src="https://pl27774922.revenuecpmgate.com/88/17/48/881748b739de657787d5f0183f6b5624.js"
          strategy="afterInteractive"
        />
        
        {/* AdMaven Popunder - Replace XXXXXX with your actual zone ID */}
        <Script
          type="text/javascript"
          src="//acacdn.com/script/suurl.php?zoneid=XXXXXX"
          strategy="afterInteractive"
        />
        
        {/* Background Video */}
        <BackgroundVideo />
        
        <div className="min-h-screen flex flex-col">
          <header className="relative z-10 px-6 pt-3 pb-4">
            <div className="flex items-center justify-start">
              {/* Logo in top left */}
              <Logo />
            </div>
          </header>
          
          <main className="flex-1 flex items-center justify-center p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
