"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialTag = 'Machine learning';

  return (
    <html lang="en">
      <Head>
        <title>{`Browse Websites - AIBookmarker`}</title>
        <meta name="description" content={`Discover and explore ${initialTag} websites. Find valuable resources and content in our curated collection.`} />
        <meta name="keywords" content={`${initialTag} websites, website navigation, content discovery, AIBookmarker`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Browse ${initialTag.charAt(0).toUpperCase() + initialTag.slice(1)} Websites - AIBookmarker`} />
        <meta property="og:description" content={`Discover and explore ${initialTag} websites. Find valuable resources and content in our curated collection.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nav.aibookmarker.com/${initialTag}`} />
        <meta property="og:image" content="https://nav.aibookmarker.com/preview-image.jpg" />
        <link rel="canonical" href={`https://nav.aibookmarker.com/${initialTag}`} />
      </Head>
      <body className={inter.className}>
         <SessionProvider>
          {children}
        </SessionProvider>
        </body>
    </html>
  )
}
