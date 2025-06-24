"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Upload, FileText, AlertTriangle, Clock, Shield } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Complaint {
  id: string
  title: string
  description: string
  status: "pending" | "verified" | "rejected" | "evidence_added" | "fir_attached"
  type: string
  date: string
  location: string
  level?: "local" | "district" | "state" | "national"
}

export default function PoliceDashboard() {
  const [user, setUser] = useState(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])

  useEffect(() => {
    // Fetch user details from backend
    const fetchUser = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) return;
      try {
        const res = await fetch("https://blockevid3-0-bc.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        // handle error
      }
    };
    fetchUser();

    // Fetch all complaints for police
    const fetchComplaints = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) return;
      try {
        const res = await fetch("https://blockevid3-0-bc.onrender.com/api/complaints/admin-view-comp", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          let data = await res.json();
          if (!Array.isArray(data)) data = Object.values(data);
          if (Array.isArray(data) && Array.isArray(data[0])) data = data.flat();
          setComplaints(
            data.map((c: any) => ({
              id: c._id || c.id || c.complaintId || "",
              title: c.title || c.subject || "",
              description: c.description || "",
              status: (c.status || "pending").toLowerCase().replace(/\s/g, "_"),
              type: c.type || c.category || "",
              date: c.date || (c.createdAt ? new Date(c.createdAt).toISOString().slice(0, 10) : ""),
              location: c.location || "",
              level: c.level || undefined,
            }))
          );
        }
      } catch (err) {
        // handle error
      }
    };
    fetchComplaints();
  }, [])

  const handleVerify = (complaintId: string) => {
    setComplaints(complaints.map((c) => (c.id === complaintId ? { ...c, status: "verified" as const } : c)))
  }

  const handleReject = (complaintId: string) => {
    setComplaints(complaints.map((c) => (c.id === complaintId ? { ...c, status: "rejected" as const } : c)))
  }

  const getStatusColor = (status: string) => {
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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingComplaints = complaints.filter((c) => c.status === "pending")
  const verifiedComplaints = complaints.filter((c) => c.status === "verified" || c.status === "evidence_added")

  return (
    <DashboardLayout role="police">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Police Dashboard</h1>
          <p className="text-gray-600">Verify complaints, manage evidence, and handle FIR processes</p>
          {user && (
            <div className="mt-2 text-sm text-gray-700">
              <span className="font-semibold">Logged in as:</span> {user.name} ({user.email}) - <span className="capitalize">{user.role}</span>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingComplaints.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "verified").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Evidence Added</CardTitle>
              <Upload className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "evidence_added").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FIR Attached</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "fir_attached").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="verify" className="space-y-4">
          <TabsList>
            <TabsTrigger value="verify">Verify Complaints ({pendingComplaints.length})</TabsTrigger>
            <TabsTrigger value="evidence">Manage Evidence ({verifiedComplaints.length})</TabsTrigger>
            <TabsTrigger value="fir">FIR Management</TabsTrigger>
            <TabsTrigger value="all">All Complaints ({complaints.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Verification</CardTitle>
                <CardDescription>Review and verify submitted complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{complaint.title}</h3>
                            <Badge variant="secondary">{complaint.id}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{complaint.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>📍 {complaint.location}</span>
                            <span>📅 {complaint.date}</span>
                            <span>🏷️ {complaint.type}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleVerify(complaint.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Verify
                          </Button>
                          <Button onClick={() => handleReject(complaint.id)} variant="destructive" size="sm">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingComplaints.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No complaints pending verification</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evidence Management</CardTitle>
                <CardDescription>Upload and manage evidence for verified complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verifiedComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{complaint.title}</h3>
                            <Badge variant="secondary">{complaint.id}</Badge>
                            <Badge className={getStatusColor(complaint.status)}>
                              {complaint.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{complaint.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>📍 {complaint.location}</span>
                            <span>📅 {complaint.date}</span>
                            <span>🏷️ {complaint.type}</span>
                            {complaint.level && <span>🎯 {complaint.level.toUpperCase()}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Evidence
                          </Button>
                          <Button size="sm" variant="outline">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Set Level
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {verifiedComplaints.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No verified complaints available for evidence upload</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fir" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>FIR Management</CardTitle>
                <CardDescription>Generate and attach FIR documents to complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((c) => c.status === "evidence_added")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{complaint.title}</h3>
                              <Badge variant="secondary">{complaint.id}</Badge>
                              <Badge className={getStatusColor(complaint.status)}>EVIDENCE ADDED</Badge>
                            </div>
                            <p className="text-gray-600 text-sm">{complaint.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <span>📍 {complaint.location}</span>
                              <span>📅 {complaint.date}</span>
                              <span>🏷️ {complaint.type}</span>
                              {complaint.level && <span>🎯 {complaint.level.toUpperCase()}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Generate FIR
                            </Button>
                            <Button size="sm" variant="outline">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload FIR
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  {complaints.filter((c) => c.status === "evidence_added").length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No complaints ready for FIR processing</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Complaints</CardTitle>
                <CardDescription>Complete overview of all complaints in the system</CardDescription>
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
                            <Badge className={getStatusColor(complaint.status)}>
                              {complaint.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{complaint.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>📍 {complaint.location}</span>
                            <span>📅 {complaint.date}</span>
                            <span>🏷️ {complaint.type}</span>
                            {complaint.level && <span>🎯 {complaint.level.toUpperCase()}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
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
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
