"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Eye,
  UserCheck,
  Calendar,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function EditorialPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const submissions = [
    {
      id: "s1",
      title: "AI Ethics in Healthcare Applications",
      authors: ["Dr. Anderson", "Prof. Lee"],
      submittedDate: "2024-01-20",
      status: "awaiting_reviewers",
      priority: "high",
      reviewersAssigned: 0,
      reviewersNeeded: 3,
      estimatedReviewTime: "14 days",
      abstract: "This paper examines the ethical implications of AI systems in healthcare...",
      keywords: ["AI ethics", "healthcare", "machine learning"],
    },
    {
      id: "s2",
      title: "Quantum Machine Learning Algorithms",
      authors: ["Dr. Chen", "Dr. Rodriguez"],
      submittedDate: "2024-01-18",
      status: "under_review",
      priority: "medium",
      reviewersAssigned: 2,
      reviewersNeeded: 3,
      estimatedReviewTime: "10 days",
      abstract: "Novel quantum algorithms for machine learning applications...",
      keywords: ["quantum computing", "machine learning", "algorithms"],
    },
    {
      id: "s3",
      title: "Sustainable Computing Architectures",
      authors: ["Prof. Taylor", "Dr. Kim"],
      submittedDate: "2024-01-15",
      status: "reviews_complete",
      priority: "medium",
      reviewersAssigned: 3,
      reviewersNeeded: 3,
      estimatedReviewTime: "Completed",
      abstract: "Energy-efficient computing architectures for sustainable technology...",
      keywords: ["sustainable computing", "green technology", "architecture"],
    },
    {
      id: "s4",
      title: "Blockchain Security Protocols",
      authors: ["Dr. Wilson", "Prof. Davis"],
      submittedDate: "2024-01-12",
      status: "decision_pending",
      priority: "high",
      reviewersAssigned: 3,
      reviewersNeeded: 3,
      estimatedReviewTime: "Decision due",
      abstract: "Advanced security protocols for blockchain networks...",
      keywords: ["blockchain", "security", "cryptography"],
    },
  ]

  const stats = [
    { label: "Total Submissions", value: "47", icon: FileText, color: "text-blue-600", change: "+12%" },
    { label: "Under Review", value: "23", icon: Clock, color: "text-orange-600", change: "+5%" },
    { label: "Pending Decisions", value: "8", icon: AlertTriangle, color: "text-red-600", change: "-2%" },
    { label: "Published This Month", value: "16", icon: CheckCircle, color: "text-green-600", change: "+18%" },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      awaiting_reviewers: { label: "Awaiting Reviewers", variant: "secondary" as const },
      under_review: { label: "Under Review", variant: "default" as const },
      reviews_complete: { label: "Reviews Complete", variant: "default" as const },
      decision_pending: { label: "Decision Pending", variant: "destructive" as const },
      accepted: { label: "Accepted", variant: "default" as const },
      rejected: { label: "Rejected", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.awaiting_reviewers
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "High", variant: "destructive" as const },
      medium: { label: "Medium", variant: "default" as const },
      low: { label: "Low", variant: "secondary" as const },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    )
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    const matchesPriority = priorityFilter === "all" || submission.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editorial Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage submissions, reviews, and publication workflow
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/reviewers">
                <Users className="mr-2 h-4 w-4" />
                Manage Reviewers
              </Link>
            </Button>
            <Button asChild>
              <Link href="/submissions">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <div className="flex items-center text-green-600 text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="submissions" className="w-full">
          <TabsList>
            <TabsTrigger value="submissions">Active Submissions</TabsTrigger>
            <TabsTrigger value="decisions">Pending Decisions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="mt-6">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search submissions by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="awaiting_reviewers">Awaiting Reviewers</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="reviews_complete">Reviews Complete</SelectItem>
                      <SelectItem value="decision_pending">Decision Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submissions List */}
            <div className="space-y-6">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-xl">{submission.title}</CardTitle>
                          {getPriorityBadge(submission.priority)}
                        </div>
                        <CardDescription className="text-base line-clamp-2 mb-3">{submission.abstract}</CardDescription>
                      </div>
                      {getStatusBadge(submission.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Keywords */}
                      <div className="flex flex-wrap gap-2">
                        {submission.keywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>

                      {/* Submission Info */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <UserCheck className="h-4 w-4 text-gray-400" />
                          <span>{submission.authors.join(", ")}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Submitted {submission.submittedDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>
                            {submission.reviewersAssigned}/{submission.reviewersNeeded} reviewers
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{submission.estimatedReviewTime}</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Review Progress</span>
                          <span className="font-medium">
                            {Math.round((submission.reviewersAssigned / submission.reviewersNeeded) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(submission.reviewersAssigned / submission.reviewersNeeded) * 100}
                          className="h-2"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Button size="sm" asChild>
                          <Link href={`/editorial/${submission.id}`}>Manage Submission</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/papers/${submission.id}/view`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Paper
                          </Link>
                        </Button>
                        {submission.reviewersAssigned < submission.reviewersNeeded && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/assign-reviewers/${submission.id}`}>Assign Reviewers</Link>
                          </Button>
                        )}
                        {submission.status === "reviews_complete" && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/editorial/${submission.id}/decision`}>Make Decision</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="decisions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Editorial Decisions</CardTitle>
                <CardDescription>Papers requiring your editorial decision</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions
                    .filter((s) => s.status === "reviews_complete" || s.status === "decision_pending")
                    .map((submission) => (
                      <div key={submission.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{submission.title}</h3>
                          {getStatusBadge(submission.status)}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          by {submission.authors.join(", ")}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" asChild>
                            <Link href={`/editorial/${submission.id}/decision`}>Make Decision</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/papers/${submission.id}/view`}>Review Paper</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">This Month</span>
                      <span className="font-semibold">47 submissions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Review Time</span>
                      <span className="font-semibold">12 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Acceptance Rate</span>
                      <span className="font-semibold">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reviewer Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Reviewers</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Response Time</span>
                      <span className="font-semibold">3.2 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Review Quality Score</span>
                      <span className="font-semibold">4.6/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
