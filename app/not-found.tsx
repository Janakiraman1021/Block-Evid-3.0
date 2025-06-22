"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Home, ArrowLeft, Search, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Shield className="h-12 w-12 text-orange-400/80 floating-animation neon-glow" />
          <span className="text-3xl font-bold gradient-text">BlockSentinel</span>
        </div>

        {/* 404 Animation */}
        <div className="relative">
          <div className="text-8xl sm:text-9xl font-bold text-orange-400/20 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className="h-16 w-16 text-orange-400/80 animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <Card className="glass-effect border-orange-500/20 bg-black/40">
          <CardContent className="pt-6 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Page Not Found</h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved to a secure location.
            </p>

            {/* Suggestions */}
            <div className="space-y-3 pt-4">
              <p className="text-sm text-gray-500">You might want to:</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button className="w-full sm:w-auto bg-orange-500/80 hover:bg-orange-600/80 transition-all duration-300">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="glass-effect border-orange-500/20 bg-black/40">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Search className="h-5 w-5 text-orange-400" />
              Quick Access
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-orange-400 hover:bg-orange-500/10">
                  Login Portal
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-orange-400 hover:bg-orange-500/10">
                  Register Account
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-orange-400 hover:bg-orange-500/10">
                  Platform Features
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-orange-400 hover:bg-orange-500/10">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2024 BlockSentinel. Secure • Transparent • Decentralized</p>
        </div>
      </div>
    </div>
  )
}
