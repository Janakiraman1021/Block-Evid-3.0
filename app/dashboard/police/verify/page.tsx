"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock, AlertTriangle, Search, Filter, Eye } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Complaint {
  id: string
  title: string
  description: string
  status: "pending" | "verified" | "rejected"
  type: string
  date: string
  location: string
  userId: string
  priority: "low" | "medium" | "high" | "critical"
}

export default function VerifyComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null)
  const [verificationNote, setVerificationNote] = useState("")

  useEffect(() => {
    // Mock data - Police can see ALL pending complaints
    setComplaints([
      {
        id: "CMP-001",
        title: "Noise Pollution in Residential Area",
        description:
          "Excessive noise from construction site during night hours affecting sleep of residents including elderly and children",
        status: "pending",
        type: "Environmental",
        date: "2024-01-15",
        location: "Sector 15, Gurgaon",
        userId: "USR-001",
        priority: "medium",
      },
      {
        id: "CMP-004",
        title: "Traffic Signal Malfunction",
        description: "Traffic lights not working properly causing congestion and potential accidents",
        status: "pending",
        type: "Infrastructure",
        date: "2024-01-18",
        location: "Central Avenue, Mumbai",
        userId: "USR-001",
        priority: "high",
      },
      {
        id: "CMP-006",
        title: "Water Contamination",
        description: "Suspected chemical contamination in local water supply affecting multiple households",
        status: "pending",
        type: "Public Health",
        date: "2024-01-22",
        location: "Block C, Noida",
        userId: "USR-003",
        priority: "critical",
      },
      {
        id: "CMP-007",
        title: "Street Light Outage",
        description: "Multiple street lights not working in residential area creating safety concerns",
        status: "pending",
        type: "Infrastructure",
        date: "2024-01-20",
        location: "Park Street, Kolkata",
        userId: "USR-002",
        priority: "medium",
      },
      {
        id: "CMP-008",
        title: "Illegal Construction",
        description: "Unauthorized construction blocking public pathway and emergency access",
        status: "pending",
        type: "Public Safety",
        date: "2024-01-19",
        location: "MG Road, Bangalore",
        userId: "USR-004",
        priority: "high",
      },
    ])
  }, [])

  const handleVerify = (complaintId: string) => {
    setComplaints(complaints.map((c) => (c.id === complaintId ? { ...c, status: "verified" as const } : c)))
    setSelectedComplaint(null)
    setVerificationNote("")
  }

  const handleReject = (complaintId: string) => {
    setComplaints(complaints.map((c) => (c.id === complaintId ? { ...c, status: "rejected" as const } : c)))
    setSelectedComplaint(null)
    setVerificationNote("")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-[#ff5d8f]/20 text-[#ff5d8f] border-[#ff5d8f]/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-[#caffbf]/20 text-[#caffbf] border-[#caffbf]/30"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || complaint.type === typeFilter
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter
    return matchesSearch && matchesType && matchesPriority && complaint.status === "pending"
  })

  const complaintTypes = [
    "Environmental",
    "Infrastructure",
    "Public Health",
    "Traffic & Transportation",
    "Public Safety",
    "Corruption",
    "Consumer Rights",
  ]

  return (
    <DashboardLayout role="police">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Verify Complaints</h1>
          <p className="text-[#f5f5f5]/70">Review and verify submitted complaints for investigation</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="futuristic-border bg-black/40 hologram-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#f5f5f5]">Pending Verification</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#f5f5f5]">
                {complaints.filter((c) => c.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card className="futuristic-border bg-black/40 hologram-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#f5f5f5]">Critical Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#f5f5f5]">
                {complaints.filter((c) => c.priority === "critical" && c.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card className="futuristic-border bg-black/40 hologram-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#f5f5f5]">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-[#ff5d8f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#f5f5f5]">
                {complaints.filter((c) => c.priority === "high" && c.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card className="futuristic-border bg-black/40 hologram-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#f5f5f5]">Verified Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-[#caffbf]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#f5f5f5]">
                {complaints.filter((c) => c.status === "verified").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="futuristic-border bg-black/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#f5f5f5]">
              <Filter className="h-5 w-5 text-[#3a86ff]" />
              Filter Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#f5f5f5]/50" />
                <Input
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/60 border-[#3a86ff]/30 text-[#f5f5f5] placeholder:text-[#f5f5f5]/50"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-black/60 border-[#3a86ff]/30 text-[#f5f5f5]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border-[#3a86ff]/30">
                  <SelectItem value="all" className="text-[#f5f5f5]">
                    All Types
                  </SelectItem>
                  {complaintTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-[#f5f5f5]">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-black/60 border-[#3a86ff]/30 text-[#f5f5f5]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border-[#3a86ff]/30">
                  <SelectItem value="all" className="text-[#f5f5f5]">
                    All Priorities
                  </SelectItem>
                  <SelectItem value="critical" className="text-[#f5f5f5]">
                    Critical
                  </SelectItem>
                  <SelectItem value="high" className="text-[#f5f5f5]">
                    High
                  </SelectItem>
                  <SelectItem value="medium" className="text-[#f5f5f5]">
                    Medium
                  </SelectItem>
                  <SelectItem value="low" className="text-[#f5f5f5]">
                    Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <Card className="futuristic-border bg-black/40">
          <CardHeader>
            <CardTitle className="text-[#f5f5f5]">Pending Complaints ({filteredComplaints.length})</CardTitle>
            <CardDescription className="text-[#f5f5f5]/70">
              Review complaints and make verification decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="futuristic-border rounded-lg p-4 hover:bg-[#3a86ff]/5 transition-all duration-300 data-stream"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg text-[#f5f5f5]">{complaint.title}</h3>
                          <Badge variant="secondary" className="bg-[#3a86ff]/20 text-[#3a86ff] border-[#3a86ff]/30">
                            {complaint.id}
                          </Badge>
                          <Badge className={getPriorityColor(complaint.priority)}>
                            {complaint.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-[#f5f5f5]/70 text-sm">{complaint.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-[#f5f5f5]/60">
                          <span>📍 {complaint.location}</span>
                          <span>📅 {complaint.date}</span>
                          <span>🏷️ {complaint.type}</span>
                          <span>👤 {complaint.userId}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedComplaint(selectedComplaint === complaint.id ? null : complaint.id)}
                          variant="outline"
                          size="sm"
                          className="border-[#3a86ff]/30 text-[#f5f5f5] hover:bg-[#3a86ff]/20"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {selectedComplaint === complaint.id ? "Hide" : "Review"}
                        </Button>
                      </div>
                    </div>

                    {/* Verification Panel */}
                    {selectedComplaint === complaint.id && (
                      <div className="border-t border-[#3a86ff]/20 pt-4 space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#f5f5f5]">Verification Notes</label>
                          <Textarea
                            placeholder="Add your verification notes, observations, or reasons for decision..."
                            value={verificationNote}
                            onChange={(e) => setVerificationNote(e.target.value)}
                            className="bg-black/60 border-[#3a86ff]/30 text-[#f5f5f5] placeholder:text-[#f5f5f5]/50"
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleVerify(complaint.id)}
                            className="bg-gradient-to-r from-[#caffbf] to-[#3a86ff] text-black border-0"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Verify & Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(complaint.id)}
                            variant="destructive"
                            className="bg-gradient-to-r from-[#ff5d8f] to-red-500 text-white border-0"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedComplaint(null)
                              setVerificationNote("")
                            }}
                            variant="outline"
                            className="border-[#3a86ff]/30 text-[#f5f5f5] hover:bg-[#3a86ff]/20"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredComplaints.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-[#f5f5f5]/30" />
                  <h3 className="text-lg font-semibold text-[#f5f5f5] mb-2">No pending complaints</h3>
                  <p className="text-[#f5f5f5]/60">
                    {searchTerm || typeFilter !== "all" || priorityFilter !== "all"
                      ? "Try adjusting your filters to see more results."
                      : "All complaints have been processed."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
