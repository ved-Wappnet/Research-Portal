"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Plus, Eye, Clock, CheckCircle, AlertCircle, TrendingUp, Users, Calendar } from "lucide-react"
import Link from "next/link"

export function AuthorDashboard() {
  const stats = [
    { label: "Total Papers", value: "12", icon: FileText, color: "text-blue-600" },
    { label: "Published", value: "8", icon: CheckCircle, color: "text-green-600" },
    { label: "Under Review", value: "3", icon: Clock, color: "text-orange-600" },
    { label: "Draft", value: "1", icon: AlertCircle, color: "text-gray-600" },
  ]

  const recentPapers = [
    {
      id: "1",
      title: "Machine Learning Applications in Climate Science",
      status: "under_review",
      lastUpdated: "2 days ago",
      reviewers: 2,
      progress: 60,
    },
    {
      id: "2",
      title: "Quantum Computing and Cryptography",
      status: "revision_required",
      lastUpdated: "1 week ago",
      reviewers: 3,
      progress: 80,
    },
    {
      id: "3",
      title: "Sustainable Energy Systems Analysis",
      status: "published",
      lastUpdated: "2 weeks ago",
      reviewers: 2,
      progress: 100,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Draft", variant: "secondary" as const },
      under_review: { label: "Under Review", variant: "default" as const },
      revision_required: { label: "Revision Required", variant: "destructive" as const },
      published: { label: "Published", variant: "default" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Author Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your research papers and track publication progress
          </p>
        </div>
        <Link href="/papers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Paper
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Papers */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Papers</CardTitle>
            <CardDescription>Your latest research papers and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{paper.title}</h3>
                    {getStatusBadge(paper.status)}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {paper.lastUpdated}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {paper.reviewers} reviewers
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium">{paper.progress}%</span>
                    </div>
                    <Progress value={paper.progress} className="h-2" />
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/papers/${paper.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/papers/${paper.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Analytics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link href="/papers/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Start New Paper
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/papers">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Papers
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/reviews">
                  <Eye className="mr-2 h-4 w-4" />
                  Check Reviews
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publication Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">+2 papers</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Review Time</span>
                  <span className="text-sm font-medium">14 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
