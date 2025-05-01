"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setStep, updateFormData } from "@/lib/features/profile/profileSlice";
import fieldsData from "./fieldsData.json";

const Step4CulturalDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const religion = watch("religion", "");

  const onSubmit = (data) => {
    dispatch(updateFormData(data)); // Save form data in Redux
    dispatch(setStep(4)); // Move to next step (Step 5)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        Tell us about your Cultural Details
      </h2>
      <p className="text-xs font-bold text-gray-400">
        Write about your personality, interests, hobbies & more
      </p>

      {/* Mother Tongue */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Your Mother Tongue <span className="text-red-500">*</span>
        </label>
        <select
          {...register("mother_tongue", { required: true })}
          className="input-select w-full"
        >
          <option value="" disabled>Mother Tongue</option>
          {fieldsData.motherTongue.map((mother_tongue, index) => (
            <option key={index} value={mother_tongue}>
              {mother_tongue}
            </option>
          ))}
        </select>
        {errors.mother_tongue && (
          <p className="text-red-500 text-sm mt-1">Mother Tongue is required</p>
        )}
      </div>

      {/* Thoughts On Horoscope */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Thoughts On Horoscope <span className="text-red-500">*</span>
        </label>
        <select
          {...register("thoughts_on_horoscope", { required: true })}
          className="input-select w-full"
        >
          <option value="" disabled>
            Thoughts On Horoscope
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.thoughts_on_horoscope && (
          <p className="text-red-500 text-sm mt-1">
            Thoughts On Horoscope is required
          </p>
        )}
      </div>

      {/* Manglik */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Manglik <span className="text-red-500">*</span>
        </label>
        <select
          {...register("manglik", { required: true })}
          className="input-select w-full"
        >
          <option value="Manglik">Manglik</option>
          <option value="Non-Manglik">Non-Manglik</option>
          <option value="Anshik-Manglik">Anshik-Manglik</option>
        </select>
        {errors.manglik && (
          <p className="text-red-500 text-sm mt-1">Manglik is required</p>
        )}
      </div>

      {/* Religion */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Religion <span className="text-red-500">*</span>
        </label>
        <select
          {...register("religion", { required: true })}
          className="input-select w-full"
        >
          <option value="" disabled>
            Choose a Religion
          </option>
          <option value="Hindu">Hindu</option>
          <option value="Sikh">Sikh</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Jain">Jain</option>
          <option value="Parsi">Parsi</option>
          <option value="Jewish">Jewish</option>
          <option value="Bahai">Bahai</option>
          <option value="Buddhist">Buddhist</option>
          <option value="Other">Other</option>
        </select>
        {errors.religion && (
          <p className="text-red-500 text-sm mt-1">Religion is required</p>
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

export default Step4CulturalDetails;
