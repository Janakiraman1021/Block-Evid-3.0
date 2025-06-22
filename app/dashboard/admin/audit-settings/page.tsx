"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Shield, Activity, Database, Bell, Clock, Download } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface AuditSettings {
  logRetention: number
  autoArchive: boolean
  realTimeMonitoring: boolean
  alertThreshold: number
  backupFrequency: string
  encryptionLevel: string
  accessLogging: boolean
  blockchainSync: boolean
  notificationSettings: {
    email: boolean
    sms: boolean
    dashboard: boolean
  }
}

interface LogCategory {
  id: string
  name: string
  description: string
  enabled: boolean
  level: "low" | "medium" | "high" | "critical"
  retention: number
}

export default function AuditSettings() {
  const [settings, setSettings] = useState<AuditSettings>({
    logRetention: 365,
    autoArchive: true,
    realTimeMonitoring: true,
    alertThreshold: 10,
    backupFrequency: "daily",
    encryptionLevel: "AES-256",
    accessLogging: true,
    blockchainSync: true,
    notificationSettings: {
      email: true,
      sms: false,
      dashboard: true,
    },
  })

  const [logCategories, setLogCategories] = useState<LogCategory[]>([
    {
      id: "user_actions",
      name: "User Actions",
      description: "Login, logout, profile changes",
      enabled: true,
      level: "medium",
      retention: 90,
    },
    {
      id: "complaint_management",
      name: "Complaint Management",
      description: "Filing, verification, status changes",
      enabled: true,
      level: "high",
      retention: 365,
    },
    {
      id: "evidence_handling",
      name: "Evidence Handling",
      description: "Upload, access, modification of evidence",
      enabled: true,
      level: "critical",
      retention: 2555, // 7 years
    },
    {
      id: "system_access",
      name: "System Access",
      description: "Admin panel access, role changes",
      enabled: true,
      level: "critical",
      retention: 1095, // 3 years
    },
    {
      id: "blockchain_transactions",
      name: "Blockchain Transactions",
      description: "Smart contract interactions, wallet connections",
      enabled: true,
      level: "high",
      retention: 1825, // 5 years
    },
    {
      id: "api_calls",
      name: "API Calls",
      description: "External API interactions and responses",
      enabled: false,
      level: "low",
      retention: 30,
    },
  ])

  const handleSettingChange = (key: keyof AuditSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleNotificationChange = (type: keyof AuditSettings["notificationSettings"], value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [type]: value,
      },
    }))
  }

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    setLogCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...cat, enabled } : cat)))
  }

  const handleCategoryLevelChange = (categoryId: string, level: LogCategory["level"]) => {
    setLogCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...cat, level } : cat)))
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Audit Settings</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Configure system monitoring, logging, and compliance settings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
              <Download className="h-4 w-4 mr-2" />
              Export Config
            </Button>
            <Button className="bg-orange-500/80 hover:bg-orange-600/80">Save Settings</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Active Logs</CardTitle>
              <Activity className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {logCategories.filter((c) => c.enabled).length}
              </div>
              <p className="text-xs text-gray-400">of {logCategories.length} categories</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Storage Used</CardTitle>
              <Database className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">2.4 GB</div>
              <p className="text-xs text-gray-400">of 10 GB allocated</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Retention Period</CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">{settings.logRetention}</div>
              <p className="text-xs text-gray-400">days average</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Alerts Today</CardTitle>
              <Bell className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">3</div>
              <p className="text-xs text-gray-400">threshold breaches</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Settings */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-black/50">
            <TabsTrigger value="general" className="data-[state=active]:bg-orange-500/20">
              General
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-orange-500/20">
              Log Categories
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500/20">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-orange-500/20">
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Audit Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure basic audit logging and retention policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Log Retention Period (Days)</Label>
                    <Input
                      type="number"
                      value={settings.logRetention}
                      onChange={(e) => handleSettingChange("logRetention", Number.parseInt(e.target.value))}
                      className="bg-black/50 border-orange-500/30 text-white"
                    />
                    <p className="text-xs text-gray-400">How long to keep audit logs before archiving</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Alert Threshold</Label>
                    <Input
                      type="number"
                      value={settings.alertThreshold}
                      onChange={(e) => handleSettingChange("alertThreshold", Number.parseInt(e.target.value))}
                      className="bg-black/50 border-orange-500/30 text-white"
                    />
                    <p className="text-xs text-gray-400">Number of events before triggering alert</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Backup Frequency</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                    >
                      <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Encryption Level</Label>
                    <Select
                      value={settings.encryptionLevel}
                      onValueChange={(value) => handleSettingChange("encryptionLevel", value)}
                    >
                      <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AES-128">AES-128</SelectItem>
                        <SelectItem value="AES-256">AES-256</SelectItem>
                        <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                        <SelectItem value="RSA-4096">RSA-4096</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Auto Archive</Label>
                      <p className="text-xs text-gray-400">Automatically archive old logs</p>
                    </div>
                    <Switch
                      checked={settings.autoArchive}
                      onCheckedChange={(checked) => handleSettingChange("autoArchive", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Real-time Monitoring</Label>
                      <p className="text-xs text-gray-400">Enable live audit log monitoring</p>
                    </div>
                    <Switch
                      checked={settings.realTimeMonitoring}
                      onCheckedChange={(checked) => handleSettingChange("realTimeMonitoring", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Access Logging</Label>
                      <p className="text-xs text-gray-400">Log all system access attempts</p>
                    </div>
                    <Switch
                      checked={settings.accessLogging}
                      onCheckedChange={(checked) => handleSettingChange("accessLogging", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Blockchain Sync</Label>
                      <p className="text-xs text-gray-400">Sync audit logs to blockchain</p>
                    </div>
                    <Switch
                      checked={settings.blockchainSync}
                      onCheckedChange={(checked) => handleSettingChange("blockchainSync", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Log Categories</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure which types of activities to log and their priority levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {logCategories.map((category) => (
                    <div key={category.id} className="border border-orange-500/20 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={category.enabled}
                              onCheckedChange={(checked) => handleCategoryToggle(category.id, checked)}
                            />
                            <div>
                              <h3 className="font-semibold text-white">{category.name}</h3>
                              <p className="text-sm text-gray-400">{category.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Badge className={getLevelColor(category.level)}>{category.level.toUpperCase()}</Badge>
                            <span>Retention: {category.retention} days</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Select
                            value={category.level}
                            onValueChange={(value) =>
                              handleCategoryLevelChange(category.id, value as LogCategory["level"])
                            }
                          >
                            <SelectTrigger className="w-32 bg-black/50 border-orange-500/30 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure how and when you receive audit alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Email Notifications</Label>
                      <p className="text-xs text-gray-400">Receive alerts via email</p>
                    </div>
                    <Switch
                      checked={settings.notificationSettings.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">SMS Notifications</Label>
                      <p className="text-xs text-gray-400">Receive critical alerts via SMS</p>
                    </div>
                    <Switch
                      checked={settings.notificationSettings.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Dashboard Notifications</Label>
                      <p className="text-xs text-gray-400">Show alerts in dashboard</p>
                    </div>
                    <Switch
                      checked={settings.notificationSettings.dashboard}
                      onCheckedChange={(checked) => handleNotificationChange("dashboard", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-300">Email Recipients</Label>
                  <Textarea
                    placeholder="Enter email addresses separated by commas"
                    className="bg-black/50 border-orange-500/30 text-white"
                    defaultValue="admin@blocksentinel.com, security@blocksentinel.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">SMS Phone Number</Label>
                  <Input placeholder="+1 (555) 123-4567" className="bg-black/50 border-orange-500/30 text-white" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Compliance
                </CardTitle>
                <CardDescription className="text-gray-400">Advanced security settings for audit logs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Hash Algorithm</Label>
                    <Select defaultValue="SHA-256">
                      <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SHA-256">SHA-256</SelectItem>
                        <SelectItem value="SHA-512">SHA-512</SelectItem>
                        <SelectItem value="Blake2b">Blake2b</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Compliance Standard</Label>
                    <Select defaultValue="SOX">
                      <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SOX">SOX</SelectItem>
                        <SelectItem value="GDPR">GDPR</SelectItem>
                        <SelectItem value="HIPAA">HIPAA</SelectItem>
                        <SelectItem value="PCI-DSS">PCI-DSS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Tamper Detection</Label>
                      <p className="text-xs text-gray-400">Detect unauthorized log modifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Digital Signatures</Label>
                      <p className="text-xs text-gray-400">Sign all audit entries</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-gray-300">Immutable Storage</Label>
                      <p className="text-xs text-gray-400">Store logs in immutable format</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
