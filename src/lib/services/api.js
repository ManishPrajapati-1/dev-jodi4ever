// services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://www.jodi4ever.com/api/",
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
    // Links (T&C, FAQs)
    getTermsPrivacyAbout: builder.query({
      query: () => ({
        url: "user/get_terms_privacy_about",
        method: "GET",
      }),
    }),

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
    // To update image use imageIndex, profile_image, by default imageIndex [auto_increment]
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "user/profile",
        method: "PUT",
        body: data,
      }),
    }),

    deleteProfileImage: builder.mutation({
      query: (data) => ({
        url: "user/deleteProfileImage",
        method: "POST",
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

    // Connect Profiles - Fixed with optional status parameter
    connectProfile: builder.mutation({
      query: ({ profileId, status = "" }) => ({
        url: `user/connection/`,
        method: "POST",
        body: { receiverId: profileId, status },
      }),
    }),

    // Like/Dislike Profiles
    likeProfile: builder.mutation({
      query: (profileId) => ({
        url: `user/like_user/${profileId}`,
        method: "GET",
      }),
    }),

    dislikeProfile: builder.mutation({
      query: (profileId) => ({
        url: `user/unlike_user/${profileId}`,
        method: "GET",
      }),
    }),

    // Notifications
    getNotifications: builder.query({
      query: () => ({
        url: `user/get_notification`,
        method: "GET",
      }),
    }),

    deleteNotifications: builder.mutation({
      query: () => ({
        url: "user/delete_notification",
        method: "DELETE",
      })
    }),


    // Get Favourites
    getFavourites: builder.query({
      query: () => ({
        url: "user/get_liked_users",
        method: "GET",
      }),
    }),

    // Get Connections List
    getConnections: builder.query({
      query: () => ({
        url: "user/connections",
        method: "GET",
      }),
    }),

    // Get Send and Receive requests List - Fixed request functions
    sendRequest: builder.query({
      query: () => ({
        url: "user/connections/sent",
        method: "GET",
      }),
    }),

    getRequests: builder.query({
      query: () => ({
        url: "user/connections/received",
        method: "GET",
      }),
    }),

    // Cancel send request - Fixed to use parameter
    cancelRequest: builder.mutation({
      query: (connectionId) => ({
        url: `user/connections/${connectionId}`,
        method: "DELETE",
      }),
    }),

    // Update and get preferences
    getUserPreferences: builder.query({
      query: () => ({
        url: "user/yourPreference",
        method: "GET",
      }),
    }),
    postUserPreferences: builder.mutation({
      query: (body) => ({
        url: "user/preferences",
        method: "POST",
        body,
      }),
    }),

    // View Profile
    viewSingleProfile: builder.query({
      query: (id) => ({
        url: `user/single_match/${id}`,
        method: "GET",
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

    // Premium Plan
    getPlans: builder.query({
      query: () => ({
        url: "user/plans",
        method: "GET"
      })
    })
  }),
});

export const {
  useGetTermsPrivacyAboutQuery,
  useLoginUserMutation,
  useVerifyLoginOtpMutation,
  useSignUpUserMutation,
  useVerifyOtpSignUpMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileImageMutation,
  useGetMatchingProfilesQuery,
  useLikeProfileMutation,
  useDislikeProfileMutation,
  useConnectProfileMutation,
  useGetUserPreferencesQuery,
  usePostUserPreferencesMutation,
  useViewSingleProfileQuery,
  useGetNotificationsQuery,
  useDeleteNotificationsMutation,
  useGetFavouritesQuery,
  useGetConnectionsQuery,
  useSendRequestQuery,
  useGetRequestsQuery,
  useCancelRequestMutation,
  useGetStatesQuery,
  useGetCitiesQuery,
  useGetPlansQuery,
} = api;
