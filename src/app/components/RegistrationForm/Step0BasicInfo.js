"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSignUpUserMutation } from "@/lib/services/api";
import { useDispatch } from "react-redux";
import { updateFormData } from "@/lib/features/profile/profileSlice";
import OtpModal from './OtpModal';
import { useSearchParams } from 'next/navigation';
import { updatePreferences } from "@/lib/features/profile/profileSlice";



export default function Step0BasicInfo() {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signUpUser, { isLoading }] = useSignUpUserMutation();

  const [errorMessage, setErrorMessage] = useState('');
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  const dispatch = useDispatch();

    useEffect(() => {
      const paramsObj = {};
      for (const [key, value] of searchParams.entries()) {
        paramsObj[key] = value;
      }
      dispatch(updatePreferences(paramsObj));
    }, [searchParams, dispatch]);

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      await signUpUser(data).unwrap();
      setUserPhone(data.phone);        // ✅ Pass to modal
      dispatch(updateFormData(data));
      setOtpModalOpen(true);           // ✅ Open modal
    } catch (error) {
      setErrorMessage(error?.data?.message || 'Something went wrong.');
    }
  };

  // const onSubmit = (data) => {
  //   setErrorMessage('');
  //   setIsLoading(true)
  //   try {
  //     setUserPhone(data.phone);
  //     dispatch(updateFormData(data));
  //     setOtpModalOpen(true);
  //     setIsLoading(false);
  //   }
  //   catch (err) {
  //     setErrorMessage(err);
  //   }
  // }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
    <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">
      Create Your Profile
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMessage && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile For</label>
        <select
          {...register("profile_for")}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
        >
          <option value="">This Profile is for</option>
          <option value="Self">Self</option>
          <option value="Son">Son</option>
          <option value="Brother">Brother</option>
          <option value="Friend">Friend</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          {...register("fullName", { required: true })}
          placeholder="Full Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        {errors.fullName && (
          <span className="text-red-500 text-sm mt-1 block">This field is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1 block">This field is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="number"
          {...register("phone", {
            required: 'Phone number is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Enter a valid 10-digit phone number',
            },
          })}
          placeholder="Phone"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
      >
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>

    {isOtpModalOpen && (
      <OtpModal
        phone={userPhone}
        onClose={() => setOtpModalOpen(false)}
      />
    )}
  </div>
  );
}
