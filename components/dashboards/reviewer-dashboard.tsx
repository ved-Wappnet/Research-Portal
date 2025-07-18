"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, AlertTriangle, Star, Calendar, User, Eye } from "lucide-react"
import Link from "next/link"

export function ReviewerDashboard() {
  const stats = [
    { label: "Pending Reviews", value: "5", icon: Clock, color: "text-orange-600" },
    { label: "Completed", value: "23", icon: CheckCircle, color: "text-green-600" },
    { label: "Overdue", value: "1", icon: AlertTriangle, color: "text-red-600" },
    { label: "Avg Rating", value: "4.2", icon: Star, color: "text-yellow-600" },
  ]

  const pendingReviews = [
    {
      id: "1",
      title: "Deep Learning for Medical Image Analysis",
      authors: ["Dr. Smith", "Dr. Johnson"],
      assignedDate: "3 days ago",
      dueDate: "4 days",
      priority: "high",
      progress: 30,
    },
    {
      id: "2",
      title: "Blockchain Applications in Supply Chain",
      authors: ["Prof. Williams", "Dr. Brown"],
      assignedDate: "1 week ago",
      dueDate: "1 week",
      priority: "medium",
      progress: 60,
    },
    {
      id: "3",
      title: "Renewable Energy Grid Integration",
      authors: ["Dr. Davis", "Dr. Wilson"],
      assignedDate: "2 days ago",
      dueDate: "12 days",
      priority: "low",
      progress: 10,
    },
  ]

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "High Priority", variant: "destructive" as const },
      medium: { label: "Medium", variant: "default" as const },
      low: { label: "Low", variant: "secondary" as const },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reviewer Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your review assignments and provide valuable feedback
          </p>
        </div>
        <Button asChild>
          <Link href="/review-queue">View All Reviews</Link>
        </Button>
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
        {/* Pending Reviews */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Papers assigned to you for review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{review.title}</h3>
                    {getPriorityBadge(review.priority)}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {review.authors.join(", ")}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Assigned {review.assignedDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Due in {review.dueDate}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Review Progress</span>
                      <span className="font-medium">{review.progress}%</span>
                    </div>
                    <Progress value={review.progress} className="h-2" />
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    <Button size="sm" asChild>
                      <Link href={`/review/${review.id}`}>Continue Review</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/papers/${review.id}/view`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Paper
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Review Guidelines & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">Remember to evaluate:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Originality and significance</li>
                  <li>Technical quality</li>
                  <li>Clarity and presentation</li>
                  <li>Experimental validation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                  <span className="text-sm font-medium">8 reviews</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Review Time</span>
                  <span className="text-sm font-medium">5.2 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quality Score</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.8/5</span>
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
