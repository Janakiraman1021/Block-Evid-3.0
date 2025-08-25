"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Shield, Activity, Eye, UserCheck, UserX, Archive, Flag, Layers } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface User {
  id: string
  name: string
  email: string
  walletAddress: string
  role: "user" | "police" | "admin"
  status: "active" | "inactive"
  complaintsCount: number
  joinDate: string
  permissions?: string[]
  accessLevel?: "basic" | "intermediate" | "advanced" | "full"
}

interface AuditLog {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
  hash?: string
  walletAddress?: string
}

interface AvalancheTransaction {
  chainId: string
  ecosystems: string[]
  blockNumber: number
  txIndex: number
  timestamp: string
  from: {
    id: string
    isContract: boolean
  }
  to: {
    id: string
    isContract: boolean
  }
  blockHash: string
  txHash: string
  value: string
  gasLimit?: string
  gasUsed?: string
  gasPrice: string
  burnedFees: string
  methodId: string
  type: string
  status: boolean
}

interface Complaint {
  id: string
  title: string
  description: string
  status: "pending" | "verified" | "rejected" | "evidence_added" | "fir_attached" | "resolved"
  type: string
  date: string
  location: string
  userId: string
  level?: "local" | "district" | "state" | "national"
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [avalancheTransactions, setAvalancheTransactions] = useState<AvalancheTransaction[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)

