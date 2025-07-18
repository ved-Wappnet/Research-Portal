import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Review {
  id: string
  paperId: string
  reviewerId: string
  reviewerName: string
  rating: number
  summary: string
  strengths: string
  weaknesses: string
  recommendations: string
  confidenceLevel: number
  status: "pending" | "submitted" | "revised"
  createdAt: string
  updatedAt: string
}

interface ReviewsState {
  reviews: Review[]
  currentReview: Review | null
  isLoading: boolean
  error: string | null
}

const initialState: ReviewsState = {
  reviews: [],
  currentReview: null,
  isLoading: false,
  error: null,
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload
    },
    setCurrentReview: (state, action: PayloadAction<Review>) => {
      state.currentReview = action.payload
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload)
    },
    updateReview: (state, action: PayloadAction<Review>) => {
      const index = state.reviews.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) {
        state.reviews[index] = action.payload
      }
      if (state.currentReview?.id === action.payload.id) {
        state.currentReview = action.payload
      }
    },
  },
})

export const { setReviews, setCurrentReview, addReview, updateReview } = reviewsSlice.actions
export default reviewsSlice.reducer
