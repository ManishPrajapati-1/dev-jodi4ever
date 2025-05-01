'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setStep } from '@/lib/features/profile/profileSlice';
import { useUpdateProfileMutation } from '@/lib/services/api';
import Image from 'next/image';

const Step6ProfileImage = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.profile.formData); // Get all previous form data
  const [updateProfile, { isLoading, isSuccess, isError }] = useUpdateProfileMutation();
  const [previews, setPreviews] = useState([]);

  const images = watch('images');
  const onSubmit = async (data) => {
    // const onSubmit = (data) => {
    try {
      const formDataToSend = new FormData();
  
      // Append normal fields
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      // Append heightInCm manually (you wrote hardcoded 23)
      formDataToSend.append('heightInCm', 23);
  
      // Append images separately
      const images = data.images;
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formDataToSend.append('profile_image', images[i]);
        }
      }
      console.log('Submitting Final Profile:', formDataToSend);
  
      await updateProfile(formDataToSend).unwrap();
      dispatch(setStep(7));
      // alert('Profile created successfully!');
      // Optionally navigate to success page
    } catch (error) {
      console.error('Profile submission failed:', error);
      alert('Failed to create profile. Please try again.');
    }
  };
  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
    setValue('images', files, { shouldValidate: true });
    // setValue('images', files);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Upload Your Profile Photos</h2>
        <p className="text-gray-500 text-sm">Select 1-5 good photos. First photo will be your main photo.</p>
      </div>

      <div className="border-2 border-dashed border-secondary p-6 rounded-lg flex flex-col items-center justify-center">
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
          className="cursor-pointer bg-btn text-white px-6 py-2 rounded hover:bg-btn-hover"
        >
          Select Images
        </label>
        <p className="text-gray-400 mt-2 text-sm">(Max 5 images)</p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {previews.map((src, idx) => (
            <div key={idx} className="border rounded overflow-hidden">
              <Image
                width={200}
                height={200}
                src={src}
                alt={`Preview ${idx + 1}`}
                className="w-full h-32 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded w-full"
      >
        {isLoading ? 'Submitting...' : 'Finish & Create Profile'}
      </button>

      {isError && (
        <p className="text-red-500 text-center mt-2">Something went wrong. Please try again.</p>
      )}
      {isSuccess && (
        <p className="text-green-500 text-center mt-2">Profile created successfully!</p>
      )}
    </form>
  );
};

export default Step6ProfileImage;
