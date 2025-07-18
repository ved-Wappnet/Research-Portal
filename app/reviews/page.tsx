"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, MessageSquare, Calendar, Star } from "lucide-react"
import Link from "next/link"

export default function ReviewsPage() {
  const paperReviews = [
    {
      id: "1",
      paperId: "1",
      paperTitle: "Machine Learning Applications in Climate Science",
      reviewer: "Dr. Anderson",
      rating: 4,
      status: "completed",
      submittedDate: "2024-01-18",
      summary:
        "This paper presents a comprehensive analysis of ML applications in climate science. The methodology is sound and the results are promising.",
      strengths: "Strong theoretical foundation, comprehensive dataset analysis, clear presentation",
      weaknesses: "Limited discussion of computational complexity, could benefit from more real-world validation",
      recommendation: "Accept with minor revisions",
    },
    {
      id: "2",
      paperId: "1",
      paperTitle: "Machine Learning Applications in Climate Science",
      reviewer: "Prof. Lee",
      rating: 3,
      status: "in_progress",
      submittedDate: null,
      summary: "Review in progress...",
      strengths: "",
      weaknesses: "",
      recommendation: "",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Completed", variant: "default" as const },
      in_progress: { label: "In Progress", variant: "secondary" as const },
      pending: { label: "Pending", variant: "outline" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reviews</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track reviews for your submitted papers</p>
          </div>
        </div>

        <Tabs defaultValue="received" className="w-full">
          <TabsList>
            <TabsTrigger value="received">Reviews Received</TabsTrigger>
            <TabsTrigger value="statistics">Review Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="mt-6">
            <div className="space-y-6">
              {paperReviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{review.paperTitle}</CardTitle>
                        <CardDescription className="mt-1">Review by {review.reviewer}</CardDescription>
                      </div>
                      {getStatusBadge(review.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {review.status === "completed" && (
                        <>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium">Rating:</span>
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{review.rating}/5</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="h-4 w-4" />
                              Submitted {review.submittedDate}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Summary</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{review.summary}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Strengths</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{review.strengths}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Weaknesses</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{review.weaknesses}</p>
                            </div>
                          </div>

                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold text-sm mb-2">Recommendation</h4>
                            <p className="text-sm">{review.recommendation}</p>
                          </div>
                        </>
                      )}

                      {review.status === "in_progress" && (
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-400">Review is currently in progress</p>
                        </div>
                      )}

                      <div className="flex items-center space-x-2 pt-2">
                        <Button size="sm" asChild>
                          <Link href={`/papers/${review.paperId}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Paper
                          </Link>
                        </Button>
                        {review.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Respond to Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Reviews</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Rating</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(4)}
                        <span className="text-sm font-semibold ml-1">4.2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending Reviews</span>
                      <span className="font-semibold text-orange-600">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Review Time</span>
                      <span className="font-semibold">14 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fastest Review</span>
                      <span className="font-semibold">7 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Longest Review</span>
                      <span className="font-semibold">28 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Accept</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Minor Revisions</span>
                        <span>30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Major Revisions</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
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
