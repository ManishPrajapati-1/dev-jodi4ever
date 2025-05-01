"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setStep, updateFormData } from "@/lib/features/profile/profileSlice";

const Step5LifestyleDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Lifestyle Details Submitted:", data);
    dispatch(updateFormData(data)); // Save form data to Redux
    dispatch(setStep(5)); // Move to Step 6 (Image Upload)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        Tell us about your lifestyle
      </h2>
      <p className="text-xs font-bold text-gray-400">
        Write about your personality, interests, hobbies & more
      </p>

      {/* Diet */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Diet <span className="text-red-500">*</span>
        </label>
        <select
          {...register("diet", { required: true })}
          className="input-select w-full"
        >
          <option value="">Select Diet</option>
          <option value="Veg">Vegetarian</option>
          <option value="Eggetarian">Eggetarian</option>
          <option value="Non-Veg">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Jain">Jain</option>
          <option value="Occasionally Non-Veg">
            Occasionally Non-Vegetarian
          </option>
        </select>
        {errors.diet && (
          <p className="text-red-500 text-sm mt-1">Diet is required</p>
        )}
      </div>

      {/* Living with Family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Living with Family <span className="text-red-500">*</span>
        </label>
        <select
          {...register("living_with_family", { required: true })}
          className="input-select w-full"
        >
          <option value="">Living With Family</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.living_with_family && (
          <p className="text-red-500 text-sm mt-1">
            Living with Family preference is required
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          type="text"
          {...register("description", { required: true })}
          className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            Drinking preference is required
          </p>
        )}
      </div>

      {/* Drinking */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Drinking <span className="text-red-500">*</span>
        </label>
        <select
          {...register("drinking", { required: true })}
          className="input-select w-full"
        >
          <option value="">Do you drink?</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
          <option value="Occasionally">Occasionally</option>
        </select>
        {errors.drinking && (
          <p className="text-red-500 text-sm mt-1">
            Drinking preference is required
          </p>
        )}
      </div> */}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-4 bg-btn hover:bg-btn-hover text-white py-2 px-4 rounded transition"
      >
        Next
      </button>
    </form>
  );
};

export default Step5LifestyleDetails;
