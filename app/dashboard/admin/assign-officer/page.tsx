"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"
import { Label } from "@/components/ui/label"


export default function AssignOfficerPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [officers, setOfficers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOfficer, setSelectedOfficer] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")


  useEffect(() => {
    // Fetch all complaints
    const fetchComplaints = async () => {
      setError("")
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://blockevid3-0-bc.onrender.com/api/complaints/admin-view-comp", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Failed to fetch complaints")
        let data = await res.json()
        if (!Array.isArray(data)) data = Object.values(data)
        if (Array.isArray(data) && Array.isArray(data[0])) data = data.flat()
        setComplaints(data)
      } catch (err: any) {
        setError(err.message || "Failed to load complaints")
      }
    }
    // Fetch all police officers
    const fetchOfficers = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://blockevid3-0-bc.onrender.com/api/auth/police", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Failed to fetch officers")
        const data = await res.json()
        setOfficers(Array.isArray(data) ? data : Object.values(data))
      } catch {}
    }
    fetchComplaints()
    fetchOfficers()
  }, [])

  const handleAssign = async (complaintId: string) => {
    if (!selectedOfficer[complaintId]) return
    setLoading(complaintId)
    setError("")
    setSuccess("")
    // Step 1: Log complaintId and policeId
    // Use the complaintId from the complaint object, not the array index or key
    const complaint = complaints.find(
      c => c._id === complaintId || c.id === complaintId || c.complaintId === complaintId
    )
    const realComplaintId = complaint?.complaintId || complaint?._id || complaint?.id || complaintId
    console.log("Assigning officer:", { complaintId: realComplaintId, policeId: selectedOfficer[complaintId] })
    try {
      const token = localStorage.getItem("token")
      const endpoint = `https://blockevid3-0-bc.onrender.com/api/complaints/assign/${realComplaintId}`
      console.log("API endpoint:", endpoint)
      const body = { complaintId: realComplaintId, policeId: selectedOfficer[complaintId] }
      console.log("Request body:", body)
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const errText = await res.text()
        console.error("API error response:", errText)
        alert(`Assignment Failed: ${errText || "Failed to assign officer"}`)
        throw new Error("Failed to assign officer")
      }
      setSuccess("Officer assigned successfully!")
      alert(`Success: Officer has been assigned to complaint #${realComplaintId} successfully!`)
      setTimeout(() => window.location.reload(), 1200)
    } catch (err: any) {
      setError(err.message || "Failed to assign officer")
      alert(`Error: ${err.message || "Failed to assign officer"}`)
    } finally {
      setLoading(null)
    }
  }

  // Segregate complaints
  const assigned = complaints.filter(c => c.assignedTo)
  const unassigned = complaints.filter(c => !c.assignedTo)

  // Filter complaints by search
  const filteredUnassigned = unassigned.filter((c) => {
    const s = searchTerm.toLowerCase()
    return (
      (c.title || c.subject || "").toLowerCase().includes(s) ||
      (c.description || "").toLowerCase().includes(s) ||
      (c._id || c.id || "").toLowerCase().includes(s)
    )
  })

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Assign Officer to Complaints</h1>
            <p className="text-gray-400 text-sm sm:text-base">Assign police officers to pending complaints</p>
          </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Search Complaints</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Title, description, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/50 border-orange-500/30 text-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unassigned Complaints Table */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Unassigned Complaints ({filteredUnassigned.length})</CardTitle>
            <CardDescription className="text-gray-400">Assign officers to these complaints</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredUnassigned.length === 0 && <div className="text-gray-400">All complaints are assigned.</div>}
            <div className="space-y-4">
              {filteredUnassigned.map((complaint) => (
                <div
                  key={complaint._id || complaint.id}
                  className="border border-orange-500/20 rounded-lg p-4 hover:border-orange-500/40 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-lg text-white">{complaint.title || complaint.subject}</h3>
                        <Badge variant="outline" className="text-xs">
                          {complaint._id || complaint.id}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                        <div>{complaint.description}</div>
                        <div>📅 {complaint.date || complaint.createdAt?.slice(0, 10)}</div>
                        <div>📍 {complaint.location}</div>
                        <div>👤 {complaint.createdBy?.name || complaint.userId || "-"}</div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                      <Select value={selectedOfficer[complaint._id || complaint.id] || ""} onValueChange={val => setSelectedOfficer(s => ({ ...s, [complaint._id || complaint.id]: val }))}>
                        <SelectTrigger className="w-48 bg-[#18181b] text-orange-300 border border-orange-400">
                          <SelectValue placeholder="Select Officer" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#18181b] text-orange-300">
                          {officers.map((officer) => (
                            <SelectItem key={officer._id} value={officer._id}>
                              {officer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => handleAssign(complaint._id || complaint.id)} disabled={!selectedOfficer[complaint._id || complaint.id] || loading === (complaint._id || complaint.id)} className="bg-orange-500 hover:bg-orange-600 text-white">
                        {loading === (complaint._id || complaint.id) ? "Assigning..." : "Assign Officer"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Complaints Table */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Assigned Complaints ({assigned.length})</CardTitle>
            <CardDescription className="text-gray-400">Complaints that already have an officer assigned</CardDescription>
          </CardHeader>
          <CardContent>
            {assigned.length === 0 && <div className="text-gray-400">No complaints have been assigned yet.</div>}
            <div className="space-y-4">
              {assigned.map((complaint) => (
                <div
                  key={complaint._id || complaint.id}
                  className="border border-orange-500/20 rounded-lg p-4 hover:border-orange-500/40 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-lg text-white">{complaint.title || complaint.subject}</h3>
                        <Badge variant="outline" className="text-xs">
                          {complaint._id || complaint.id}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                        <div>{complaint.description}</div>
                        <div>📅 {complaint.date || complaint.createdAt?.slice(0, 10)}</div>
                        <div>📍 {complaint.location}</div>
                        <div>👤 {complaint.createdBy?.name || complaint.userId || "-"}</div>
                        <div className="text-green-400">Assigned to: {complaint.assignedTo?.name || complaint.assignedTo?.email || complaint.assignedTo}</div>
                      </div>
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