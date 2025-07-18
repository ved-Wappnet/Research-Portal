import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Paper", "Review", "Comment", "User"],
  endpoints: (builder) => ({
    // Papers
    getPapers: builder.query({
      query: (params) => ({
        url: "/papers",
        params,
      }),
      providesTags: ["Paper"],
    }),
    getPaper: builder.query({
      query: (id) => `/papers/${id}`,
      providesTags: (result, error, id) => [{ type: "Paper", id }],
    }),
    createPaper: builder.mutation({
      query: (paper) => ({
        url: "/papers",
        method: "POST",
        body: paper,
      }),
      invalidatesTags: ["Paper"],
    }),
    updatePaper: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/papers/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Paper", id }],
    }),

    // Reviews
    getReviews: builder.query({
      query: (paperId) => `/papers/${paperId}/reviews`,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: ({ paperId, ...review }) => ({
        url: `/papers/${paperId}/reviews`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),

    // Comments
    getComments: builder.query({
      query: (paperId) => `/papers/${paperId}/comments`,
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation({
      query: ({ paperId, ...comment }) => ({
        url: `/papers/${paperId}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
})

export const {
  useGetPapersQuery,
  useGetPaperQuery,
  useCreatePaperMutation,
  useUpdatePaperMutation,
  useGetReviewsQuery,
  useCreateReviewMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
} = apiSlice
