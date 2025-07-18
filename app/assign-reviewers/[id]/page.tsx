"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search, Star, Clock, CheckCircle, User, Building, Send, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AssignReviewersPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>([])
  const [customMessage, setCustomMessage] = useState("")
  const [dueDate, setDueDate] = useState("2024-02-15")

  // Mock paper data
  const paper = {
    id: params.id,
    title: "AI Ethics in Healthcare Applications",
    authors: ["Dr. Anderson", "Prof. Lee"],
    abstract: "This paper examines the ethical implications of AI systems in healthcare...",
    keywords: ["AI ethics", "healthcare", "machine learning", "bias", "privacy"],
    submittedDate: "2024-01-20",
  }

  // Mock available reviewers
  const availableReviewers = [
    {
      id: "r1",
      name: "Dr. Sarah Smith",
      email: "sarah.smith@university.edu",
      avatar: "/placeholder.svg",
      institution: "MIT",
      expertise: ["Machine Learning", "AI Ethics", "Healthcare AI"],
      status: "available",
      totalReviews: 24,
      averageRating: 4.8,
      averageTime: 8,
      currentAssignments: 1,
      matchScore: 95, // How well they match the paper
      lastReview: "2024-01-15",
    },
    {
      id: "r2",
      name: "Prof. Michael Johnson",
      email: "m.johnson@stanford.edu",
      avatar: "/placeholder.svg",
      institution: "Stanford University",
      expertise: ["AI Ethics", "Medical AI", "Privacy"],
      status: "available",
      totalReviews: 31,
      averageRating: 4.6,
      averageTime: 12,
      currentAssignments: 2,
      matchScore: 88,
      lastReview: "2024-01-10",
    },
    {
      id: "r3",
      name: "Dr. Emily Chen",
      email: "emily.chen@caltech.edu",
      avatar: "/placeholder.svg",
      institution: "Caltech",
      expertise: ["Healthcare Technology", "AI Systems", "Ethics"],
      status: "busy",
      totalReviews: 18,
      averageRating: 4.9,
      averageTime: 6,
      currentAssignments: 4,
      matchScore: 82,
      lastReview: "2024-01-08",
    },
    {
      id: "r4",
      name: "Dr. Robert Williams",
      email: "r.williams@oxford.ac.uk",
      avatar: "/placeholder.svg",
      institution: "Oxford University",
      expertise: ["Machine Learning", "Healthcare", "Data Privacy"],
      status: "available",
      totalReviews: 15,
      averageRating: 4.4,
      averageTime: 15,
      currentAssignments: 1,
      matchScore: 78,
      lastReview: "2024-01-05",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: "Available", variant: "default" as const, icon: CheckCircle },
      busy: { label: "Busy", variant: "secondary" as const, icon: Clock },
      unavailable: { label: "Unavailable", variant: "destructive" as const, icon: AlertTriangle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <config.icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  const getMatchBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-600">Excellent Match</Badge>
    if (score >= 80) return <Badge className="bg-blue-600">Good Match</Badge>
    if (score >= 70) return <Badge variant="secondary">Fair Match</Badge>
    return <Badge variant="outline">Low Match</Badge>
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
        <span className="text-sm ml-1">{rating}</span>
      </div>
    )
  }

  const handleReviewerToggle = (reviewerId: string) => {
    setSelectedReviewers((prev) =>
      prev.includes(reviewerId) ? prev.filter((id) => id !== reviewerId) : [...prev, reviewerId],
    )
  }

  const handleAssignReviewers = () => {
    console.log("Assigning reviewers:", selectedReviewers)
    console.log("Due date:", dueDate)
    console.log("Custom message:", customMessage)
    // In a real app, this would make an API call
  }

  const filteredReviewers = availableReviewers
    .filter(
      (reviewer) =>
        reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reviewer.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reviewer.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => b.matchScore - a.matchScore)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/editorial/${params.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Submission
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assign Reviewers</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Select qualified reviewers for this paper</p>
            </div>
          </div>
          <Button onClick={handleAssignReviewers} disabled={selectedReviewers.length === 0}>
            <Send className="mr-2 h-4 w-4" />
            Assign {selectedReviewers.length} Reviewer{selectedReviewers.length !== 1 ? "s" : ""}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Paper Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paper Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{paper.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {paper.authors.join(", ")}</p>
                  <p className="text-sm leading-relaxed mb-3">{paper.abstract}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Submitted: {paper.submittedDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Assignment Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Review Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dueDate">Review Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Custom Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a custom message for the reviewers..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Selected Reviewers</h4>
                  {selectedReviewers.length === 0 ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No reviewers selected</p>
                  ) : (
                    <div className="space-y-1">
                      {selectedReviewers.map((id) => {
                        const reviewer = availableReviewers.find((r) => r.id === id)
                        return reviewer ? (
                          <div key={id} className="text-sm font-medium">
                            {reviewer.name}
                          </div>
                        ) : null
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviewer Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search reviewers by name, institution, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Available Reviewers */}
            <Card>
              <CardHeader>
                <CardTitle>Available Reviewers ({filteredReviewers.length})</CardTitle>
                <CardDescription>Reviewers are ranked by expertise match with the paper</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReviewers.map((reviewer) => (
                    <div
                      key={reviewer.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        selectedReviewers.includes(reviewer.id)
                          ? "border-primary bg-primary/5"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          checked={selectedReviewers.includes(reviewer.id)}
                          onCheckedChange={() => handleReviewerToggle(reviewer.id)}
                          disabled={reviewer.status === "unavailable"}
                        />

                        <Avatar className="h-12 w-12">
                          <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                          <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{reviewer.name}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <Building className="h-4 w-4" />
                                <span>{reviewer.institution}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              {getStatusBadge(reviewer.status)}
                              {getMatchBadge(reviewer.matchScore)}
                            </div>
                          </div>

                          {/* Expertise */}
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2">
                              {reviewer.expertise.map((exp) => (
                                <Badge
                                  key={exp}
                                  variant={
                                    paper.keywords.some(
                                      (k) =>
                                        k.toLowerCase().includes(exp.toLowerCase()) ||
                                        exp.toLowerCase().includes(k.toLowerCase()),
                                    )
                                      ? "default"
                                      : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {exp}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-blue-600">{reviewer.totalReviews}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Reviews</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-green-600">{reviewer.averageTime}d</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Avg Time</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-purple-600">{reviewer.currentAssignments}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Current</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center">
                                {renderStars(reviewer.averageRating)}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                            Last review: {reviewer.lastReview} • Match score: {reviewer.matchScore}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredReviewers.length === 0 && (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No reviewers found matching your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
