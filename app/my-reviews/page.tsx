"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Eye, Star, Clock, FileText, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function MyReviewsPage() {
  const completedReviews = [
    {
      id: "cr1",
      paperId: "p1",
      paperTitle: "Deep Learning for Medical Image Analysis",
      authors: ["Dr. Johnson", "Prof. Williams"],
      completedDate: "2024-01-25",
      rating: 4,
      recommendation: "accept_minor_revisions",
      reviewTime: 6, // days
      feedback: "Excellent methodology with minor presentation issues",
      status: "published",
    },
    {
      id: "cr2",
      paperId: "p2",
      paperTitle: "Blockchain Applications in Supply Chain Management",
      authors: ["Dr. Chen", "Dr. Rodriguez"],
      completedDate: "2024-01-20",
      rating: 3,
      recommendation: "major_revisions",
      reviewTime: 8,
      feedback: "Interesting approach but needs significant improvements",
      status: "under_revision",
    },
    {
      id: "cr3",
      paperTitle: "Renewable Energy Grid Integration Challenges",
      authors: ["Prof. Davis", "Dr. Wilson"],
      completedDate: "2024-01-15",
      rating: 5,
      recommendation: "accept",
      reviewTime: 4,
      feedback: "Outstanding work with clear practical implications",
      status: "accepted",
    },
  ]

  const reviewStats = {
    totalReviews: 23,
    averageRating: 4.2,
    averageTime: 7.5,
    onTimeRate: 95,
    qualityScore: 4.8,
    thisMonth: 3,
    thisYear: 23,
  }

  const getRecommendationBadge = (recommendation: string) => {
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: "Published", variant: "default" as const },
      accepted: { label: "Accepted", variant: "default" as const },
      under_revision: { label: "Under Revision", variant: "secondary" as const },
      rejected: { label: "Rejected", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return config ? (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    ) : null
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="text-sm ml-1">{rating}/5</span>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your completed reviews and performance metrics
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reviews</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{reviewStats.totalReviews}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{reviewStats.averageRating}</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(reviewStats.averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Review Time</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{reviewStats.averageTime}d</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quality Score</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{reviewStats.qualityScore}</p>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +0.2
                    </div>
                  </div>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="completed" className="w-full">
          <TabsList>
            <TabsTrigger value="completed">Completed Reviews</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="recognition">Recognition</TabsTrigger>
          </TabsList>

          <TabsContent value="completed" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Reviews ({completedReviews.length})</CardTitle>
                <CardDescription>Your review history and outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {completedReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{review.paperTitle}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            by {review.authors.join(", ")}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">"{review.feedback}"</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(review.status)}
                          {getRecommendationBadge(review.recommendation)}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Rating</div>
                          {renderStars(review.rating)}
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Review Time</div>
                          <div className="font-semibold">{review.reviewTime} days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</div>
                          <div className="font-semibold">{review.completedDate}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Status</div>
                          <div className="font-semibold capitalize">{review.status.replace("_", " ")}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/review/${review.id}/view`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Review
                          </Link>
                        </Button>
                        {review.paperId && (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/papers/${review.paperId}/view`}>View Paper</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On-time Completion Rate</span>
                    <span className="font-semibold">{reviewStats.onTimeRate}%</span>
                  </div>
                  <Progress value={reviewStats.onTimeRate} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reviews This Month</span>
                    <span className="font-semibold">{reviewStats.thisMonth}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reviews This Year</span>
                    <span className="font-semibold">{reviewStats.thisYear}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-semibold">{reviewStats.averageTime} days</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Accept</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Minor Revisions</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Major Revisions</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Reject</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recognition" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your reviewing milestones and recognition</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Award className="h-8 w-8 text-yellow-600" />
                    <div>
                      <div className="font-semibold">Expert Reviewer</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Completed 20+ high-quality reviews</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Clock className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-semibold">Timely Reviewer</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">95% on-time completion rate</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Star className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-semibold">Quality Reviewer</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">4.8/5 average quality score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reviewer Ranking</CardTitle>
                  <CardDescription>Your position among peer reviewers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">#12</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Out of 156 active reviewers</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Quality Ranking</span>
                      <span className="font-semibold">#8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Speed Ranking</span>
                      <span className="font-semibold">#15</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Volume Ranking</span>
                      <span className="font-semibold">#20</span>
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