  useEffect(() => {
    // Fetch user details from backend
    const fetchUserAndComplaints = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (!token) return
      try {
        const res = await fetch("https://blockevid3-0-bc.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        }
      } catch (err) {
        // handle error
      }
      
      // Fetch Avalanche transactions
      fetchAvalancheTransactions()
      // Fetch all users, police, and admins
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
          }))
        )
      } catch (err) {
        // handle error
      }
      // Fetch all complaints for admin
      try {
        const complaintsRes = await fetch("https://blockevid3-0-bc.onrender.com/api/complaints/admin-view-comp", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (complaintsRes.ok) {
          let complaintsData = await complaintsRes.json()
          if (!Array.isArray(complaintsData)) {
            complaintsData = Object.values(complaintsData)
          }
          // Flatten if it's an array of arrays
          if (Array.isArray(complaintsData) && Array.isArray(complaintsData[0])) {
            complaintsData = complaintsData.flat()
          }
          console.log("Admin fetched complaints (flattened):", complaintsData)
          setComplaints(
            complaintsData.map((c: any) => ({
              id: c._id || c.id || c.complaintId || "",
              title: c.title || c.subject || "",
              description: c.description || "",
              status: (c.status || "pending").toLowerCase().replace(/\s/g, "_"),
              type: c.type || c.category || "",
              date: c.date || (c.createdAt ? new Date(c.createdAt).toISOString().slice(0, 10) : ""),
              location: c.location || "",
              userId: c.createdBy?._id || c.userId || c.createdBy || "",
              level: c.level || undefined,
              tags: c.tags || [],
              ipfsHash: c.ipfsHash || "",
              assignedTo: c.assignedTo || null,
              createdBy: c.createdBy || null,
              complaintId: c.complaintId || c._id || c.id || "",
              createdAt: c.createdAt || "",
              updatedAt: c.updatedAt || "",
            }))
          )
        }
      } catch (err) {
        // handle error
      }
    }
    fetchUserAndComplaints()

  }, [])
  
  const fetchAvalancheTransactions = async () => {
    setIsLoadingTransactions(true)
    try {
      const response = await fetch(
        "https://cdn.testnet.routescan.io/api/evm/all/transactions?ecosystem=avalanche&fromAddresses=0x8fB5F72B24f03362EAFed7e62BAEB0D052bD56cE&toAddresses=0x8fB5F72B24f03362EAFed7e62BAEB0D052bD56cE&sort=desc&limit=50&count=true"
      )
      if (response.ok) {
        const data = await response.json()
        if (data && data.items && Array.isArray(data.items)) {
          setAvalancheTransactions(data.items)
        }
      }
    } catch (error) {
      console.error("Error fetching Avalanche transactions:", error)
    } finally {
      setIsLoadingTransactions(false)
    }
  }

  const handlePromoteToPolice = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { 
      ...u, 
      role: "police" as const,
      accessLevel: "intermediate" as const,
      permissions: [
        "view_all_complaints",
        "upload_evidence",
        "view_evidence",
        "upload_fir",
        "set_complaint_level",
        "update_complaint_status",
        "view_blockchain_hashes",
        "connect_wallet",
      ]
    } : u)))

    // Add audit log
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      action: "User Role Updated",
      user: "Admin Wilson",
      timestamp: new Date().toLocaleString(),
      details: `Promoted ${userId} to Police role with intermediate access level`,
      walletAddress: "0x1234567890123456789012345678901234567890",
    }
    setAuditLogs([newLog, ...auditLogs])
  }

  const handlePromoteToAdmin = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { 
      ...u, 
      role: "admin" as const,
      accessLevel: "full" as const,
      permissions: [
        "view_own_complaints",
        "view_all_complaints",
        "view_evidence",
        "update_complaint_status",
        "promote_users",
        "view_audit_logs",
        "view_blockchain_hashes",
        "access_admin_panel",
        "manage_roles",
        "flag_complaints",
        "connect_wallet",
      ]
    } : u)))

    // Add audit log
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      action: "User Role Updated",
      user: "Admin Wilson",
      timestamp: new Date().toLocaleString(),
      details: `Promoted ${userId} to Admin role with full access level`,
      walletAddress: "0x1234567890123456789012345678901234567890",
    }
    setAuditLogs([newLog, ...auditLogs])
  }

  const handleDeactivateUser = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: "inactive" as const, permissions: [] } : u)))

    // Add audit log
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      action: "User Deactivated",
      user: "Admin Wilson",
      timestamp: new Date().toLocaleString(),
      details: `Deactivated user ${userId} and revoked all permissions`,
      walletAddress: "0x1234567890123456789012345678901234567890",
    }
    setAuditLogs([newLog, ...auditLogs])
  }
  
  const handleUpdateAccessLevel = (userId: string, accessLevel: User["accessLevel"]) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, accessLevel } : u)))
    
    // Add audit log
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      action: "Access Level Updated",
      user: "Admin Wilson",
      timestamp: new Date().toLocaleString(),
      details: `Updated access level for ${userId} to ${accessLevel}`,
      walletAddress: "0x1234567890123456789012345678901234567890",
    }
    setAuditLogs([newLog, ...auditLogs])
  }
  
  const handleTogglePermission = (userId: string, permission: string) => {
    setUsers(users.map((u) => {
      if (u.id === userId) {
        const currentPermissions = u.permissions || [];
        const newPermissions = currentPermissions.includes(permission)
          ? currentPermissions.filter(p => p !== permission)
          : [...currentPermissions, permission];
          
        return { ...u, permissions: newPermissions };
      }
      return u;
    }))
    
    // Add audit log
    const user = users.find(u => u.id === userId);
    const hasPermission = user?.permissions?.includes(permission);
    const action = hasPermission ? "removed from" : "added to";
    
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      action: "Permission Updated",
      user: "Admin Wilson",
      timestamp: new Date().toLocaleString(),
      details: `Permission '${permission}' ${action} user ${userId}`,
      walletAddress: "0x1234567890123456789012345678901234567890",
    }
    setAuditLogs([newLog, ...auditLogs])
  }

  const handleFlagComplaint = (complaintId: string) => {
    // Add audit log
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      action: "Complaint Flagged",
      user: "Admin Wilson",
      timestamp: new Date().toLocaleString(),
      details: `Flagged complaint ${complaintId} for review`,
      walletAddress: "0x1234567890123456789012345678901234567890",
    }
    setAuditLogs([newLog, ...auditLogs])
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "police":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "verified":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "evidence_added":
        return "bg-blue-100 text-blue-800"
      case "fir_attached":
        return "bg-purple-100 text-purple-800"
      case "resolved":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System overview, user management, and comprehensive audit logs</p>
          {user && (
            <div className="mt-2 text-sm text-gray-700">
              <span className="font-semibold">Logged in as:</span> {user.name} ({user.email}) -{" "}
              <span className="capitalize">{user.role}</span>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Police Officers</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.role === "police").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
              <Eye className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Actions</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auditLogs.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management ({users.length})</TabsTrigger>
            <TabsTrigger value="complaints">All Complaints ({complaints.length})</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs ({auditLogs.length})</TabsTrigger>
            <TabsTrigger value="avalanche">Avalanche Transactions ({avalancheTransactions.length})</TabsTrigger>
            <TabsTrigger value="permissions">Permission Management</TabsTrigger>
            <TabsTrigger asChild value="audit-settings">
              <Link href="/dashboard/admin/audit-settings">Audit Settings</Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user roles, permissions, and system access</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Input
                    placeholder="Search users by name, email, or wallet address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="user">Users</SelectItem>
                      <SelectItem value="police">Police</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users List */}
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <Badge variant="secondary">{user.id}</Badge>
                            <Badge className={getRoleBadgeColor(user.role)}>{user.role.toUpperCase()}</Badge>
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                              {user.status.toUpperCase()}
                            </Badge>
                            {user.accessLevel && (
                              <Badge variant="outline" className="border-indigo-500 text-indigo-700">
                                {user.accessLevel.toUpperCase()} ACCESS
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{user.email}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>📅 Joined: {user.joinDate}</span>
                            <span>📋 Complaints: {user.complaintsCount}</span>
                            <span>
                              🔗 {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                            </span>
                          </div>
                          
                          {/* Permissions Section */}
                          {user.permissions && user.permissions.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-semibold text-gray-500 mb-1">PERMISSIONS:</p>
                              <div className="flex flex-wrap gap-1">
                                {user.permissions.map(permission => (
                                  <Badge 
                                    key={permission} 
                                    variant="outline" 
                                    className="text-xs py-0 h-5 bg-gray-50"
                                    onClick={() => handleTogglePermission(user.id, permission)}
                                  >
                                    {permission.replace(/_/g, ' ')}
                                    <button className="ml-1 text-gray-400 hover:text-red-500" aria-label="Remove permission">
                                      ×
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* User Actions */}
                        <div className="flex flex-col gap-2 min-w-[200px]">
                          <div className="flex gap-2">
                            <Select 
                              onValueChange={(value) => handleUpdateAccessLevel(user.id, value as User["accessLevel"])}
                              defaultValue={user.accessLevel || "basic"}
                            >
                              <SelectTrigger className="w-full h-8 text-xs">
                                <SelectValue placeholder="Access Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="basic">Basic Access</SelectItem>
                                <SelectItem value="intermediate">Intermediate Access</SelectItem>
                                <SelectItem value="advanced">Advanced Access</SelectItem>
                                <SelectItem value="full">Full Access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex gap-2">
                            {user.role !== "police" && (
                              <Button onClick={() => handlePromoteToPolice(user.id)} size="sm" variant="outline" className="text-xs h-8 flex-1">
                                Promote to Police
                              </Button>
                            )}
                            {user.role !== "admin" && (
                              <Button onClick={() => handlePromoteToAdmin(user.id)} size="sm" variant="outline" className="text-xs h-8 flex-1">
                                Promote to Admin
                              </Button>
                            )}
                          </div>
                          
                          <Button 
                            onClick={() => handleDeactivateUser(user.id)} 
                            size="sm" 
                            variant={user.status === "active" ? "destructive" : "outline"}
                            className="text-xs h-8"
                          >
                            {user.status === "active" ? "Deactivate User" : "Activate User"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Complaints Overview</CardTitle>
                <CardDescription>System-wide complaint monitoring and management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{complaint.title}</h3>
                            <Badge variant="secondary">{complaint.id}</Badge>
                            <Badge className={getStatusBadgeColor(complaint.status)}>
                              {complaint.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{complaint.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>📍 {complaint.location}</span>
                            <span>📅 {complaint.date}</span>
                            <span>🏷️ {complaint.type}</span>
                            <span>👤 {(() => {
                              const cb: any = (complaint as any).createdBy;
                              if (cb && typeof cb === "object" && "name" in cb) return cb.name;
                              if (typeof cb === "string") return cb;
                              return complaint.userId || "-";
                            })()}</span>
                            {complaint.level && <span>🎯 {complaint.level.toUpperCase()}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/dashboard/admin/complaints/${encodeURIComponent((complaint as any).complaintId || complaint.id)}`} prefetch={false}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          <Button onClick={() => handleFlagComplaint(complaint.id)} size="sm" variant="outline">
                            <Flag className="h-4 w-4 mr-2" />
                            Flag
                          </Button>
                          <Button size="sm" variant="outline">
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>Complete system activity log with blockchain verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{log.action}</h3>
                            <Badge variant="secondary">{log.id}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{log.details}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>👤 {log.user}</span>
                            <span>🕒 {log.timestamp}</span>
                            {log.walletAddress && (
                              <span>
                                🔗 {log.walletAddress.slice(0, 6)}...{log.walletAddress.slice(-4)}
                              </span>
                            )}
                            {log.hash && <span>📋 {log.hash}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="avalanche" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Avalanche Transactions</CardTitle>
                <CardDescription>Blockchain transactions on Avalanche network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Showing latest {avalancheTransactions.length} transactions</p>
                  </div>
                  <Button 
                    onClick={fetchAvalancheTransactions} 
                    disabled={isLoadingTransactions}
                    size="sm"
                  >
                    {isLoadingTransactions ? "Loading..." : "Refresh"}
                  </Button>
                </div>
                
                {isLoadingTransactions ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : avalancheTransactions.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tx Hash</TableHead>
                          <TableHead>Block</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {avalancheTransactions.map((tx) => (
                          <TableRow key={tx.txHash}>
                            <TableCell className="font-medium">
                              <a 
                                href={`https://testnet.snowtrace.io/tx/${tx.txHash}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-6)}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a 
                                href={`https://testnet.snowtrace.io/block/${tx.blockNumber}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {tx.blockNumber}
                              </a>
                            </TableCell>
                            <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
                            <TableCell>
                              <a 
                                href={`https://testnet.snowtrace.io/address/${tx.from.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {tx.from.id.slice(0, 6)}...{tx.from.id.slice(-4)}
                              </a>
                              {tx.from.isContract && <Badge className="ml-2 bg-purple-100 text-purple-800">Contract</Badge>}
                            </TableCell>
                            <TableCell>
                              <a 
                                href={`https://testnet.snowtrace.io/address/${tx.to.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {tx.to.id.slice(0, 6)}...{tx.to.id.slice(-4)}
                              </a>
                              {tx.to.isContract && <Badge className="ml-2 bg-purple-100 text-purple-800">Contract</Badge>}
                            </TableCell>
                            <TableCell>{tx.value === "0" ? "0" : `${parseFloat(tx.value) / 1e18} AVAX`}</TableCell>
                            <TableCell>
                              <Badge className={tx.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                {tx.status ? "Success" : "Failed"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-md">
                    <Layers className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No transactions found</p>
                    <Button onClick={fetchAvalancheTransactions} variant="outline" className="mt-4">
                      Refresh Transactions
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Permission Management</CardTitle>
                <CardDescription>Configure system-wide permissions and access levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Access Levels Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Access Levels</h3>
                    <p className="text-sm text-gray-500">Configure predefined access levels and their permissions</p>
                    
                    <div className="space-y-4">
                      {Object.entries({
                        basic: { color: "bg-gray-100 text-gray-800", name: "Basic" },
                        intermediate: { color: "bg-blue-100 text-blue-800", name: "Intermediate" },
                        advanced: { color: "bg-purple-100 text-purple-800", name: "Advanced" },
                        full: { color: "bg-red-100 text-red-800", name: "Full" },
                      }).map(([level, { color, name }]) => (
                        <div key={level} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className={color}>{name}</Badge>
                              <span className="text-sm font-medium">{level.toUpperCase()} ACCESS</span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-500 mb-1">INCLUDED PERMISSIONS:</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {/* This would normally use the actual permissions from the accessLevels object */}
                              {[
                                "view_own_complaints",
                                "register_complaint",
                                "view_own_evidence",
                                "view_blockchain_hashes",
                                "connect_wallet",
                                level === "intermediate" || level === "advanced" || level === "full" ? "upload_evidence" : null,
                                level === "intermediate" || level === "advanced" || level === "full" ? "view_evidence" : null,
                                level === "advanced" || level === "full" ? "promote_users" : null,
                                level === "advanced" || level === "full" ? "view_audit_logs" : null,
                                level === "full" ? "manage_roles" : null,
                                level === "full" ? "flag_complaints" : null,
                                level === "full" ? "manage_permissions" : null,
                              ].filter(Boolean).map(permission => (
                                <Badge 
                                  key={permission} 
                                  variant="outline" 
                                  className="text-xs py-0 h-5 bg-gray-50"
                                >
                                  {permission?.replace(/_/g, ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Custom Permissions Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Custom Permissions</h3>
                    <p className="text-sm text-gray-500">Create and manage custom permissions for specific users</p>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Available Permissions</h4>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {[
                          "view_own_complaints",
                          "register_complaint",
                          "view_own_evidence",
                          "view_blockchain_hashes",
                          "connect_wallet",
                          "upload_evidence",
                          "view_evidence",
                          "upload_fir",
                          "set_complaint_level",
                          "update_complaint_status",
                          "promote_users",
                          "view_audit_logs",
                          "access_admin_panel",
                          "manage_roles",
                          "flag_complaints",
                          "manage_permissions",
                          "view_avalanche_transactions",
                          "system_configuration",
                          "audit_settings",
                        ].map(permission => (
                          <Badge 
                            key={permission} 
                            variant="outline" 
                            className="text-xs py-0 h-5 bg-gray-50 cursor-pointer hover:bg-gray-100"
                          >
                            {permission.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium mb-2">Create Custom Permission Set</h4>
                        <div className="flex gap-2">
                          <Input placeholder="Permission set name" className="flex-1" />
                          <Button size="sm">Create</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">User Permission Assignment</h4>
                      <div className="space-y-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map(user => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.name} ({user.role})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <div className="flex gap-2 mt-2">
                          <Select>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select permission" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "view_own_complaints",
                                "register_complaint",
                                "view_own_evidence",
                                "view_blockchain_hashes",
                                "connect_wallet",
                                "upload_evidence",
                                "view_evidence",
                                "upload_fir",
                                "set_complaint_level",
                                "update_complaint_status",
                                "promote_users",
                                "view_audit_logs",
                                "access_admin_panel",
                                "manage_roles",
                                "flag_complaints",
                                "manage_permissions",
                                "view_avalanche_transactions",
                                "system_configuration",
                                "audit_settings",
                              ].map(permission => (
                                <SelectItem key={permission} value={permission}>
                                  {permission.replace(/_/g, ' ')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button size="sm">Assign</Button>
                        </div>
                      </div>
                    </div>
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
