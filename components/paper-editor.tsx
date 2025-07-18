"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, List, ListOrdered, Quote, Code, Eye, Type } from "lucide-react"

interface PaperEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function PaperEditor({ content, onChange, placeholder }: PaperEditorProps) {
  const [activeTab, setActiveTab] = useState("write")

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.getElementById("editor-textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    onChange(newText)

    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatButtons = [
    { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**") },
    { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*") },
    { icon: Quote, label: "Quote", action: () => insertMarkdown("> ") },
    { icon: Code, label: "Code", action: () => insertMarkdown("`", "`") },
    { icon: List, label: "Bullet List", action: () => insertMarkdown("- ") },
    { icon: ListOrdered, label: "Numbered List", action: () => insertMarkdown("1. ") },
  ]

  const renderPreview = (text: string) => {
    // Simple markdown to HTML conversion for preview
    return text
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(
        /^> (.*$)/gm,
        '<blockquote class="border-l-4 border-primary/30 bg-muted/50 py-2 px-4 italic mb-4">$1</blockquote>',
      )
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n/g, "<br>")
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <TabsList>
            <TabsTrigger value="write">
              <Type className="h-4 w-4 mr-2" />
              Write
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-1">
            {formatButtons.map((button) => (
              <Button key={button.label} variant="ghost" size="sm" onClick={button.action} title={button.label}>
                <button.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        <TabsContent value="write" className="flex-1 mt-0">
          <Textarea
            id="editor-textarea"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Start writing your paper here..."}
            className="min-h-[500px] resize-none font-mono text-sm leading-relaxed"
          />
        </TabsContent>

        <TabsContent value="preview" className="flex-1 mt-0">
          <div className="border rounded-lg p-6 min-h-[500px] bg-background">
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
