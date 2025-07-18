"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Plus, Eye, Edit, Download, Calendar, User } from "lucide-react"
import Link from "next/link"

export default function PapersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const papers = [
    {
      id: "1",
      title: "Machine Learning Applications in Climate Science",
      status: "under_review",
      version: 2,
      lastUpdated: "2024-01-15",
      authors: ["Dr. Smith", "Prof. Johnson"],
      abstract: "This paper explores the application of machine learning techniques in climate science...",
      keywords: ["machine learning", "climate science", "data analysis"],
    },
    {
      id: "2",
      title: "Quantum Computing and Cryptography",
      status: "published",
      version: 1,
      lastUpdated: "2024-01-10",
      authors: ["Dr. Chen", "Dr. Rodriguez"],
      abstract: "An investigation into quantum computing applications for cryptographic systems...",
      keywords: ["quantum computing", "cryptography", "security"],
    },
    {
      id: "3",
      title: "Sustainable Energy Systems Analysis",
      status: "draft",
      version: 1,
      lastUpdated: "2024-01-20",
      authors: ["Prof. Taylor"],
      abstract: "A comprehensive analysis of sustainable energy systems and their implementation...",
      keywords: ["sustainable energy", "renewable", "systems analysis"],
    },
  ]

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

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || paper.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Papers</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your research publications</p>
          </div>
          <Link href="/papers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Paper
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search papers by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="revision_required">Revision Required</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Papers List */}
        <div className="grid gap-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{paper.title}</CardTitle>
                    <CardDescription className="text-base line-clamp-2 mb-3">{paper.abstract}</CardDescription>
                  </div>
                  {getStatusBadge(paper.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {paper.authors.join(", ")}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Updated {paper.lastUpdated}
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Version {paper.version}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button size="sm" asChild>
                      <Link href={`/papers/${paper.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/papers/${paper.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No papers found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first research paper."}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Link href="/papers/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Paper
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
