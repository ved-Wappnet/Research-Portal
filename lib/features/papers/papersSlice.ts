import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type PaperStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "revision_required"
  | "accepted"
  | "published"
  | "rejected"

export interface Paper {
  id: string
  title: string
  abstract: string
  content: string
  authors: string[]
  keywords: string[]
  status: PaperStatus
  version: number
  createdAt: string
  updatedAt: string
  submittedAt?: string
  publishedAt?: string
  doi?: string
  citations: Citation[]
}

export interface Citation {
  id: string
  type: "article" | "book" | "conference" | "website"
  title: string
  authors: string[]
  year: number
  journal?: string
  volume?: string
  pages?: string
  url?: string
}

interface PapersState {
  papers: Paper[]
  currentPaper: Paper | null
  selectedVersion: number
  isLoading: boolean
  error: string | null
}

const initialState: PapersState = {
  papers: [],
  currentPaper: null,
  selectedVersion: 1,
  isLoading: false,
  error: null,
}

const papersSlice = createSlice({
  name: "papers",
  initialState,
  reducers: {
    setPapers: (state, action: PayloadAction<Paper[]>) => {
      state.papers = action.payload
    },
    setCurrentPaper: (state, action: PayloadAction<Paper>) => {
      state.currentPaper = action.payload
    },
    setSelectedVersion: (state, action: PayloadAction<number>) => {
      state.selectedVersion = action.payload
    },
    updatePaperStatus: (state, action: PayloadAction<{ id: string; status: PaperStatus }>) => {
      const paper = state.papers.find((p) => p.id === action.payload.id)
      if (paper) {
        paper.status = action.payload.status
      }
      if (state.currentPaper?.id === action.payload.id) {
        state.currentPaper.status = action.payload.status
      }
    },
    addCitation: (state, action: PayloadAction<{ paperId: string; citation: Citation }>) => {
      const paper = state.papers.find((p) => p.id === action.payload.paperId)
      if (paper) {
        paper.citations.push(action.payload.citation)
      }
      if (state.currentPaper?.id === action.payload.paperId) {
        state.currentPaper.citations.push(action.payload.citation)
      }
    },
  },
})

export const { setPapers, setCurrentPaper, setSelectedVersion, updatePaperStatus, addCitation } = papersSlice.actions
export default papersSlice.reducer
