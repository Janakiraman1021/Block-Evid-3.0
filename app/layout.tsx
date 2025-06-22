import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import FuturisticCursor from "@/components/futuristic-cursor"
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlockEvid 3.0 - Secure Blockchain Incident Management",
  description: "Tamper-proof incident reporting and evidence handling system with blockchain security",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WalletProvider>
            <AuthProvider>
              <FuturisticCursor />
              {children}
            </AuthProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
