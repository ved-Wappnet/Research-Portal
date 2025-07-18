import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from '@/services/api'
import authReducer from "./features/auth/authSlice"
import papersReducer from "./features/papers/papersSlice"
import reviewsReducer from "./features/reviews/reviewsSlice"
import commentsReducer from "./features/comments/commentsSlice"

// redux-persist imports
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Persist config for auth slice only
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: persistedAuthReducer,
    papers: papersReducer,
    reviews: reviewsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
