'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setStep } from '@/lib/features/profile/profileSlice';
import { useUpdateProfileMutation } from '@/lib/services/api';
import Image from 'next/image';
import { X, Upload, Camera, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const MAX_IMAGES = 5;

const Step6ProfileImage = () => {
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    formState: { errors } 
  } = useForm();
  
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.profile.formData);
  const [updateProfile, { isLoading, isSuccess, isError, error }] = useUpdateProfileMutation();
  const [previews, setPreviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const images = watch('images', []);

  // Reset error message when images change
  useEffect(() => {
    setErrorMessage('');
  }, [images]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (files) => {
    // Filter for image files only
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Check if total images exceed the maximum
    if (imageFiles.length > MAX_IMAGES) {
      setErrorMessage(`You can only upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }
    
    // Generate previews for the files
    const newPreviews = imageFiles.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    
    setPreviews(newPreviews);
    setValue('images', imageFiles, { shouldValidate: true });
    
    // Clear any existing validation errors
    if (imageFiles.length > 0) {
      setErrorMessage('');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const removeImage = (index) => {
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index].url); // Clean up URL object
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    
    // Update the form data with the remaining files
    const remainingFiles = newPreviews.map(preview => preview.file);
    setValue('images', remainingFiles.length > 0 ? remainingFiles : null);
  };

  const onSubmit = async (data) => {
    try {
      // Check if at least one image is uploaded
      if (!previews || previews.length === 0) {
        setErrorMessage('Please upload at least one image to continue.');
        return;
      }

      const formDataToSend = new FormData();
  
      // Append all previous form data
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      // Append heightInCm
      formDataToSend.append('heightInCm', 23);
  
      // Append images separately - using the previews array which contains the actual files
      if (previews && previews.length > 0) {
        for (let i = 0; i < previews.length; i++) {
          formDataToSend.append('profile_image', previews[i].file);
        }
      }
      
      await updateProfile(formDataToSend).unwrap();
      dispatch(setStep(6)); // Assuming step 7 is the completion or next step
    } catch (err) {
      console.error('Profile submission failed:', err);
      setErrorMessage(err.data?.message || 'Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-pink-500 via-primary to-indigo-500 p-1 rounded-2xl shadow-lg">
        <div className="bg-white p-6 sm:p-8 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Profile Photos</h2>
              <p className="text-gray-500 mt-2">
                Profiles with photos get 10x more responses. Select your best images to make a great impression.
              </p>
            </div>

            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-200 ${
                dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                {...register('images', {
                  validate: {
                    required: value => {
                      if (!value || value.length === 0) {
                        return previews.length > 0 || "Please upload at least one photo";
                      }
                      return true;
                    },
                    maxCount: value => {
                      return (!value || value.length <= MAX_IMAGES) || `You can only upload a maximum of ${MAX_IMAGES} images`;
                    }
                  }
                })}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              
              <div className="mb-4 bg-primary/10 p-4 rounded-full">
                <Camera size={36} className="text-primary" />
              </div>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Your Photos</h3>
              <p className="text-gray-500 text-center mb-4">
                Drag and drop images here, or click to select files
              </p>
              
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center font-medium"
              >
                <Upload size={18} className="mr-2" />
                Select Images
              </label>
              
              <div className="flex items-center mt-6 text-sm text-gray-500">
                <div className="flex items-center mr-4">
                  <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-1 font-medium">
                    {previews.length}
                  </span>
                  <span>of {MAX_IMAGES} photos</span>
                </div>
                
                {/* First photo tag */}
                {previews.length > 0 && (
                  <div className="flex items-center text-primary">
                    <CheckCircle size={16} className="mr-1" />
                    First photo will be your main profile photo
                  </div>
                )}
              </div>
            </div>

            {/* Error Messages */}
            {(errors.images || errorMessage) && (
              <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg">
                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                <p className="text-sm">
                  {errors.images?.message || errorMessage}
                </p>
              </div>
            )}

            {/* Preview Grid */}
            {previews.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-800">Selected Photos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {previews.map((preview, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden relative group shadow-md">
                      <div className="aspect-square relative">
                        <Image
                          fill
                          src={preview.url}
                          alt={`Preview ${idx + 1}`}
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity shadow-sm"
                        aria-label="Remove image"
                      >
                        <X size={16} />
                      </button>
                      
                      {idx === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-1.5 px-3">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                            <span className="text-white text-xs font-medium">Main Photo</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || previews.length === 0}
                className={`w-full py-3.5 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
                  previews.length === 0 
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                    : isLoading 
                      ? 'bg-primary/70 text-white cursor-wait' 
                      : 'bg-primary hover:bg-primary/90 text-white'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Complete Your Profile
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg">
                <CheckCircle size={18} className="mr-2 flex-shrink-0" />
                <p className="text-sm font-medium">Profile created successfully!</p>
              </div>
            )}
            
            {/* Final tips */}
            <div className="text-center text-sm text-gray-500 pt-2">
              <p>Your photos are 100% safe and private. Only verified members will be able to see them.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step6ProfileImage;