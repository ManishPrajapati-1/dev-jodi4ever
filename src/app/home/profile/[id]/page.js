// app/profile/[id]/page.jsx
"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  UserPlus,
  MessageCircle,
  GraduationCap,
  Briefcase,
  MapPin,
  Crown,
  ArrowLeft,
  MessageSquareWarning,
  Calendar,
  Languages,
  DollarSign,
  Building,
  Users,
  Utensils,
  AlignJustify,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Cake,
  Ruler,
  Share2,
  Flag,
  UserRound,
  Loader2,
  Home,
} from "lucide-react";
import {
  useConnectProfileMutation,
  useLikeProfileMutation,
  useDislikeProfileMutation,
  useViewSingleProfileQuery,
} from "@/lib/services/api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AppDownloadModal from "@/app/components/AppDownloadModal"

// Define the base URL for images as a constant
const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://jodi4ever.com";

export default function ProfilePage({ params }) {
  const router = useRouter();

  // Get ID from params
  const { id } = use(params);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [connectProfile, { isLoadingConnect }] = useConnectProfileMutation();
  const [likeProfile, { isLoadingLike }] = useLikeProfileMutation();
  const [dislikeProfile, { isLoadingDislike }] = useDislikeProfileMutation();
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("about"); // Tabs: about, career, family, preferences
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const title = document.title; // You can customize this as per your needs

    if (typeof window !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: title,
          url: currentUrl,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      alert("Not supported");
      // Desktop: Provide specific URL for WhatsApp
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        currentUrl
      )}`;

      // // Open sharing options in new tabs
      window.open(whatsappUrl, "_blank", "popup,noreferrer,noopener");

      console.log("Desktop share opened");
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href); // copy current URL
    alert("URL copied to clipboard");
  };

  // Fetch profile data
  const {
    data: singleUserData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useViewSingleProfileQuery(id, {
    skip: !id,
  });

  const profileData = singleUserData?.data;

  // Set initial like status when profile data loads
  useEffect(() => {
    if (profileData) {
      setCurrentImageIndex(0);
      setIsLiked(profileData.isLiked || false);
    }
  }, [profileData]);
  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Toggle like/unlike profile
  const toggleLike = async () => {
    try {
      if (isLiked) {
        const res = await dislikeProfile(profileData._id).unwrap();
        setIsLiked(false);
        toast.success(res.message);
      } else {
        const res = await likeProfile(profileData._id).unwrap();
        setIsLiked(true);
        toast.success(res.message);
      }
    } catch (error) {
      console.log("Like failed:", error);
      toast.error("Failed to like the profile. Please try again.");
    }
  };

  // Send connection request
  const handleConnect = async () => {
    try {
      const res = await connectProfile({
        profileId: profileData._id,
        status: "Accepted",
      }).unwrap();
      if (res.message.includes("already")) {
        toast.error(res.message, {
          icon: <MessageSquareWarning className="stroke-yellow-600" />,
        });
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      console.log("Connection failed:", error);
      toast.error("Failed to send connection request. Please try again.");
    }
  };

  // Image navigation functions
  const hasMultipleImages =
    profileData?.profile_image && profileData?.profile_image.length > 1;

  const goToNextImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) =>
        prev === profileData.profile_image.length - 1 ? 0 : prev + 1
      );
    }
  };

  const goToPrevImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? profileData.profile_image.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndex(index);
  };

  // Create InfoItem component for reusability
  const InfoItem = ({ icon, label, value, className = "" }) => {
    if (!value) return null;
    return (
      <div className={`flex items-start mb-4 ${className}`}>
        <div className="flex-shrink-0 mt-0.5 mr-3 text-gray-400">{icon}</div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-0.5">
            {label}
          </div>
          <div className="text-gray-800">{value}</div>
        </div>
      </div>
    );
  };

  // Create TabButton component for tab navigation
  const TabButton = ({ id, label, icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 ${
        isActive
          ? "bg-red-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
  // Loading state
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (profileError || !profileData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The profile you&apos;re looking for doesn&apos;t exist or you may
            not have permission to view it.
          </p>
          <button
            onClick={() => router.push("/home")}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm w-full"
          >
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 mb-6 hover:text-red-600 transition-colors duration-200 group"
        >
          <ArrowLeft
            size={18}
            className="mr-2 group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="font-medium">Back to Profiles</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Photos & Actions */}
          <div className="lg:w-2/5">
            {/* Photos Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative aspect-[4/3]">
                {profileData.profile_image &&
                profileData.profile_image.length > 0 ? (
                  <div className="relative w-full h-full">
                    {/* Main image */}
                    <Image
                      src={`${IMAGE_BASE_URL}/${profileData.profile_image[currentImageIndex]}`}
                      alt={`${profileData.fullName || "Profile"} photo`}
                      fill
                      priority
                      className="object-contain"
                    />

                    {/* Premium badge */}
                    {profileData.isPremium && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm z-10">
                        <Crown size={14} className="mr-1.5" strokeWidth={2.5} />
                        PREMIUM
                      </div>
                    )}

                    {/* Like button */}
                    {/* <button 
                      onClick={toggleLike} 
                      className={`absolute top-4 right-4 p-2.5 rounded-full shadow-sm z-10 ${
                        isLiked
                          ? 'bg-red-50 text-red-600'
                          : 'bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-600'
                      }`}
                      disabled={isLoadingLike || isLoadingDislike}
                      aria-label={isLiked ? 'Unlike profile' : 'Like profile'}
                    >
                      {isLoadingLike || isLoadingDislike ? (
                        <Loader2 size={22} className="animate-spin" />
                      ) : (
                        <Heart 
                          size={22} 
                          fill={isLiked ? "#dc2626" : "none"} 
                          strokeWidth={isLiked ? 0 : 2} 
                        />
                      )}
                    </button> */}

                    {/* Image navigation controls */}
                    {hasMultipleImages && (
                      <>
                        {/* Left/Right arrows */}
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2 z-10">
                          <button
                            className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2.5 backdrop-blur-sm transition-colors duration-200"
                            onClick={goToPrevImage}
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2.5 backdrop-blur-sm transition-colors duration-200"
                            onClick={goToNextImage}
                            aria-label="Next image"
                          >
                            <ChevronRight size={24} />
                          </button>
                        </div>

                        {/* Image counter */}
                        <div className="absolute top-8 right-4 bg-black/40 text-white text-xs font-medium px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                          {currentImageIndex + 1}/
                          {profileData.profile_image.length}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                    <UserRound size={80} className="text-gray-300" />
                  </div>
                )}
              </div>
              {/* Thumbnail gallery */}
              {hasMultipleImages && (
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {profileData.profile_image.map((img, index) => (
                      <button
                        key={index}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                          index === currentImageIndex
                            ? "ring-2 ring-red-600 ring-offset-2"
                            : "ring-1 ring-gray-200 hover:ring-red-200"
                        }`}
                        onClick={(e) => goToImage(index, e)}
                        aria-label={`View image ${index + 1}`}
                      >
                        <Image
                          src={`${IMAGE_BASE_URL}/${img}`}
                          alt={`${profileData.fullName || "Profile"} photo ${
                            index + 1
                          }`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions Section */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConnect}
                  disabled={isLoadingConnect}
                  className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center shadow-sm"
                >
                  {isLoadingConnect ? (
                    <Loader2 size={20} className="animate-spin mr-2" />
                  ) : (
                    <UserPlus size={20} className="mr-2" />
                  )}
                  Connect with{" "}
                  {profileData.fullName?.split(" ")[0] || "This Person"}
                </button>

                <button
                  className="w-full py-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center"
                  onClick={() =>
                    setIsModalOpen(true)
                    // toast.error("This feature is only available in app.")
                  }
                >
                  <MessageCircle size={20} className="mr-2" />
                  Send Message
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="flex-1 py-2.5 border border-gray-200 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Share2 size={18} className="mr-2 text-gray-500" />
                    Share
                  </button>

                  {/* <button 
                    className="flex-1 py-2.5 border border-gray-200 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                    onClick={() => toast.error("Please specify the reason for reporting this profile")}
                  >
                    <Flag size={18} className="mr-2 text-gray-500" />
                    Report
                  </button> */}
                </div>
              </div>
            </div>

            {/* Contact Information - Only show if user has permission */}
            {profileData.numberVisibility && (
              <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Phone size={18} className="mr-2 text-red-600" />
                  Contact Information
                </h3>

                <div className="space-y-3">
                  {profileData.phone && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Phone size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium text-gray-800">
                          {profileData.phone}
                        </div>
                      </div>
                    </div>
                  )}

                  {profileData.email && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium text-gray-800">
                          {profileData.email}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mt-2">
                    Contact information visible because you have connected with
                    this profile
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Right Column: Profile Details */}
          <div className="lg:w-3/5">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {profileData.fullName}
                  </h1>
                  <p className="text-gray-500 flex items-center mt-1">
                    <MapPin size={16} className="mr-1.5 text-red-500" />
                    {[profileData.city, profileData.state, profileData.country]
                      .filter(Boolean)
                      .join(", ") || "Location not specified"}
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center text-gray-700 font-medium mb-1">
                    <Cake size={16} className="mr-1.5 text-gray-500" />
                    <span>{profileData.age || "??"} years</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Ruler size={14} className="mr-1.5 text-gray-400" />
                    <span>{profileData.height || "Height not specified"}</span>
                  </div>
                </div>
              </div>

              {/* Verification badge */}
              {profileData.isVerified && (
                <div className="mb-4 bg-green-50 border border-green-100 rounded-lg p-3 flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span className="text-green-700 text-sm font-medium">
                    This profile has been verified by our team
                  </span>
                </div>
              )}

              {/* Basic tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {profileData.religion && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {profileData.religion}
                  </span>
                )}
                {profileData.marital_status && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {profileData.marital_status}
                  </span>
                )}
                {profileData.highest_education && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <GraduationCap size={14} className="mr-1.5" />
                    {profileData.highest_education}
                  </span>
                )}
                {profileData.occupation && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <Briefcase size={14} className="mr-1.5" />
                    {profileData.occupation}
                  </span>
                )}
                {profileData.diet && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <Utensils size={14} className="mr-1.5" />
                    {profileData.diet}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Tabs Navigation */}
            <div className="flex overflow-x-auto gap-2 mb-6 scrollbar-hide pb-1">
              <TabButton
                id="about"
                label="About"
                icon={<UserRound size={18} />}
                isActive={activeTab === "about"}
                onClick={setActiveTab}
              />
              <TabButton
                id="career"
                label="Career & Education"
                icon={<Briefcase size={18} />}
                isActive={activeTab === "career"}
                onClick={setActiveTab}
              />
              {/* <TabButton 
                id="family" 
                label="Family" 
                icon={<Users size={18} />}
                isActive={activeTab === 'family'} 
                onClick={setActiveTab} 
              /> */}
              {/* <TabButton 
                id="preferences" 
                label="Preferences" 
                icon={<Heart size={18} />}
                isActive={activeTab === 'preferences'} 
                onClick={setActiveTab} 
              /> */}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* About Tab */}
              {activeTab === "about" && (
                <div>
                  {/* About Me Section */}
                  {profileData.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
                        About Me
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {profileData.description}
                      </p>
                    </div>
                  )}

                  {/* Basic Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                      Basic Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                      <InfoItem
                        icon={<Calendar size={18} />}
                        label="Date of Birth"
                        value={formatDate(profileData.dob)}
                      />
                      <InfoItem
                        icon={<Users size={18} />}
                        label="Marital Status"
                        value={profileData.marital_status}
                      />
                      <InfoItem
                        icon={<Languages size={18} />}
                        label="Mother Tongue"
                        value={profileData.mother_tongue}
                      />
                      <InfoItem
                        icon={<Utensils size={18} />}
                        label="Diet"
                        value={profileData.diet}
                      />
                    </div>
                  </div>

                  {/* Religion & Community */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                      Religion & Community
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                      <InfoItem
                        icon={<AlignJustify size={18} />}
                        label="Religion"
                        value={profileData.religion}
                      />
                      <InfoItem
                        icon={<AlignJustify size={18} />}
                        label="Caste"
                        value={profileData.caste}
                      />
                      <InfoItem
                        icon={<AlignJustify size={18} />}
                        label="Manglik"
                        value={profileData.manglik}
                      />
                      <InfoItem
                        icon={<AlignJustify size={18} />}
                        label="Horoscope"
                        value={profileData.thoughts_on_horoscope}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Career & Education Tab */}
              {activeTab === "career" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    Career & Education
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                    <InfoItem
                      icon={<Briefcase size={18} />}
                      label="Occupation"
                      value={profileData.occupation}
                    />
                    <InfoItem
                      icon={<GraduationCap size={18} />}
                      label="Highest Education"
                      value={profileData.highest_education}
                    />
                    <InfoItem
                      icon={<Building size={18} />}
                      label="Employed In"
                      value={profileData.employed_in}
                    />
                    <InfoItem
                      icon={<DollarSign size={18} />}
                      label="Annual Income"
                      value={profileData.annual_income}
                    />
                    <InfoItem
                      icon={<GraduationCap size={18} />}
                      label="College/University"
                      value={profileData.college || "Not specified"}
                    />
                    <InfoItem
                      icon={<Building size={18} />}
                      label="Company"
                      value={profileData.company || "Not specified"}
                    />
                  </div>
                </div>
              )}
              {/* Family Tab */}
              {activeTab === "family" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    Family Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                    <InfoItem
                      icon={<Users size={18} />}
                      label="Family Type"
                      value={profileData.familyType || "Not specified"}
                    />
                    <InfoItem
                      icon={<Users size={18} />}
                      label="Family Status"
                      value={profileData.familyStatus || "Not specified"}
                    />
                    <InfoItem
                      icon={<Users size={18} />}
                      label="Father's Occupation"
                      value={profileData.father_occupation || "Not specified"}
                    />
                    <InfoItem
                      icon={<Users size={18} />}
                      label="Mother's Occupation"
                      value={profileData.mother_occupation || "Not specified"}
                    />
                    <InfoItem
                      icon={<Users size={18} />}
                      label="Brothers"
                      value={
                        profileData.brothers !== undefined
                          ? profileData.brothers
                          : "Not specified"
                      }
                    />
                    <InfoItem
                      icon={<Users size={18} />}
                      label="Sisters"
                      value={
                        profileData.sisters !== undefined
                          ? profileData.sisters
                          : "Not specified"
                      }
                    />
                    <InfoItem
                      icon={<MapPin size={18} />}
                      label="Family Location"
                      value={profileData.family_location || "Not specified"}
                    />
                    <InfoItem
                      icon={<Home size={18} />}
                      label="Family Values"
                      value={profileData.family_values || "Not specified"}
                    />
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    Partner Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                    <InfoItem
                      icon={<Cake size={18} />}
                      label="Age Range"
                      value={profileData.preferred_age_range || "Not specified"}
                    />
                    <InfoItem
                      icon={<Ruler size={18} />}
                      label="Height Range"
                      value={
                        profileData.preferred_height_range || "Not specified"
                      }
                    />
                    <InfoItem
                      icon={<GraduationCap size={18} />}
                      label="Education"
                      value={profileData.preferred_education || "Not specified"}
                    />
                    <InfoItem
                      icon={<Briefcase size={18} />}
                      label="Occupation"
                      value={
                        profileData.preferred_occupation || "Not specified"
                      }
                    />
                    <InfoItem
                      icon={<MapPin size={18} />}
                      label="Location"
                      value={profileData.preferred_location || "Not specified"}
                    />
                    <InfoItem
                      icon={<AlignJustify size={18} />}
                      label="Religion"
                      value={profileData.preferred_religion || "Not specified"}
                    />
                    <InfoItem
                      icon={<Utensils size={18} />}
                      label="Diet"
                      value={profileData.preferred_diet || "Not specified"}
                    />
                    <InfoItem
                      icon={<Users size={18} />}
                      label="Marital Status"
                      value={
                        profileData.preferred_marital_status || "Not specified"
                      }
                    />
                  </div>

                  {profileData.partner_description && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Looking For
                      </h4>
                      <p className="text-gray-600">
                        {profileData.partner_description}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AppDownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
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
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              border: "1px solid #fee2e2",
              padding: "16px",
              color: "#991b1b",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </div>
  );
}
