"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Mail, Star, Clock, CheckCircle, AlertTriangle, User, Building, TrendingUp } from "lucide-react"

export default function ReviewersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expertiseFilter, setExpertiseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const reviewers = [
    {
      id: "r1",
      name: "Dr. Sarah Smith",
      email: "sarah.smith@university.edu",
      avatar: "/placeholder.svg",
      institution: "MIT",
      expertise: ["Machine Learning", "AI Ethics", "Healthcare AI"],
      status: "active",
      totalReviews: 24,
      completedReviews: 22,
      averageRating: 4.8,
      averageTime: 8, // days
      currentAssignments: 2,
      joinedDate: "2023-01-15",
      lastActive: "2024-01-20",
    },
    {
      id: "r2",
      name: "Prof. Michael Johnson",
      email: "m.johnson@stanford.edu",
      avatar: "/placeholder.svg",
      institution: "Stanford University",
      expertise: ["Quantum Computing", "Algorithms", "Cryptography"],
      status: "active",
      totalReviews: 31,
      completedReviews: 29,
      averageRating: 4.6,
      averageTime: 12,
      currentAssignments: 1,
      joinedDate: "2022-08-20",
      lastActive: "2024-01-19",
    },
    {
      id: "r3",
      name: "Dr. Emily Chen",
      email: "emily.chen@caltech.edu",
      avatar: "/placeholder.svg",
      institution: "Caltech",
      expertise: ["Sustainable Computing", "Green Technology", "Systems"],
      status: "busy",
      totalReviews: 18,
      completedReviews: 17,
      averageRating: 4.9,
      averageTime: 6,
      currentAssignments: 4,
      joinedDate: "2023-03-10",
      lastActive: "2024-01-18",
    },
    {
      id: "r4",
      name: "Dr. Robert Williams",
      email: "r.williams@oxford.ac.uk",
      avatar: "/placeholder.svg",
      institution: "Oxford University",
      expertise: ["Blockchain", "Security", "Distributed Systems"],
      status: "inactive",
      totalReviews: 15,
      completedReviews: 14,
      averageRating: 4.4,
      averageTime: 15,
      currentAssignments: 0,
      joinedDate: "2022-11-05",
      lastActive: "2023-12-15",
    },
  ]

  const stats = [
    { label: "Total Reviewers", value: "156", change: "+8", icon: User },
    { label: "Active Reviewers", value: "89", change: "+5", icon: CheckCircle },
    { label: "Avg Response Time", value: "9.2 days", change: "-1.3", icon: Clock },
    { label: "Review Quality", value: "4.7/5", change: "+0.1", icon: Star },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Active", variant: "default" as const, icon: CheckCircle },
      busy: { label: "Busy", variant: "secondary" as const, icon: Clock },
      inactive: { label: "Inactive", variant: "destructive" as const, icon: AlertTriangle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <config.icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
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

  const filteredReviewers = reviewers.filter((reviewer) => {
    const matchesSearch =
      reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reviewer.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reviewer.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesExpertise =
      expertiseFilter === "all" ||
      reviewer.expertise.some((exp) => exp.toLowerCase().includes(expertiseFilter.toLowerCase()))
    const matchesStatus = statusFilter === "all" || reviewer.status === statusFilter
    return matchesSearch && matchesExpertise && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reviewer Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your pool of peer reviewers and their assignments
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Invite Reviewers
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Reviewer
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
            <TabsTrigger value="all">All Reviewers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="expertise">By Expertise</TabsTrigger>
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
                        placeholder="Search reviewers by name, institution, or expertise..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Expertise</SelectItem>
                      <SelectItem value="machine learning">Machine Learning</SelectItem>
                      <SelectItem value="quantum">Quantum Computing</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="ai ethics">AI Ethics</SelectItem>
                      <SelectItem value="sustainable">Sustainable Computing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reviewers List */}
            <div className="grid gap-6">
              {filteredReviewers.map((reviewer) => (
                <Card key={reviewer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                          <AvatarFallback className="text-lg">{reviewer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{reviewer.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <Building className="h-4 w-4" />
                            <span>{reviewer.institution}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="h-4 w-4" />
                            <span>{reviewer.email}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(reviewer.status)}
                    </div>

                    {/* Expertise */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {reviewer.expertise.map((exp) => (
                          <Badge key={exp} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">{reviewer.totalReviews}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          {Math.round((reviewer.completedReviews / reviewer.totalReviews) * 100)}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Completion Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">{reviewer.averageTime}d</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Avg Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-orange-600">{reviewer.currentAssignments}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Current</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm font-medium">Review Quality</span>
                        {renderStars(reviewer.averageRating)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Last active: {reviewer.lastActive}</div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button size="sm">Assign Review</Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Reviewers</CardTitle>
                <CardDescription>Reviewers currently available for assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewers
                    .filter((r) => r.status === "active")
                    .map((reviewer) => (
                      <div key={reviewer.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                              <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{reviewer.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {reviewer.currentAssignments} current assignments
                              </div>
                            </div>
                          </div>
                          <Button size="sm">Assign Review</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Reviewers with highest quality ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviewers
                      .sort((a, b) => b.averageRating - a.averageRating)
                      .slice(0, 5)
                      .map((reviewer, index) => (
                        <div key={reviewer.id} className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                            <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{reviewer.name}</div>
                            <div className="flex items-center space-x-1">{renderStars(reviewer.averageRating)}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fastest Reviewers</CardTitle>
                  <CardDescription>Reviewers with shortest average review time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviewers
                      .sort((a, b) => a.averageTime - b.averageTime)
                      .slice(0, 5)
                      .map((reviewer, index) => (
                        <div key={reviewer.id} className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                            <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{reviewer.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {reviewer.averageTime} days average
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expertise" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Machine Learning",
                "Quantum Computing",
                "Blockchain",
                "AI Ethics",
                "Sustainable Computing",
                "Healthcare AI",
              ].map((expertise) => (
                <Card key={expertise}>
                  <CardHeader>
                    <CardTitle className="text-lg">{expertise}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Available Reviewers</span>
                        <span className="font-medium">
                          {
                            reviewers.filter(
                              (r) =>
                                r.expertise.some((exp) => exp.toLowerCase().includes(expertise.toLowerCase())) &&
                                r.status === "active",
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Experts</span>
                        <span className="font-medium">
                          {
                            reviewers.filter((r) =>
                              r.expertise.some((exp) => exp.toLowerCase().includes(expertise.toLowerCase())),
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg Rating</span>
                        <span className="font-medium">
                          {(
                            reviewers
                              .filter((r) =>
                                r.expertise.some((exp) => exp.toLowerCase().includes(expertise.toLowerCase())),
                              )
                              .reduce((acc, r) => acc + r.averageRating, 0) /
                            reviewers.filter((r) =>
                              r.expertise.some((exp) => exp.toLowerCase().includes(expertise.toLowerCase())),
                            ).length
                          ).toFixed(1)}
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
