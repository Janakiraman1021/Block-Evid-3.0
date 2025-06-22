"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Users,
  FileText,
  Activity,
  Lock,
  Smartphone,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Globe,
  Database,
  Code,
  Palette,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ScrollAnimation } from "@/components/scroll-animations"

interface FeatureStatus {
  name: string
  status: "completed" | "in-progress" | "planned"
  description: string
  icon: any
  progress: number
}

interface SystemMetric {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  icon: any
}

export default function ReviewDashboard() {
  const [features, setFeatures] = useState<FeatureStatus[]>([])
  const [metrics, setMetrics] = useState<SystemMetric[]>([])
  const [selectedTab, setSelectedTab] = useState("overview")

  useEffect(() => {
    // Mock feature status data
    setFeatures([
      {
        name: "RBAC System",
        status: "completed",
        description: "Role-based access control with User, Police, and Admin roles",
        icon: Shield,
        progress: 100,
      },
      {
        name: "Wallet Integration",
        status: "completed",
        description: "MetaMask and injected wallet support with role detection",
        icon: Lock,
        progress: 100,
      },
      {
        name: "Dark/Light Mode",
        status: "completed",
        description: "Theme toggle with black/green dark mode and 3D animations",
        icon: Palette,
        progress: 100,
      },
      {
        name: "Complaint Management",
        status: "completed",
        description: "Full complaint lifecycle from filing to resolution",
        icon: FileText,
        progress: 100,
      },
      {
        name: "Dashboard Layouts",
        status: "completed",
        description: "Role-specific dashboards with responsive design",
        icon: Activity,
        progress: 100,
      },
      {
        name: "3D Animations",
        status: "completed",
        description: "Scroll animations, hover effects, and smooth transitions",
        icon: Zap,
        progress: 100,
      },
      {
        name: "Real-time Notifications",
        status: "planned",
        description: "Live updates for complaint status changes",
        icon: Globe,
        progress: 0,
      },
      {
        name: "File Upload System",
        status: "planned",
        description: "Evidence and document upload with IPFS integration",
        icon: Database,
        progress: 0,
      },
      {
        name: "Blockchain Integration",
        status: "planned",
        description: "Smart contracts for complaint verification",
        icon: Code,
        progress: 0,
      },
    ])

    setMetrics([
      {
        label: "Total Users",
        value: "1,234",
        change: "+12%",
        trend: "up",
        icon: Users,
      },
      {
        label: "Active Complaints",
        value: "89",
        change: "+5%",
        trend: "up",
        icon: FileText,
      },
      {
        label: "Resolution Rate",
        value: "94%",
        change: "+2%",
        trend: "up",
        icon: CheckCircle,
      },
      {
        label: "Avg Response Time",
        value: "2.4h",
        change: "-15%",
        trend: "down",
        icon: Clock,
      },
      {
        label: "System Uptime",
        value: "99.9%",
        change: "0%",
        trend: "stable",
        icon: Activity,
      },
      {
        label: "Security Score",
        value: "A+",
        change: "0%",
        trend: "stable",
        icon: Shield,
      },
    ])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 dark:text-green-400"
      case "down":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const completedFeatures = features.filter((f) => f.status === "completed").length
  const totalFeatures = features.length
  const completionPercentage = Math.round((completedFeatures / totalFeatures) * 100)

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">BlockEvid 3.0 Review Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive overview of all implemented features, system metrics, and development progress
            </p>
          </div>
        </ScrollAnimation>

        {/* Progress Overview */}
        <ScrollAnimation animation="scaleIn" delay={200}>
          <Card className="glass-effect glow-effect card-3d">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Development Progress
              </CardTitle>
              <CardDescription>Overall completion status of BlockEvid 3.0 features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">{completionPercentage}%</div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {completedFeatures} of {totalFeatures} features completed
                  </p>
                </div>
                <Progress value={completionPercentage} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {features.filter((f) => f.status === "completed").length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {features.filter((f) => f.status === "in-progress").length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {features.filter((f) => f.status === "planned").length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Planned</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>

        {/* System Metrics */}
        <ScrollAnimation animation="fadeInUp" delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <ScrollAnimation key={metric.label} animation="fadeInUp" delay={400 + index * 100}>
                <Card className="card-3d card-3d-dark hover:scale-105 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className={`text-xs ${getTrendColor(metric.trend)}`}>{metric.change} from last month</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Main Content Tabs */}
        <ScrollAnimation animation="fadeInUp" delay={500}>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="roles">Role System</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-green-400" />
                      Security Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Wallet Authentication</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Role-Based Access Control</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Blockchain Integration</span>
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>IPFS Evidence Storage</span>
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-purple-600 dark:text-green-400" />
                      User Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Responsive Design</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Dark/Light Mode</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>3D Animations</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Real-time Updates</span>
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <ScrollAnimation key={feature.name} animation="fadeInLeft" delay={index * 100}>
                    <Card className="card-3d">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <feature.icon className="h-6 w-6 text-blue-600 dark:text-green-400" />
                            <div>
                              <h3 className="font-semibold text-lg">{feature.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(feature.status)}>
                            {feature.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{feature.progress}%</span>
                          </div>
                          <Progress value={feature.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="roles" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ScrollAnimation animation="fadeInUp">
                  <Card className="glass-effect card-3d">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        User Role
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm space-y-2">
                        <div>✓ File complaints</div>
                        <div>✓ Track complaint status</div>
                        <div>✓ View own evidence</div>
                        <div>✓ Wallet authentication</div>
                        <div>✓ Mobile responsive</div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={200}>
                  <Card className="glass-effect card-3d">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-green-400" />
                        Police Role
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm space-y-2">
                        <div>✓ Verify complaints</div>
                        <div>✓ Upload evidence</div>
                        <div>✓ Generate FIR</div>
                        <div>✓ Set complaint levels</div>
                        <div>✓ View all complaints</div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={400}>
                  <Card className="glass-effect card-3d">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-red-600 dark:text-green-400" />
                        Admin Role
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm space-y-2">
                        <div>✓ User management</div>
                        <div>✓ System audit logs</div>
                        <div>✓ Role promotions</div>
                        <div>✓ Flag complaints</div>
                        <div>✓ System overview</div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Technology Stack</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold mb-2">Frontend</div>
                        <div>• Next.js 14</div>
                        <div>• React 18</div>
                        <div>• TypeScript</div>
                        <div>• Tailwind CSS</div>
                      </div>
                      <div>
                        <div className="font-semibold mb-2">Web3</div>
                        <div>• Wagmi v2</div>
                        <div>• Viem</div>
                        <div>• MetaMask</div>
                        <div>• React Query</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>UI Components</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold mb-2">Design System</div>
                        <div>• Shadcn/ui</div>
                        <div>• Radix UI</div>
                        <div>• Lucide Icons</div>
                        <div>• Next Themes</div>
                      </div>
                      <div>
                        <div className="font-semibold mb-2">Animations</div>
                        <div>• CSS Transitions</div>
                        <div>• Intersection Observer</div>
                        <div>• 3D Transforms</div>
                        <div>• Scroll Effects</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollAnimation>

        {/* Quick Actions */}
        <ScrollAnimation animation="fadeInUp" delay={600}>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Test different aspects of the BlockEvid 3.0 system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="card-3d" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  User Dashboard
                </Button>
                <Button className="card-3d" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Police Dashboard
                </Button>
                <Button className="card-3d" variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Button>
                <Button className="card-3d" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  File Complaint
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </DashboardLayout>
  )
}
