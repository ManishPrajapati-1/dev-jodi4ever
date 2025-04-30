'use client';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setStep, updateFormData } from '@/lib/features/profile/profileSlice';

const Step5LifestyleDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log('Lifestyle Details Submitted:', data);
    dispatch(updateFormData(data)); // Save form data to Redux
    dispatch(setStep(6)); // Move to Step 6 (Image Upload)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Lifestyle Preferences</h2>

  {/* Diet */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Diet <span className="text-red-500">*</span>
    </label>
    <select {...register('diet', { required: true })} className="input-select w-full">
      <option value="">Select Diet</option>
      <option value="Veg">Vegetarian</option>
      <option value="Non-Vegetarian">Non-Vegetarian</option>
      <option value="Eggetarian">Eggetarian</option>
      <option value="Vegan">Vegan</option>
    </select>
    {errors.diet && <p className="text-red-500 text-sm mt-1">Diet is required</p>}
  </div>

  {/* Smoking */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Smoking <span className="text-red-500">*</span>
    </label>
    <select {...register('smoking', { required: true })} className="input-select w-full">
      <option value="">Do you smoke?</option>
      <option value="No">No</option>
      <option value="Yes">Yes</option>
      <option value="Occasionally">Occasionally</option>
    </select>
    {errors.smoking && <p className="text-red-500 text-sm mt-1">Smoking preference is required</p>}
  </div>

  {/* Drinking */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Drinking <span className="text-red-500">*</span>
    </label>
    <select {...register('drinking', { required: true })} className="input-select w-full">
      <option value="">Do you drink?</option>
      <option value="No">No</option>
      <option value="Yes">Yes</option>
      <option value="Occasionally">Occasionally</option>
    </select>
    {errors.drinking && <p className="text-red-500 text-sm mt-1">Drinking preference is required</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
  >
    Next
  </button>
</form>

  );
};

export default Step5LifestyleDetails;
