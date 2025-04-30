'use client';

import { set, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStep, updateFormData } from '@/lib/features/profile/profileSlice';

const Step2EducationalDetails = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [isCourseVisible, setIsCourseVisible] = useState(false);
  const dispatch = useDispatch();

  const education = watch('highestEducation', '');

  const onSubmit = (data) => {
    console.log('Step2 Data:', data);
    dispatch(updateFormData(data));
    dispatch(setStep(3));
  };

  useEffect(() => {
    setIsCourseVisible(education === 'Below High School' || education === 'High School (12th)' || education === '');
  }, [education, isCourseVisible]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold text-gray-800 mb-1">
        Talk about education & career
      </h2>
      <p className="text-xs font-bold text-gray-400">Mentioning this would help profiles know you better</p>

  
    {/* Highest Education */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Education<span className="text-red-500">*</span></label>
      <select {...register('highestEducation', { required: true })} className="input-select w-full">
        <option value="">Select Education</option>
        <option value="Below High School">Below High School</option>
        <option value="High School (12th)">High School (12th)</option>
        <option value="Diploma">Diploma</option>
        <option value="Bachelor's">Bachelor&apos;s</option>
        <option value="Master's">Master&apos;s</option>
        <option value="Doctorate">Doctorate/PhD</option>
      </select>
      {errors.highestEducation && <p className="text-red-500 text-sm mt-1">This field is required</p>}
    </div>

    {/* Courses on condition */}
    {!isCourseVisible ? (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course<span className="text-red-500">*</span></label>
        <select {...register('course', { required: true })} className="input-select w-full">
          <option value="">Course</option>
          {/* Add options from fieldsData.json */}
        </select>
        {errors.highestEducation && <p className="text-red-500 text-sm mt-1">This field is required</p>}
      </div>
    ) : null}

    {/* Degree */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Degree<span className="text-red-500">*</span></label>
      <input
        type="text"
        {...register('degree', { required: true })}
        className="input-select w-full"
        placeholder="E.g., B.Tech, M.Sc"
      />
      {errors.degree && <p className="text-red-500 text-sm mt-1">Degree is required</p>}
    </div>
  
    {/* College/University */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">College/University<span className="text-red-500">*</span></label>
      <input
        type="text"
        {...register('college', { required: true })}
        className="input-select w-full"
        placeholder="E.g., Delhi University"
      />
      {errors.college && <p className="text-red-500 text-sm mt-1">College/University is required</p>}
    </div>
  
    {/* Submit Button */}
    <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition disabled:opacity-50">
      Next
    </button>
  </form>
  
  );
};

export default Step2EducationalDetails;
