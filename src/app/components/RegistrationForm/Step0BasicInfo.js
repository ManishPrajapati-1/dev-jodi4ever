"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSignUpUserMutation } from "@/lib/services/api";
import { useDispatch } from "react-redux";
import { updateFormData } from "@/lib/features/profile/profileSlice";
import OtpModal from "./OtpModal";
import { useSearchParams } from "next/navigation";
import { updatePreferences } from "@/lib/features/profile/profileSlice";

export default function Step0BasicInfo() {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signUpUser, { isLoading }] = useSignUpUserMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [userPhone, setUserPhone] = useState("");

  const dispatch = useDispatch();

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
      setUserPhone(data.phone); // ✅ Pass to modal
      dispatch(updateFormData(data));
      setOtpModalOpen(true); // ✅ Open modal
    } catch (error) {
      setErrorMessage(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      {/* <h2 className="text-3xl font-semibold text-center text-primary mb-6">
      Create Your Profile
    </h2> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">
            {errorMessage}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile For
          </label>
          <select
            {...register("profile_for", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          >
            <option value="">Select Profile For</option>
            <option value="Self">Self</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Friend">Friend</option>
            <option value="Relative">Relative</option>
          </select>
          {errors.profile_for && (
            <span className="text-red-500 text-sm mt-1 block">
              This field is required
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName", {
              required: "Full Name is required",
              minLength: {
                value: 2,
                message: "Full Name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Full Name must be less than 50 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters and spaces are allowed",
              },
            })}
            placeholder="Enter Your Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email ID
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Enter Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-700 text-sm">
              🇮🇳 +91
            </span>
            <input
              type="text"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-8-9]\d{9}$/,
                  message:
                    "Enter a valid 10-digit phone number",
                },
              })}
              placeholder="Enter your phone number"
              maxLength={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-btn hover:bg-btn-hover cursor-pointer text-white font-medium py-3 px-4 rounded-md transition duration-200"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      {isOtpModalOpen && (
        <OtpModal phone={userPhone} onClose={() => setOtpModalOpen(false)} />
      )}
    </div>
  );
}
