'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setStep, updateFormData } from '@/lib/features/profile/profileSlice';

const Step3ProfessionalDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log('Professional Details Submitted:', data);
    dispatch(updateFormData(data)); // Save data in Redux
    dispatch(setStep(4)); // Move to next step (Step 4)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Occupation Details</h2>

  {/* Occupation */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation<span className="text-red-500">*</span></label>
    <input
      type="text"
      {...register('occupation', { required: true })}
      className="input-select w-full"
      placeholder="E.g., Software Engineer, Teacher"
    />
    {errors.occupation && <p className="text-red-500 text-sm mt-1">Occupation is required</p>}
  </div>

  {/* Company */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name<span className="text-red-500">*</span></label>
    <input
      type="text"
      {...register('company', { required: true })}
      className="input-select w-full"
      placeholder="E.g., TCS, Infosys"
    />
    {errors.company && <p className="text-red-500 text-sm mt-1">Company Name is required</p>}
  </div>

  {/* Income */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (INR)<span className="text-red-500">*</span></label>
    <input
      type="number"
      {...register('income', { required: true, min: 1 })}
      className="input-select w-full"
      placeholder="E.g., 500000"
    />
    {errors.income && <p className="text-red-500 text-sm mt-1">Income must be a positive number</p>}
  </div>

  {/* Submit */}
  <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition disabled:opacity-50">
    Next
  </button>
</form>

  );
};

export default Step3ProfessionalDetails;
