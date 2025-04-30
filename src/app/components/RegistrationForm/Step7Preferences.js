"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import {
  usePostUserPreferencesMutation,
  useGetStatesQuery,
} from "@/lib/services/api";

const PreferencesForm = () => {
  const preferencesData = useSelector((state) => state.profile.preferences);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      state: '', 
    },
  });
  const [postUserPreferences, { isLoading, isSuccess, isError }] =
    usePostUserPreferencesMutation();

  // Fetch states for dropdown
  const {
    data: states,
    error: statesError,
    isLoading: statesLoading,
  } = useGetStatesQuery();

  
  useEffect(() => {
    if (preferencesData) {
      if (preferencesData.religion) setValue('religion', preferencesData.religion);
      if (preferencesData.age) setValue('min_age', preferencesData.age);
    }
  }, [preferencesData, setValue]);

  useEffect(() => {
    if (
      preferencesData?.location && // assuming "location" holds the state name
      states?.data &&
      states.data.some((s) => s.name === preferencesData.location)
    ) {
      // Find the corresponding state's ISO code
      const matchedState = states.data.find((s) => s.name === preferencesData.location);
      if (matchedState) {
        setValue("state", matchedState.isoCode);
      }
    }
  }, [preferencesData, states, setValue]);
  

  const onSubmit = async (data) => {
    try {
      // Convert boolean string to real boolean
      data.any_caste = data.any_caste === "true";
      data.min_height_in_cm = parseInt(data.min_height_in_cm, 10);
      data.max_height_in_cm = parseInt(data.max_height_in_cm, 10);

      await postUserPreferences(data).unwrap();
      alert("Preferences saved successfully!");
    } catch (error) {
      alert("Failed to save preferences.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Partner Preferences
      </h2>

      {/* Age Group */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Age & Height</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Min Age<span className="text-red-500">*</span>
            </label>
            <select
              {...register("min_age", { required: true })}
              className="input-select"
            >
              <option value="">Select</option>
              {[...Array(60).keys()].map((i) => (
                <option key={i} value={i + 18}>
                  {i + 18}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Max Age<span className="text-red-500">*</span>
            </label>
            <select
              {...register("max_age", { required: true })}
              className="input-select"
            >
              <option value="">Select</option>
              {[...Array(60).keys()].map((i) => (
                <option key={i} value={i + 18}>
                  {i + 18}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Min Height (cm)<span className="text-red-500">*</span>
            </label>
            <select
              {...register("min_height_in_cm", { required: true })}
              className="input-select"
            >
              <option value="">Select</option>
              {[...Array(100).keys()].map((i) => (
                <option key={i} value={i + 150}>
                  {i + 150}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Max Height (cm)<span className="text-red-500">*</span>
            </label>
            <select
              {...register("max_height_in_cm", { required: true })}
              className="input-select"
            >
              <option value="">Select</option>
              {[...Array(100).keys()].map((i) => (
                <option key={i} value={i + 150}>
                  {i + 150}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Marital Status */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Marital Status<span className="text-red-500">*</span>
        </label>
        <select
          {...register("marital_status", { required: true })}
          className="input-select w-full"
        >
          <option value="">Select</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
        </select>
      </div>

      {/* Religion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Religion<span className="text-red-500">*</span>
          </label>
          <select
            {...register("religion", { required: true })}
            className="input-select w-full"
          >
            <option value="">Select</option>
            <option>Hindu</option>
            <option>Muslim</option>
            <option>Christian</option>
            <option>Sikh</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Mother Tongue<span className="text-red-500">*</span>
          </label>
          <select
            {...register("mother_tongue", { required: true })}
            className="input-select w-full"
          >
            <option value="">Select</option>
            <option>Hindi</option>
            <option>English</option>
            <option>Marathi</option>
            <option>Tamil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            State<span className="text-red-500">*</span>
          </label>
          <select
            {...register("state", { required: true })}
            className="input-select w-full"
          >
            <option value="">Select</option>
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
        </div>
      </div>

      {/* Other Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Manglik?<span className="text-red-500">*</span>
          </label>
          <select
            {...register("manglik", { required: true })}
            className="input-select w-full"
          >
            <option value="">Select</option>
            <option>No</option>
            <option>Yes</option>
            <option>Doesn&apos;t Matter</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Highest Education<span className="text-red-500">*</span>
          </label>
          <select
            {...register("highest_education", { required: true })}
            className="input-select w-full"
          >
            <option value="">Select</option>
            <option>High School</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
            <option>Doctorate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Employed In<span className="text-red-500">*</span>
          </label>
          <select
            {...register("employed_in", { required: true })}
            className="input-select w-full"
          >
            <option value="">Select</option>
            <option>Private Sector</option>
            <option>Government</option>
            <option>Business</option>
            <option>Self-Employed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Annual Income<span className="text-red-500">*</span>
          </label>
          <select
            {...register("annual_income", { required: true })}
            className="input-select w-full"
          >
            <option value="">Select</option>
            <option>Less than 5 Lakhs</option>
            <option>5 - 10 Lakhs</option>
            <option>10 - 20 Lakhs</option>
            <option>More than 20 Lakhs</option>
          </select>
        </div>
      </div>

      {/* Any Caste Checkbox */}
      <label className="flex items-center mt-4 space-x-2 text-sm">
        <input
          type="checkbox"
          {...register("any_caste")}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <span>Any Caste</span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Preferences"}
      </button>

      {/* Feedback */}
      {isError && (
        <p className="text-red-500 text-sm mt-2">Error saving preferences</p>
      )}
      {isSuccess && (
        <p className="text-green-600 text-sm mt-2">
          Preferences saved successfully!
        </p>
      )}
    </form>
  );
};

export default PreferencesForm;
