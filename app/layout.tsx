import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather app',
  description: 'An open weather free api app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
    <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
    </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
