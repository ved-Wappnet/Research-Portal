"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PaperEditor } from "@/components/paper-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Save, ArrowLeft, X } from "lucide-react"
import Link from "next/link"

export default function NewPaperPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [abstract, setAbstract] = useState("")
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const [content, setContent] = useState("")
  const [authors, setAuthors] = useState<string[]>(["Current User"])
  const [saving, setSaving] = useState(false)

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddKeyword()
    }
  }

  const handleSave = async (status: "draft" | "submitted") => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would save to your backend here
      console.log("Saving paper:", { title, abstract, keywords, content, status })

      router.push("/papers")
    } catch (error) {
      console.error("Error saving paper:", error)
    } finally {
      setSaving(false)
    }
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Paper</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new research paper</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave("submitted")} disabled={saving || !title.trim()}>
              Submit for Review
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Paper Metadata */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paper Details</CardTitle>
                <CardDescription>Basic information about your paper</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter paper title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="abstract">Abstract</Label>
                  <Textarea
                    id="abstract"
                    placeholder="Enter paper abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <div className="mt-1 space-y-2">
                    <Input
                      id="keywords"
                      placeholder="Add keyword and press Enter"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={handleKeywordKeyPress}
                    />
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                          <button onClick={() => handleRemoveKeyword(keyword)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Authors</Label>
                  <div className="mt-1 space-y-2">
                    {authors.map((author, index) => (
                      <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                        {author}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Add Co-author
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Paper Content Editor */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Paper Content</CardTitle>
                <CardDescription>Write your paper using Markdown with LaTeX support</CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <PaperEditor content={content} onChange={setContent} placeholder="Start writing your paper here..." />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
