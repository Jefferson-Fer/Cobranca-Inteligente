import './globals.css'
import type { Metadata } from 'next'
import { Red_Hat_Display } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'

import Providers from './provider'
const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-red-hat-display',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={redHatDisplay.variable}>
        <Providers>
          <main>{children}</main>
        </Providers>

        <Toaster />
      </body>
    </html>
  )
}
