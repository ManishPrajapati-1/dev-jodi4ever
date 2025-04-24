import { configureStore } from '@reduxjs/toolkit'
import Theme from '@/lib/features/themeSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: Theme,
    },
  })
}