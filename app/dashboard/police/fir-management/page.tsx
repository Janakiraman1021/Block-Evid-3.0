"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Plus, Edit, Eye, Download, Send, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface FIR {
  id: string
  firNumber: string
  complaintId: string
  complaintTitle: string
  status: "draft" | "pending" | "approved" | "filed" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  createdDate: string
  filedDate?: string
  officerName: string
  station: string
  sections: string[]
  description: string
  accusedDetails?: string
  witnessDetails?: string
  evidenceAttached: number
}

interface ComplaintForFIR {
  id: string
  title: string
  description: string
  location: string
  date: string
  status: "evidence_added"
  evidenceCount: number
}

export default function FIRManagement() {
  const [firs, setFirs] = useState<FIR[]>([])
  const [availableComplaints, setAvailableComplaints] = useState<ComplaintForFIR[]>([])
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintForFIR | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newFIR, setNewFIR] = useState({
    complaintId: "",
    priority: "medium" as const,
    sections: "",
    description: "",
    accusedDetails: "",
    witnessDetails: "",
  })

  useEffect(() => {
    // Mock FIR data
    setFirs([
      {
        id: "FIR-001",
        firNumber: "FIR/2024/001",
        complaintId: "CMP-001",
        complaintTitle: "Noise Pollution in Residential Area",
        status: "filed",
        priority: "medium",
        createdDate: "2024-01-20",
        filedDate: "2024-01-21",
        officerName: "Officer Sarah Smith",
        station: "Cyber Crime Unit",
        sections: ["Section 268", "Section 290"],
        description:
          "FIR filed for noise pollution complaint with evidence of sound level measurements exceeding permissible limits.",
        accusedDetails: "Construction Company ABC Ltd., Site Supervisor John Doe",
        witnessDetails: "Multiple residents of Sector 15, Gurgaon",
        evidenceAttached: 3,
      },
      {
        id: "FIR-002",
        firNumber: "FIR/2024/002",
        complaintId: "CMP-003",
        complaintTitle: "Water Quality Issue",
        status: "approved",
        priority: "high",
        createdDate: "2024-01-21",
        officerName: "Detective Mike Johnson",
        station: "Environmental Crime Unit",
        sections: ["Section 277", "Section 278"],
        description: "FIR for water contamination affecting public health in residential area.",
        accusedDetails: "Industrial Unit XYZ Pvt Ltd",
        witnessDetails: "Local residents and health officials",
        evidenceAttached: 5,
      },
      {
        id: "FIR-003",
        firNumber: "FIR/2024/003",
        complaintId: "CMP-004",
        complaintTitle: "Traffic Signal Malfunction",
        status: "draft",
        priority: "low",
        createdDate: "2024-01-22",
        officerName: "Officer Sarah Smith",
        station: "Traffic Police",
        sections: ["Section 184"],
        description: "Draft FIR for traffic signal malfunction causing public inconvenience.",
        evidenceAttached: 2,
      },
    ])

    // Mock available complaints with evidence
    setAvailableComplaints([
      {
        id: "CMP-005",
        title: "Street Light Malfunction",
        description: "Multiple street lights not working in residential area",
        location: "Block B, Noida",
        date: "2024-01-22",
        status: "evidence_added",
        evidenceCount: 4,
      },
      {
        id: "CMP-006",
        title: "Illegal Dumping",
        description: "Industrial waste being dumped in public area",
        location: "Industrial Area, Pune",
        date: "2024-01-23",
        status: "evidence_added",
        evidenceCount: 6,
      },
    ])
  }, [])

  const handleCreateFIR = () => {
    if (!selectedComplaint) return

    const newFIRRecord: FIR = {
      id: `FIR-${Date.now()}`,
      firNumber: `FIR/2024/${String(firs.length + 1).padStart(3, "0")}`,
      complaintId: selectedComplaint.id,
      complaintTitle: selectedComplaint.title,
      status: "draft",
      priority: newFIR.priority,
      createdDate: new Date().toISOString().split("T")[0],
      officerName: "Officer Sarah Smith",
      station: "Cyber Crime Unit",
      sections: newFIR.sections
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      description: newFIR.description,
      accusedDetails: newFIR.accusedDetails,
      witnessDetails: newFIR.witnessDetails,
      evidenceAttached: selectedComplaint.evidenceCount,
    }

    setFirs((prev) => [newFIRRecord, ...prev])
    setIsCreateDialogOpen(false)
    setNewFIR({
      complaintId: "",
      priority: "medium",
      sections: "",
      description: "",
      accusedDetails: "",
      witnessDetails: "",
    })
    setSelectedComplaint(null)
  }

  const handleStatusChange = (firId: string, newStatus: FIR["status"]) => {
    setFirs((prev) =>
      prev.map((fir) =>
        fir.id === firId
          ? {
              ...fir,
              status: newStatus,
              filedDate: newStatus === "filed" ? new Date().toISOString().split("T")[0] : fir.filedDate,
            }
          : fir,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "approved":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "filed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "closed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <DashboardLayout role="police">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">FIR Management</h1>
            <p className="text-gray-400 text-sm sm:text-base">Create, manage, and track First Information Reports</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500/80 hover:bg-orange-600/80 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create New FIR
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-orange-500/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New FIR</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Generate a new FIR from a complaint with evidence
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Complaint</Label>
                  <Select
                    onValueChange={(value) => {
                      const complaint = availableComplaints.find((c) => c.id === value)
                      setSelectedComplaint(complaint || null)
                      setNewFIR((prev) => ({ ...prev, complaintId: value }))
                    }}
                  >
                    <SelectTrigger className="bg-black/50 border-orange-500/30">
                      <SelectValue placeholder="Choose a complaint with evidence" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableComplaints.map((complaint) => (
                        <SelectItem key={complaint.id} value={complaint.id}>
                          {complaint.id} - {complaint.title} ({complaint.evidenceCount} evidence files)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedComplaint && (
                  <Card className="bg-black/30 border-orange-500/20">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-white mb-2">{selectedComplaint.title}</h4>
                      <p className="text-sm text-gray-400 mb-2">{selectedComplaint.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>📍 {selectedComplaint.location}</span>
                        <span>📅 {selectedComplaint.date}</span>
                        <span>📎 {selectedComplaint.evidenceCount} evidence files</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority Level</Label>
                    <Select
                      value={newFIR.priority}
                      onValueChange={(value: any) => setNewFIR((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger className="bg-black/50 border-orange-500/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Legal Sections</Label>
                    <Input
                      placeholder="e.g., Section 268, Section 290"
                      value={newFIR.sections}
                      onChange={(e) => setNewFIR((prev) => ({ ...prev, sections: e.target.value }))}
                      className="bg-black/50 border-orange-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>FIR Description</Label>
                  <Textarea
                    placeholder="Detailed description of the incident and legal grounds for FIR"
                    value={newFIR.description}
                    onChange={(e) => setNewFIR((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-black/50 border-orange-500/30"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Accused Details</Label>
                  <Textarea
                    placeholder="Details of accused persons or entities"
                    value={newFIR.accusedDetails}
                    onChange={(e) => setNewFIR((prev) => ({ ...prev, accusedDetails: e.target.value }))}
                    className="bg-black/50 border-orange-500/30"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Witness Details</Label>
                  <Textarea
                    placeholder="Details of witnesses and their statements"
                    value={newFIR.witnessDetails}
                    onChange={(e) => setNewFIR((prev) => ({ ...prev, witnessDetails: e.target.value }))}
                    className="bg-black/50 border-orange-500/30"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateFIR}
                    className="bg-orange-500/80 hover:bg-orange-600/80"
                    disabled={!selectedComplaint || !newFIR.description}
                  >
                    Create FIR
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Total FIRs</CardTitle>
              <FileText className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">{firs.length}</div>
              <p className="text-xs text-gray-400">all time</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Draft</CardTitle>
              <Edit className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {firs.filter((f) => f.status === "draft").length}
              </div>
              <p className="text-xs text-gray-400">pending completion</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {firs.filter((f) => f.status === "pending").length}
              </div>
              <p className="text-xs text-gray-400">awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Filed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {firs.filter((f) => f.status === "filed").length}
              </div>
              <p className="text-xs text-gray-400">officially filed</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {firs.filter((f) => f.priority === "high" || f.priority === "urgent").length}
              </div>
              <p className="text-xs text-gray-400">urgent cases</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-black/50">
            <TabsTrigger value="active" className="data-[state=active]:bg-orange-500/20">
              Active FIRs ({firs.filter((f) => f.status !== "closed").length})
            </TabsTrigger>
            <TabsTrigger value="drafts" className="data-[state=active]:bg-orange-500/20">
              Drafts ({firs.filter((f) => f.status === "draft").length})
            </TabsTrigger>
            <TabsTrigger value="filed" className="data-[state=active]:bg-orange-500/20">
              Filed ({firs.filter((f) => f.status === "filed").length})
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-orange-500/20">
              All FIRs ({firs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Active FIRs</CardTitle>
                <CardDescription className="text-gray-400">
                  FIRs currently in progress or pending approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {firs
                    .filter((fir) => fir.status !== "closed")
                    .map((fir) => (
                      <div
                        key={fir.id}
                        className="border border-orange-500/20 rounded-lg p-4 hover:border-orange-500/40 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-lg text-white">{fir.firNumber}</h3>
                              <Badge variant="outline" className="text-xs">
                                {fir.complaintId}
                              </Badge>
                              <Badge className={getStatusColor(fir.status)}>{fir.status.toUpperCase()}</Badge>
                              <Badge className={getPriorityColor(fir.priority)}>{fir.priority.toUpperCase()}</Badge>
                            </div>

                            <h4 className="text-white font-medium">{fir.complaintTitle}</h4>
                            <p className="text-sm text-gray-400">{fir.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                              <div>👮 {fir.officerName}</div>
                              <div>🏢 {fir.station}</div>
                              <div>📅 Created: {fir.createdDate}</div>
                              {fir.filedDate && <div>📋 Filed: {fir.filedDate}</div>}
                              <div>⚖️ Sections: {fir.sections.join(", ")}</div>
                              <div>📎 Evidence: {fir.evidenceAttached} files</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Select onValueChange={(value) => handleStatusChange(fir.id, value as FIR["status"])}>
                              <SelectTrigger className="w-32 h-9 bg-black/50 border-orange-500/30 text-white text-xs">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="filed">Filed</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {firs.filter((fir) => fir.status !== "closed").length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No active FIRs found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Draft FIRs</CardTitle>
                <CardDescription className="text-gray-400">
                  FIRs that are still being prepared and need completion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {firs
                    .filter((fir) => fir.status === "draft")
                    .map((fir) => (
                      <div key={fir.id} className="border border-orange-500/20 rounded-lg p-4">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">{fir.firNumber}</h3>
                              <Badge className={getPriorityColor(fir.priority)}>{fir.priority.toUpperCase()}</Badge>
                            </div>
                            <h4 className="text-white">{fir.complaintTitle}</h4>
                            <p className="text-sm text-gray-400">Created: {fir.createdDate}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-orange-500/80 hover:bg-orange-600/80">
                              <Edit className="h-4 w-4 mr-1" />
                              Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filed" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Filed FIRs</CardTitle>
                <CardDescription className="text-gray-400">
                  FIRs that have been officially filed and are active
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {firs
                    .filter((fir) => fir.status === "filed")
                    .map((fir) => (
                      <div key={fir.id} className="border border-green-500/20 rounded-lg p-4">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">{fir.firNumber}</h3>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">FILED</Badge>
                              <Badge className={getPriorityColor(fir.priority)}>{fir.priority.toUpperCase()}</Badge>
                            </div>
                            <h4 className="text-white">{fir.complaintTitle}</h4>
                            <div className="text-sm text-gray-400">
                              <p>Filed: {fir.filedDate}</p>
                              <p>Sections: {fir.sections.join(", ")}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">All FIRs</CardTitle>
                <CardDescription className="text-gray-400">Complete list of all FIRs in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {firs.map((fir) => (
                    <div key={fir.id} className="border border-orange-500/20 rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{fir.firNumber}</h3>
                            <Badge className={getStatusColor(fir.status)}>{fir.status.toUpperCase()}</Badge>
                            <Badge className={getPriorityColor(fir.priority)}>{fir.priority.toUpperCase()}</Badge>
                          </div>
                          <h4 className="text-white">{fir.complaintTitle}</h4>
                          <div className="text-sm text-gray-400">
                            <p>
                              Created: {fir.createdDate} | Officer: {fir.officerName}
                            </p>
                            {fir.filedDate && <p>Filed: {fir.filedDate}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
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
