"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Tag, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface Complaint {
  complaintId: string
  title: string
  description: string
  type: string
  location: string
  date: string
  tags: string[]
  status: string
  createdAt: string
  updatedAt: string
}

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true)
      setError("")
      try {
        const userId = localStorage.getItem("userID")
        const token = localStorage.getItem("token")
        if (!userId || !token) {
          setError("User not authenticated.")
          setLoading(false)
          return
        }
        // Fetch all complaints for this user from the correct endpoint
        const res = await fetch(`https://blockevid3-0-bc.onrender.com/api/complaints/my-complaints/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) {
          throw new Error("Failed to fetch complaints")
        }
        const data = await res.json()
        // If the response is an array, use it directly; otherwise, use data.complaints
        const complaintsArray = Array.isArray(data) ? data : (data.complaints || [])
        setComplaints(complaintsArray)
      } catch (err: any) {
        setError(err.message || "Failed to load complaints")
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

  const handleView = async (complaintId: string) => {
    router.push(`/dashboard/user/complaints/${complaintId}`)
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-8 min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
      {/* Futuristic glowing background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-transparent rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-2xl animate-pulse z-0" />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-orange-400 tracking-tight drop-shadow-glow">My Complaints</h1>
        <p className="text-orange-200 mb-8 text-lg font-medium">Track the status and progress of your filed complaints</p>
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-400"></div>
            <span className="ml-4 text-orange-300 text-lg">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-red-400 text-lg font-semibold text-center py-8">{error}</div>
        ) : complaints.length === 0 ? (
          <div className="text-orange-400 text-center text-lg py-8">No complaints found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complaints.map((c) => (
              <div key={c.complaintId} className="relative group border border-orange-500 rounded-2xl p-6 bg-gradient-to-br from-black via-zinc-900 to-black shadow-xl shadow-orange-900/10 hover:scale-[1.025] hover:shadow-orange-500/30 transition-all duration-300 overflow-hidden">
                {/* Futuristic accent bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-400 via-orange-600/60 to-orange-900/0 rounded-l-2xl group-hover:shadow-lg group-hover:shadow-orange-400/40 transition-all" />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xl text-orange-300 tracking-wide drop-shadow-glow">{c.title}</span>
                  <Badge variant="secondary" className="capitalize bg-orange-500 text-black border-none shadow-orange-400/40 shadow-md">
                    {c.status}
                  </Badge>
                </div>
                <div className="text-orange-200 mb-3 line-clamp-2 text-base font-medium opacity-90">
                  {c.description}
                </div>
                <div className="flex flex-wrap gap-4 text-orange-400 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-orange-400" /> {c.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-orange-400" /> {c.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-4 w-4 text-orange-400" /> {c.type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-orange-500 text-orange-300 bg-black/60 backdrop-blur-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 text-black font-bold shadow-lg shadow-orange-500/30 hover:from-orange-400 hover:to-orange-500 hover:scale-105 transition-all duration-200 group-hover:shadow-orange-400/60"
                  onClick={() => handleView(c.complaintId)}
                >
                  <Eye className="h-5 w-5 mr-2 text-black" /> View Details
                </Button>
                {/* Futuristic glow ring */}
                <div className="absolute -inset-1 rounded-2xl border-2 border-orange-500/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 animate-pulse" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
