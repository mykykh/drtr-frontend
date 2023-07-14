"use client"

import Header from "@/components/Header"
import { MoralisProvider } from "react-moralis"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <Header />
      {children}
    </MoralisProvider>
  )
}
