import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Lock, Eye, Database, UserCheck } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function PrivacyPage() {
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

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 max-w-4xl">
        {/* Hero Section */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4 sm:mb-6">Privacy Policy</h1>
            <p className="text-base sm:text-lg text-[#f5f5f5]/70">
              Your privacy is our priority. Learn how we protect and handle your data.
            </p>
            <p className="text-sm text-[#f5f5f5]/50 mt-2">Last updated: January 2024</p>
          </div>
        </ScrollAnimation>

        {/* Privacy Overview */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <ScrollAnimation animation="fadeInUp" delay={100}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardContent className="p-4 sm:p-6">
                  <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Encrypted Data</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">End-to-end encryption for all sensitive data</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardContent className="p-4 sm:p-6">
                  <Database className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Minimal Collection</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">We only collect data necessary for service</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={300}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardContent className="p-4 sm:p-6">
                  <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">User Control</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Full control over your personal data</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={400}>
              <Card className="futuristic-border bg-black/40 energy-pulse text-center">
                <CardContent className="p-4 sm:p-6">
                  <Eye className="h-8 w-8 sm:h-10 sm:w-10 text-green-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-[#f5f5f5] mb-2 text-sm sm:text-base">Transparency</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Clear information about data usage</p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <div className="space-y-8 sm:space-y-12">
          <ScrollAnimation animation="fadeInUp">
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Personal Information</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Wallet addresses for blockchain authentication</li>
                      <li>Profile information you choose to provide</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Complaint Data</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Complaint details and descriptions</li>
                      <li>Evidence files and supporting documents</li>
                      <li>Location and timestamp information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Technical Data</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Device information and browser type</li>
                      <li>IP addresses and usage analytics</li>
                      <li>Blockchain transaction hashes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={100}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Service Provision</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Processing and managing your complaints</li>
                      <li>Facilitating communication between parties</li>
                      <li>Providing status updates and notifications</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Security & Compliance</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Verifying user identity and preventing fraud</li>
                      <li>Maintaining audit trails for legal compliance</li>
                      <li>Ensuring platform security and integrity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Improvement</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Analyzing usage patterns to improve our service</li>
                      <li>Developing new features and functionality</li>
                      <li>Optimizing system performance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={200}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">3. Data Storage and Security</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Blockchain Storage</h4>
                    <p>
                      Complaint data and evidence hashes are stored on the blockchain, ensuring immutability and
                      transparency. This data cannot be altered or deleted once recorded.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">IPFS Storage</h4>
                    <p>
                      Evidence files are stored on IPFS (InterPlanetary File System) with content-addressed hashing,
                      providing decentralized and tamper-proof storage.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Encryption</h4>
                    <p>
                      All sensitive data is encrypted using industry-standard AES-256 encryption both in transit and at
                      rest. Private keys are never stored on our servers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={300}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">4. Data Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Authorized Personnel</h4>
                    <p>
                      Complaint data is shared with authorized police officers and administrators as necessary for
                      complaint resolution, based on role-based access controls.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Legal Requirements</h4>
                    <p>
                      We may disclose information when required by law, court order, or government regulation, or to
                      protect our rights and the safety of our users.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">No Third-Party Sales</h4>
                    <p>
                      We never sell, rent, or trade your personal information to third parties for marketing or
                      commercial purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={400}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">5. Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Access and Portability</h4>
                    <p>You have the right to access, download, and export your personal data at any time.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Correction</h4>
                    <p>
                      You can update and correct your personal information through your account settings or by
                      contacting us.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Deletion</h4>
                    <p>
                      You can request deletion of your account and personal data. Note that blockchain records cannot be
                      deleted due to their immutable nature.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f5f5f5] mb-2">Opt-out</h4>
                    <p>You can opt out of non-essential communications and data processing activities.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={500}>
            <Card className="futuristic-border bg-black/40">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">6. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4 text-sm sm:text-base text-[#f5f5f5]/70">
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-[#f5f5f5]">Email:</strong> privacy@BlockEvid 3.0.com
                    </p>
                    <p>
                      <strong className="text-[#f5f5f5]">Address:</strong> 123 Blockchain Street, Tech City, TC 12345
                    </p>
                    <p>
                      <strong className="text-[#f5f5f5]">Data Protection Officer:</strong> dpo@BlockEvid 3.0.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        {/* CTA Section */}
        <ScrollAnimation animation="fadeInUp" delay={600}>
          <div className="text-center bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg p-6 sm:p-8 lg:p-12 mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">Questions About Your Privacy?</h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#f5f5f5]/70 mb-6 sm:mb-8">
              Our privacy team is here to help. Contact us for any questions or concerns about your data.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 pulse-glow"
                >
                  Contact Privacy Team
                </Button>
              </Link>
              <Link href="/terms" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20"
                >
                  View Terms of Service
                </Button>
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
