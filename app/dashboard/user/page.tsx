"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Complaint {
  id: string
  title: string
  description: string
  status: "pending" | "under_review" | "resolved" | "rejected"
  type: string
  date: string
  location: string
}

// Define a User type for proper typing
interface User {
  _id?: string;
  id?: string;
  userId?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState("")
  const [complaints, setComplaints] = useState<Complaint[]>([])

  useEffect(() => {
    // Fetch user details from backend
    const fetchUserAndComplaints = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          // Now fetch complaints for this user
          const userId = data._id || data.id || data.userId; // support various backend keys
          if (userId) {
            const complaintsRes = await fetch(`http://localhost:5000/api/complaints/my-complaints/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (complaintsRes.ok) {
              let complaintsData = await complaintsRes.json();
              // If the API returns an object, convert to array
              if (!Array.isArray(complaintsData)) {
                complaintsData = Object.values(complaintsData);
              }
              // Map backend fields to Complaint interface if needed
              setComplaints(
                complaintsData.map((c: any) => ({
                  id: c._id || c.id || c.complaintId || "",
                  title: c.title || c.subject || "",
                  description: c.description || "",
                  status: c.status || "pending",
                  type: c.type || c.category || "",
                  date: c.createdAt ? new Date(c.createdAt).toISOString().slice(0, 10) : "",
                  location: c.location || "",
                }))
              );
            } else {
              setError("Failed to fetch complaints.");
            }
          }
        } else {
          setError("Failed to fetch user details. Please log in again.");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
      }
    };
    fetchUserAndComplaints();
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "under_review":
        return <AlertCircle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600">Manage your complaints and track their progress</p>
            {user && (
              <div className="mt-2 text-sm text-gray-700">
                <span className="font-semibold">Logged in as:</span>{" "}
                {user?.name ?? "-"} ({user?.email ?? "-"}) - <span className="capitalize">{user?.role ?? "-"}</span>
              </div>
            )}
          </div>
          <Link href="/dashboard/user/new-complaint">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              File New Complaint
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "pending").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "under_review").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "resolved").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <Card>
          <CardHeader>
            <CardTitle>My Complaints</CardTitle>
            <CardDescription>Track the status and progress of your filed complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="border rounded-lg p-4 hover:bg-[#18181b] transition-colors bg-[#0f0f11]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-orange-400">{complaint.title}</h3>
                        <Badge variant="secondary" className="bg-[#18181b] text-orange-300 border border-orange-400">{complaint.id}</Badge>
                      </div>
                      <p className="text-orange-200 text-sm">{complaint.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-orange-300">
                        <span>📍 {complaint.location}</span>
                        <span>📅 {complaint.date}</span>
                        <span>🏷️ {complaint.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(complaint.status) + " border border-orange-400 bg-opacity-20 text-orange-300"}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1 capitalize">{complaint.status.replace("_", " ")}</span>
                      </Badge>
                      <Link href={`/dashboard/user/complaints/${complaint.id}`}>
                        <Button variant="outline" size="sm" className="border-orange-400 text-orange-300 hover:bg-orange-900/20">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
