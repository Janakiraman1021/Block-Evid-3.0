import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, FileText, Scale, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function TermsPage() {
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

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 max-w-4xl">
        {/* Hero Section */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4 sm:mb-6">Terms of Service</h1>
            <p className="text-base sm:text-lg text-[#f5f5f5]/70">
              Please read these terms carefully before using BlockSentinel services.
            </p>
            <p className="text-sm text-[#f5f5f5]/50 mt-2">Last updated: January 2024</p>
          </div>
        </ScrollAnimation>

        {/* Terms Overview */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <ScrollAnimation animation="fadeInUp" delay={100}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardContent className="p-4 sm:p-6">
                  <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Clear Terms</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Easy to understand service conditions</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardContent className="p-4 sm:p-6">
                  <Scale className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Fair Usage</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Balanced rights and responsibilities</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={300}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardContent className="p-4 sm:p-6">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">User Protection</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Your rights and protections outlined</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={400}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardContent className="p-4 sm:p-6">
                  <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-red-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Important Notices</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Key limitations and disclaimers</p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Terms Content */}
        <div className="space-y-8 sm:space-y-12">
          <ScrollAnimation animation="fadeInUp">
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <p>
                    By accessing and using BlockSentinel ("the Service"), you accept and agree to be bound by the terms
                    and provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                  <p>
                    These Terms of Service ("Terms") govern your use of our complaint management platform, including any
                    content, functionality, and services offered on or through BlockSentinel.
                  </p>
                  <p>
                    We reserve the right to update and change the Terms of Service from time to time without notice. Any
                    new features that augment or enhance the current Service shall be subject to the Terms of Service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={100}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <p>
                    BlockSentinel is a blockchain-based complaint management system that allows users to file, track,
                    and manage complaints in a secure, transparent, and immutable manner.
                  </p>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Service Features Include:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Secure complaint filing and tracking</li>
                      <li>Blockchain-based evidence storage</li>
                      <li>Role-based access control for users, police, and administrators</li>
                      <li>Real-time status updates and notifications</li>
                      <li>Immutable audit trails and transparency</li>
                    </ul>
                  </div>
                  <p>
                    The Service is provided "as is" and we reserve the right to modify, suspend, or discontinue any
                    aspect of the Service at any time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={200}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">
                  3. User Accounts and Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Account Creation</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>You must provide accurate and complete information when creating an account</li>
                      <li>You are responsible for maintaining the security of your account credentials</li>
                      <li>You must have a compatible Web3 wallet for blockchain authentication</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">User Conduct</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Provide truthful and accurate information in all complaints</li>
                      <li>Respect the rights and privacy of other users</li>
                      <li>Use the Service only for legitimate complaint management purposes</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Prohibited Activities</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Filing false, fraudulent, or malicious complaints</li>
                      <li>Attempting to compromise system security or integrity</li>
                      <li>Harassing or threatening other users or officials</li>
                      <li>Using the Service for any illegal activities</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={300}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">4. Blockchain and Data Immutability</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Immutable Records</h4>
                    <p>
                      By using our Service, you understand and agree that data stored on the blockchain cannot be
                      modified or deleted. This includes complaint details, evidence hashes, and transaction records.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Blockchain Costs</h4>
                    <p>
                      Users are responsible for any blockchain transaction fees (gas fees) associated with storing data
                      on the blockchain. These fees are paid directly to the blockchain network, not to BlockSentinel.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Network Dependencies</h4>
                    <p>
                      The Service depends on blockchain networks and IPFS. We are not responsible for any downtime,
                      delays, or issues caused by these external networks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={400}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">5. Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <p>
                    Your privacy is important to us. Our collection and use of personal information is governed by our
                    Privacy Policy, which is incorporated into these Terms by reference.
                  </p>
                  <p>
                    By using the Service, you consent to the collection, use, and sharing of your information as
                    described in our Privacy Policy.
                  </p>
                  <p>
                    You understand that complaint data may be shared with authorized personnel (police officers,
                    administrators) as necessary for complaint resolution and legal compliance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={500}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">6. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <p>
                    BlockSentinel provides a platform for complaint management but does not guarantee the resolution of
                    any complaint or the actions taken by authorities.
                  </p>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Service Limitations</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>We do not control the actions of police officers or government officials</li>
                      <li>We cannot guarantee the outcome of any complaint or investigation</li>
                      <li>We are not responsible for delays in complaint processing by authorities</li>
                    </ul>
                  </div>
                  <p>
                    In no event shall BlockSentinel be liable for any indirect, incidental, special, consequential, or
                    punitive damages arising out of your use of the Service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={600}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">7. Termination</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <p>
                    We may terminate or suspend your account and access to the Service immediately, without prior notice
                    or liability, for any reason, including breach of these Terms.
                  </p>
                  <p>
                    Upon termination, your right to use the Service will cease immediately. However, data already stored
                    on the blockchain will remain immutable and cannot be removed.
                  </p>
                  <p>
                    You may terminate your account at any time by contacting us. Termination does not relieve you of any
                    obligations incurred prior to termination.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={700}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">8. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-[#f5f5f5]">Email:</strong> legal@blocksentinel.com
                    </p>
                    <p>
                      <strong className="text-[#f5f5f5]">Address:</strong> 123 Blockchain Street, Tech City, TC 12345
                    </p>
                    <p>
                      <strong className="text-[#f5f5f5]">Support:</strong> support@blocksentinel.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        {/* CTA Section */}
        <ScrollAnimation animation="fadeInUp" delay={800}>
          <div className="text-center bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg p-6 sm:p-8 lg:p-12 mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">Ready to Get Started?</h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#f5f5f5]/70 mb-6 sm:mb-8">
              By creating an account, you agree to these terms and can start using our secure complaint management
              system.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 pulse-glow"
                >
                  Create Account
                </Button>
              </Link>
              <Link href="/privacy" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20"
                >
                  View Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
