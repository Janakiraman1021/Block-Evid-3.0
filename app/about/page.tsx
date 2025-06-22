import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Target, ArrowLeft, Globe, Zap, Heart } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
      {/* Header */}
      <header className="border-b border-orange-500/20 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 floating-animation neon-glow" />
              <span className="text-lg sm:text-2xl font-bold gradient-text">BlockSentinel</span>
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
              About BlockSentinel
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#f5f5f5]/70 max-w-3xl mx-auto">
              Revolutionizing complaint management through blockchain technology, ensuring transparency, security, and
              accountability in every interaction.
            </p>
          </div>
        </ScrollAnimation>

        {/* Mission Section */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <ScrollAnimation animation="fadeInLeft">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Our Mission</h2>
                <p className="text-sm sm:text-base text-[#f5f5f5]/70 mb-4 sm:mb-6 leading-relaxed">
                  At BlockSentinel, we believe that every citizen deserves a transparent, secure, and efficient way to
                  file complaints and track their resolution. Our mission is to bridge the gap between citizens and
                  authorities using cutting-edge blockchain technology.
                </p>
                <p className="text-sm sm:text-base text-[#f5f5f5]/70 leading-relaxed">
                  We're committed to creating a world where complaint management is not just a process, but a foundation
                  for building trust between communities and institutions.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInRight" delay={200}>
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardContent className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-2">10K+</div>
                      <div className="text-xs sm:text-sm text-[#f5f5f5]/60">Complaints Processed</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-amber-500 mb-2">95%</div>
                      <div className="text-xs sm:text-sm text-[#f5f5f5]/60">Resolution Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-2">24/7</div>
                      <div className="text-xs sm:text-sm text-[#f5f5f5]/60">System Availability</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">100%</div>
                      <div className="text-xs sm:text-sm text-[#f5f5f5]/60">Data Security</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-12 sm:mb-16">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 gradient-text">Our Core Values</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ScrollAnimation animation="fadeInUp" delay={100}>
              <Card className="futuristic-border bg-black/40 energy-pulse h-full">
                <CardHeader className="p-4 sm:p-6 text-center">
                  <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mx-auto mb-4 neon-glow" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Transparency</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Every action is recorded on the blockchain, creating an immutable audit trail that ensures complete
                    transparency in the complaint resolution process.
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <Card className="futuristic-border bg-black/40 energy-pulse h-full">
                <CardHeader className="p-4 sm:p-6 text-center">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Accessibility</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Our platform is designed to be accessible to everyone, regardless of technical expertise, with
                    intuitive interfaces and comprehensive support.
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={300}>
              <Card className="futuristic-border bg-black/40 energy-pulse h-full">
                <CardHeader className="p-4 sm:p-6 text-center">
                  <Target className="h-10 w-10 sm:h-12 sm:w-12 text-orange-400 mx-auto mb-4" />
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Accountability</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    We hold ourselves and our partners accountable for every complaint, ensuring that each case receives
                    the attention and resolution it deserves.
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-12 sm:mb-16">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 gradient-text">
              Powered by Innovation
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <ScrollAnimation animation="fadeInLeft">
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5] mb-4">Technology Stack</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-[#f5f5f5]/70">Blockchain</span>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Ethereum</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-[#f5f5f5]/70">Storage</span>
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">IPFS</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-[#f5f5f5]/70">Frontend</span>
                      <Badge className="bg-orange-400/20 text-orange-400 border-orange-400/30">Next.js</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-[#f5f5f5]/70">Authentication</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Web3</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" delay={200}>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#f5f5f5] mb-4 sm:mb-6">Why Blockchain?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm sm:text-base">Immutable Records</h4>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">
                        Once recorded, complaint data cannot be altered or deleted
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm sm:text-base">Decentralized Trust</h4>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">No single point of failure or control</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm sm:text-base">Public Verification</h4>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">
                        Anyone can verify the authenticity of records
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12 sm:mb-16">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 gradient-text">Leadership Team</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ScrollAnimation animation="fadeInUp" delay={100}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardHeader className="p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-white">AS</span>
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Alex Smith</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-orange-500">CEO & Founder</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">
                    Former blockchain architect with 10+ years in decentralized systems and public sector technology.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardHeader className="p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-white">MJ</span>
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Maria Johnson</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-amber-500">CTO</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">
                    Expert in smart contract development and distributed systems with a focus on security and
                    scalability.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={300}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardHeader className="p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-white">DL</span>
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">David Lee</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-orange-400">Head of Security</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">
                    Cybersecurity specialist with extensive experience in government and enterprise security systems.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">Join Our Mission</h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#f5f5f5]/70 mb-6 sm:mb-8">
              Be part of the revolution in complaint management. Together, we can build a more transparent and
              accountable world.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 pulse-glow"
                >
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
