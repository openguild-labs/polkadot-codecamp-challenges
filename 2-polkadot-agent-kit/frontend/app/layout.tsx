import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import "@luno-kit/ui/styles.css"
import Script from "next/script"
import { Toaster } from "@/components/ui/toaster"
import { WalletProvider } from "@/components/wallet-provider"

export const metadata: Metadata = {
  title: "Polkadot Agent Playground - XCM Swap",
  description: "AI-powered cross-chain swap application using Polkadot Agent Kit",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <head>
        {/* put this in the <head> */}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
            data-enabled="true"
          />
        )}
        {/* rest of your scripts go under */}
      </head>
      <body className="antialiased">
        <WalletProvider>
          {children}
        </WalletProvider>
        <Toaster />
      </body>
    </html>
  )
}
