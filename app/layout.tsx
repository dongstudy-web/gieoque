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
  title: "Lac Li Xi Tet 2026",
  description: "Lac dien thoai de nhan li xi may man dip Tet Binh Ngo 2026! Nhap tuoi va lac dien thoai de nhan li xi voi cac menh gia 10k - 500k.",
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
