"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setStep, updateFormData } from "@/lib/features/profile/profileSlice";
import { 
  UtensilsIcon, 
  HomeIcon, 
  FileTextIcon,
  ChevronRightIcon
} from "lucide-react";

const Step5LifestyleDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 300;
  const formData = useSelector((state) => state.profile.formData);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // defaultValues: {
    //   diet: "",
    //   living_with_family: "",
    //   description: "",
    // }
    defaultValues: formData
  });
  
  const dispatch = useDispatch();
  
  const description = watch("description", "");
  
  // Update character count when description changes
  const handleDescriptionChange = (e) => {
    setCharCount(e.target.value.length);
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Lifestyle Details Submitted:", data);
      dispatch(updateFormData(data));
      dispatch(setStep(5)); // Move to next step (Image Upload)
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-pink-500 via-primary to-indigo-500 p-1 rounded-2xl shadow-lg">
        <div className="bg-white p-6 sm:p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Your Lifestyle</h2>
            <p className="text-gray-500 mt-2">Tell us about your daily lifestyle and preferences</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Diet */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <UtensilsIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diet Preference <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("diet", { 
                      required: "Please select your diet preference" 
                    })}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Diet Preference</option>
                    <option value="Veg">Vegetarian</option>
                    <option value="Eggetarian">Eggetarian</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                    <option value="Occasionally Non-Veg">Occasionally Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Jain">Jain</option>
                  </select>
                  {errors.diet && (
                    <p className="text-red-500 text-sm mt-1">{errors.diet.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Living with Family */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <HomeIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Living with Family <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <label className="relative">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("living_with_family", { 
                          required: "Please select an option" 
                        })}
                        className="sr-only peer"
                      />
                      <div className="block cursor-pointer px-4 py-3 border-2 rounded-lg text-center transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary border-gray-200">
                        <div className="font-medium">Yes</div>
                      </div>
                      <div className="absolute hidden peer-checked:block top-3 right-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </label>
                    
                    <label className="relative">
                      <input
                        type="radio"
                        value="No"
                        {...register("living_with_family", { 
                          required: "Please select an option" 
                        })}
                        className="sr-only peer"
                      />
                      <div className="block cursor-pointer px-4 py-3 border-2 rounded-lg text-center transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary border-gray-200">
                        <div className="font-medium">No</div>
                      </div>
                      <div className="absolute hidden peer-checked:block top-3 right-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </label>
                  </div>
                  {errors.living_with_family && (
                    <p className="text-red-500 text-sm mt-1">{errors.living_with_family.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <FileTextIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tell us about yourself <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("description", { 
                      required: "Please write a brief description about yourself",
                      minLength: {
                        value: 50,
                        message: "Please write at least 50 characters"
                      },
                      maxLength: {
                        value: maxChars,
                        message: `Description cannot exceed ${maxChars} characters`
                      }
                    })}
                    rows={5}
                    onChange={(e) => handleDescriptionChange(e)}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
                    placeholder="Write about your personality, interests, hobbies, and what you're looking for in a partner..."
                  />
                  <div className="flex justify-between mt-1">
                    <div>
                      {errors.description ? (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                      ) : (
                        <p className="text-gray-400 text-xs">
                          Tell potential matches more about your personality, interests, and what you&apos;re looking for.
                        </p>
                      )}
                    </div>
                    <div className={`text-xs font-medium ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
                      {charCount}/{maxChars}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || charCount > maxChars}
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
                    Continue to Photo Upload
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

export default Step5LifestyleDetails;