"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Download, Share, MessageSquare, User, Calendar, FileText, Eye } from "lucide-react"
import Link from "next/link"
import { CommentsSidebar } from "@/components/comments-sidebar"
import { VersionHistory } from "@/components/version-history"

export default function ViewPaperPage({ params }: { params: { id: string } }) {
  const [showComments, setShowComments] = useState(false)

  // Mock paper data
  const paper = {
    id: params.id,
    title: "Machine Learning Applications in Climate Science",
    abstract:
      "This paper explores the application of machine learning techniques in climate science, focusing on predictive modeling and data analysis methods that can help understand and forecast climate patterns.",
    content: `# Introduction

Climate science has increasingly relied on computational methods to understand complex atmospheric and oceanic systems. Machine learning (ML) techniques offer powerful tools for analyzing large datasets and identifying patterns that traditional statistical methods might miss.

## Background

The application of ML in climate science has grown significantly over the past decade. Researchers have successfully applied various algorithms including:

- **Neural Networks**: For pattern recognition in satellite imagery
- **Random Forests**: For precipitation forecasting
- **Support Vector Machines**: For extreme weather event prediction

## Methodology

Our approach combines multiple ML algorithms to create an ensemble model that can:

1. Process large-scale climate datasets
2. Identify temporal and spatial patterns
3. Generate accurate predictions with uncertainty quantification

### Data Sources

We utilized the following datasets:
- NOAA Global Temperature Anomalies
- NASA Satellite Observations
- ECMWF Reanalysis Data

## Results

The ensemble model achieved significant improvements over baseline methods:

- **Temperature Prediction**: 15% improvement in RMSE
- **Precipitation Forecasting**: 22% improvement in accuracy
- **Extreme Event Detection**: 18% improvement in precision

## Discussion

The results demonstrate the potential of ML techniques in climate science applications. However, several challenges remain:

- Model interpretability
- Uncertainty quantification
- Computational scalability

## Conclusion

Machine learning offers promising avenues for advancing climate science research. Future work should focus on developing more interpretable models and improving uncertainty estimation.

## References

1. Smith, J. et al. (2023). "Deep Learning for Climate Modeling." *Nature Climate Change*, 13(4), 234-245.
2. Johnson, A. & Brown, K. (2022). "Ensemble Methods in Weather Prediction." *Journal of Climate*, 35(8), 1234-1250.
`,
    authors: ["Dr. Smith", "Prof. Johnson"],
    keywords: ["machine learning", "climate science", "data analysis", "predictive modeling"],
    status: "under_review",
    version: 2,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
    submittedAt: "2024-01-12",
    reviewers: [
      { name: "Dr. Anderson", status: "completed" },
      { name: "Prof. Lee", status: "in_progress" },
      { name: "Dr. Chen", status: "pending" },
    ],
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Draft", className: "status-draft" },
      under_review: { label: "Under Review", className: "status-review" },
      revision_required: { label: "Revision Required", className: "status-revision" },
      published: { label: "Published", className: "status-published" },
      rejected: { label: "Rejected", className: "status-rejected" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/papers">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Papers
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{paper.title}</h1>
              <div className="flex items-center space-x-4 mt-2">
                {getStatusBadge(paper.status)}
                <span className="text-sm text-gray-600 dark:text-gray-400">Version {paper.version}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowComments(!showComments)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Comments
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button asChild>
              <Link href={`/papers/${paper.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className={`${showComments ? "lg:col-span-3" : "lg:col-span-4"} space-y-6`}>
            {/* Paper Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Paper Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">Authors</h4>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{paper.authors.join(", ")}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {paper.keywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">Timeline</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Created: {paper.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span>Last Updated: {paper.updatedAt}</span>
                        </div>
                        {paper.submittedAt && (
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-gray-400" />
                            <span>Submitted: {paper.submittedAt}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {paper.reviewers && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">Reviewers</h4>
                        <div className="space-y-1">
                          {paper.reviewers.map((reviewer, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span>{reviewer.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {reviewer.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paper Content */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="abstract">Abstract</TabsTrigger>
                <TabsTrigger value="history">Version History</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <div dangerouslySetInnerHTML={{ __html: paper.content.replace(/\n/g, "<br>") }} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="abstract" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Abstract</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{paper.abstract}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <VersionHistory paperId={paper.id} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Comments Sidebar */}
          {showComments && (
            <div className="lg:col-span-1">
              <CommentsSidebar paperId={paper.id} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
