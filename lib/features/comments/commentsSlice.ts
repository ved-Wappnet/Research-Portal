import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Comment {
  id: string
  paperId: string
  authorId: string
  authorName: string
  content: string
  selection?: {
    start: number
    end: number
    text: string
  }
  resolved: boolean
  replies: Comment[]
  createdAt: string
  updatedAt: string
}

interface CommentsState {
  comments: Comment[]
  activeComment: string | null
  isLoading: boolean
  error: string | null
}

const initialState: CommentsState = {
  comments: [],
  activeComment: null,
  isLoading: false,
  error: null,
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload)
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      const index = state.comments.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.comments[index] = action.payload
      }
    },
    setActiveComment: (state, action: PayloadAction<string | null>) => {
      state.activeComment = action.payload
    },
    resolveComment: (state, action: PayloadAction<string>) => {
      const comment = state.comments.find((c) => c.id === action.payload)
      if (comment) {
        comment.resolved = true
      }
    },
  },
})

export const { setComments, addComment, updateComment, setActiveComment, resolveComment } = commentsSlice.actions
export default commentsSlice.reducer
