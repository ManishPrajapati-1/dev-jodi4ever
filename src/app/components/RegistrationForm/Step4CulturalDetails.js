"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setStep, updateFormData } from "@/lib/features/profile/profileSlice";

const Step4CulturalDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Cultural Details Submitted:", data);
    dispatch(updateFormData(data)); // Save form data in Redux
    dispatch(setStep(5)); // Move to next step (Step 5)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Religion & Cultural Details
      </h2>

      {/* Religion */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Religion <span className="text-red-500">*</span>
        </label>
        <select
          {...register("religion", { required: true })}
          className="input-select w-full"
        >
          <option value="">Select Religion</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Sikh">Sikh</option>
          <option value="Buddhist">Buddhist</option>
          <option value="Jain">Jain</option>
          <option value="Other">Other</option>
        </select>
        {errors.religion && (
          <p className="text-red-500 text-sm mt-1">Religion is required</p>
        )}
      </div>

      {/* Community / Caste */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Community / Caste <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("community", { required: true })}
          className="input-select w-full"
          placeholder="E.g., Brahmin, Rajput, etc."
        />
        {errors.community && (
          <p className="text-red-500 text-sm mt-1">Community is required</p>
        )}
      </div>

      {/* Mother Tongue */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mother Tongue <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("motherTongue", { required: true })}
          className="input-select w-full"
          placeholder="E.g., Hindi, Tamil, Punjabi"
        />
        {errors.motherTongue && (
          <p className="text-red-500 text-sm mt-1">Mother Tongue is required</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition disabled:opacity-50"
      >
        Next
      </button>
    </form>
  );
};

export default Step4CulturalDetails;
