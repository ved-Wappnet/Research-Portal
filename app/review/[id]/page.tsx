"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Send, Eye, Star, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ReviewPage({ params }: { params: { id: string } }) {
  const [reviewData, setReviewData] = useState({
    rating: [4],
    confidenceLevel: [4],
    recommendation: "",
    summary: "",
    strengths: "",
    weaknesses: "",
    detailedComments: "",
    technicalQuality: [4],
    novelty: [3],
    clarity: [4],
    significance: [3],
  })

  const [saving, setSaving] = useState(false)

  // Mock paper data
  const paper = {
    id: "p1",
    title: "Deep Learning for Medical Image Analysis",
    authors: ["Dr. Johnson", "Prof. Williams"],
    abstract:
      "This paper presents a novel approach to medical image analysis using deep learning techniques, specifically focusing on automated diagnosis of medical conditions from radiological images.",
    keywords: ["deep learning", "medical imaging", "computer vision", "automated diagnosis"],
    content: "Full paper content would be displayed here...",
    submittedDate: "2024-01-15",
    dueDate: "2024-01-25",
  }

  const handleSliderChange = (field: string, value: number[]) => {
    setReviewData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTextChange = (field: string, value: string) => {
    setReviewData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateProgress = () => {
    const fields = ["summary", "strengths", "weaknesses", "recommendation"]
    const completed = fields.filter(
      (field) => reviewData[field as keyof typeof reviewData].toString().trim().length > 0,
    ).length
    return (completed / fields.length) * 100
  }

  const handleSave = async (submit = false) => {
    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(submit ? "Submitting review:" : "Saving review:", reviewData)
      if (submit) {
        // Redirect to review queue after submission
      }
    } catch (error) {
      console.error("Error saving review:", error)
    } finally {
      setSaving(false)
    }
  }

  const progress = calculateProgress()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/review-queue">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Queue
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Review Paper</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Provide comprehensive feedback for peer review</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave(true)} disabled={saving || progress < 100}>
              <Send className="mr-2 h-4 w-4" />
              Submit Review
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Review Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Paper Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paper Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{paper.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {paper.authors.join(", ")}</p>
                  <p className="text-sm leading-relaxed">{paper.abstract}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Submitted: {paper.submittedDate}</p>
                  <p>Review Due: {paper.dueDate}</p>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Paper
                </Button>
              </CardContent>
            </Card>

            {/* Review Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Review Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Technical Quality</p>
                      <p className="text-gray-600 dark:text-gray-400">Assess methodology, experiments, and analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Novelty & Significance</p>
                      <p className="text-gray-600 dark:text-gray-400">Evaluate originality and impact</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Clarity & Presentation</p>
                      <p className="text-gray-600 dark:text-gray-400">Review writing quality and organization</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="evaluation" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
                <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
                <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
              </TabsList>

              <TabsContent value="evaluation" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paper Evaluation</CardTitle>
                    <CardDescription>Rate different aspects of the paper</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Overall Rating</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Poor</span>
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < reviewData.rating[0] ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">Excellent</span>
                        </div>
                        <Slider
                          value={reviewData.rating}
                          onValueChange={(value) => handleSliderChange("rating", value)}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                          Rating: {reviewData.rating[0]}/5
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium">Technical Quality</Label>
                        <div className="mt-2">
                          <Slider
                            value={reviewData.technicalQuality}
                            onValueChange={(value) => handleSliderChange("technicalQuality", value)}
                            max={5}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
                            {reviewData.technicalQuality[0]}/5
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Novelty</Label>
                        <div className="mt-2">
                          <Slider
                            value={reviewData.novelty}
                            onValueChange={(value) => handleSliderChange("novelty", value)}
                            max={5}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
                            {reviewData.novelty[0]}/5
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Clarity</Label>
                        <div className="mt-2">
                          <Slider
                            value={reviewData.clarity}
                            onValueChange={(value) => handleSliderChange("clarity", value)}
                            max={5}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
                            {reviewData.clarity[0]}/5
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Significance</Label>
                        <div className="mt-2">
                          <Slider
                            value={reviewData.significance}
                            onValueChange={(value) => handleSliderChange("significance", value)}
                            max={5}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
                            {reviewData.significance[0]}/5
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Confidence Level</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        How confident are you in your assessment?
                      </p>
                      <div className="mt-2">
                        <Slider
                          value={reviewData.confidenceLevel}
                          onValueChange={(value) => handleSliderChange("confidenceLevel", value)}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-1">
                          Confidence: {reviewData.confidenceLevel[0]}/5
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Feedback</CardTitle>
                    <CardDescription>Provide comprehensive feedback to help improve the paper</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="summary">Summary *</Label>
                      <Textarea
                        id="summary"
                        placeholder="Provide a brief summary of the paper and your overall assessment..."
                        value={reviewData.summary}
                        onChange={(e) => handleTextChange("summary", e.target.value)}
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="strengths">Strengths *</Label>
                      <Textarea
                        id="strengths"
                        placeholder="List the main strengths of the paper..."
                        value={reviewData.strengths}
                        onChange={(e) => handleTextChange("strengths", e.target.value)}
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="weaknesses">Weaknesses *</Label>
                      <Textarea
                        id="weaknesses"
                        placeholder="Identify areas that need improvement..."
                        value={reviewData.weaknesses}
                        onChange={(e) => handleTextChange("weaknesses", e.target.value)}
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="detailedComments">Detailed Comments</Label>
                      <Textarea
                        id="detailedComments"
                        placeholder="Provide specific, actionable feedback for the authors..."
                        value={reviewData.detailedComments}
                        onChange={(e) => handleTextChange("detailedComments", e.target.value)}
                        rows={6}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendation" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Final Recommendation</CardTitle>
                    <CardDescription>Make your recommendation for this paper</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Recommendation *</Label>
                      <RadioGroup
                        value={reviewData.recommendation}
                        onValueChange={(value) => handleTextChange("recommendation", value)}
                        className="mt-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="accept" id="accept" />
                          <Label htmlFor="accept" className="font-normal">
                            <span className="font-medium text-green-600">Accept</span> - Paper is ready for publication
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="minor-revision" id="minor-revision" />
                          <Label htmlFor="minor-revision" className="font-normal">
                            <span className="font-medium text-blue-600">Accept with Minor Revisions</span> - Small
                            changes needed
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="major-revision" id="major-revision" />
                          <Label htmlFor="major-revision" className="font-normal">
                            <span className="font-medium text-orange-600">Major Revisions Required</span> - Significant
                            changes needed
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="reject" id="reject" />
                          <Label htmlFor="reject" className="font-normal">
                            <span className="font-medium text-red-600">Reject</span> - Paper is not suitable for
                            publication
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {reviewData.recommendation && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Review Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Overall Rating:</span>
                            <span className="font-medium">{reviewData.rating[0]}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Confidence:</span>
                            <span className="font-medium">{reviewData.confidenceLevel[0]}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Recommendation:</span>
                            <span className="font-medium capitalize">
                              {reviewData.recommendation.replace("-", " ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
