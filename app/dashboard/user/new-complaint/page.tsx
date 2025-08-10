"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Send, MapPin, Calendar, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/app/context/AuthContext"

export default function NewComplaintPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: "" })
  const router = useRouter()
  const { user } = useAuth();

  const complaintTypes = [
    "Environmental",
    "Infrastructure",
    "Public Health",
    "Traffic & Transportation",
    "Public Safety",
    "Corruption",
    "Consumer Rights",
    "Other",
  ]

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus({ type: null, message: "" });

  try {
    const userId = localStorage.getItem('userID');
    const token = localStorage.getItem('token'); // <-- get token

    if (!userId || !token) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'User not authenticated. Please log in again.' 
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      type,
      location: location.trim(),
      date,
      tags: tags.map(tag => tag.toLowerCase().trim()),
      userId
    };

    const response = await fetch('http://localhost:5000/api/complaints/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // <-- add this line
      },
      body: JSON.stringify(payload)
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Success response:', result);
    if (result.complaintId) {
      localStorage.setItem('lastComplaintId', result.complaintId);
    }
    setSubmitStatus({
      type: 'success',
      message: 'Complaint submitted successfully! Redirecting to dashboard...'
    });

    // Reset form
    setTitle("");
    setDescription("");
    setType("");
    setLocation("");
    setDate("");
    setTags([]);
    setNewTag("");

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push("/dashboard/user");
    }, 2000);

  } catch (error) {
    console.error("Detailed error:", error);
    setSubmitStatus({
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to submit complaint. Please try again.'
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <DashboardLayout role="user">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">File New Complaint</h1>
          <p className="text-gray-600">Submit your complaint securely on the blockchain</p>
        </div>

        {/* Status Alert */}
        {submitStatus.type && (
          <Alert className={submitStatus.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            {submitStatus.type === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Complaint Details</CardTitle>
            <CardDescription>
              Provide detailed information about your complaint. All data will be cryptographically secured.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Complaint Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of your complaint"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the issue, including what happened, when, and any other relevant information..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Type and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Complaint Type *</Label>
                  <Select value={type} onValueChange={setType} required disabled={isSubmitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complaint type" />
                    </SelectTrigger>
                    <SelectContent>
                      {complaintTypes.map((complaintType) => (
                        <SelectItem key={complaintType} value={complaintType}>
                          {complaintType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date of Incident *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Enter the location where the incident occurred"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add relevant tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    disabled={isSubmitting}
                  />
                  <Button type="button" onClick={addTag} variant="outline" disabled={isSubmitting}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                          disabled={isSubmitting}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.back()} 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? (
                    <>
                      <Send className="h-4 w-4 mr-2 animate-pulse" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Complaint
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Send className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Blockchain Security</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Your complaint will be cryptographically hashed and stored on the blockchain, ensuring tamper-proof
                  evidence and complete transparency throughout the process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}