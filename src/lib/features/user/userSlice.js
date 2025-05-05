import { createSlice } from '@reduxjs/toolkit';

// Initial state based on the provided data structure
const initialState = {
  data: {
    user: {
      profile_for: '',
      email: '',
      fullName: '',
      living_with_family: '',
      diet: '',
      phone: '',
      profile_image: [],
      active: false,
      dob: '',
      height: '',
      heightInCm: 0,
      country: '',
      state: '',
      city: '',
      annual_income: '',
      employed_in: '',
      highest_education: '',
      course: '',
      occupation: '',
      mother_tongue: '',
      religion: '',
      sect: '',
      jammat: '',
      caste: '',
      thoughts_on_horoscope: '',
      manglik: '',
      description: '',
      profileStatus: '',
      preferenceStatus: '',
      verifiedBadge: false,
      subscriptionStatus: '',
      subscriptionPlan: '',
      messageCreditsRemaining: 0,
      contactViewsRemaining: 0,
      superInterestsRemaining: 0,
      unlimitedMessaging: false,
      profileVisibilityBoost: 1,
      gender: '',
      marital_status: '',
      max_salary: 0,
      min_salary: 0,
      stateCode: '',
    },
  },
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    updateUserProfile: (state, action) => {
      // Update specific parts of the user profile, for example:
    //   state.data.user.fullName = action.payload.fullName;
    //   state.data.user.email = action.payload.email;
    //   state.data.user.phone = action.payload.phone;
    state.data.user = action.payload;
    },
    clearUserProfile: (state) => {
      // Reset the state to initial values
      return initialState;
    },
  },
});

// Export the actions to use in your components
export const { setUserProfile, updateUserProfile, clearUserProfile } = userSlice.actions;

// Export the reducer to add it to the store
export default userSlice.reducer;
