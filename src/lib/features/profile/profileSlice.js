// features/profile/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  formData: [],
  preferences: {},
  isOTPVerified: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setOTPVerified: (state, action) => {
      state.isOTPVerified = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    },
    updatePreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload
      };
    }
  }
});

export const { setStep, setOTPVerified, updateFormData, updatePreferences } = profileSlice.actions;
export default profileSlice.reducer;
