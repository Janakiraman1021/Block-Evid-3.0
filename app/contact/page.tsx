"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Bug } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you within 24 hours.")
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4 sm:mb-6">Contact Us</h1>
            <p className="text-base sm:text-lg text-[#f5f5f5]/70 max-w-2xl mx-auto">
              Have questions or need support? We're here to help. Reach out to our team and we'll get back to you as
              soon as possible.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ScrollAnimation animation="fadeInLeft">
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Send us a Message</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Fill out the form below and we'll respond within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#f5f5f5]">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-black/60 border-orange-500/30 text-[#f5f5f5]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#f5f5f5]">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-black/60 border-orange-500/30 text-[#f5f5f5]"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-[#f5f5f5]">
                          Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger className="bg-black/60 border-orange-500/30 text-[#f5f5f5]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0a0a0a] border-orange-500/30">
                            <SelectItem value="general" className="text-[#f5f5f5]">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="support" className="text-[#f5f5f5]">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="bug" className="text-[#f5f5f5]">
                              Bug Report
                            </SelectItem>
                            <SelectItem value="feature" className="text-[#f5f5f5]">
                              Feature Request
                            </SelectItem>
                            <SelectItem value="partnership" className="text-[#f5f5f5]">
                              Partnership
                            </SelectItem>
                            <SelectItem value="legal" className="text-[#f5f5f5]">
                              Legal/Compliance
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[#f5f5f5]">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="bg-black/60 border-orange-500/30 text-[#f5f5f5]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#f5f5f5]">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="bg-black/60 border-orange-500/30 text-[#f5f5f5] resize-none"
                        placeholder="Please provide as much detail as possible..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 pulse-glow"
                    >
                      {isSubmitting ? (
                        <>
                          <Send className="h-4 w-4 mr-2 animate-pulse" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <ScrollAnimation animation="fadeInRight" delay={200}>
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Get in Touch</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Multiple ways to reach our team
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm sm:text-base">Email</h4>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">support@blocksentinel.com</p>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">legal@blocksentinel.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm sm:text-base">Phone</h4>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">+1 (555) 123-4567</p>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm sm:text-base">Address</h4>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">123 Blockchain Street</p>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Tech City, TC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm sm:text-base">Response Time</h4>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Within 24 hours</p>
                      <p className="text-xs sm:text-sm text-[#f5f5f5]/60">Emergency: Within 2 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" delay={400}>
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl text-[#f5f5f5]">Quick Help</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-[#f5f5f5]/70">
                    Common support categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <MessageSquare className="h-5 w-5 text-orange-500" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm">General Support</h4>
                      <p className="text-xs text-[#f5f5f5]/60">Questions about using the platform</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Bug className="h-5 w-5 text-amber-500" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm">Technical Issues</h4>
                      <p className="text-xs text-[#f5f5f5]/60">Bug reports and technical problems</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-400/10 border border-orange-400/20">
                    <HelpCircle className="h-5 w-5 text-orange-400" />
                    <div>
                      <h4 className="font-semibold text-[#f5f5f5] text-sm">Account Help</h4>
                      <p className="text-xs text-[#f5f5f5]/60">Login, wallet, and account issues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" delay={600}>
              <Card className="futuristic-border bg-black/40 energy-pulse">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-[#f5f5f5] mb-3 text-sm sm:text-base">Need Immediate Help?</h3>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/60 mb-4">
                    For urgent technical issues or security concerns, contact our emergency support line.
                  </p>
                  <Button variant="outline" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20">
                    Emergency Support
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>

        {/* FAQ Section */}
        <ScrollAnimation animation="fadeInUp" delay={800}>
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 gradient-text">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <Card className="futuristic-border bg-black/40">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg text-[#f5f5f5]">How do I file a complaint?</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/70">
                    Create an account, connect your wallet, and use the "File New Complaint" feature in your dashboard.
                    All complaints are securely stored on the blockchain.
                  </p>
                </CardContent>
              </Card>

              <Card className="futuristic-border bg-black/40">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg text-[#f5f5f5]">Is my data secure?</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/70">
                    Yes, all data is encrypted and stored on the blockchain with IPFS for evidence files. Your
                    information is protected by military-grade encryption.
                  </p>
                </CardContent>
              </Card>

              <Card className="futuristic-border bg-black/40">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg text-[#f5f5f5]">What wallets are supported?</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/70">
                    We support MetaMask and other Web3 wallets through WalletConnect. Make sure you have a compatible
                    wallet installed.
                  </p>
                </CardContent>
              </Card>

              <Card className="futuristic-border bg-black/40">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg text-[#f5f5f5]">How long does resolution take?</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/70">
                    Resolution times vary depending on the complexity and type of complaint. You can track progress in
                    real-time through your dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
