"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ImageIcon, Video, Music, Archive, Trash2, Eye, Download, AlertTriangle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface EvidenceFile {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  complaintId: string
  category: "photo" | "video" | "audio" | "document" | "other"
  hash: string
  status: "uploading" | "uploaded" | "verified" | "rejected"
  description?: string
}

interface Complaint {
  id: string
  title: string
  status: "verified" | "evidence_added"
  location: string
  date: string
}

export default function EvidenceUpload() {
  const [selectedComplaint, setSelectedComplaint] = useState<string>("")
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([
    {
      id: "EV-001",
      name: "crime_scene_photo_1.jpg",
      type: "image/jpeg",
      size: 2048576,
      uploadDate: "2024-01-20 14:30",
      complaintId: "CMP-001",
      category: "photo",
      hash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      status: "uploaded",
      description: "Main crime scene photograph showing the incident area",
    },
    {
      id: "EV-002",
      name: "witness_statement.pdf",
      type: "application/pdf",
      size: 512000,
      uploadDate: "2024-01-20 15:45",
      complaintId: "CMP-001",
      category: "document",
      hash: "QmXwBPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdH",
      status: "verified",
      description: "Written statement from primary witness",
    },
  ])

  const [complaints] = useState<Complaint[]>([
    {
      id: "CMP-001",
      title: "Noise Pollution in Residential Area",
      status: "verified",
      location: "Sector 15, Gurgaon",
      date: "2024-01-15",
    },
    {
      id: "CMP-002",
      title: "Road Safety Concern",
      status: "verified",
      location: "MG Road, Delhi",
      date: "2024-01-10",
    },
    {
      id: "CMP-003",
      title: "Water Quality Issue",
      status: "evidence_added",
      location: "Block A, Noida",
      date: "2024-01-20",
    },
  ])

  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newEvidence: EvidenceFile = {
        id: `EV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toLocaleString(),
        complaintId: selectedComplaint,
        category: getCategoryFromType(file.type),
        hash: `Qm${Math.random().toString(36).substr(2, 44)}`,
        status: "uploading",
      }

      setEvidenceFiles((prev) => [...prev, newEvidence])

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setEvidenceFiles((prev) => prev.map((ev) => (ev.id === newEvidence.id ? { ...ev, status: "uploaded" } : ev)))
          setUploadProgress((prev) => {
            const newProgress = { ...prev }
            delete newProgress[newEvidence.id]
            return newProgress
          })
        }
        setUploadProgress((prev) => ({ ...prev, [newEvidence.id]: progress }))
      }, 200)
    })
  }

  const getCategoryFromType = (type: string): EvidenceFile["category"] => {
    if (type.startsWith("image/")) return "photo"
    if (type.startsWith("video/")) return "video"
    if (type.startsWith("audio/")) return "audio"
    if (type.includes("pdf") || type.includes("document")) return "document"
    return "other"
  }

  const getFileIcon = (category: string) => {
    switch (category) {
      case "photo":
        return <ImageIcon className="h-5 w-5 text-blue-400" />
      case "video":
        return <Video className="h-5 w-5 text-purple-400" />
      case "audio":
        return <Music className="h-5 w-5 text-green-400" />
      case "document":
        return <FileText className="h-5 w-5 text-orange-400" />
      default:
        return <Archive className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploading":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "uploaded":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "verified":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDeleteEvidence = (evidenceId: string) => {
    setEvidenceFiles((prev) => prev.filter((ev) => ev.id !== evidenceId))
  }

  return (
    <DashboardLayout role="police">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Evidence Upload</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Upload and manage digital evidence for verified complaints
            </p>
          </div>
          <Button className="bg-orange-500/80 hover:bg-orange-600/80 w-full sm:w-auto">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Total Evidence</CardTitle>
              <Archive className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">{evidenceFiles.length}</div>
              <p className="text-xs text-gray-400">files uploaded</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Verified</CardTitle>
              <Eye className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {evidenceFiles.filter((ev) => ev.status === "verified").length}
              </div>
              <p className="text-xs text-gray-400">evidence verified</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Storage Used</CardTitle>
              <Archive className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {formatFileSize(evidenceFiles.reduce((total, file) => total + file.size, 0))}
              </div>
              <p className="text-xs text-gray-400">total size</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {evidenceFiles.filter((ev) => ev.status === "uploaded").length}
              </div>
              <p className="text-xs text-gray-400">awaiting verification</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upload" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 bg-black/50">
            <TabsTrigger value="upload" className="data-[state=active]:bg-orange-500/20">
              Upload Evidence
            </TabsTrigger>
            <TabsTrigger value="manage" className="data-[state=active]:bg-orange-500/20">
              Manage Files
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-orange-500/20">
              Upload History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Upload New Evidence</CardTitle>
                <CardDescription className="text-gray-400">
                  Select a complaint and upload supporting evidence files
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Complaint Selection */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Select Complaint</Label>
                  <Select value={selectedComplaint} onValueChange={setSelectedComplaint}>
                    <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
                      <SelectValue placeholder="Choose a verified complaint" />
                    </SelectTrigger>
                    <SelectContent>
                      {complaints.map((complaint) => (
                        <SelectItem key={complaint.id} value={complaint.id}>
                          {complaint.id} - {complaint.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-orange-500/50 bg-orange-500/10"
                      : "border-orange-500/30 hover:border-orange-500/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white mb-2">Drop files here or click to upload</h3>
                  <p className="text-gray-400 mb-4">Support for images, videos, audio, and documents</p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    disabled={!selectedComplaint}
                  />
                  <Button asChild className="bg-orange-500/80 hover:bg-orange-600/80" disabled={!selectedComplaint}>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                  {!selectedComplaint && (
                    <p className="text-yellow-400 text-sm mt-2">Please select a complaint first</p>
                  )}
                </div>

                {/* Upload Progress */}
                {Object.keys(uploadProgress).length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Uploading Files...</h4>
                    {Object.entries(uploadProgress).map(([fileId, progress]) => {
                      const file = evidenceFiles.find((f) => f.id === fileId)
                      return (
                        <div key={fileId} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{file?.name}</span>
                            <span className="text-orange-400">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Evidence Files</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage uploaded evidence files and their metadata
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evidenceFiles.map((evidence) => (
                    <div
                      key={evidence.id}
                      className="border border-orange-500/20 rounded-lg p-4 hover:border-orange-500/40 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            {getFileIcon(evidence.category)}
                            <div>
                              <h3 className="font-semibold text-white">{evidence.name}</h3>
                              <p className="text-sm text-gray-400">
                                {evidence.type} • {formatFileSize(evidence.size)}
                              </p>
                            </div>
                            <Badge className={getStatusColor(evidence.status)}>{evidence.status.toUpperCase()}</Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                            <div>📋 Complaint: {evidence.complaintId}</div>
                            <div>📅 Uploaded: {evidence.uploadDate}</div>
                            <div>🔗 Hash: {evidence.hash.slice(0, 20)}...</div>
                            <div>📂 Category: {evidence.category}</div>
                          </div>

                          {evidence.description && (
                            <p className="text-sm text-gray-300 bg-black/30 p-2 rounded">{evidence.description}</p>
                          )}
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
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
                            onClick={() => handleDeleteEvidence(evidence.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {evidenceFiles.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <Archive className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No evidence files uploaded yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Upload History</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete history of evidence uploads and modifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evidenceFiles.map((evidence) => (
                    <div key={evidence.id} className="border-l-2 border-orange-500/30 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-white font-medium">{evidence.name}</span>
                        <Badge className={getStatusColor(evidence.status)} variant="outline">
                          {evidence.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        Uploaded on {evidence.uploadDate} for complaint {evidence.complaintId}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Hash: {evidence.hash}</p>
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
