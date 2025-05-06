// services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://65.1.117.252:5002/api/",
  prepareHeaders: (headers) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["State", "City"],
  endpoints: (builder) => ({
    // Auth
    loginUser: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
      }),
    }),
    verifyLoginOtp: builder.mutation({
      query: (data) => ({
        url: "user/verify_otp_login",
        method: "POST",
        body: data,
      }),
    }),

    // Signup
    signUpUser: builder.mutation({
      query: (data) => ({
        url: "user/signup",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtpSignUp: builder.mutation({
      query: (data) => ({
        url: "/user/verify_otp_sign_up",
        method: "POST",
        body: data,
      }),
    }),

    // Profile
    getUserProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "user/profile",
        method: "PUT",
        body: data,
      }),
    }),

    // Matching/Profiles
    getMatchingProfiles: builder.query({
      query: (page) => ({
        url: `user/matchedProfiles?page=${page}`,
        method: "GET",
      }),
      // Optional: Add caching configuration if needed
      // keepUnusedDataFor: 300, // Keep data for 5 minutes
    }),

    // Update and get preferences
    getUserPreferences: builder.query({
      query: () => "user/yourPreference",
    }),
    postUserPreferences: builder.mutation({
      query: (body) => ({
        url: "user/preferences",
        method: "POST",
        body,
      }),
    }),

    // State/City
    getStates: builder.query({
      query: () => ({
        url: "user/states",
        method: "POST",
      }),
      providesTags: ["State"],
    }),

    getCities: builder.query({
      query: (stateCode) => ({
        url: "user/cities",
        method: "POST",
        body: { stateCode },
      }),
      providesTags: ["City"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useVerifyLoginOtpMutation,
  useSignUpUserMutation,
  useVerifyOtpSignUpMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useGetMatchingProfilesQuery,
  useGetUserPreferencesQuery,
  usePostUserPreferencesMutation,
  useGetStatesQuery,
  useGetCitiesQuery,
} = api;
