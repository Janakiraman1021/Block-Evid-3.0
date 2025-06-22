"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Globe, Shield, Database, Mail, Code } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminSettings() {
  const [systemSettings, setSystemSettings] = useState({
    siteName: "BlockSentinel",
    siteDescription: "Decentralized Crime Reporting Platform",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
    twoFactorAuth: false,
    maxFileSize: 10,
    sessionTimeout: 30,
    apiRateLimit: 1000,
  })

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">System Settings</h1>
            <p className="text-gray-400 text-sm sm:text-base">Configure global system preferences and policies</p>
          </div>
          <Button className="bg-orange-500/80 hover:bg-orange-600/80 w-full sm:w-auto">Save All Changes</Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-black/50">
            <TabsTrigger value="general" className="data-[state=active]:bg-orange-500/20">
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-orange-500/20">
              Security
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-orange-500/20">
              Email
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-orange-500/20">
              Blockchain
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-orange-500/20">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Basic system configuration and site information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Site Name</Label>
                    <Input
                      value={systemSettings.siteName}
                      onChange={(e) => setSystemSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                      className="bg-black/50 border-orange-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Max File Size (MB)</Label>
                    <Input
                      type="number"
                      value={systemSettings.maxFileSize}
                      onChange={(e) =>
                        setSystemSettings((prev) => ({ ...prev, maxFileSize: Number.parseInt(e.target.value) }))
                      }
                      className="bg-black/50 border-orange-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) =>
                        setSystemSettings((prev) => ({ ...prev, sessionTimeout: Number.parseInt(e.target.value) }))
                      }
                      className="bg-black/50 border-orange-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">API Rate Limit (per hour)</Label>
                    <Input
                      type="number"
                      value={systemSettings.apiRateLimit}
                      onChange={(e) =>
                        setSystemSettings((prev) => ({ ...prev, apiRateLimit: Number.parseInt(e.target.value) }))
                      }
                      className="bg-black/50 border-orange-500/30 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Site Description</Label>
                  <Textarea
                    value={systemSettings.siteDescription}
                    onChange={(e) => setSystemSettings((prev) => ({ ...prev, siteDescription: e.target.value }))}
                    className="bg-black/50 border-orange-500/30 text-white"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Maintenance Mode</Label>
                      <p className="text-xs text-gray-400">Temporarily disable public access</p>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setSystemSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">User Registration</Label>
                      <p className="text-xs text-gray-400">Allow new user registrations</p>
                    </div>
                    <Switch
                      checked={systemSettings.registrationEnabled}
                      onCheckedChange={(checked) =>
                        setSystemSettings((prev) => ({ ...prev, registrationEnabled: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Authentication and security policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Email Verification</Label>
                      <p className="text-xs text-gray-400">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      checked={systemSettings.emailVerification}
                      onCheckedChange={(checked) =>
                        setSystemSettings((prev) => ({ ...prev, emailVerification: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Two-Factor Authentication</Label>
                      <p className="text-xs text-gray-400">Enforce 2FA for all users</p>
                    </div>
                    <Switch
                      checked={systemSettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, twoFactorAuth: checked }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                        <SelectItem value="strong">Strong (12+ chars, symbols)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (16+ chars, complex)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Login Attempts</Label>
                    <Select defaultValue="5">
                      <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">SMTP settings and email templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">SMTP Server</Label>
                    <Input placeholder="smtp.gmail.com" className="bg-black/50 border-orange-500/30 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">SMTP Port</Label>
                    <Input placeholder="587" className="bg-black/50 border-orange-500/30 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Username</Label>
                    <Input
                      placeholder="noreply@blocksentinel.com"
                      className="bg-black/50 border-orange-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">From Name</Label>
                    <Input placeholder="BlockSentinel System" className="bg-black/50 border-orange-500/30 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-black/50 border-orange-500/30 text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                    Test Connection
                  </Button>
                  <Button variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                    Send Test Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Blockchain Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Smart contract and blockchain configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Network</Label>
                    <Select defaultValue="ethereum">
                      <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Gas Price (Gwei)</Label>
                    <Input placeholder="20" className="bg-black/50 border-orange-500/30 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Contract Address</Label>
                    <Input placeholder="0x..." className="bg-black/50 border-orange-500/30 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">RPC Endpoint</Label>
                    <Input
                      placeholder="https://mainnet.infura.io/v3/..."
                      className="bg-black/50 border-orange-500/30 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Auto-sync to Blockchain</Label>
                      <p className="text-xs text-gray-400">Automatically sync complaints to blockchain</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">IPFS Storage</Label>
                      <p className="text-xs text-gray-400">Store evidence files on IPFS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Developer and system administration options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Cache Duration (hours)</Label>
                    <Input type="number" placeholder="24" className="bg-black/50 border-orange-500/30 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Database Pool Size</Label>
                    <Input type="number" placeholder="10" className="bg-black/50 border-orange-500/30 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Worker Threads</Label>
                    <Input type="number" placeholder="4" className="bg-black/50 border-orange-500/30 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Debug Mode</Label>
                      <p className="text-xs text-gray-400">Enable detailed logging and debugging</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">API Documentation</Label>
                      <p className="text-xs text-gray-400">Enable public API documentation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Performance Monitoring</Label>
                      <p className="text-xs text-gray-400">Track system performance metrics</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Custom CSS</Label>
                  <Textarea
                    placeholder="/* Add custom CSS styles here */"
                    className="bg-black/50 border-orange-500/30 text-white font-mono"
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Custom JavaScript</Label>
                  <Textarea
                    placeholder="// Add custom JavaScript code here"
                    className="bg-black/50 border-orange-500/30 text-white font-mono"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
