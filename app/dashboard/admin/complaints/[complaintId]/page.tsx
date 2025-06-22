"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminComplaintDetails() {
  const params = useParams()
  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchComplaint = async () => {
      setLoading(true)
      setError("")
      try {
        const token = localStorage.getItem("token")
        const id = params.complaintId as string
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
    if (params.complaintId) fetchComplaint()
  }, [params.complaintId])

  return (
    <DashboardLayout role="admin">
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="bg-[#0f0f11] border border-orange-500 shadow-orange-500/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-400">Complaint Details</CardTitle>
            <CardDescription className="text-orange-200">Full information for this case</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <div className="text-orange-300">Loading...</div>}
            {error && <div className="text-red-400">{error}</div>}
            {complaint && (
              <div className="space-y-4 text-orange-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-orange-400">ID:</span>
                  <Badge variant="secondary" className="bg-[#18181b] text-orange-300 border border-orange-400">{complaint.complaintId || complaint._id || complaint.id}</Badge>
                </div>
                <div><span className="font-bold">Title:</span> {complaint.title}</div>
                <div><span className="font-bold">Description:</span> {complaint.description}</div>
                <div><span className="font-bold">Type:</span> {complaint.type}</div>
                <div><span className="font-bold">Location:</span> {complaint.location}</div>
                <div><span className="font-bold">Status:</span> <Badge className="border border-orange-400 bg-opacity-20 text-orange-300">{complaint.status}</Badge></div>
                <div><span className="font-bold">Date:</span> {complaint.date || (complaint.createdAt ? new Date(complaint.createdAt).toLocaleString() : "")}</div>
                <div><span className="font-bold">Tags:</span> {Array.isArray(complaint.tags) ? complaint.tags.join(", ") : "-"}</div>
                <div><span className="font-bold">IPFS Hash:</span> {complaint.ipfsHash || "-"}</div>
                <div><span className="font-bold">Created By:</span> {(() => {
                  const cb: any = (complaint as any).createdBy;
                  if (cb && typeof cb === "object" && "name" in cb) return cb.name;
                  if (typeof cb === "string") return cb;
                  return complaint.userId || "-";
                })()}</div>
                <div><span className="font-bold">Assigned To:</span> {(() => {
                  const at: any = (complaint as any).assignedTo;
                  if (at && typeof at === "object" && "name" in at) return at.name;
                  if (typeof at === "string") return at;
                  return "-";
                })()}</div>
                <div><span className="font-bold">Created At:</span> {complaint.createdAt ? new Date(complaint.createdAt).toLocaleString() : "-"}</div>
                <div><span className="font-bold">Updated At:</span> {complaint.updatedAt ? new Date(complaint.updatedAt).toLocaleString() : "-"}</div>
                <div className="flex gap-2 mt-4">
                  <Link href="/dashboard/admin">
                    <Button variant="outline" className="border-orange-400 text-orange-300 hover:bg-orange-900/20">Back to Dashboard</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
