import { configureStore } from '@reduxjs/toolkit'
import { api } from '@/lib/services/api';
import profileReducer from '@/lib/features/profile/profileSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      profile: profileReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })
}