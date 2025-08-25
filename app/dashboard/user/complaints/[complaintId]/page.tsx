"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, CheckCircle, AlertCircle, FileText, MapPin, Calendar, Tag, Hash } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useParams } from "next/navigation"

export default function ComplaintDetailPage() {
  const params = useParams()
  const [complaint, setComplaint] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchComplaint = async () => {
      setLoading(true)
      setError("")
      try {
        const token = localStorage.getItem("token")
        const id = params.complaintId as string
        const res = await fetch(`https://blockevid3-0-bc.onrender.com/api/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) {
          throw new Error("Failed to fetch complaint details")
        }
        const data = await res.json()
        setComplaint(data)
      } catch (err: any) {
        setError(err.message || "Failed to load complaint details")
      } finally {
        setLoading(false)
      }
    }
    if (params.complaintId) fetchComplaint()
  }, [params.complaintId])

  if (loading) {
    return (
      <DashboardLayout role="user">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-orange-400">Loading complaint details...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !complaint) {
    return (
      <DashboardLayout role="user">
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-red-400">{error || "Complaint not found."}</div>
        </div>
      </DashboardLayout>
    )
  }

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
        <div className="flex items-center gap-4">
          <Link href="/dashboard/user">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-orange-500">Complaint Details</h1>
            <p className="text-orange-300">Track your complaint progress and view updates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Info */}
            <Card className="bg-black border-orange-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl text-orange-400">{complaint.title}</CardTitle>
                      <Badge variant="secondary" className="bg-orange-500 text-black border-none">{complaint.complaintId}</Badge>
                    </div>
                    <Badge className={getStatusColor(complaint.status)}>
                      {getStatusIcon(complaint.status)}
                      <span className="ml-1 capitalize">{complaint.status.replace("_", " ")}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-orange-300">Description</h3>
                  <p className="text-orange-200 leading-relaxed">{complaint.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-orange-300">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    <span>{complaint.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300">
                    <Calendar className="h-4 w-4 text-orange-400" />
                    <span>{new Date(complaint.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300">
                    <FileText className="h-4 w-4 text-orange-400" />
                    <span>{complaint.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300">
                    <Hash className="h-4 w-4 text-orange-400" />
                    <span className="font-mono">{complaint.ipfsHash}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300">
                    <span className="font-semibold">Complaint ID:</span>
                    <span className="font-mono">{complaint.complaintId}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300">
                    <span className="font-semibold">Created At:</span>
                    <span>{new Date(complaint.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300">
                    <span className="font-semibold">Updated At:</span>
                    <span>{new Date(complaint.updatedAt).toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="font-semibold text-orange-300">Created By:</span>
                    <div className="text-orange-200 text-sm">
                      <div>Name: {complaint.createdBy?.name}</div>
                      <div>Email: {complaint.createdBy?.email}</div>
                      <div>Role: {complaint.createdBy?.role}</div>
                      <div>User ID: {complaint.createdBy?._id}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-orange-300">Assigned To:</span>
                    <div className="text-orange-200 text-sm">
                      {complaint.assignedTo ? (
                        <>
                          <div>Name: {complaint.assignedTo.name}</div>
                          <div>Email: {complaint.assignedTo.email}</div>
                          <div>Role: {complaint.assignedTo.role}</div>
                          <div>User ID: {complaint.assignedTo._id}</div>
                        </>
                      ) : (
                        <div>Not assigned</div>
                      )}
                    </div>
                  </div>
                </div>

                {complaint.tags && complaint.tags.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-orange-400" />
                        <span className="font-semibold text-sm text-orange-300">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {complaint.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs border-orange-500 text-orange-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Evidence */}
            {complaint.evidence && complaint.evidence.length > 0 && (
              <Card className="bg-black border-orange-500">
                <CardHeader>
                  <CardTitle className="text-orange-400">Evidence</CardTitle>
                  <CardDescription className="text-orange-300">Files and documents uploaded by investigating officers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {complaint.evidence.map((evidence: any) => (
                      <div key={evidence.id} className="border border-orange-500 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-orange-400" />
                            <div>
                              <p className="font-medium text-sm text-orange-200">{evidence.name}</p>
                              <p className="text-xs text-orange-300">
                                Uploaded by {evidence.uploadedBy} on {new Date(evidence.uploadedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs border-orange-500 text-orange-300">
                              {evidence.type}
                            </Badge>
                            <Button size="sm" variant="outline" className="border-orange-500 text-orange-400">
                              View
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-orange-300">
                          <Hash className="h-3 w-3" />
                          <span className="font-mono">{evidence.hash}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* FIR */}
            {complaint.fir && (
              <Card className="bg-black border-orange-500">
                <CardHeader>
                  <CardTitle className="text-orange-400">FIR Information</CardTitle>
                  <CardDescription className="text-orange-300">First Information Report details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-orange-500 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-200">FIR #{complaint.fir.number}</p>
                        <p className="text-sm text-orange-300">Filed on {new Date(complaint.fir.date).toLocaleDateString()}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-orange-500 text-orange-400">
                        Download FIR
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-orange-300">
                      <Hash className="h-3 w-3" />
                      <span className="font-mono">{complaint.fir.hash}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Timeline */}
            {complaint.timeline && complaint.timeline.length > 0 && (
              <Card className="bg-black border-orange-500">
                <CardHeader>
                  <CardTitle className="text-orange-400">Status Timeline</CardTitle>
                  <CardDescription className="text-orange-300">Track the progress of your complaint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaint.timeline.map((item: any, index: number) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          {index < complaint.timeline.length - 1 && <div className="w-0.5 h-8 bg-orange-500 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm text-orange-200">{item.status}</p>
                            <Badge variant="outline" className="text-xs border-orange-500 text-orange-300">
                              {new Date(item.date).toLocaleDateString()}
                            </Badge>
                          </div>
                          <p className="text-xs text-orange-300">{item.description}</p>
                          {item.officer && <p className="text-xs text-orange-400 mt-1">{item.officer}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Blockchain Info */}
            <Card className="bg-black border-orange-500">
              <CardHeader>
                <CardTitle className="text-orange-400">Blockchain Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-orange-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Complaint hash verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Evidence cryptographically secured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Tamper-proof audit trail</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
