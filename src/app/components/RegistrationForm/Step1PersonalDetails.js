"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetStatesQuery, useGetCitiesQuery } from "@/lib/services/api";
import { setStep, updateFormData } from "@/lib/features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const Step1PersonalDetails = () => {
  const preferencesData = useSelector((state) => state.profile.preferences);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    gender: "",
  });
  const {
    data: states,
    error: statesError,
    isLoading: statesLoading,
  } = useGetStatesQuery();
  const selectedStateCode = watch("state");

  const {
    data: cities,
    error: citiesError,
    isLoading: citiesLoading,
  } = useGetCitiesQuery(selectedStateCode, {
    skip: !selectedStateCode, // Skip the query if no state is selected
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Selected State Code:", selectedStateCode);
    if (selectedStateCode) {
      setValue("city", "");
    }
    if (preferencesData?.lookingFor) {
      const oppositeGender =
        preferencesData.lookingFor === "Groom" ? "Female" : "Male";
      setValue("gender", oppositeGender);
    }
  }, [preferencesData, selectedStateCode, setValue]);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    dispatch(updateFormData(data));
    dispatch(setStep(2));
    // dispatch or next step logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        Let us start with the basic
      </h2>
      <p className="text-xs font-bold text-gray-400">Adding these details would help you get suitable matches</p>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          {...register("dob", {
            required: "Date of birth is required",
            validate: (value) => {
              const dob = new Date(value);
              const today = new Date();
              const age = today.getFullYear() - dob.getFullYear();
              const hasHadBirthdayThisYear =
                today.getMonth() > dob.getMonth() ||
                (today.getMonth() === dob.getMonth() &&
                  today.getDate() >= dob.getDate());

              const actualAge = hasHadBirthdayThisYear ? age : age - 1;

              if (actualAge < 0) return "Invalid date of birth";
              if (actualAge < 18) return "You must be at least 18 years old";
              if (actualAge > 70) return "Age must be less than or equal to 70";
              return true;
            },
          })}
          className="input-select w-full"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Male"
              {...register("gender", { required: "Gender is required" })}
              className="form-radio text-pink-600"
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Female"
              {...register("gender", { required: "Gender is required" })}
              className="form-radio text-pink-600"
            />
            <span className="ml-2 text-gray-700">Female</span>
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>

      {/* Marital Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Marital Status <span className="text-red-500">*</span>
        </label>
        <select
          {...register("marital_status", {
            required: "Please select your marital status",
          })}
          className="input-select w-full"
        >
          <option value="">Your Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
        {errors.maritalStatus && (
          <p className="text-red-500 text-sm mt-1">
            {errors.maritalStatus.message}
          </p>
        )}
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Height <span className="text-red-500">*</span>
        </label>
        <select
          {...register("height", { required: "Height is required" })}
          className="input-select w-full"
        >
          <option value="">Your Height</option>
          {Array.from({ length: 37 }, (_, i) => {
            const feet = Math.floor(i / 12) + 4; // Start at 4 feet
            const inches = i % 12;
            const cm = (feet * 30.48 + inches * 2.54).toFixed(2);
            return (
              <option key={i} value={`${feet}'${inches}"`}>
                {feet}&apos;{inches}&quot; ({cm} cm)
              </option>
            );
          })}
        </select>
        {errors.height && (
          <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
        )}
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State <span className="text-red-500">*</span>
        </label>
        <select
          {...register("state", { required: "State is required" })}
          className="input-select w-full"
        >
          <option value="">Select State</option>
          {statesLoading ? (
            <option disabled>Loading...</option>
          ) : statesError ? (
            <option disabled>Error loading states</option>
          ) : (
            states?.data?.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))
          )}
        </select>
        {errors.state && (
          <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <select
          {...register("city", { required: "City is required" })}
          className="input-select w-full"
        >
          <option value="">Select City</option>
          {citiesLoading ? (
            <option disabled>Loading...</option>
          ) : citiesError ? (
            <option disabled>Error loading cities</option>
          ) : (
            cities?.data?.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))
          )}
        </select>
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full mt-4 bg-btn hover:bg-btn-hover text-white py-2 px-4 rounded transition disabled:opacity-50"
      >
        Next
      </button>
    </form>
  );
};

export default Step1PersonalDetails;
