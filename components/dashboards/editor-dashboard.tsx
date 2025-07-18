"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Users, Clock, CheckCircle, AlertTriangle, TrendingUp, Calendar, Eye, UserCheck } from "lucide-react"
import Link from "next/link"

export function EditorDashboard() {
  const stats = [
    { label: "Active Submissions", value: "24", icon: FileText, color: "text-blue-600" },
    { label: "In Review", value: "18", icon: Clock, color: "text-orange-600" },
    { label: "Published", value: "156", icon: CheckCircle, color: "text-green-600" },
    { label: "Active Reviewers", value: "45", icon: Users, color: "text-purple-600" },
  ]

  const recentSubmissions = [
    {
      id: "1",
      title: "AI Ethics in Healthcare Applications",
      authors: ["Dr. Anderson", "Prof. Lee"],
      submittedDate: "2 days ago",
      status: "awaiting_reviewers",
      reviewersAssigned: 0,
      reviewersNeeded: 3,
    },
    {
      id: "2",
      title: "Quantum Machine Learning Algorithms",
      authors: ["Dr. Chen", "Dr. Rodriguez"],
      submittedDate: "1 week ago",
      status: "under_review",
      reviewersAssigned: 2,
      reviewersNeeded: 3,
    },
    {
      id: "3",
      title: "Sustainable Computing Architectures",
      authors: ["Prof. Taylor", "Dr. Kim"],
      submittedDate: "3 days ago",
      status: "reviews_complete",
      reviewersAssigned: 3,
      reviewersNeeded: 3,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      awaiting_reviewers: { label: "Awaiting Reviewers", variant: "secondary" as const },
      under_review: { label: "Under Review", variant: "default" as const },
      reviews_complete: { label: "Reviews Complete", variant: "default" as const },
      decision_pending: { label: "Decision Pending", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.awaiting_reviewers
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editorial Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage submissions, reviewers, and publication workflow
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
            <Link href="/submissions">View All Submissions</Link>
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
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest paper submissions requiring editorial attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{submission.title}</h3>
                    {getStatusBadge(submission.status)}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 mr-1" />
                      {submission.authors.join(", ")}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {submission.submittedDate}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Reviewers Assigned</span>
                      <span className="font-medium">
                        {submission.reviewersAssigned}/{submission.reviewersNeeded}
                      </span>
                    </div>
                    <Progress
                      value={(submission.reviewersAssigned / submission.reviewersNeeded) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    <Button size="sm" asChild>
                      <Link href={`/editorial/${submission.id}`}>Manage</Link>
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Editorial Analytics & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link href="/submissions">
                  <FileText className="mr-2 h-4 w-4" />
                  Review Submissions
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/reviewers">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Reviewers
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/analytics">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Editorial Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Review Time</span>
                  <span className="text-sm font-medium">12 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Acceptance Rate</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">+15 submissions</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pending Decisions</span>
                  <span className="text-sm font-medium text-orange-600">7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">3 overdue reviews</p>
                    <p className="text-gray-600 dark:text-gray-400">Require follow-up</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">5 papers awaiting decision</p>
                    <p className="text-gray-600 dark:text-gray-400">Reviews completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
