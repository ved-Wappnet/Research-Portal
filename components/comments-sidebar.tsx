"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Plus, Check, Reply } from "lucide-react"

interface CommentsSidebarProps {
  paperId: string
}

export function CommentsSidebar({ paperId }: CommentsSidebarProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const comments = [
    {
      id: "1",
      author: "Dr. Anderson",
      avatar: "/placeholder.svg",
      content: "The methodology section could benefit from more detailed explanation of the data preprocessing steps.",
      timestamp: "2 hours ago",
      resolved: false,
      selection: { start: 150, end: 200, text: "data preprocessing" },
      replies: [
        {
          id: "1-1",
          author: "Dr. Smith",
          avatar: "/placeholder.svg",
          content: "Thanks for the feedback. I'll add more details about the normalization process.",
          timestamp: "1 hour ago",
        },
      ],
    },
    {
      id: "2",
      author: "Prof. Lee",
      avatar: "/placeholder.svg",
      content: "Excellent analysis of the results. The statistical significance tests are well-chosen.",
      timestamp: "1 day ago",
      resolved: true,
      selection: null,
      replies: [],
    },
  ]

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
  }

  const handleReply = (commentId: string) => {
    if (replyText.trim()) {
      console.log("Adding reply to", commentId, ":", replyText)
      setReplyText("")
      setReplyingTo(null)
    }
  }

  const handleResolve = (commentId: string) => {
    console.log("Resolving comment:", commentId)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Comments
        </CardTitle>
        <CardDescription>
          {comments.length} comment{comments.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Comment */}
        <div className="space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <Button onClick={handleAddComment} size="sm" disabled={!newComment.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            Add Comment
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className={`border rounded-lg p-3 ${comment.resolved ? "opacity-60" : ""}`}>
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
                    </div>
                    {comment.resolved && (
                      <Badge variant="secondary" className="text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Resolved
                      </Badge>
                    )}
                  </div>

                  {comment.selection && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-xs">
                      <span className="font-medium">Selected text: </span>
                      <span className="italic">"{comment.selection.text}"</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="ml-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                              <AvatarFallback className="text-xs">{reply.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-xs">{reply.author}</span>
                            <span className="text-xs text-gray-500">{reply.timestamp}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 ml-8">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={2}
                        className="text-sm"
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleReply(comment.id)} disabled={!replyText.trim()}>
                          Reply
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {!comment.resolved && (
                      <Button size="sm" variant="outline" onClick={() => handleResolve(comment.id)}>
                        <Check className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">No comments yet. Be the first to add feedback!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
