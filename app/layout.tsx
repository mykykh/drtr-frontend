import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_Mono } from 'next/font/google'
import ClientLayout from './clientLayout'

const font = Noto_Sans_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'drtr',
  description: 'drtr - decentralized message board',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientLayout children={children} />
      </body>
    </html>
  )
}
