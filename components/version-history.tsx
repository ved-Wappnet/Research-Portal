"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { History, Download, Eye, GitBranch, Calendar } from "lucide-react"

interface VersionHistoryProps {
  paperId: string
}

export function VersionHistory({ paperId }: VersionHistoryProps) {
  const versions = [
    {
      version: 2,
      date: "2024-01-15",
      author: "Dr. Smith",
      avatar: "/placeholder.svg",
      changes: "Added methodology section, updated references",
      status: "current",
      size: "45.2 KB",
    },
    {
      version: 1,
      date: "2024-01-10",
      author: "Dr. Smith",
      avatar: "/placeholder.svg",
      changes: "Initial submission",
      status: "archived",
      size: "42.1 KB",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="h-5 w-5 mr-2" />
          Version History
        </CardTitle>
        <CardDescription>Track changes and revisions to your paper</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {versions.map((version) => (
            <div key={version.version} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                    v{version.version}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Version {version.version}</span>
                      {version.status === "current" && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{version.changes}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <div className="flex items-center space-x-1">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={version.avatar || "/placeholder.svg"} alt={version.author} />
                    <AvatarFallback className="text-xs">{version.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{version.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{version.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitBranch className="h-4 w-4" />
                  <span>{version.size}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                {version.status !== "current" && (
                  <Button size="sm" variant="outline">
                    Restore
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
