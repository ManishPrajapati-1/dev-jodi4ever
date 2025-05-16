"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSignUpUserMutation, useGetUserProfileQuery } from "@/lib/services/api";
import { useDispatch, useSelector } from "react-redux";
import { setStep, updateFormData, updatePreferences } from "@/lib/features/profile/profileSlice";
import OtpModal from "./OtpModal";
import { useSearchParams } from "next/navigation";
import { User, Mail, Phone, Send, AlertCircle } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast'

export default function Step0BasicInfo() {
  const {data: userData, isLoading: isUserLoading, isError: isUserError } = useGetUserProfileQuery();
  // console.log(userData?.data?.user?.profileStatus);
  const formData = useSelector((state) => state.profile.formData);
  const isOTPVerified = useSelector((state) => state.profile.isOTPVerified);

  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: formData
  });
  const [signUpUser, { isLoading }] = useSignUpUserMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [userPhone, setUserPhone] = useState("");

  const dispatch = useDispatch();
  const profileFor = watch("profile_for");

  useEffect(() => {
    const paramsObj = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObj[key] = value;
    }
    dispatch(updatePreferences(paramsObj));
  }, [searchParams, dispatch]);

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      await signUpUser(data).unwrap();
      setUserPhone(data.phone);
      dispatch(updateFormData(data));
      toast.success("OTP sent successfully! Please check your phone.");
      // Open the OTP modal
      setOtpModalOpen(true);
    } catch (error) {
      setErrorMessage(error?.data?.message || "Something went wrong. Please try again.");
      toast.error(error?.data?.message || "Something went wrong. Please try again.")
    }
  };

useEffect(() => {
  const token = localStorage.getItem('token');
  
  if (token && !isUserError && userData?.data?.user) {
    // Create a new object instead of mutating the original
    const updatedUser = {
      ...userData.data.user,
      dob: userData.data.user.dob ? userData.data.user.dob.split("T")[0] : undefined,

    };
    if (updatedUser.location) {
      delete updatedUser.location;
    }
    dispatch(updateFormData(updatedUser));
    
    if (updatedUser.profileStatus === "Incomplete") {
      dispatch(setStep(1));
    }
    else if(updatedUser.preferenceStatus === "Incomplete"){
      dispatch(setStep(6));
    }
    else {
      dispatch(setStep(0));
    }
  }
}, [userData, isUserError, dispatch]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Create Your Profile</h2>
          <p className="text-gray-600 mt-2">Let&apos;s start with your basic information</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* {errorMessage && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )} */}
          <Toaster position="right-bottom"/>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Profile For <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("profile_for", { required: "Please select who this profile is for" })}
                className={`w-full pl-4 pr-10 py-3 bg-white border ${
                  errors.profile_for ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none`}
              >
                <option value="" disabled>Select Profile For</option>
                <option value="Self">Self</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Friend">Friend</option>
                <option value="Relative">Relative</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.profile_for && (
              <p className="text-red-500 text-sm mt-1">{errors.profile_for.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters and spaces are allowed",
                  },
                })}
                placeholder={profileFor === "Self" ? "Your full name" : `${profileFor}'s full name`}
                className={`w-full pl-4 pr-10 py-3 border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="example@email.com"
                className={`w-full pl-4 pr-10 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-700">
                🇮🇳 +91
              </div>
              <div className="relative flex-1">
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit Indian mobile number",
                    },
                  })}
                  placeholder="9876543210"
                  maxLength={10}
                  className={`w-full pl-4 pr-10 py-3 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            <p className="text-xs text-gray-500 mt-1">
              We&apos;ll send an OTP to verify this number
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-btn hover:bg-btn-hover text-white font-medium py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Sending OTP...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                <span>Send OTP</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-2 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-btn hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-btn hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {isOtpModalOpen && (
        <OtpModal phone={userPhone} onClose={() => setOtpModalOpen(false)} />
      )}
    </div>
  );
}