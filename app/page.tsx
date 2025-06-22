import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, Users, FileText, Smartphone, Database } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScrollAnimation } from "@/components/scroll-animations"
import { MobileNav } from "@/components/mobile-nav"
import { FuturisticLogo } from "@/components/futuristic-logo"
import { AuthProvider } from './context/AuthContext';

export default function LandingPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] transition-all duration-500">
        {/* Header */}
        <header className="border-b border-orange-500/20 bg-black/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <ScrollAnimation animation="fadeInLeft">
                <Link href="/" className="flex items-center space-x-3">
                  <FuturisticLogo size="lg" className="floating-animation" />
                  <span className="text-lg sm:text-2xl font-bold gradient-text">BlockEvid 3.0</span>
                </Link>
              </ScrollAnimation>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link href="/features" className="text-[#f5f5f5]/70 hover:text-orange-500/80 transition-colors">
                  Features
                </Link>
                <Link href="/about" className="text-[#f5f5f5]/70 hover:text-orange-500/80 transition-colors">
                  About
                </Link>
                <Link href="/security" className="text-[#f5f5f5]/70 hover:text-orange-500/80 transition-colors">
                  Security
                </Link>
                <Link href="/contact" className="text-[#f5f5f5]/70 hover:text-orange-500/80 transition-colors">
                  Contact
                </Link>
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <ThemeToggle />
                <ScrollAnimation animation="fadeInRight" delay={200}>
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      className="hover:scale-105 transition-transform duration-200 text-[#f5f5f5] hover:text-orange-500/80"
                    >
                      Login
                    </Button>
                  </Link>
                </ScrollAnimation>
                <ScrollAnimation animation="fadeInRight" delay={400}>
                  <Link href="/auth/register">
                    <Button className="pulse-glow hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-orange-500/80 to-amber-500/80 text-white border-0">
                      Get Started
                    </Button>
                  </Link>
                </ScrollAnimation>
              </div>

              {/* Mobile Navigation */}
              <div className="lg:hidden flex items-center space-x-2">
                <ThemeToggle />
                <MobileNav />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation animation="scaleIn">
                <div className="flex items-center justify-center mb-6">
                  <FuturisticLogo size="xl" className="floating-animation mr-4" />
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">BlockEvid 3.0</h1>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fadeInUp" delay={200}>
                <p className="text-lg sm:text-xl md:text-2xl text-amber-400/80 mb-3 sm:mb-4">
                  Quantum-Secured Incident Management
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="fadeInUp" delay={400}>
                <p className="text-sm sm:text-base lg:text-lg text-[#f5f5f5]/70 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Advanced blockchain-powered incident reporting with quantum encryption, DNA-level security, and
                  consciousness-driven evidence handling for the future of digital justice.
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="fadeInUp" delay={600}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link href="/auth/login" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto card-3d pulse-glow bg-gradient-to-r from-orange-500/80 to-amber-500/80 text-white border-0"
                    >
                      Access Quantum Portal
                    </Button>
                  </Link>
                  <Link href="/features" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto card-3d glass-effect text-[#f5f5f5] border-orange-500/40 hover:bg-orange-500/15"
                    >
                      Explore Technology
                    </Button>
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 px-4 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <ScrollAnimation animation="fadeInUp">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">Quantum-Enhanced Features</h2>
                <p className="text-sm sm:text-base lg:text-lg text-[#f5f5f5]/70 max-w-2xl mx-auto px-4">
                  Experience the next evolution of security with consciousness-driven blockchain technology and
                  quantum-encrypted evidence management.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <ScrollAnimation animation="fadeInUp" delay={100}>
                <Card className="futuristic-border hover:border-orange-500/40 transition-all duration-300 card-3d energy-pulse bg-black/40 h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <Lock className="h-8 w-8 sm:h-12 sm:w-12 text-orange-500/80 mb-3 sm:mb-4 floating-animation neon-glow" />
                    <CardTitle className="text-[#f5f5f5] text-lg sm:text-xl">Quantum Encryption</CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70 text-sm sm:text-base">
                      DNA-level security with quantum entanglement protocols and consciousness-verified evidence storage.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={200}>
                <Card className="futuristic-border hover:border-amber-500/40 transition-all duration-300 card-3d energy-pulse bg-black/40 h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <Eye className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500/80 mb-3 sm:mb-4 floating-animation" />
                    <CardTitle className="text-[#f5f5f5] text-lg sm:text-xl">Reality Transparency</CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70 text-sm sm:text-base">
                      Multi-dimensional tracking with time-distortion proof audit trails and quantum verification.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={300}>
                <Card className="futuristic-border hover:border-orange-400/40 transition-all duration-300 card-3d energy-pulse bg-black/40 h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <Users className="h-8 w-8 sm:h-12 sm:w-12 text-orange-400/80 mb-3 sm:mb-4 floating-animation" />
                    <CardTitle className="text-[#f5f5f5] text-lg sm:text-xl">Consciousness Access</CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70 text-sm sm:text-base">
                      Evolution-based role assignment with quantum entangled authentication and DNA verification.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={400}>
                <Card className="futuristic-border hover:border-orange-500/40 transition-all duration-300 card-3d energy-pulse bg-black/40 h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-orange-500/80 mb-3 sm:mb-4 floating-animation" />
                    <CardTitle className="text-[#f5f5f5] text-lg sm:text-xl">Quantum Evidence</CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70 text-sm sm:text-base">
                      Reality-ripple secured evidence with consciousness streams and dimensional storage protocols.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={500}>
                <Card className="futuristic-border hover:border-amber-500/40 transition-all duration-300 card-3d energy-pulse bg-black/40 h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <Database className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500/80 mb-3 sm:mb-4 floating-animation" />
                    <CardTitle className="text-[#f5f5f5] text-lg sm:text-xl">Neural Integration</CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70 text-sm sm:text-base">
                      Seamless consciousness-driven FIR generation with quantum notarization and time-warp compliance.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={600}>
                <Card className="futuristic-border hover:border-orange-400/40 transition-all duration-300 card-3d energy-pulse bg-black/40 h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <Smartphone className="h-8 w-8 sm:h-12 sm:w-12 text-orange-400/80 mb-3 sm:mb-4 floating-animation" />
                    <CardTitle className="text-[#f5f5f5] text-lg sm:text-xl">Quantum Mobile</CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70 text-sm sm:text-base">
                      Full dimensional support with consciousness-connect integration and reality-optimized interface.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-orange-500/15 to-amber-500/15 text-[#f5f5f5] relative overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <ScrollAnimation animation="scaleIn">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 gradient-text">
                Ready to Evolve Your Security?
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={200}>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-[#f5f5f5]/80 px-4">
                Join the quantum revolution in incident management with consciousness-driven blockchain security.
              </p>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto card-3d pulse-glow bg-gradient-to-r from-amber-500/80 to-orange-500/80 text-white border-0"
                  >
                    Begin Evolution
                  </Button>
                </Link>
                <Link href="/auth/login" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-[#f5f5f5] border-orange-500/40 hover:bg-orange-500/15 card-3d glass-effect"
                  >
                    Access Portal
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/80 text-[#f5f5f5] py-8 sm:py-12 px-4 border-t border-orange-500/20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <ScrollAnimation animation="fadeInUp">
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                    <FuturisticLogo size="md" className="neon-glow" />
                    <span className="text-lg sm:text-xl font-bold gradient-text">BlockEvid 3.0</span>
                  </div>
                  <p className="text-[#f5f5f5]/70 text-sm sm:text-base">
                    Quantum-secured, consciousness-driven, and dimensionally-enhanced incident management system.
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fadeInUp" delay={100}>
                <div>
                  <h3 className="font-semibold mb-3 sm:mb-4 text-orange-500/80 text-sm sm:text-base">Quantum Platform</h3>
                  <ul className="space-y-2 text-[#f5f5f5]/70 text-sm sm:text-base">
                    <li>
                      <Link href="/features" className="hover:text-orange-500/80 transition-colors">
                        Neural Features
                      </Link>
                    </li>
                    <li>
                      <Link href="/security" className="hover:text-orange-500/80 transition-colors">
                        Quantum Security
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-orange-500/80 transition-colors">
                        Evolution Story
                      </Link>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fadeInUp" delay={200}>
                <div>
                  <h3 className="font-semibold mb-3 sm:mb-4 text-amber-500/80 text-sm sm:text-base">
                    Consciousness Support
                  </h3>
                  <ul className="space-y-2 text-[#f5f5f5]/70 text-sm sm:text-base">
                    <li>
                      <Link href="/help" className="hover:text-amber-500/80 transition-colors">
                        Neural Center
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-amber-500/80 transition-colors">
                        Quantum Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs" className="hover:text-amber-500/80 transition-colors">
                        Reality Docs
                      </Link>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fadeInUp" delay={300}>
                <div>
                  <h3 className="font-semibold mb-3 sm:mb-4 text-orange-400/80 text-sm sm:text-base">
                    Dimensional Legal
                  </h3>
                  <ul className="space-y-2 text-[#f5f5f5]/70 text-sm sm:text-base">
                    <li>
                      <Link href="/privacy" className="hover:text-orange-400/80 transition-colors">
                        Privacy Evolution
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-orange-400/80 transition-colors">
                        Quantum Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="/compliance" className="hover:text-orange-400/80 transition-colors">
                        Reality Compliance
                      </Link>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
            <ScrollAnimation animation="fadeInUp" delay={400}>
              <div className="border-t border-orange-500/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-[#f5f5f5]/70 text-sm sm:text-base">
                <p>&copy; 2024 BlockEvid 3.0. All dimensions reserved. Quantum-secured across realities.</p>
              </div>
            </ScrollAnimation>
          </div>
        </footer>
      </div>
    </AuthProvider>
  )
}
