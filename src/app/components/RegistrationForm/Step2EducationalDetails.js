'use client';

import { set, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStep, updateFormData } from '@/lib/features/profile/profileSlice';
import fieldsData from './fieldsData.json'; 

const Step2EducationalDetails = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [isCourseVisible, setIsCourseVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();

  const education = watch('highest_education', '');
  const course = watch('course', '');
  console.log('Selected Course:', course);
  const onSubmit = (data) => {
    console.log('Step2 Data:', data);
    dispatch(updateFormData(data));
    dispatch(setStep(3));
  };

  // useEffect(() => {
  //   setIsCourseVisible(education === 'Below High School' || education === 'High School (12th)' || education === '');
  // }, [education, isCourseVisible]);

  useEffect(() => {
    setIsCourseVisible(education === 'Below High School' || education === 'High School (12th)' || education === '');
      let availableCourses = [];
      let availableCategories = [];
      setValue('course', ''); // Reset course when education changes
      switch (education) {
        case "Bachelor's":
          availableCourses = fieldsData.bachelor_courses;
          availableCategories = Object.keys(fieldsData.bachelor_courses);
          break;
        case "Master's":
          availableCourses = fieldsData.master_courses;
          availableCategories = Object.keys(fieldsData.master_courses);
          break;
        case "Doctorate":
          availableCourses = fieldsData.doctorate_courses;
          availableCategories = Object.keys(fieldsData.doctorate_courses);
          break;
        case "Diploma":
          availableCourses = fieldsData.diploma_courses;
          availableCategories = Object.keys(fieldsData.diploma_courses);
          break;
        default:
          availableCourses = []; // No courses if not selected
          availableCategories = [];
          break;
      }
      console.log('Available Courses:', availableCourses);
      // console.log('Available Categories:', availableCategories);
      // setCategories(availableCategories);
      setCourses(availableCourses);
   
  }, [education]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold text-gray-800 mb-1">
        Talk about education & career
      </h2>
      <p className="text-xs font-bold text-gray-400">Mentioning this would help profiles know you better</p>

  
    {/* Highest Education */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Education<span className="text-red-500">*</span></label>
      <select {...register('highest_education', { required: true })} className="input-select w-full">
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
          <option value="" disabled>Course</option>
          {/* Add options from fieldsData.json */}
          {Object.entries(courses).map(([category, courseList], index) => (
                  <optgroup key={index} label={category}>
                    {courseList.map((course, idx) => (
                      <option key={idx} value={course}>
                        {course}
                      </option>
                    ))}
                  </optgroup>
                ))}
        </select>
        {errors.highestEducation && <p className="text-red-500 text-sm mt-1">This field is required</p>}
      </div>
    ) : null}

    {/* Occupation */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Occupation<span className="text-red-500">*</span></label>
      <select {...register('occupation', { required: true })} className="input-select w-full">
        <option value="" disabled>Occupation</option>
        {fieldsData.occupationOptions.map((occupation, index) => (
                <option key={index} value={occupation}>
                  {occupation}
                </option>
              ))}
      </select>
      {errors.occupation && <p className="text-red-500 text-sm mt-1">This field is required</p>}
    </div>
  
    {/* Employed In */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Employee In<span className="text-red-500">*</span></label>
      <select {...register('employed_in', { required: true })} className="input-select w-full">
        <option value="" disabled>Employee In</option>
        {fieldsData.employeeInOptions.map((employed_in, index) => (
                <option key={index} value={employed_in}>
                  {employed_in}
                </option>
              ))}
      </select>
      {errors.employed_in && <p className="text-red-500 text-sm mt-1">This field is required</p>}
    </div>

    {/* Annual Income */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income<span className="text-red-500">*</span></label>
      <select {...register('annual_income', { required: true })} className="input-select w-full">
        <option value="" disabled>Annual Income</option>
        {fieldsData.annualIncomeOptions.map((annual_income, index) => (
                <option key={index} value={annual_income}>
                  {annual_income}
                </option>
              ))}
      </select>
      {errors.annual_income && <p className="text-red-500 text-sm mt-1">This field is required</p>}
    </div>
  
    {/* Submit Button */}
    <button type="submit" className="w-full mt-4 bg-btn hover:bg-btn-hover text-white py-2 px-4 rounded transition disabled:opacity-50">
      Next
    </button>
  </form>
  
  );
};

export default Step2EducationalDetails;
