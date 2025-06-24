"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, FileText, Users, Settings, Bell, Menu, LogOut, User, Plus, Upload, Activity, Eye, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { FuturisticLogo } from "@/components/futuristic-logo"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "user" | "police" | "admin"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Fetch real user info from backend
    const fetchUserInfo = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (!token) return
      try {
        const res = await fetch("https://blockevid3-0-bc.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setUserInfo({
            name: data.name,
            email: data.email,
            avatar: "/placeholder.svg?height=32&width=32",
            badge: data.badgeNumber || undefined,
          })
        }
      } catch (err) {
        // handle error
      }
    }
    fetchUserInfo()
  }, [role])

  const getNavigationItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: `/dashboard/${role}`,
        icon: Home,
        active: pathname === `/dashboard/${role}`,
      },
    ]

    switch (role) {
      case "user":
        return [
          ...baseItems,
          {
            title: "File Complaint",
            href: `/dashboard/user/new-complaint`,
            icon: Plus,
            active: pathname.includes("/new-complaint"),
          },
          {
            title: "My Complaints",
            href: `/dashboard/user/complaints`,
            icon: FileText,
            active: pathname.includes("/complaints") && !pathname.includes("/new-complaint"),
          },
          {
            title: "Profile",
            href: `/dashboard/user/profile`,
            icon: User,
            active: pathname.includes("/profile"),
          },
        ]

      case "police":
        return [
          ...baseItems,
          {
            title: "Verify Complaints",
            href: `/dashboard/police/verify`,
            icon: Eye,
            active: pathname.includes("/verify"),
          },
          {
            title: "Evidence Upload",
            href: `/dashboard/police/evidence-upload`,
            icon: Upload,
            active: pathname.includes("/evidence"),
          },
          {
            title: "FIR Management",
            href: `/dashboard/police/fir-management`,
            icon: FileText,
            active: pathname.includes("/fir"),
          },
          {
            title: "Profile",
            href: `/dashboard/police/profile`,
            icon: User,
            active: pathname.includes("/profile"),
          },
        ]

      case "admin":
        return [
          ...baseItems,
          {
            title: "User Management",
            href: `/dashboard/admin/user-management`,
            icon: Users,
            active: pathname.includes("/user-management"),
          },
          {
            title: "Assign Officer",
            href: `/dashboard/admin/assign-officer`,
            icon: Shield,
            active: pathname.includes("/assign-officer"),
          },
          {
            title: "Audit Settings",
            href: `/dashboard/admin/audit-settings`,
            icon: Activity,
            active: pathname.includes("/audit"),
          },
          {
            title: "Settings",
            href: `/dashboard/admin/settings`,
            icon: Settings,
            active: pathname.includes("/settings"),
          },
        ]

      default:
        return baseItems
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("walletAddress")
    router.push("/auth/login")
  }

  const getRoleBadgeColor = () => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "police":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "user":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const navigationItems = getNavigationItems()

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-orange-500/20">
      {/* Logo */}
      <div className="flex items-center space-x-3 p-6 border-b border-orange-500/20">
        <FuturisticLogo size="lg" className="neon-glow" />
        <span className="text-xl font-bold gradient-text">BlockEvid 3.0</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-300 ${
                item.active
                  ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-[#f5f5f5] border border-orange-500/30 neon-glow"
                  : "text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:bg-orange-500/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.title}
            </Button>
          </Link>
        ))}
        
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-orange-500/20">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-10 w-10 border border-orange-500/30">
            <AvatarImage src={userInfo?.avatar || "/placeholder.svg"} alt={userInfo?.name} />
            <AvatarFallback className="bg-orange-500/20 text-[#f5f5f5]">
              {userInfo?.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#f5f5f5] truncate">{userInfo?.name}</p>
            <p className="text-xs text-[#f5f5f5]/60 truncate">{userInfo?.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge className={getRoleBadgeColor()}>{role.toUpperCase()}</Badge>
          {role === "police" && userInfo?.badge && (
            <Badge variant="outline" className="text-xs border-orange-500/30 text-[#f5f5f5]/70">
              {userInfo.badge}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-orange-500/20">
          <div className="flex items-center space-x-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#f5f5f5]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-[#0a0a0a] border-orange-500/20">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <FuturisticLogo size="md" className="text-orange-500/80" />
            <span className="text-lg font-bold gradient-text">BlockEvid 3.0</span>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-[#f5f5f5]">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 border border-orange-500/30">
                    <AvatarImage src={userInfo?.avatar || "/placeholder.svg"} alt={userInfo?.name} />
                    <AvatarFallback className="bg-orange-500/20 text-[#f5f5f5]">
                      {userInfo?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#0a0a0a] border-orange-500/20" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-[#f5f5f5]">{userInfo?.name}</p>
                    <p className="text-xs leading-none text-[#f5f5f5]/60">{userInfo?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-orange-500/20" />
                <DropdownMenuItem onClick={handleLogout} className="text-[#f5f5f5] hover:bg-orange-500/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <div className="flex flex-col">
          {/* Desktop Header */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:p-6 lg:bg-[#0a0a0a]/95 lg:backdrop-blur-md lg:border-b lg:border-orange-500/20">
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="text-[#f5f5f5]">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-orange-500/30">
                      <AvatarImage src={userInfo?.avatar || "/placeholder.svg"} alt={userInfo?.name} />
                      <AvatarFallback className="bg-orange-500/20 text-[#f5f5f5]">
                        {userInfo?.name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#0a0a0a] border-orange-500/20" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-[#f5f5f5]">{userInfo?.name}</p>
                      <p className="text-xs leading-none text-[#f5f5f5]/60">{userInfo?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-orange-500/20" />
                  <DropdownMenuItem className="text-[#f5f5f5] hover:bg-orange-500/10">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#f5f5f5] hover:bg-orange-500/10">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-orange-500/20" />
                  <DropdownMenuItem onClick={handleLogout} className="text-[#f5f5f5] hover:bg-orange-500/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-6 bg-[#0a0a0a]">{children}</main>
        </div>
      </div>
    </div>
  )
}

// Add this at the bottom of the file, before export
function AssignOfficerShortcut() {
  const [open, setOpen] = useState(false)
  const [complaintId, setComplaintId] = useState("")
  const [policeId, setPoliceId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleAssign = async () => {
    setLoading(true)
    setResult(null)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      const res = await fetch("https://blockevid3-0-bc.onrender.com/api/complaints/assign-officer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ complaintId, policeId }),
      })
      if (res.ok) {
        setResult("Officer assigned successfully!")
        setComplaintId("")
        setPoliceId("")
      } else {
        const err = await res.json()
        setResult(err.message || "Failed to assign officer.")
      }
    } catch (e) {
      setResult("Error assigning officer.")
    }
    setLoading(false)
  }

  // return (
  //   <Dialog open={open} onOpenChange={setOpen}>
  //     <DialogTrigger asChild>
  //       <Button variant="outline" className="w-full justify-start text-orange-400 border-orange-500/40 hover:bg-orange-900/20">
  //         <Shield className="h-4 w-4 mr-3" />Assign Officer
  //       </Button>
  //     </DialogTrigger>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>Assign Officer to Complaint</DialogTitle>
  //         <DialogDescription>Enter Complaint ID and Police ID to assign an officer to a case.</DialogDescription>
  //       </DialogHeader>
  //       <div className="space-y-4">
  //         <Input
  //           placeholder="Complaint ID"
  //           value={complaintId}
  //           onChange={e => setComplaintId(e.target.value)}
  //           className="bg-black text-orange-400 border-orange-500/40"
  //         />
  //         <Input
  //           placeholder="Police ID"
  //           value={policeId}
  //           onChange={e => setPoliceId(e.target.value)}
  //           className="bg-black text-orange-400 border-orange-500/40"
  //         />
  //         <Button onClick={handleAssign} disabled={loading || !complaintId || !policeId} className="w-full bg-orange-500 text-black hover:bg-orange-600">
  //           {loading ? "Assigning..." : "Assign Officer"}
  //         </Button>
  //         {result && <div className={`text-sm ${result.includes("success") ? "text-green-400" : "text-red-400"}`}>{result}</div>}
  //       </div>
  //       <DialogFooter>
  //         <DialogClose asChild>
  //           <Button variant="ghost">Close</Button>
  //         </DialogClose>
  //       </DialogFooter>
  //     </DialogContent>
  //   </Dialog>
  // )
}
