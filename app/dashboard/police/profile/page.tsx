"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Edit, Save } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface OfficerProfile {
  id: string
  name: string
  email: string
  phone: string
  badgeNumber: string
  rank: string
  department: string
  station: string
  joinDate: string
  walletAddress: string
  avatar?: string
  bio: string
  specializations: string[]
  certifications: string[]
  stats: {
    complaintsVerified: number
    evidenceUploaded: number
    firsCreated: number
    casesResolved: number
  }
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    dashboardAlerts: boolean
    autoAssignment: boolean
  }
  security: {
    twoFactorEnabled: boolean
    lastPasswordChange: string
    loginSessions: number
  }
}

export default function PoliceProfile() {
  const [profile, setProfile] = useState<OfficerProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<OfficerProfile | null>(null)

  useEffect(() => {
    // Fetch officer profile from backend
    const fetchProfile = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) return;
      try {
        const res = await fetch("https://blockevid3-0-bc.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched officer profile:", data);
          // Map backend data to OfficerProfile structure (fill with defaults for missing fields)
          const officerProfile: OfficerProfile = {
            id: data._id,
            name: data.name,
            email: data.email,
            phone: data.phone || "",
            badgeNumber: data.badgeNumber || "-",
            rank: data.rank || "-",
            department: data.department || "-",
            station: data.station || "-",
            joinDate: data.joinDate || "",
            walletAddress: data.walletAddress || "",
            avatar: "/placeholder.svg",
            bio: data.bio || "",
            specializations: data.specializations || [],
            certifications: data.certifications || [],
            stats: data.stats || { complaintsVerified: 0, evidenceUploaded: 0, firsCreated: 0, casesResolved: 0 },
            preferences: data.preferences || { emailNotifications: false, smsNotifications: false, dashboardAlerts: false, autoAssignment: false },
            security: data.security || { twoFactorEnabled: false, lastPasswordChange: "", loginSessions: 0 },
          };
          setProfile(officerProfile);
          setEditedProfile(officerProfile);
        }
      } catch (err) {
        // handle error
      }
    };
    fetchProfile();
  }, []);

  const handleSave = () => {
    if (editedProfile) {
      setProfile(editedProfile)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const updatePreference = (key: keyof OfficerProfile["preferences"], value: boolean) => {
    setEditedProfile((prev) => prev ? ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }) : prev)
  }

  if (!profile || !editedProfile) return null; // or a loading spinner

  return (
    <DashboardLayout role="police">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Officer Profile</h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage your profile information and preferences</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-orange-500/80 hover:bg-orange-600/80">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-orange-500/80 hover:bg-orange-600/80">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-orange-500/30">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="bg-orange-500/20 text-orange-400 text-xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{profile.rank}</Badge>
                  <Badge variant="outline" className="text-orange-400 border-orange-500/30">
                    {profile.badgeNumber}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                  <div>🏢 {profile.department}</div>
                  <div>📍 {profile.station}</div>
                  <div>📧 {profile.email}</div>
                  <div>📞 {profile.phone}</div>
                  <div>📅 Joined: {profile.joinDate}</div>
                  <div>
                    🔗 {profile.walletAddress.slice(0, 6)}...{profile.walletAddress.slice(-4)}
                  </div>
                </div>

                <p className="text-gray-300 text-sm max-w-2xl">{profile.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="glass-effect">
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{profile.stats.complaintsVerified}</div>
                <p className="text-xs text-gray-400">Complaints Verified</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{profile.stats.evidenceUploaded}</div>
                <p className="text-xs text-gray-400">Evidence Uploaded</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{profile.stats.firsCreated}</div>
                <p className="text-xs text-gray-400">FIRs Created</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{profile.stats.casesResolved}</div>
                <p className="text-xs text-gray-400">Cases Resolved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="glass-effect">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  {isEditing && editedProfile ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile((prev) => prev ? { ...prev, name: e.target.value } : prev)}
                      className="w-full mt-1 p-2 bg-black/50 border border-orange-500/30 rounded text-white"
                    />
                  ) : (
                    <p className="text-white">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  {isEditing && editedProfile ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile((prev) => prev ? { ...prev, email: e.target.value } : prev)}
                      className="w-full mt-1 p-2 bg-black/50 border border-orange-500/30 rounded text-white"
                    />
                  ) : (
                    <p className="text-white">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  {isEditing && editedProfile ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile((prev) => prev ? { ...prev, phone: e.target.value } : prev)}
                      className="w-full mt-1 p-2 bg-black/50 border border-orange-500/30 rounded text-white"
                    />
                  ) : (
                    <p className="text-white">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400">Bio</label>
                  {isEditing && editedProfile ? (
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile((prev) => prev ? { ...prev, bio: e.target.value } : prev)}
                      className="w-full mt-1 p-2 bg-black/50 border border-orange-500/30 rounded text-white"
                      rows={3}
                    />
                  ) : (
                    <p className="text-white">{profile.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="glass-effect">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Professional Information</h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Badge Number</label>
                  <p className="text-white">{profile.badgeNumber}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Rank</label>
                  <p className="text-white">{profile.rank}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Department</label>
                  <p className="text-white">{profile.department}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Station</label>
                  <p className="text-white">{profile.station}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Join Date</label>
                  <p className="text-white">{profile.joinDate}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Wallet Address</label>
                  <p className="text-white font-mono text-sm">{profile.walletAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card className="glass-effect">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {profile.specializations.map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-orange-400 border-orange-500/30">
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="glass-effect">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
              <div className="space-y-2">
                {profile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Preferences */}
          <Card className="glass-effect">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Email Notifications</p>
                    <p className="text-xs text-gray-400">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        isEditing
                          ? editedProfile.preferences.emailNotifications
                          : profile.preferences.emailNotifications
                      }
                      onChange={(e) => isEditing && updatePreference("emailNotifications", e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">SMS Notifications</p>
                    <p className="text-xs text-gray-400">Receive critical alerts via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        isEditing ? editedProfile.preferences.smsNotifications : profile.preferences.smsNotifications
                      }
                      onChange={(e) => isEditing && updatePreference("smsNotifications", e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Dashboard Alerts</p>
                    <p className="text-xs text-gray-400">Show alerts in dashboard</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        isEditing ? editedProfile.preferences.dashboardAlerts : profile.preferences.dashboardAlerts
                      }
                      onChange={(e) => isEditing && updatePreference("dashboardAlerts", e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Auto Assignment</p>
                    <p className="text-xs text-gray-400">Automatically assign new complaints</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        isEditing ? editedProfile.preferences.autoAssignment : profile.preferences.autoAssignment
                      }
                      onChange={(e) => isEditing && updatePreference("autoAssignment", e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="glass-effect">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-400">
                      {profile.security.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                  <Badge
                    className={
                      profile.security.twoFactorEnabled
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  >
                    {profile.security.twoFactorEnabled ? "ON" : "OFF"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Last Password Change</p>
                    <p className="text-xs text-gray-400">{profile.security.lastPasswordChange}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                  >
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Active Sessions</p>
                    <p className="text-xs text-gray-400">{profile.security.loginSessions} active sessions</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    Revoke All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
