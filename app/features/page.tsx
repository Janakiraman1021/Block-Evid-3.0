import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Eye,
  Users,
  FileText,
  Smartphone,
  Database,
  Zap,
  Globe,
  CheckCircle,
  ArrowLeft,
  Code,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
      {/* Header */}
      <header className="border-b border-orange-500/20 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 floating-animation neon-glow" />
              <span className="text-lg sm:text-2xl font-bold gradient-text">BlockEvid 3.0</span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4 sm:mb-6">
              Powerful Features for Secure Complaint Management
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#f5f5f5]/70 max-w-3xl mx-auto">
              Discover how BlockEvid 3.0 revolutionizes complaint management with cutting-edge blockchain technology,
              ensuring transparency, security, and accountability.
            </p>
          </div>
        </ScrollAnimation>

        {/* Core Features */}
        <section className="mb-12 sm:mb-16">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 gradient-text">Core Features</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ScrollAnimation animation="fadeInUp" delay={100}>
              <Card className="futuristic-border bg-black/40 energy-pulse h-full">
                <CardHeader className="p-4 sm:p-6">
                  <Lock className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mb-4 neon-glow" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Blockchain Security</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    All complaints are cryptographically secured and stored on an immutable blockchain, ensuring
                    tamper-proof records.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#f5f5f5]/60">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Immutable record keeping</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#f5f5f5]/60">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Cryptographic hashing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#f5f5f5]/60">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Decentralized storage</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <Card className="futuristic-border bg-black/40 energy-pulse h-full">
                <CardHeader className="p-4 sm:p-6">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-amber-500 mb-4" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Role-Based Access Control</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Sophisticated permission system with distinct roles for Users, Police Officers, and Administrators.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">User Access</Badge>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Police Access</Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin Access</Badge>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={300}>
              <Card className="futuristic-border bg-black/40 energy-pulse h-full">
                <CardHeader className="p-4 sm:p-6">
                  <Eye className="h-10 w-10 sm:h-12 sm:w-12 text-orange-400 mb-4" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Real-time Transparency</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Track complaint progress with complete transparency and immutable audit trails.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#f5f5f5]/60">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Live status updates</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#f5f5f5]/60">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Complete audit trail</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#f5f5f5]/60">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Blockchain verification</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Technical Features */}
        <section className="mb-12 sm:mb-16">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 gradient-text">
              Technical Capabilities
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollAnimation animation="fadeInLeft" delay={100}>
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardHeader className="p-4 sm:p-6">
                  <Database className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mb-4" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">IPFS Evidence Storage</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Secure, distributed storage for evidence files with content-addressed hashing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-2 text-sm text-[#f5f5f5]/60">
                    <li>• Decentralized file storage</li>
                    <li>• Content-addressed retrieval</li>
                    <li>• Tamper-proof evidence</li>
                    <li>• Global accessibility</li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" delay={200}>
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardHeader className="p-4 sm:p-6">
                  <Wallet className="h-10 w-10 sm:h-12 sm:w-12 text-amber-500 mb-4" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Web3 Authentication</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Secure wallet-based authentication with MetaMask and WalletConnect support.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-2 text-sm text-[#f5f5f5]/60">
                    <li>• MetaMask integration</li>
                    <li>• WalletConnect support</li>
                    <li>• Cryptographic signatures</li>
                    <li>• Decentralized identity</li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInLeft" delay={300}>
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardHeader className="p-4 sm:p-6">
                  <Code className="h-10 w-10 sm:h-12 sm:w-12 text-orange-400 mb-4" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Smart Contract Integration</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Automated complaint processing and verification through smart contracts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-2 text-sm text-[#f5f5f5]/60">
                    <li>• Automated workflows</li>
                    <li>• Trustless verification</li>
                    <li>• Gas-optimized operations</li>
                    <li>• Multi-chain support</li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" delay={400}>
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardHeader className="p-4 sm:p-6">
                  <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-green-400 mb-4" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Mobile-First Design</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Fully responsive design optimized for all devices with touch-friendly interfaces.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-2 text-sm text-[#f5f5f5]/60">
                    <li>• Progressive Web App</li>
                    <li>• Touch-optimized UI</li>
                    <li>• Offline capabilities</li>
                    <li>• Cross-platform support</li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* User Benefits */}
        <section className="mb-12 sm:mb-16">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 gradient-text">User Benefits</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ScrollAnimation animation="fadeInUp" delay={100}>
              <div className="text-center p-4 sm:p-6 futuristic-border bg-black/40 rounded-lg">
                <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Fast Processing</h3>
                <p className="text-xs sm:text-sm text-[#f5f5f5]/60">
                  Quick complaint filing and automated processing workflows
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <div className="text-center p-4 sm:p-6 futuristic-border bg-black/40 rounded-lg">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Maximum Security</h3>
                <p className="text-xs sm:text-sm text-[#f5f5f5]/60">
                  Military-grade encryption and blockchain immutability
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={300}>
              <div className="text-center p-4 sm:p-6 futuristic-border bg-black/40 rounded-lg">
                <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Global Access</h3>
                <p className="text-xs sm:text-sm text-[#f5f5f5]/60">
                  Access your complaints from anywhere in the world
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={400}>
              <div className="text-center p-4 sm:p-6 futuristic-border bg-black/40 rounded-lg">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-green-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Legal Compliance</h3>
                <p className="text-xs sm:text-sm text-[#f5f5f5]/60">FIR integration and legal documentation support</p>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#f5f5f5]/70 mb-6 sm:mb-8">
              Join thousands of users who trust BlockEvid 3.0 for secure complaint management.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 pulse-glow"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
