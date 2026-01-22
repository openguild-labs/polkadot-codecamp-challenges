import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "DOT UI kit",
  description: "a UI kit for Polkadot DApps",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`font-sans antialiased`}
      >
          <main>
            {children}
          </main>
      </body>
    </html>
  );
}
