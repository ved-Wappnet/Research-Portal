"use client"

import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AuthorDashboard } from "@/components/dashboards/author-dashboard"
import { ReviewerDashboard } from "@/components/dashboards/reviewer-dashboard"
import { EditorDashboard } from "@/components/dashboards/editor-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const renderDashboard = () => {
    switch (user.role) {
      case "author":
        return <AuthorDashboard />
      case "reviewer":
        return <ReviewerDashboard />
      case "editor":
        return <EditorDashboard />
      default:
        return <AuthorDashboard />
    }
  }

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>
}
