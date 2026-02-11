import React from "react"
import type { Metadata, Viewport } from "next"
import { Be_Vietnam_Pro } from "next/font/google"

import "./globals.css"

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
})

export const metadata: Metadata = {
  title: "Lắc thật xung nhận quà khủng 2026",
  description: "lắc điện thoại để nhận lì xì may mắn xuân bính ngọ 2026! lắc điện thoại để nhận nhiều phần quà hấp dẫn",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8B0000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
