"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye, BarChart3, TrendingUp, Calendar, FileText, Users, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const submissions = [
    {
      id: "s1",
      title: "AI Ethics in Healthcare Applications",
      authors: ["Dr. Anderson", "Prof. Lee"],
      submittedDate: "2024-01-20",
      status: "under_review",
      category: "Computer Science",
      reviewers: 2,
      downloads: 45,
      views: 123,
    },
    {
      id: "s2",
      title: "Quantum Machine Learning Algorithms",
      authors: ["Dr. Chen", "Dr. Rodriguez"],
      submittedDate: "2024-01-18",
      status: "reviews_complete",
      category: "Physics",
      reviewers: 3,
      downloads: 67,
      views: 189,
    },
    {
      id: "s3",
      title: "Sustainable Computing Architectures",
      authors: ["Prof. Taylor", "Dr. Kim"],
      submittedDate: "2024-01-15",
      status: "accepted",
      category: "Engineering",
      reviewers: 3,
      downloads: 89,
      views: 234,
    },
    {
      id: "s4",
      title: "Blockchain Security Protocols",
      authors: ["Dr. Wilson", "Prof. Davis"],
      submittedDate: "2024-01-12",
      status: "published",
      category: "Computer Science",
      reviewers: 3,
      downloads: 156,
      views: 445,
    },
  ]

  const stats = [
    { label: "Total Submissions", value: "247", change: "+12%", icon: FileText },
    { label: "Under Review", value: "45", change: "+8%", icon: Clock },
    { label: "Published", value: "189", change: "+15%", icon: BarChart3 },
    { label: "Active Reviewers", value: "67", change: "+3%", icon: Users },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      submitted: { label: "Submitted", variant: "secondary" as const },
      under_review: { label: "Under Review", variant: "default" as const },
      reviews_complete: { label: "Reviews Complete", variant: "default" as const },
      accepted: { label: "Accepted", variant: "default" as const },
      published: { label: "Published", variant: "default" as const },
      rejected: { label: "Rejected", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.submitted
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Submissions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive view of all paper submissions</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button asChild>
              <Link href="/analytics">
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
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Submissions</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
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
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="reviews_complete">Reviews Complete</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submissions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
                <CardDescription>All paper submissions in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{submission.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            by {submission.authors.join(", ")}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{submission.submittedDate}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{submission.reviewers} reviewers</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{submission.views} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{submission.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(submission.status)}
                          <Badge variant="outline" className="text-xs">
                            {submission.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" asChild>
                          <Link href={`/editorial/${submission.id}`}>Manage</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/papers/${submission.id}/view`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Papers submitted in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.slice(0, 3).map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{submission.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            by {submission.authors.join(", ")} • {submission.submittedDate}
                          </p>
                        </div>
                        {getStatusBadge(submission.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popular" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular</CardTitle>
                <CardDescription>Papers with highest views and downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((submission, index) => (
                      <div key={submission.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold">{submission.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {submission.views} views • {submission.downloads} downloads
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(submission.status)}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Computer Science", "Physics", "Engineering", "Mathematics", "Biology", "Chemistry"].map((category) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Submissions</span>
                        <span className="font-medium">{submissions.filter((s) => s.category === category).length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Published</span>
                        <span className="font-medium">
                          {submissions.filter((s) => s.category === category && s.status === "published").length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Under Review</span>
                        <span className="font-medium">
                          {submissions.filter((s) => s.category === category && s.status === "under_review").length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
