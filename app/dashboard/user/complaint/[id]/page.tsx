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
        const id = params.id as string
        const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
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
    if (params.id) fetchComplaint()
  }, [params.id])

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
            <h1 className="text-3xl font-bold text-gray-900">Complaint Details</h1>
            <p className="text-gray-600">Track your complaint progress and view updates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{complaint.title}</CardTitle>
                      <Badge variant="secondary">{complaint.id}</Badge>
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
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{complaint.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(complaint.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{complaint.type}</span>
                  </div>
                </div>

                {complaint.tags.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4" />
                        <span className="font-semibold text-sm">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {complaint.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
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
              <Card>
                <CardHeader>
                  <CardTitle>Evidence</CardTitle>
                  <CardDescription>Files and documents uploaded by investigating officers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {complaint.evidence.map((evidence: any) => (
                      <div key={evidence.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-sm">{evidence.name}</p>
                              <p className="text-xs text-gray-500">
                                Uploaded by {evidence.uploadedBy} on {new Date(evidence.uploadedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {evidence.type}
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
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
              <Card>
                <CardHeader>
                  <CardTitle>FIR Information</CardTitle>
                  <CardDescription>First Information Report details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">FIR #{complaint.fir.number}</p>
                        <p className="text-sm text-gray-500">Filed on {new Date(complaint.fir.date).toLocaleDateString()}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Download FIR
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
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
            <Card>
              <CardHeader>
                <CardTitle>Status Timeline</CardTitle>
                <CardDescription>Track the progress of your complaint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaint.timeline.map((item: any, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        {index < complaint.timeline.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{item.status}</p>
                          <Badge variant="outline" className="text-xs">
                            {new Date(item.date).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{item.description}</p>
                        {item.officer && <p className="text-xs text-blue-600 mt-1">{item.officer}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Info */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Blockchain Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Complaint hash verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Evidence cryptographically secured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
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
