import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/navbar"
import styles from './home.module.css'
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bosta Frontend",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        style={{ marginTop: '60px' }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className={ styles.main }>{ children }</main>
        <footer className='bg-gray-800 text-white h-[200px] flex justify-center items-center'>
          All Rights Reserved &copy; 2025
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
