"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Calendar, Shield, Key, Bell, Save, Edit3, Wallet } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  walletAddress: string
  complaintsCount: number
  resolvedCount: number
  avatar: string
}

export default function UserProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    // Fetch user profile from backend
    const fetchProfile = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched user profile:", data);
          // Map backend data to UserProfile structure
          const userProfile: UserProfile = {
            id: data._id,
            name: data.name,
            email: data.email,
            phone: data.phone || "",
            address: data.address || "",
            joinDate: data.joinDate || "",
            walletAddress: data.walletAddress || "",
            complaintsCount: data.complaintsCount || 0,
            resolvedCount: data.resolvedCount || 0,
            avatar: "/placeholder.svg?height=100&width=100",
          };
          setProfile(userProfile);
          setFormData({
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
            address: userProfile.address,
          });
        }
      } catch (err) {
        // handle error
      }
    };
    fetchProfile();
  }, [])

  const handleSave = () => {
    if (profile) {
      setProfile({
        ...profile,
        ...formData,
      })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
      })
    }
    setIsEditing(false)
  }

  if (!profile) {
    return (
      <DashboardLayout role="user">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-[#f5f5f5]">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Profile Settings</h1>
            <p className="text-[#f5f5f5]/70">Manage your account information and preferences</p>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 neon-glow"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="futuristic-border bg-black/40 energy-pulse">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24 border-2 border-orange-500/50 neon-glow">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="bg-orange-500/20 text-[#f5f5f5] text-xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-[#f5f5f5]">{profile.name}</CardTitle>
                <CardDescription className="text-[#f5f5f5]/70">{profile.email}</CardDescription>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mt-2">USER</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-500">{profile.complaintsCount}</div>
                    <div className="text-xs text-[#f5f5f5]/60">Total Complaints</div>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="text-2xl font-bold text-amber-500">{profile.resolvedCount}</div>
                    <div className="text-xs text-[#f5f5f5]/60">Resolved</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#f5f5f5]/70">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#f5f5f5]/70">
                    <Wallet className="h-4 w-4" />
                    <span className="font-mono text-xs">
                      {profile.walletAddress.slice(0, 6)}...{profile.walletAddress.slice(-4)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="bg-black/60 border border-orange-500/20">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-[#f5f5f5]"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-[#f5f5f5]"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-[#f5f5f5]"
                >
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card className="futuristic-border bg-black/40">
                  <CardHeader>
                    <CardTitle className="text-[#f5f5f5]">Personal Information</CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70">
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#f5f5f5]">
                          Full Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-[#f5f5f5]/50" />
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 bg-black/60 border-orange-500/30 text-[#f5f5f5] disabled:opacity-60"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#f5f5f5]">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-[#f5f5f5]/50" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 bg-black/60 border-orange-500/30 text-[#f5f5f5] disabled:opacity-60"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#f5f5f5]">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-[#f5f5f5]/50" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 bg-black/60 border-orange-500/30 text-[#f5f5f5] disabled:opacity-60"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wallet" className="text-[#f5f5f5]">
                          Wallet Address
                        </Label>
                        <div className="relative">
                          <Wallet className="absolute left-3 top-3 h-4 w-4 text-[#f5f5f5]/50" />
                          <Input
                            id="wallet"
                            value={profile.walletAddress}
                            disabled
                            className="pl-10 bg-black/60 border-orange-500/30 text-[#f5f5f5] opacity-60 font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-[#f5f5f5]">
                        Address
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#f5f5f5]/50" />
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 bg-black/60 border-orange-500/30 text-[#f5f5f5] disabled:opacity-60 min-h-[80px]"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card className="futuristic-border bg-black/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#f5f5f5]">
                      <Shield className="h-5 w-5 text-orange-500" />
                      Security Settings
                    </CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70">
                      Manage your account security and authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="flex items-center gap-3">
                          <Key className="h-5 w-5 text-orange-500" />
                          <div>
                            <h3 className="font-medium text-[#f5f5f5]">Password</h3>
                            <p className="text-sm text-[#f5f5f5]/60">Last changed 30 days ago</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20"
                        >
                          Change Password
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-center gap-3">
                          <Wallet className="h-5 w-5 text-amber-500" />
                          <div>
                            <h3 className="font-medium text-[#f5f5f5]">Wallet Connection</h3>
                            <p className="text-sm text-[#f5f5f5]/60">Connected and verified</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Connected</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <Card className="futuristic-border bg-black/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#f5f5f5]">
                      <Bell className="h-5 w-5 text-amber-500" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription className="text-[#f5f5f5]/70">
                      Choose how you want to be notified about updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div>
                          <h3 className="font-medium text-[#f5f5f5]">Email Notifications</h3>
                          <p className="text-sm text-[#f5f5f5]/60">Receive updates about your complaints via email</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-500/30 text-[#f5f5f5] hover:bg-orange-500/20"
                        >
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <div>
                          <h3 className="font-medium text-[#f5f5f5]">SMS Notifications</h3>
                          <p className="text-sm text-[#f5f5f5]/60">Get instant updates via SMS</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-500/30 text-[#f5f5f5] hover:bg-amber-500/20"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
