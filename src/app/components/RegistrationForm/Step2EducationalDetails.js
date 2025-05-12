'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStep, updateFormData } from '@/lib/features/profile/profileSlice';
import fieldsData from './fieldsData.json';
import { BookOpenIcon, BriefcaseIcon, ChevronRightIcon, GraduationCapIcon, Banknote } from 'lucide-react';

const Step2EducationalDetails = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      highest_education: "",
      course: "",
      occupation: "",
      employed_in: "",
      annual_income: "",
    }
  });
  
  const [isCourseVisible, setIsCourseVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const education = watch('highest_education', '');
  const course = watch('course', '');

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Step2 Data:', data);
      dispatch(updateFormData(data));
      dispatch(setStep(3));
      setIsSubmitting(false);
    }, 600);
  };

  useEffect(() => {
    setIsCourseVisible(education === 'Below High School' || education === 'High School (12th)' || education === '');
    let availableCourses = [];
    setValue('course', ''); // Reset course when education changes
    
    switch (education) {
      case "Bachelor's":
        availableCourses = fieldsData.bachelor_courses;
        break;
      case "Master's":
        availableCourses = fieldsData.master_courses;
        break;
      case "Doctorate":
        availableCourses = fieldsData.doctorate_courses;
        break;
      case "Diploma":
        availableCourses = fieldsData.diploma_courses;
        break;
      default:
        availableCourses = {}; // No courses if not selected
        break;
    }
    
    setCourses(availableCourses);
  }, [education, setValue]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-pink-500 via-primary to-indigo-500 p-1 rounded-2xl shadow-lg">
        <div className="bg-white p-6 sm:p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Education & Career</h2>
            <p className="text-gray-500 mt-2">Tell us about your educational background and professional life</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Highest Education */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <GraduationCapIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Highest Education <span className="text-red-500">*</span>
                  </label>
                  <select 
                    {...register('highest_education', { 
                      required: "Please select your highest education" 
                    })} 
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Your Education</option>
                    <option value="Below High School">Below High School</option>
                    <option value="High School (12th)">High School (12th)</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor's">Bachelor&apos;s</option>
                    <option value="Master's">Master&apos;s</option>
                    <option value="Doctorate">Doctorate/PhD</option>
                  </select>
                  {errors.highest_education && (
                    <p className="text-red-500 text-sm mt-1">{errors.highest_education.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Courses on condition */}
            {!isCourseVisible && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start">
                  <BookOpenIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course <span className="text-red-500">*</span>
                    </label>
                    <select 
                      {...register('course', { 
                        required: "Please select your course of study" 
                      })} 
                      className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                    >
                      <option value="">Select Your Course</option>
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
                    {errors.course && (
                      <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Occupation */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <BriefcaseIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation <span className="text-red-500">*</span>
                  </label>
                  <select 
                    {...register('occupation', { 
                      required: "Please select your occupation" 
                    })} 
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Your Occupation</option>
                    {fieldsData.occupationOptions.map((occupation, index) => (
                      <option key={index} value={occupation}>
                        {occupation}
                      </option>
                    ))}
                  </select>
                  {errors.occupation && (
                    <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>
                  )}
                </div>
              </div>
            </div>
          
            {/* Employed In */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-primary mr-2 mt-0.5"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
                  <path d="M1 21h22"></path>
                  <path d="M16 4V2"></path>
                  <path d="M8 4V2"></path>
                  <path d="M12 14v.01"></path>
                </svg>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employed In <span className="text-red-500">*</span>
                  </label>
                  <select 
                    {...register('employed_in', { 
                      required: "Please select your employment sector" 
                    })} 
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Employment Sector</option>
                    {fieldsData.employeeInOptions.map((employed_in, index) => (
                      <option key={index} value={employed_in}>
                        {employed_in}
                      </option>
                    ))}
                  </select>
                  {errors.employed_in && (
                    <p className="text-red-500 text-sm mt-1">{errors.employed_in.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Annual Income */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <Banknote className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Income <span className="text-red-500">*</span>
                  </label>
                  <select 
                    {...register('annual_income', { 
                      required: "Please select your annual income" 
                    })} 
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Income Range</option>
                    {fieldsData.annualIncomeOptions.map((annual_income, index) => (
                      <option key={index} value={annual_income}>
                        {annual_income}
                      </option>
                    ))}
                  </select>
                  {errors.annual_income && (
                    <p className="text-red-500 text-sm mt-1">{errors.annual_income.message}</p>
                  )}
                </div>
              </div>
            </div>
          
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Continue to Next Step
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step2EducationalDetails;