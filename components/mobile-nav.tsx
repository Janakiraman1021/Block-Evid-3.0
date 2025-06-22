"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const closeNav = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#f5f5f5] lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#0a0a0a] border-orange-500/20">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-orange-500/20">
            <Link href="/" className="flex items-center space-x-2" onClick={closeNav}>
              <Shield className="h-6 w-6 text-orange-500 neon-glow" />
              <span className="text-xl font-bold gradient-text">BlockEvid 3.0</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6">
            <div className="space-y-4">
              <Link
                href="/features"
                className="block px-4 py-3 text-[#f5f5f5] hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-200"
                onClick={closeNav}
              >
                Features
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-[#f5f5f5] hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-200"
                onClick={closeNav}
              >
                About
              </Link>
              <Link
                href="/security"
                className="block px-4 py-3 text-[#f5f5f5] hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-200"
                onClick={closeNav}
              >
                Security
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-[#f5f5f5] hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-200"
                onClick={closeNav}
              >
                Contact
              </Link>
              <Link
                href="/help"
                className="block px-4 py-3 text-[#f5f5f5] hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-200"
                onClick={closeNav}
              >
                Help Center
              </Link>
              <Link
                href="/docs"
                className="block px-4 py-3 text-[#f5f5f5] hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-200"
                onClick={closeNav}
              >
                Documentation
              </Link>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="border-t border-orange-500/20 pt-4 space-y-3">
            <Link href="/auth/login" className="block" onClick={closeNav}>
              <Button variant="outline" className="w-full border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20">
                Login
              </Button>
            </Link>
            <Link href="/auth/register" className="block" onClick={closeNav}>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
