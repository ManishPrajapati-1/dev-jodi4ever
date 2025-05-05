'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setStep } from '@/lib/features/profile/profileSlice';
import { useUpdateProfileMutation } from '@/lib/services/api';
import Image from 'next/image';
import { X } from 'lucide-react';

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

  const images = watch('images', []);

  // Reset error message when images change
  useEffect(() => {
    setErrorMessage('');
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Check if total images exceed the maximum
    if (files.length > MAX_IMAGES) {
      setErrorMessage(`You can only upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }
    
    // Generate previews for the files
    const newPreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    
    setPreviews(newPreviews);
    setValue('images', files, { shouldValidate: true });
    
    // Clear any existing validation errors
    if (files.length > 0) {
      setErrorMessage('');
    }
  };

  const removeImage = (index) => {
    const newPreviews = [...previews];
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
      dispatch(setStep(6));
    } catch (err) {
      console.error('Profile submission failed:', err);
      setErrorMessage(err.data?.message || 'Failed to create profile. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Add your photos to complete your profile
        </h2>
        <p className="text-gray-500 text-sm">
          Profiles with photos get 10x more responses. Add your best photos to get more matches.
          Your photos are 100% safe and private. Only your profile photo will be visible to others.
        </p>
      </div>

      <div className="border-2 border-dashed border-secondary p-6 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
        <input
          type="file"
          {...register('images')}
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-btn text-white px-6 py-2 rounded hover:bg-btn-hover transition-colors"
        >
          Select Images
        </label>
        <p className="text-gray-400 mt-2 text-sm">First image will be your main profile photo</p>
        <p className="text-gray-400 text-sm font-bold">
          {previews.length}/{MAX_IMAGES} images uploaded
        </p>
      </div>

      {errors.images && (
        <p className="text-red-500 text-sm text-center">{errors.images.message}</p>
      )}
      
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      {previews.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-gray-700 font-medium">Selected Photos:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {previews.map((preview, idx) => (
              <div key={idx} className="border rounded overflow-hidden relative group">
                <Image
                  width={200}
                  height={200}
                  src={preview.url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
                {idx === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-1">
                    <span className="text-white text-xs">Main Photo</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Your first image will be your main profile photo.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition disabled:opacity-50"
      >
        {isLoading ? 'Uploading...' : 'Complete Profile'}
      </button>

      {isError && (
        <p className="text-red-500 text-center mt-2">
          {error?.data?.message || 'Something went wrong. Please try again.'}
        </p>
      )}
      {isSuccess && (
        <p className="text-green-500 text-center mt-2">Profile created successfully!</p>
      )}
    </form>
  );
};

export default Step6ProfileImage;