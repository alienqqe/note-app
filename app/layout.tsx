'use client'
import './globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    require('bootstrap')
  }, [])

  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
