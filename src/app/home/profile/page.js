"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import fieldsData from "../fieldsData.json";
import {
  Upload,
  Edit2,
  Save,
  X,
  Camera,
  Eye,
  Trash2,
  Plus,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  User,
  Users,
  Utensils,
  Languages,
  Home,
  Building,
  Check,
  Cake,
  Ruler,
  Globe,
  Loader2,
} from "lucide-react";

// Import your RTK query mutation
import {
  useUpdateProfileMutation,
  useDeleteProfileImageMutation,
  useGetStatesQuery,
  useGetCitiesQuery,
} from "@/lib/services/api";
import { updateUserProfile } from "@/lib/features/user/userSlice";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [viewImageIndex, setViewImageIndex] = useState(null);
  const [isDel, setIsDeleting] = useState(false);
  const [isCourseVisible, setIsCourseVisible] = useState(false);
  const [courses, setCourses] = useState([]);

  // File input ref to programmatically trigger file selection
  const fileInputRef = useRef(null);
  const inputRefs = useRef({});

  // State for image viewing modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jodi4ever.com/";

  // Assuming this is how your redux state is structured
  const userProfile = useSelector((state) => state.user.data?.user);
  const MAX_IMAGES = 5;

  // Main form for profile data
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: userProfile,
  });

  const {
    data: states,
    error: statesError,
    isLoading: statesLoading,
  } = useGetStatesQuery();

  const selectedStateCode = watch("state");

  const {
    data: cities,
    error: citiesError,
    isLoading: citiesLoading,
  } = useGetCitiesQuery(selectedStateCode, {
    skip: !selectedStateCode,
  });

  useEffect(() => {
    // This runs only when userProfile changes or component mounts
    if (userProfile.stateCode) {
      setValue("state", userProfile.stateCode);
      if (userProfile.city) {
        setValue("city", userProfile.city);
      }
    }
  }, [userProfile, setValue, citiesLoading, statesLoading]);

  // Watch for education changes to update course options
  const highestEducation = watch("highest_education");
  const images = watch("images", []);
  const religion = watch("religion", "");
  const sect = watch("sect", "");

  // Reset dependent fields when religion changes
  useEffect(() => {
    if (religion !== "Muslim") {
      setValue("sect", "");
      setValue("jammat", "");
    }

    // Reset caste when religion changes
    // setValue("caste", "");
  }, [religion, setValue]);

  // Reset jammat when sect changes
  useEffect(() => {
    if (sect !== "Sunni") {
      setValue("jammat", "");
    }
  }, [sect, setValue]);

  // Add this function to determine which caste field to show
  const getCasteFieldName = () => {
    switch (religion) {
      case "Hindu":
        return "hinduCaste";
      case "Muslim":
        return "muslimCaste";
      case "Sikh":
        return "sikhCaste";
      case "Jain":
        return "jainCaste";
      case "Christian":
        return "christianCaste";
      default:
        return null;
    }
  };

  const casteFieldName = getCasteFieldName();

  // RTK Query mutation hook for saving profile updates
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [deleteImage, { isLoading: isDeleting }] =
    useDeleteProfileImageMutation();

  const handleFiles = (files) => {
    // Filter for image files only
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    // Get current images and check if new total will exceed the maximum
    const currentFiles = previews.map((preview) => preview.file);
    const totalFiles = [...currentFiles, ...imageFiles];

    // Check if total images exceed the maximum
    // if (imageFiles.length > MAX_IMAGES - userProfile.profile_image?.length) {
    //   toast.error(`You can only upload a maximum of ${MAX_IMAGES} images.`);
    //   return;
    // }

    // Generate previews for the files
    const newPreviews = imageFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));

    // Combine existing previews with new ones
    const updatedPreviews = [...previews, ...newPreviews];
    if (
      updatedPreviews.length >
      MAX_IMAGES - userProfile.profile_image?.length
    ) {
      toast.error(`You can only upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }
    setPreviews(updatedPreviews);

    // Update form value with all files
    setValue("images", totalFiles, { shouldValidate: true });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Handle deleting a specific image
  const handleDeleteImage = async (imageIndex) => {
    try {
      // Show a confirmation dialog before deleting
      if (!window.confirm("Are you sure you want to delete this image?")) {
        return;
      }

      // Update the loading state for the specific image
      setIsDeleting(true);

      // Call the deleteImage mutation with the image index
      const response = await deleteImage({ imageIndex }).unwrap();

      toast.success(response.message || "Image deleted successfully!");
      const updatedImages =
        response.profile_image ||
        userProfile.profile_image.filter((_, idx) => idx !== imageIndex);

      // Update Redux store with the full user profile
      dispatch(
        updateUserProfile({
          ...userProfile,
          profile_image: updatedImages,
        })
      );

      // Also update local formData state to ensure UI consistency
      setValue("profile_image", updatedImages);
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(
        error?.data?.message || "Failed to delete image. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle updating a specific image
  const handleUpdateSpecificImage = async (imageIndex, file) => {
    try {
      setIsUploading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("profile_image", file);
      formDataToSend.append("imageIndex", imageIndex);

      const response = await updateProfile(formDataToSend).unwrap();
      toast.success(response.message || "Image updated successfully!");
      const updatedImages = response?.data?.user?.profile_image || [
        ...userProfile.profile_image,
      ];

      // Update Redux
      dispatch(
        updateUserProfile({
          ...userProfile,
          profile_image: updatedImages,
        })
      );

      // Update local state
      setValue("profile_image", updatedImages);

      // Clear the preview after successful upload
      setPreviews([]);
      setValue("images", []);
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error(
        error?.data?.message || "Failed to update image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Function to handle triggering file selection for a specific image index
  const handleReplaceImage = (index) => {
    setViewImageIndex(index); // Store the index of the image being replaced
    fileInputRef.current.click();
  };

  // Function to handle the file selected for replacement
  const handleReplaceFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only proceed if viewImageIndex is set
    if (viewImageIndex !== null && file) {
      handleUpdateSpecificImage(viewImageIndex, file);
      setViewImageIndex(null); // Reset the view image index
      e.target.value = null; // Reset the file input
    }
  };

  // Function to open modal with a specific image
  const openImageModal = (imageUrl) => {
    setCurrentModalImage(imageUrl);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/create-profile");
      return;
    }
    if (userProfile) {
      // Initialize form data from userProfile
      reset({
        fullName: userProfile.fullName || "",
        dob: userProfile.dob
          ? new Date(userProfile.dob).toISOString().split("T")[0]
          : "",
        height: userProfile.height || "",
        country: userProfile.country || "",
        state: userProfile.state || "",
        stateCode: userProfile.stateCode || "",
        city: userProfile.city || "",
        annual_income: userProfile.annual_income || "",
        employed_in: userProfile.employed_in || "",
        highest_education: userProfile.highest_education || "",
        course: userProfile.course || "",
        occupation: userProfile.occupation || "",
        mother_tongue: userProfile.mother_tongue || "",
        religion: userProfile.religion || "",
        caste: userProfile.caste || "",
        marital_status: userProfile.marital_status || "",
        diet: userProfile.diet || "",
        living_with_family: userProfile.living_with_family || "",
        description: userProfile.description || "",
        heightInCm: userProfile.heightInCm || 23,
        profile_image: userProfile.profile_image || [],
        images: [],
        sect: userProfile.sect || "",
        jammat: userProfile.jammat || "",
      });
      setLoading(false);
    }
  }, [userProfile, reset, router, isDel, isUploading]);

  useEffect(() => {
    setIsCourseVisible(
      highestEducation === "Below High School" ||
        highestEducation === "High School (12th)" ||
        highestEducation === ""
    );

    let availableCourses = [];

    switch (highestEducation) {
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
  }, [highestEducation]);

  const profileData = watch();
  const profileImage = profileData?.profile_image?.[0]
    ? profileData.profile_image[0].startsWith("http")
      ? profileData.profile_image[0]
      : baseUrl + profileData.profile_image[0]
    : "/images/default-user.jpg";

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // If currently editing, cancel and reset form data to original values
      reset({
        fullName: userProfile.fullName || "",
        dob: userProfile.dob
          ? new Date(userProfile.dob).toISOString().split("T")[0]
          : "",
        height: userProfile.height || "",
        country: userProfile.country || "",
        state: userProfile.state || "",
        stateCode: userProfile.stateCode || "",
        city: userProfile.city || "",
        annual_income: userProfile.annual_income || "",
        employed_in: userProfile.employed_in || "",
        highest_education: userProfile.highest_education || "",
        course: userProfile.course || "",
        occupation: userProfile.occupation || "",
        mother_tongue: userProfile.mother_tongue || "",
        religion: userProfile.religion || "",
        caste: userProfile.caste || "",
        marital_status: userProfile.marital_status || "",
        diet: userProfile.diet || "",
        living_with_family: userProfile.living_with_family || "",
        description: userProfile.description || "",
        heightInCm: userProfile.heightInCm || 23,
        profile_image: userProfile.profile_image || [],
        images: [],
        sect: userProfile.sect || "",
        jammat: userProfile.jammat || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data) => {
    try {
      // data.heightInCm = getSelectedCm(data.height);
      const selectedState = states?.data?.find(
        (state) => state.isoCode === data.state
      );

      // Create the final data object
      const finalData = {
        ...data,
        heightInCm: getSelectedCm(data.height),
        stateName: selectedState?.name || "", // Store the state name
        stateCode: data.state, // Store the state code (isoCode)
      };

      // Call API to update profile
      const response = await updateProfile(finalData).unwrap();
      toast.success("Profile updated successfully!", {
        icon: <Check className="text-green-500" />,
        duration: 3000,
      });
      dispatch(updateUserProfile(data));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const getSelectedCm = (heightString) => {
    const match = heightString?.match(/(\d+)'(\d+)"/);
    if (match) {
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      return (feet * 30.48 + inches * 2.54).toFixed(2);
    }
    return "0.0";
  };

  // Upload all photos
  const handleUploadPhoto = async () => {
    // e.preventDefault();
    setIsUploading(true);

    try {
      const formDataToSend = new FormData();

      if (previews && previews.length > 0) {
        for (let i = 0; i < previews.length; i++) {
          formDataToSend.append("profile_image", previews[i].file);
        }
      }

      const response = await updateProfile(formDataToSend).unwrap();
      toast.success(response.message || "Photos uploaded successfully!");
      const updatedImages = response?.data?.user?.profile_image || [
        ...(userProfile.profile_image || []),
        ...previews.map((p) => URL.createObjectURL(p.file)),
      ];

      // Update Redux with complete user data
      dispatch(
        updateUserProfile({
          ...userProfile,
          profile_image: updatedImages,
        })
      );

      // Update local state
      setValue("profile_image", updatedImages);

      // Clear the preview after successful upload
      setPreviews([]);
      setValue("images", []);
    } catch (error) {
      if (error?.status == "FETCH_ERROR") {
        toast.error("Image size is too large Try to upload Images one by one!");
      } else {
        console.error("Error uploading photos:", error);
        toast.error(
          error?.data?.message || "Failed to upload photos. Please try again."
        );
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Modal for viewing full-size image
  const ImageViewModal = ({ isOpen, imageUrl, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div className="relative max-w-5xl max-h-screen">
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 bg-white p-2 rounded-full"
          >
            <X size={24} className="text-gray-800" />
          </button>
          <div className="relative h-[80vh] w-[90vw] md:w-[50vw]">
            <Image
              src={imageUrl}
              alt="Full size preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-red-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">
            Loading your profile...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This will just take a moment
          </p>
        </div>
      </div>
    );
  }

  // Create Tab Button component
  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      className={`py-3 px-4 font-medium transition-colors relative text-sm md:text-lg ${
        isActive ? "text-red-600" : "text-gray-600 hover:text-red-600"
      }`}
      onClick={() => onClick(id)}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
      )}
    </button>
  );

  // Create FormField component for consistent styling
  // Add this at the component level

  // Modify your FormField component to use this approach
  const FormField = ({
    label,
    id,
    type = "text",
    name,
    placeholder,
    className = "",
    options = [],
  }) => (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      {type === "select" ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              id={id}
              {...field}
              ref={(el) => {
                inputRefs.current[name] = el;
                field.ref(el);
              }}
              className={`w-full px-3 py-2.5 border ${
                errors[name] ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white`}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      ) : type === "textarea" ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              id={id}
              rows="4"
              placeholder={placeholder}
              {...field}
              ref={(el) => {
                inputRefs.current[name] = el;
                field.ref(el);
              }}
              onChange={(e) => {
                const selectionStart = e.target.selectionStart;
                const selectionEnd = e.target.selectionEnd;
                field.onChange(e);

                // Use setTimeout to restore focus after render
                setTimeout(() => {
                  const input = inputRefs.current[name];
                  if (input) {
                    input.focus();
                    if (input.setSelectionRange) {
                      input.setSelectionRange(selectionStart, selectionEnd);
                    }
                  }
                }, 0);
              }}
              className={`w-full px-3 py-2.5 border ${
                errors[name] ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`}
            />
          )}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              {...field}
              ref={(el) => {
                inputRefs.current[name] = el;
                field.ref(el);
              }}
              onChange={(e) => {
                const selectionStart = e.target.selectionStart;
                const selectionEnd = e.target.selectionEnd;
                field.onChange(e);

                // Apply any additional changes needed
                if (name === "height") {
                  setValue("heightInCm", getSelectedCm(e.target.value));
                }

                // Use setTimeout to restore focus after render
                setTimeout(() => {
                  const input = inputRefs.current[name];
                  if (input) {
                    input.focus();
                    if (name === "dob") {
                      return;
                    } // Skip for date inputs
                    if (input.setSelectionRange) {
                      input.setSelectionRange(selectionStart, selectionEnd);
                    }
                  }
                }, 0);
              }}
              className={`w-full px-3 py-2.5 border ${
                errors[name] ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`}
            />
          )}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );

  // Create InfoItem component for display mode
  const InfoItem = ({ icon, label, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-1">
        {icon}
        <p className="text-sm text-gray-500 ml-2">{label}</p>
      </div>
      <p className="text-gray-800 font-medium pl-7">
        {value || "Not specified"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        <Toaster
          position="bottom-right"
          toastOptions={{
            success: {
              style: {
                background: "#f0fdf4",
                border: "1px solid #d1fae5",
                padding: "16px",
                color: "#065f46",
              },
            },
            error: {
              style: {
                background: "#fef2f2",
                border: "1px solid #fee2e2",
                padding: "16px",
                color: "#991b1b",
              },
            },
          }}
        />

        {/* Image View Modal */}
        <ImageViewModal
          isOpen={isModalOpen}
          imageUrl={currentModalImage}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Hidden file input for replacing specific images */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleReplaceFileChange}
        />

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-60 bg-gradient-to-r from-red-600 to-red-400 relative">
            <div className="w-full p-6 flex flex-col md:flex-col justify-center items-center">
              <div className="relative h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white group">
                <Image
                  src={profileImage}
                  alt={`${profileData.fullName}'s profile`}
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative flex flex-col justify-between gap-4">
                <h1 className="text-2xl text-center font-bold text-white">
                  {profileData.fullName}
                </h1>
                <p className="text-white/90 text-xs md:text-base font-medium flex flex-wrap items-center gap-2 ">
                  {profileData.dob && (
                    <span className="flex items-center">
                      <Cake size={14} className="mr-1.5" />
                      {calculateAge(profileData.dob)} years
                    </span>
                  )}
                  {profileData.height && (
                    <span className="flex items-center">
                      <Ruler size={14} className="mr-1.5" />
                      {profileData.height}
                    </span>
                  )}
                  {profileData.city && (
                    <span className="flex items-center">
                      <MapPin size={14} className="mr-1.5" />
                      {[profileData.city, profileData.country]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end px-6 py-2 border-b">
            <button
              onClick={toggleEditMode}
              className={`px-5 py-2.5 rounded-lg transition flex items-center shadow-sm mr-2 ${
                isEditing
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              disabled={isSaving}
            >
              {isEditing ? (
                <>
                  <X size={18} className="mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit2 size={18} className="mr-2" />
                  Edit Profile
                </>
              )}
            </button>

            {isEditing && (
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition flex items-center shadow-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="px-6 py-0 border-b">
            <div className="flex overflow-x-auto scrollbar-hide">
              <TabButton
                id="photos"
                label="Photos"
                isActive={activeTab === "photos"}
                onClick={setActiveTab}
              />
              <TabButton
                id="about"
                label="About Me"
                isActive={activeTab === "about"}
                onClick={setActiveTab}
              />
              <TabButton
                id="details"
                label="Personal Details"
                isActive={activeTab === "details"}
                onClick={setActiveTab}
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Photos Tab */}
            {activeTab === "photos" && (
              <>
                <form
                  onSubmit={handleSubmit(handleUploadPhoto)}
                  className="flex justify-between items-center mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Camera size={20} className="mr-2 text-red-600" />
                    My Photos
                    <span className="text-sm text-gray-500 ml-2">
                      ({userProfile.profile_image?.length || 0}/{MAX_IMAGES})
                    </span>
                  </h3>
                  <input
                    type="file"
                    {...register("images", {
                      validate: {
                        maxCount: (value) => {
                          return (
                            !value ||
                            value.length <= MAX_IMAGES ||
                            `You can only upload a maximum of ${MAX_IMAGES} images`
                          );
                        },
                      },
                    })}
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center px-2 py-1 md:px-4 md:py-2 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    disabled={isUploading || previews.length === 0}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={18} className="mr-2" />
                        Upload
                      </>
                    )}
                  </button>
                </form>

                {/* Preview section */}
                {previews.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Selected Photos:
                    </h4>
                    <div className="flex gap-3 overflow-x-auto pb-3">
                      {previews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative h-24 w-24 flex-shrink-0"
                        >
                          <Image
                            src={preview.url}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                            onClick={() => {
                              const newPreviews = [...previews];
                              newPreviews.splice(index, 1);
                              setPreviews(newPreviews);

                              const newFiles = [...images];
                              newFiles.splice(index, 1);
                              setValue("images", newFiles);
                            }}
                          >
                            <X size={14} className="text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userProfile.profile_image &&
                  userProfile.profile_image.length > 0 ? (
                    userProfile.profile_image.map((photo, index) => {
                      const photoUrl = photo.startsWith("http")
                        ? photo
                        : baseUrl + photo;
                      return (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-100 group"
                        >
                          <Image
                            src={photoUrl}
                            alt={`Photo ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end justify-center bottom-1">
                            <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                className="bg-white p-2 rounded-full shadow-md"
                                title="View photo"
                                onClick={() => openImageModal(photoUrl)}
                              >
                                <Eye size={18} className="text-gray-700" />
                              </button>
                              <button
                                type="button"
                                className="bg-white p-2 rounded-full shadow-md"
                                title="Replace photo"
                                onClick={() => handleReplaceImage(index)}
                              >
                                <Edit2 size={18} className="text-blue-600" />
                              </button>
                              <button
                                type="button"
                                className="bg-white p-2 rounded-full shadow-md"
                                title="Delete photo"
                                onClick={() => handleDeleteImage(index)}
                                disabled={isDeleting}
                              >
                                {isDeleting ? (
                                  <Loader2
                                    size={18}
                                    className="text-red-600 animate-spin"
                                  />
                                ) : (
                                  <Trash2 size={18} className="text-red-600" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                      <Camera
                        size={48}
                        className="text-gray-400 mx-auto mb-3"
                      />
                      <p className="text-gray-500 mb-3">
                        No photos yet. Add some to make your profile stand out!
                      </p>
                      <label
                        htmlFor="image-upload"
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center shadow-sm cursor-pointer"
                      >
                        <Upload size={16} className="mr-2" />
                        Upload Your First Photo
                      </label>
                    </div>
                  )}
                  {userProfile.profile_image &&
                    userProfile.profile_image.length < MAX_IMAGES && (
                      <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center p-4 cursor-pointer w-full h-full"
                        >
                          <Plus size={28} className="text-gray-500 mb-2" />
                          <span className="text-sm text-gray-600 font-medium">
                            Add Photo
                          </span>
                        </label>
                      </div>
                    )}
                </div>
              </>
            )}

            {/* About Me Tab */}
            {activeTab === "about" && (
              <div>
                {isEditing ? (
                  <form>
                    <div className="mb-6">
                      <FormField
                        label="About Me"
                        id="description"
                        type="textarea"
                        name="description"
                        placeholder="Tell us about yourself, your interests, and what you're looking for in a partner..."
                      />
                    </div>

                    <h3 className="text-lg font-semibold mb-4 text-gray-800 pt-6 border-t flex items-center">
                      <Briefcase size={20} className="mr-2 text-red-600" />
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                      <FormField
                        label="Profession"
                        id="occupation"
                        type="select"
                        name="occupation"
                        options={fieldsData.occupationOptions.map(
                          (profession) => ({
                            value: profession,
                            label: profession,
                          })
                        )}
                      />
                      <FormField
                        label="Highest Education"
                        id="highest_education"
                        type="select"
                        name="highest_education"
                        options={[
                          {
                            value: "Below High School",
                            label: "Below High School",
                          },
                          {
                            value: "High School (12th)",
                            label: "High School (12th)",
                          },
                          { value: "Diploma", label: "Diploma" },
                          { value: "Bachelor's", label: "Bachelor's" },
                          { value: "Master's", label: "Master's" },
                          { value: "Doctorate", label: "Doctorate/PhD" },
                        ]}
                      />

                      {!isCourseVisible && (
                        <FormField
                          label="Course"
                          id="course"
                          type="select"
                          name="course"
                          options={Object.entries(courses)
                            .map(([category, courseList]) =>
                              courseList.map((course) => ({
                                value: course,
                                label: course,
                              }))
                            )
                            .flat()}
                        />
                      )}
                      <FormField
                        label="Annual Income"
                        id="annual_income"
                        type="select"
                        name="annual_income"
                        options={fieldsData.annualIncomeOptions.map(
                          (annual_income) => ({
                            value: annual_income,
                            label: annual_income,
                          })
                        )}
                      />
                      <FormField
                        label="Employed In"
                        id="employed_in"
                        type="select"
                        name="employed_in"
                        options={fieldsData.employeeInOptions.map(
                          (employed_in) => ({
                            value: employed_in,
                            label: employed_in,
                          })
                        )}
                      />
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                        <User size={20} className="mr-2 text-red-600" />
                        About Me
                      </h3>
                      {profileData.description ? (
                        <div className="bg-gray-50 p-5 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {profileData.description}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 border-dashed text-center">
                          <p className="text-gray-500">
                            You haven&apos;t added any description yet. Click
                            the &quot;Edit Profile&quot; button to add
                            information about yourself.
                          </p>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-5 text-gray-800 pt-4 border-t flex items-center">
                      <Briefcase size={20} className="mr-2 text-red-600" />
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InfoItem
                        icon={<Briefcase size={18} className="text-gray-500" />}
                        label="Profession"
                        value={profileData.occupation}
                      />
                      <InfoItem
                        icon={
                          <GraduationCap size={18} className="text-gray-500" />
                        }
                        label="Education"
                        value={
                          profileData.highest_education
                            ? `${profileData.highest_education}${
                                highestEducation ==
                                  "High School (12th)" ||
                                highestEducation ==
                                  "Below High School"
                                  ? ""
                                  : ` in ${profileData.course}`
                              }`
                            : null
                        }
                      />
                      <InfoItem
                        icon={
                          <DollarSign size={18} className="text-gray-500" />
                        }
                        label="Annual Income"
                        value={profileData.annual_income}
                      />
                      <InfoItem
                        icon={<Building size={18} className="text-gray-500" />}
                        label="Employed In"
                        value={profileData.employed_in}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Personal Details Tab */}
            {activeTab === "details" && (
              <div>
                {isEditing ? (
                  <form>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                      <User size={20} className="mr-2 text-red-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                      <FormField
                        label="Full Name"
                        id="fullName"
                        name="fullName"
                      />
                      <FormField
                        label="Date of Birth"
                        id="dob"
                        type="date"
                        name="dob"
                      />
                      <FormField
                        label="Height"
                        id="height"
                        type="select"
                        name="height"
                        options={Array.from({ length: 37 }, (_, i) => {
                          const feet = Math.floor(i / 12) + 4; // Start at 4 feet
                          const inches = i % 12;
                          const cm = (feet * 30.48 + inches * 2.54).toFixed(2);
                          return {
                            value: `${feet}'${inches}" (${getSelectedCm(
                              `${feet}'${inches}"`
                            )} cm)`,
                            label: `${feet}'${inches}" (${cm} cm)`,
                          };
                        })}
                      />
                      <FormField
                        label="Marital Status"
                        id="marital_status"
                        type="select"
                        name="marital_status"
                        options={[
                          { value: "Single", label: "Single" },
                          { value: "Married", label: "Married" },
                          { value: "Divorced", label: "Divorced" },
                          { value: "Widowed", label: "Widowed" },
                        ]}
                      />
                      <FormField
                        label="Religion"
                        id="religion"
                        type="select"
                        name="religion"
                        options={[
                          { value: "Hindu", label: "Hindu" },
                          { value: "Muslim", label: "Muslim" },
                          { value: "Christian", label: "Christian" },
                          { value: "Sikh", label: "Sikh" },
                          { value: "Buddhist", label: "Buddhist" },
                          { value: "Jain", label: "Jain" },
                          { value: "Parsi", label: "Parsi" },
                          { value: "Jewish", label: "Jewish" },
                          { value: "Bahai", label: "Bahai" },
                          { value: "Other", label: "Other" },
                        ]}
                      />
                      {/* Replace your existing caste field with this dynamic one */}
                      {casteFieldName && fieldsData[casteFieldName] && (
                        <FormField
                          label="Caste"
                          id="caste"
                          type="select"
                          name="caste"
                          options={fieldsData[casteFieldName].map((caste) => ({
                            value: caste,
                            label: caste,
                          }))}
                        />
                      )}

                      {/* Muslim Sect - Show only if religion is Muslim */}
                      {religion === "Muslim" && (
                        <FormField
                          label="Sect"
                          id="sect"
                          type="select"
                          name="sect"
                          options={[
                            { value: "Sunni", label: "Sunni" },
                            { value: "Shia", label: "Shia" },
                            { value: "Other", label: "Other" },
                          ]}
                        />
                      )}

                      {/* Muslim jammat - Show only if religion is Muslim and sect is Sunni */}
                      {religion === "Muslim" && sect === "Sunni" && (
                        <FormField
                          label="jammat"
                          id="jammat"
                          type="select"
                          name="jammat"
                          options={fieldsData.muslimJamaat.map((jammat) => ({
                            value: jammat,
                            label: jammat,
                          }))}
                        />
                      )}
                      <FormField
                        label="Mother Tongue"
                        id="mother_tongue"
                        type="select"
                        name="mother_tongue"
                        options={fieldsData.motherTongue.map(
                          (motherTongue) => ({
                            value: motherTongue,
                            label: motherTongue,
                          })
                        )}
                      />
                      <FormField
                        label="Diet Preference"
                        id="diet"
                        type="select"
                        name="diet"
                        options={fieldsData.dietOptions.map((diet) => ({
                          value: diet,
                          label: diet,
                        }))}
                      />
                      <FormField
                        label="Living With Family"
                        id="living_with_family"
                        type="select"
                        name="living_with_family"
                        options={[
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" },
                        ]}
                      />
                    </div>

                    <h3 className="text-lg font-semibold mb-4 mt-6 text-gray-800 pt-5 border-t flex items-center">
                      <Globe size={20} className="mr-2 text-red-600" />
                      Location
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                      {/* <FormField label="Country" id="country" name="country" /> */}
                      {/* <FormField label="State" id="state" name="state" />
                      <FormField label="City" id="city" name="city" /> */}
                      <FormField
                        label="State"
                        id="state"
                        type="select"
                        name="state"
                        options={
                          statesLoading
                            ? []
                            : states?.data?.map((state) => ({
                                value: state.isoCode,
                                label: state.name,
                              }))
                        }
                      />

                      <FormField
                        label="City"
                        id="city"
                        type="select"
                        name="city"
                        disabled={!selectedStateCode}
                        options={
                          !selectedStateCode
                            ? []
                            : citiesLoading
                            ? []
                            : cities?.data?.map((city) => ({
                                value: city.name,
                                label: city.name,
                              }))
                        }
                      />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-5 text-gray-800 flex items-center">
                        <User size={20} className="mr-2 text-red-600" />
                        Personal Information
                      </h3>
                      <div className="space-y-4">
                        <InfoItem
                          icon={<Users size={18} className="text-gray-500" />}
                          label="Religion"
                          value={profileData.religion}
                        />
                        {/* In your display mode (when !isEditing) */}
                        <InfoItem
                          icon={<Users size={18} className="text-gray-500" />}
                          label="Caste"
                          value={profileData.caste}
                        />
                        {profileData.religion === "Muslim" && (
                          <InfoItem
                            icon={<Users size={18} className="text-gray-500" />}
                            label="Sect"
                            value={profileData.sect}
                          />
                        )}
                        {profileData.religion === "Muslim" &&
                          profileData.sect === "Sunni" && (
                            <InfoItem
                              icon={
                                <Users size={18} className="text-gray-500" />
                              }
                              label="jammat"
                              value={profileData.jammat}
                            />
                          )}
                        <InfoItem
                          icon={<Users size={18} className="text-gray-500" />}
                          label="Marital Status"
                          value={profileData.marital_status}
                        />
                        <InfoItem
                          icon={
                            <Utensils size={18} className="text-gray-500" />
                          }
                          label="Diet Preference"
                          value={
                            profileData.diet === "Veg"
                              ? "Vegetarian"
                              : profileData.diet === "Non-Veg"
                              ? "Non-Vegetarian"
                              : profileData.diet
                          }
                        />
                        <InfoItem
                          icon={<Home size={18} className="text-gray-500" />}
                          label="Living With Family"
                          value={profileData.living_with_family}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-5 text-gray-800 flex items-center">
                        <Globe size={20} className="mr-2 text-red-600" />
                        Location & Languages
                      </h3>
                      <div className="space-y-4">
                        <InfoItem
                          icon={<MapPin size={18} className="text-gray-500" />}
                          label="Location"
                          value={[
                            profileData.city,
                            profileData.state,
                            profileData.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        />
                        <InfoItem
                          icon={
                            <Languages size={18} className="text-gray-500" />
                          }
                          label="Mother Tongue"
                          value={profileData.mother_tongue}
                        />
                      </div>

                      <h3 className="text-lg font-semibold mb-4 mt-8 text-gray-800 pt-5 border-t flex items-center">
                        <User size={20} className="mr-2 text-red-600" />
                        Basic Details
                      </h3>
                      <div className="space-y-4">
                        <InfoItem
                          icon={<User size={18} className="text-gray-500" />}
                          label="Full Name"
                          value={profileData.fullName}
                        />
                        <InfoItem
                          icon={<Cake size={18} className="text-gray-500" />}
                          label="Date of Birth"
                          value={
                            profileData.dob
                              ? `${new Date(profileData.dob).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )} (${calculateAge(profileData.dob)} years)`
                              : null
                          }
                        />
                        <InfoItem
                          icon={<Ruler size={18} className="text-gray-500" />}
                          label="Height"
                          value={profileData.height}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tips Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-amber-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Profile Completion Tips
          </h3>
          <p className="text-gray-600 mb-4">
            Complete your profile to increase your chances of finding a perfect
            match. Here are some tips:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Upload at least 3-4 clear photos to showcase yourself better
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Write a detailed description about yourself and what you&apos;re
              looking for
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Complete all personal details for better matching
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Regularly update your profile to appear in recent matches
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
