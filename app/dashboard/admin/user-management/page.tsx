"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Shield, UserCheck, UserX, Edit, Trash2, Plus, Search, Filter, Download } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface User {
  id: string
  name: string
  email: string
  walletAddress: string
  role: "user" | "police" | "admin"
  status: "active" | "inactive" | "suspended"
  complaintsCount: number
  joinDate: string
  lastActive: string
  department?: string
  badgeNumber?: string
  permissions: string[]
}

export default function UserManagementSystem() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (!token) return
      try {
        const [usersRes, policeRes, adminsRes] = await Promise.all([
          fetch("https://blockevid3-0-bc.onrender.com/api/auth/users", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://blockevid3-0-bc.onrender.com/api/auth/police", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://blockevid3-0-bc.onrender.com/api/auth/admins", { headers: { Authorization: `Bearer ${token}` } }),
        ])
        let usersData = usersRes.ok ? await usersRes.json() : []
        let policeData = policeRes.ok ? await policeRes.json() : []
        let adminsData = adminsRes.ok ? await adminsRes.json() : []
        // Normalize to arrays
        if (!Array.isArray(usersData)) usersData = Object.values(usersData)
        if (!Array.isArray(policeData)) policeData = Object.values(policeData)
        if (!Array.isArray(adminsData)) adminsData = Object.values(adminsData)
        // Merge and deduplicate by id/email
        const allUsers = [...usersData, ...policeData, ...adminsData]
        const seen = new Set()
        const mergedUsers = allUsers.filter((u: any) => {
          const key = u._id || u.id || u.email
          if (seen.has(key)) return false
          seen.add(key)
          return true
        })
        setUsers(
          mergedUsers.map((u: any) => ({
            id: u._id || u.id || u.email,
            name: u.name || u.fullName || u.username || u.email || "",
            email: u.email || "",
            walletAddress: u.walletAddress || u.wallet || "",
            role: (u.role || (u.isAdmin ? "admin" : u.isPolice ? "police" : "user")) as User["role"],
            status: (u.status || "active") as User["status"],
            complaintsCount: u.complaintsCount || (u.complaints ? u.complaints.length : 0) || 0,
            joinDate: u.joinDate || (u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : ""),
            lastActive: u.lastActive || (u.updatedAt ? new Date(u.updatedAt).toISOString().slice(0, 16).replace("T", " ") : ""),
            department: u.department || undefined,
            badgeNumber: u.badgeNumber || undefined,
            permissions: u.permissions || [],
          }))
        )
      } catch (err) {
        // handle error
      }
    }
    fetchAllUsers()
  }, [])

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  const handleStatusChange = (userId: string, newStatus: "active" | "inactive" | "suspended") => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)))
  }

  const handleRoleChange = (userId: string, newRole: "user" | "police" | "admin") => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "police":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "user":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "suspended":
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">User Management System</h1>
            <p className="text-gray-400 text-sm sm:text-base">Comprehensive user administration and control</p>
          </div>
          <Button className="bg-orange-500/80 hover:bg-orange-600/80 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">{users.length}</div>
              <p className="text-xs text-gray-400">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {users.filter((u) => u.status === "active").length}
              </div>
              <p className="text-xs text-gray-400">85% active rate</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Police Officers</CardTitle>
              <Shield className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {users.filter((u) => u.role === "police").length}
              </div>
              <p className="text-xs text-gray-400">Verified officers</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Suspended</CardTitle>
              <UserX className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {users.filter((u) => u.status === "suspended").length}
              </div>
              <p className="text-xs text-gray-400">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Search Users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Name, email, wallet, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/50 border-orange-500/30 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Role Filter</Label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="police">Police</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Status Filter</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Actions</Label>
                <Button
                  variant="outline"
                  className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">User Directory ({filteredUsers.length})</CardTitle>
            <CardDescription className="text-gray-400">Manage user accounts, roles, and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="border border-orange-500/20 rounded-lg p-4 hover:border-orange-500/40 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-lg text-white">{user.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {user.id}
                        </Badge>
                        <Badge className={getRoleBadgeColor(user.role)}>{user.role.toUpperCase()}</Badge>
                        <Badge className={getStatusBadgeColor(user.status)}>{user.status.toUpperCase()}</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                        <div>📧 {user.email}</div>
                        <div>📅 Joined: {user.joinDate}</div>
                        <div>
                          🔗 {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                        </div>
                        <div>⏰ Last Active: {user.lastActive}</div>
                        {user.department && <div>🏢 {user.department}</div>}
                        {user.badgeNumber && <div>🎖️ {user.badgeNumber}</div>}
                        <div>📋 Complaints: {user.complaintsCount}</div>
                        <div>🔑 Permissions: {user.permissions.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No users found matching your criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-black/90 border-orange-500/30 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit User: {selectedUser?.name}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Modify user information, roles, and permissions
              </DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input defaultValue={selectedUser.name} className="bg-black/50 border-orange-500/30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={selectedUser.email} className="bg-black/50 border-orange-500/30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select defaultValue={selectedUser.role}>
                      <SelectTrigger className="bg-black/50 border-orange-500/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="police">Police</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue={selectedUser.status}>
                      <SelectTrigger className="bg-black/50 border-orange-500/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <Textarea
                    defaultValue={selectedUser.permissions.join(", ")}
                    className="bg-black/50 border-orange-500/30"
                    placeholder="Enter permissions separated by commas"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-orange-500/80 hover:bg-orange-600/80">Save Changes</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
