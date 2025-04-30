"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetStatesQuery, useGetCitiesQuery } from '@/lib/services/api';
import { setStep, updateFormData } from '@/lib/features/profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';

const Step1PersonalDetails = () => {
  const preferencesData = useSelector((state) => state.profile.preferences);
  const { register, handleSubmit, watch, setValue } = useForm({
    gender: '',
  });
  const { data: states, error: statesError, isLoading: statesLoading } = useGetStatesQuery();
  const selectedStateCode = watch('state');
  
  const { data: cities, error: citiesError, isLoading: citiesLoading } = useGetCitiesQuery(selectedStateCode, {
    skip: !selectedStateCode, // Skip the query if no state is selected
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Selected State Code:', selectedStateCode);
    if (selectedStateCode) {
      setValue('city', ''); 
    }
    if (preferencesData?.lookingFor) {
      const oppositeGender = preferencesData.lookingFor === "Groom" ? "Female" : "Male";
      setValue("gender", oppositeGender);
    }
  }, [preferencesData, selectedStateCode, setValue]);

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
        dispatch(updateFormData(data));
        dispatch(setStep(2));
    // dispatch or next step logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic Information</h2>

  {/* Date of Birth */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth<span className="text-red-500">*</span></label>
    <input type="date" {...register('dob', { required: true })} className="input-select w-full" />
  </div>

  {/* Gender */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Gender<span className="text-red-500">*</span></label>
    <select {...register('gender', { required: true })} className="input-select w-full">
      <option value="">Select</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>

  {/* Marital Status */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status<span className="text-red-500">*</span></label>
    <select {...register('maritalStatus', { required: true })} className="input-select w-full">
      <option value="">Select</option>
      <option value="Single">Single</option>
      <option value="Married">Married</option>
      <option value="Divorced">Divorced</option>
      <option value="Widowed">Widowed</option>
    </select>
  </div>

  {/* Height */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Height<span className="text-red-500">*</span></label>
    <select {...register('height', { required: true })} className="input-select w-full">
      <option value="">Select</option>
      {Array.from({ length: 37 }, (_, i) => {
        const feet = Math.floor(i / 12) + 4;
        const inches = i % 12;
        const cm = (feet * 30.48 + inches * 2.54).toFixed(2);
        return (
          <option key={i} value={`${feet}'${inches}"`}>
            {feet}&apos;{inches}&quot; ({cm} cm)
          </option>
        );
      })}
    </select>
  </div>

  {/* State */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">State<span className="text-red-500">*</span></label>
    <select {...register('state', { required: true })} className="input-select w-full">
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
  </div>

  {/* City */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">City<span className="text-red-500">*</span></label>
    <select {...register('city', { required: true })} className="input-select w-full">
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
  </div>

  {/* Submit */}
  <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition disabled:opacity-50">
    Next
  </button>
</form>

  );
};

export default Step1PersonalDetails;
