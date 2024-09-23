import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Browse Websites - AIBookmarker',
  description: 'Discover and explore machine learning websites. Find valuable resources and content in our curated collection.',
  keywords: 'machine learning websites, website navigation, content discovery, AIBookmarker',
  robots: 'index, follow',
  openGraph: {
    title: 'Browse Machine Learning Websites - AIBookmarker',
    description: 'Discover and explore machine learning websites. Find valuable resources and content in our curated collection.',
    type: 'website',
    url: 'https://nav.aibookmarker.com/machine-learning',
    images: ['https://nav.aibookmarker.com/preview-image.jpg'],
  },
  canonical: 'https://nav.aibookmarker.com/machine-learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <head/>
      <body className={inter.className}>
         <SessionProvider>
          {children}
        </SessionProvider>
        </body>
    </html>
  )
}
