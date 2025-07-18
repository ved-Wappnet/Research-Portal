"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Calendar, User, Eye, FileText, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ReviewQueuePage() {
  const reviewQueue = [
    {
      id: "1",
      paperId: "p1",
      title: "Deep Learning for Medical Image Analysis",
      authors: ["Dr. Johnson", "Prof. Williams"],
      assignedDate: "2024-01-18",
      dueDate: "2024-01-25",
      priority: "high",
      progress: 30,
      abstract: "This paper presents a novel approach to medical image analysis using deep learning techniques...",
      keywords: ["deep learning", "medical imaging", "computer vision"],
      estimatedTime: "4-6 hours",
    },
    {
      id: "2",
      paperId: "p2",
      title: "Blockchain Applications in Supply Chain Management",
      authors: ["Dr. Chen", "Dr. Rodriguez"],
      assignedDate: "2024-01-15",
      dueDate: "2024-01-22",
      priority: "medium",
      progress: 60,
      abstract: "An investigation into the practical applications of blockchain technology in modern supply chains...",
      keywords: ["blockchain", "supply chain", "distributed systems"],
      estimatedTime: "3-4 hours",
    },
    {
      id: "3",
      paperId: "p3",
      title: "Renewable Energy Grid Integration Challenges",
      authors: ["Prof. Davis", "Dr. Wilson"],
      assignedDate: "2024-01-20",
      dueDate: "2024-01-30",
      priority: "low",
      progress: 10,
      abstract: "This study examines the technical and economic challenges of integrating renewable energy sources...",
      keywords: ["renewable energy", "grid integration", "sustainability"],
      estimatedTime: "5-7 hours",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "High Priority", variant: "destructive" as const, icon: AlertTriangle },
      medium: { label: "Medium", variant: "default" as const, icon: Clock },
      low: { label: "Low", variant: "secondary" as const, icon: Clock },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <config.icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Review Queue</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Papers assigned to you for peer review</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{reviewQueue.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Reviews</div>
          </div>
        </div>

        {/* Review Queue */}
        <div className="space-y-6">
          {reviewQueue.map((review) => {
            const daysUntilDue = getDaysUntilDue(review.dueDate)
            const isOverdue = daysUntilDue < 0
            const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0

            return (
              <Card
                key={review.id}
                className={`${isOverdue ? "border-red-200 bg-red-50 dark:bg-red-950/20" : isDueSoon ? "border-orange-200 bg-orange-50 dark:bg-orange-950/20" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{review.title}</CardTitle>
                      <CardDescription className="text-base line-clamp-2 mb-3">{review.abstract}</CardDescription>
                    </div>
                    {getPriorityBadge(review.priority)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2">
                      {review.keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    {/* Paper Info */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{review.authors.join(", ")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Assigned {review.assignedDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span
                          className={
                            isOverdue ? "text-red-600 font-medium" : isDueSoon ? "text-orange-600 font-medium" : ""
                          }
                        >
                          {isOverdue
                            ? `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? "s" : ""}`
                            : daysUntilDue === 0
                              ? "Due today"
                              : `Due in ${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""}`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>{review.estimatedTime}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Review Progress</span>
                        <span className="font-medium">{review.progress}%</span>
                      </div>
                      <Progress value={review.progress} className="h-2" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 pt-2">
                      <Button size="sm" asChild>
                        <Link href={`/review/${review.id}`}>
                          {review.progress > 0 ? "Continue Review" : "Start Review"}
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/papers/${review.paperId}/view`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Paper
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {reviewQueue.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No pending reviews</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You're all caught up! New review assignments will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
