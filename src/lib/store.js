import { configureStore } from '@reduxjs/toolkit'
import { api } from '@/lib/services/api';
import profileReducer from '@/lib/features/profile/profileSlice'
import userReducer from '@/lib/features/user/userSlice';
// import matchingReducer from '@/lib/features/matching/matchingSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      profile: profileReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })
}