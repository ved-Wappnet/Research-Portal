"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Eye, Users, MessageSquare, Clock, CheckCircle, AlertTriangle, FileText, Star } from "lucide-react"
import Link from "next/link"

export default function EditorialSubmissionPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock submission data
  const submission = {
    id: params.id,
    title: "AI Ethics in Healthcare Applications",
    authors: ["Dr. Anderson", "Prof. Lee"],
    submittedDate: "2024-01-20",
    status: "under_review",
    priority: "high",
    abstract:
      "This paper examines the ethical implications of AI systems in healthcare, focusing on bias, transparency, and patient privacy concerns.",
    keywords: ["AI ethics", "healthcare", "machine learning", "bias", "privacy"],
    reviewers: [
      {
        id: "r1",
        name: "Dr. Smith",
        avatar: "/placeholder.svg",
        expertise: ["AI Ethics", "Healthcare Technology"],
        status: "completed",
        assignedDate: "2024-01-21",
        completedDate: "2024-01-25",
        rating: 4,
        recommendation: "accept_minor_revisions",
      },
      {
        id: "r2",
        name: "Prof. Johnson",
        avatar: "/placeholder.svg",
        expertise: ["Medical AI", "Ethics"],
        status: "in_progress",
        assignedDate: "2024-01-21",
        completedDate: null,
        rating: null,
        recommendation: null,
      },
      {
        id: "r3",
        name: "Dr. Williams",
        avatar: "/placeholder.svg",
        expertise: ["Healthcare Systems", "AI Policy"],
        status: "pending",
        assignedDate: "2024-01-22",
        completedDate: null,
        rating: null,
        recommendation: null,
      },
    ],
    timeline: [
      { date: "2024-01-20", event: "Paper submitted", type: "submission" },
      { date: "2024-01-21", event: "Reviewers assigned", type: "assignment" },
      { date: "2024-01-25", event: "First review completed", type: "review" },
    ],
    metrics: {
      viewCount: 45,
      downloadCount: 12,
      citationCount: 0,
      socialShares: 8,
    },
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
      in_progress: { label: "In Progress", variant: "default" as const, icon: Clock },
      completed: { label: "Completed", variant: "default" as const, icon: CheckCircle },
      overdue: { label: "Overdue", variant: "destructive" as const, icon: AlertTriangle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <config.icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  const getRecommendationBadge = (recommendation: string | null) => {
    if (!recommendation) return null

    const recConfig = {
      accept: { label: "Accept", variant: "default" as const },
      accept_minor_revisions: { label: "Accept with Minor Revisions", variant: "default" as const },
      major_revisions: { label: "Major Revisions Required", variant: "destructive" as const },
      reject: { label: "Reject", variant: "destructive" as const },
    }

    const config = recConfig[recommendation as keyof typeof recConfig]
    return config ? (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    ) : null
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400 text-sm">Not rated</span>

    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="text-sm ml-1">{rating}/5</span>
      </div>
    )
  }

  const completedReviews = submission.reviewers.filter((r) => r.status === "completed").length
  const totalReviewers = submission.reviewers.length
  const reviewProgress = (completedReviews / totalReviewers) * 100

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/editorial">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editorial
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Submission</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Editorial oversight for paper review process</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/papers/${submission.id}/view`}>
                <Eye className="mr-2 h-4 w-4" />
                View Paper
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/assign-reviewers/${submission.id}`}>
                <Users className="mr-2 h-4 w-4" />
                Manage Reviewers
              </Link>
            </Button>
          </div>
        </div>

        {/* Paper Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{submission.title}</CardTitle>
                <CardDescription className="text-base">
                  by {submission.authors.join(", ")} • Submitted {submission.submittedDate}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="capitalize">
                {submission.status.replace("_", " ")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">{submission.abstract}</p>

              <div className="flex flex-wrap gap-2">
                {submission.keywords.map((keyword) => (
                  <Badge key={keyword} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>

              <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{submission.metrics.viewCount}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{submission.metrics.downloadCount}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{submission.metrics.citationCount}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Citations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{submission.metrics.socialShares}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Shares</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Review Overview</TabsTrigger>
            <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="decision">Decision</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Review Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Review Progress</CardTitle>
                    <CardDescription>
                      {completedReviews} of {totalReviewers} reviews completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Overall Progress</span>
                        <span className="font-medium">{Math.round(reviewProgress)}%</span>
                      </div>
                      <Progress value={reviewProgress} className="h-3" />

                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{completedReviews}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-orange-600">
                            {submission.reviewers.filter((r) => r.status === "in_progress").length}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">In Progress</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-600">
                            {submission.reviewers.filter((r) => r.status === "pending").length}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Pending</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Completed Reviews Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Review Summary</CardTitle>
                    <CardDescription>Summary of completed reviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submission.reviewers
                      .filter((reviewer) => reviewer.status === "completed")
                      .map((reviewer) => (
                        <div key={reviewer.id} className="border rounded-lg p-4 mb-4 last:mb-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                                <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{reviewer.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  Completed {reviewer.completedDate}
                                </div>
                              </div>
                            </div>
                            {getRecommendationBadge(reviewer.recommendation)}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                                {renderStars(reviewer.rating)}
                              </div>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/review/${reviewer.id}/view`}>View Full Review</Link>
                            </Button>
                          </div>
                        </div>
                      ))}

                    {completedReviews === 0 && (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No reviews completed yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" asChild>
                      <Link href={`/assign-reviewers/${submission.id}`}>
                        <Users className="mr-2 h-4 w-4" />
                        Assign Reviewers
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href={`/papers/${submission.id}/view`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Paper
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Authors
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Submission Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Priority</span>
                      <Badge variant="destructive" className="text-xs">
                        High
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Word Count</span>
                      <span>8,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Pages</span>
                      <span>24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Figures</span>
                      <span>6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">References</span>
                      <span>42</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviewers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Reviewers</CardTitle>
                <CardDescription>Manage reviewers for this submission</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submission.reviewers.map((reviewer) => (
                    <div key={reviewer.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                            <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-lg">{reviewer.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {reviewer.expertise.join(", ")}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Assigned {reviewer.assignedDate}
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(reviewer.status)}
                      </div>

                      {reviewer.status === "completed" && (
                        <div className="bg-muted p-3 rounded-lg mb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">Review Completed</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{reviewer.completedDate}</div>
                            </div>
                            <div className="text-right">
                              {renderStars(reviewer.rating)}
                              {getRecommendationBadge(reviewer.recommendation)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        {reviewer.status === "completed" ? (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/review/${reviewer.id}/view`}>View Review</Link>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Contact Reviewer
                        </Button>
                        <Button size="sm" variant="destructive">
                          Remove Reviewer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Timeline</CardTitle>
                <CardDescription>Track the progress of this submission</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submission.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {event.type === "submission" && <FileText className="h-5 w-5 text-blue-500" />}
                        {event.type === "assignment" && <Users className="h-5 w-5 text-green-500" />}
                        {event.type === "review" && <CheckCircle className="h-5 w-5 text-purple-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{event.event}</p>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decision" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Editorial Decision</CardTitle>
                <CardDescription>
                  {completedReviews < totalReviewers
                    ? `Waiting for ${totalReviewers - completedReviews} more review(s) before making decision`
                    : "All reviews completed. Ready to make editorial decision."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedReviews === totalReviewers ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button size="lg" className="h-16">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Accept Paper
                      </Button>
                      <Button size="lg" variant="outline" className="h-16 bg-transparent">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        Request Revisions
                      </Button>
                    </div>
                    <Button size="lg" variant="destructive" className="w-full h-16">
                      Reject Paper
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Waiting for all reviews to be completed before making decision
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
