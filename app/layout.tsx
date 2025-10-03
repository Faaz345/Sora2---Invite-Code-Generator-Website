import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Logo from '@/components/Logo'
import BackgroundVideo from '@/components/BackgroundVideo'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sora 2 Code Generator',
  description: 'Generate exclusive Sora 2 invite codes',
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
        
        {/* Background Video */}
        <BackgroundVideo />
        
        <div className="min-h-screen flex flex-col">
          <header className="relative z-10 p-6">
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
