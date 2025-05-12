"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setStep, updateFormData } from "@/lib/features/profile/profileSlice";
import fieldsData from "./fieldsData.json";
import { useEffect, useState } from "react";
import { 
  Globe2Icon, 
  HeartIcon, 
  StarIcon, 
  HomeIcon,
  UsersIcon,
  ChevronRightIcon
} from "lucide-react";

const Step4CulturalDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      mother_tongue: "",
      thoughts_on_horoscope: "",
      religion: "",
      sect: "",
      jamaat: "",
      caste: "",
      manglik: "Non-Manglik",
    }
  });
  
  const dispatch = useDispatch();

  const religion = watch("religion", "");
  const sect = watch("sect", "");

  // Reset dependent fields when religion changes
  useEffect(() => {
    if (religion !== "Muslim") {
      setValue("sect", "");
      setValue("jamaat", "");
    }
    
    // Reset caste when religion changes
    setValue("caste", "");
  }, [religion, setValue]);

  // Reset Jamaat when sect changes
  useEffect(() => {
    if (sect !== "Sunni") {
      setValue("jamaat", "");
    }
  }, [sect, setValue]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      dispatch(updateFormData(data));
      dispatch(setStep(4)); // Move to next step
      setIsSubmitting(false);
    }, 600);
  };

  // Determine which caste field to show based on religion
  const getCasteFieldName = () => {
    switch(religion) {
      case "Hindu": return "hinduCaste";
      case "Muslim": return "muslimCaste";
      case "Sikh": return "sikhCaste";
      case "Jain": return "jainCaste";
      case "Christian": return "christianCaste";
      default: return null;
    }
  };

  const casteFieldName = getCasteFieldName();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-pink-500 via-primary to-indigo-500 p-1 rounded-2xl shadow-lg">
        <div className="bg-white p-6 sm:p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Cultural Background</h2>
            <p className="text-gray-500 mt-2">Tell us about your cultural heritage and background</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Mother Tongue */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <Globe2Icon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother Tongue <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("mother_tongue", { 
                      required: "Mother tongue is required" 
                    })}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Your Mother Tongue</option>
                    {fieldsData.motherTongue.map((mother_tongue, index) => (
                      <option key={index} value={mother_tongue}>
                        {mother_tongue}
                      </option>
                    ))}
                  </select>
                  {errors.mother_tongue && (
                    <p className="text-red-500 text-sm mt-1">{errors.mother_tongue.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Religion */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <HomeIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Religion <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("religion", { 
                      required: "Religion is required" 
                    })}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Your Religion</option>
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
                    <p className="text-red-500 text-sm mt-1">{errors.religion.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Dynamic Caste field based on selected religion */}
            {casteFieldName && fieldsData[casteFieldName] && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start">
                  <UsersIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Caste <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("caste", { 
                        required: "Caste is required" 
                      })}
                      className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                    >
                      <option value="">Select Your Caste</option>
                      {fieldsData[casteFieldName].map((caste, index) => (
                        <option key={index} value={caste}>
                          {caste}
                        </option>
                      ))}
                    </select>
                    {errors.caste && (
                      <p className="text-red-500 text-sm mt-1">{errors.caste.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Muslim Sect - Show only if religion is Muslim */}
            {religion === "Muslim" && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start">
                  <HomeIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sect <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("sect", { 
                        required: "Sect is required" 
                      })}
                      className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                    >
                      <option value="">Select Your Sect</option>
                      <option value="Sunni">Sunni</option>
                      <option value="Shia">Shia</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.sect && (
                      <p className="text-red-500 text-sm mt-1">{errors.sect.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Muslim Jamaat - Show only if religion is Muslim and sect is Sunni */}
            {religion === "Muslim" && sect === "Sunni" && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start">
                  <UsersIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jamaat <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("jamaat", { 
                        required: "Jamaat is required" 
                      })}
                      className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                    >
                      <option value="">Select Your Jamaat</option>
                      {fieldsData.muslimJamaat.map((jamaat, index) => (
                        <option key={index} value={jamaat}>
                          {jamaat}
                        </option>
                      ))}
                    </select>
                    {errors.jamaat && (
                      <p className="text-red-500 text-sm mt-1">{errors.jamaat.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Thoughts On Horoscope */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <StarIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Do you believe in horoscope matching? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <label className="relative">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("thoughts_on_horoscope", { 
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
                        {...register("thoughts_on_horoscope", { 
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
                  {errors.thoughts_on_horoscope && (
                    <p className="text-red-500 text-sm mt-1">{errors.thoughts_on_horoscope.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Manglik - Only show for Hindu and related religions */}
            {(religion === "Hindu" || religion === "Jain" || religion === "Sikh") && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start">
                  <HeartIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Manglik Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("manglik", { 
                        required: "Manglik status is required" 
                      })}
                      className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                    >
                      <option value="Non-Manglik">Non-Manglik</option>
                      <option value="Manglik">Manglik</option>
                      <option value="Anshik-Manglik">Anshik-Manglik</option>
                    </select>
                    {errors.manglik && (
                      <p className="text-red-500 text-sm mt-1">{errors.manglik.message}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      Manglik refers to a specific astrological alignment in a birth chart that is considered in some marriage traditions.
                    </p>
                  </div>
                </div>
              </div>
            )}

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

export default Step4CulturalDetails;