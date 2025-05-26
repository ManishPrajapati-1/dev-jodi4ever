'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  UserPlus, 
  MessageCircle, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Crown, 
  X, 
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
  SquareCheck
} from 'lucide-react';
import { useConnectProfileMutation, useLikeProfileMutation, useDislikeProfileMutation } from '@/lib/services/api';
import toast from 'react-hot-toast';

const ProfileModal = ({ isOpen, onClose, profileData, onLikeChange }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [connectProfile, { isLoadingConnect }] = useConnectProfileMutation();
  const [likeProfile, { isLoadingLike }] = useLikeProfileMutation();
  const [dislikeProfile, { isLoadingDislike }] = useDislikeProfileMutation();
  const [isLiked, setIsLiked] = useState(profileData?.isLiked || false);
  
  // Reset image index when modal opens with new profile
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLiked(profileData?.isLiked || false);
  }, [profileData]);

  if (!isOpen || !profileData) return null;

  const hasMultipleImages = profileData.profile_image && profileData.profile_image.length > 1;
  
  const toggleLike = async () => {
    try {
      if(isLiked) {
        const res = await dislikeProfile(profileData._id).unwrap();
        setIsLiked(false);
        toast.success(res.message);
        if (onLikeChange) onLikeChange(profileData._id, false);
      } else {
        const res = await likeProfile(profileData._id).unwrap();
        setIsLiked(true); 
        toast.success(res.message);
        if (onLikeChange) onLikeChange(profileData._id, true);
      }
    }
    catch (error) {
      console.log('Like failed:', error);
      toast.error('Failed to like the profile. Please try again.');
    }
  }

  const handleConnect = async () => {
    try {
      const res = await connectProfile(profileData._id).unwrap();
      if(res.message.includes('already')) {
        toast.error(res.message, {icon: <MessageSquareWarning className='stroke-yellow-600'/>});
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      console.log('Connection failed:', error);
      toast.error('Failed to send connection request. Please try again.');
    }
  }

  const goToNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => 
        prev === profileData.profile_image.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const goToPrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Create InfoItem component for reusability
  const InfoItem = ({ icon, label, value }) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 mt-1">
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">{label}</div>
          <div className="text-base text-gray-800">{value}</div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
        
        {/* Left side - Images */}
        <div className="md:w-2/5 relative bg-gray-100">
          {/* Close button */}
          <button 
            className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition"
            onClick={onClose}
          >
            <X size={20} className="text-gray-700" />
          </button>
          
          {/* Like button */}
          {/* <button 
            onClick={toggleLike} 
            className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition"
          >
            <Heart size={20} className="text-primary" fill={isLiked ? "#ff3366" : "none"} />
          </button> */}
          
          {/* Premium badge */}
          {profileData.subscriptionStatus !== "none" && (
            <div className="absolute top-14 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm z-20">
              <Crown size={12} className="mr-1" />
              PREMIUM
            </div>
          )}
          
          {/* Images section */}
          <div className="relative h-72 md:h-full">
            {profileData.profile_image && profileData.profile_image.length > 0 ? (
              <div className="relative w-full h-full">
                {/* Current image */}
                <Image
                  src={`https://www.jodi4ever.com/${profileData.profile_image[currentImageIndex]}`}
                  alt={`${profileData.fullName}`}
                  fill
                  className="object-cover object-center"
                />
                
                {/* Image navigation - only show if multiple images */}
                {hasMultipleImages && (
                  <>
                    {/* Left/Right arrows */}
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2 z-10">
                      <button 
                        className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm"
                        onClick={goToPrevImage}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm"
                        onClick={goToNextImage}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Image counter */}
                    <div className="absolute top-16 right-4 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                      {currentImageIndex + 1}/{profileData.profile_image.length}
                    </div>
                    
                    {/* Thumbnails row */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                      {profileData.profile_image.map((img, index) => (
                        <button 
                          key={index} 
                          className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${
                            index === currentImageIndex ? 'border-primary' : 'border-white/80'
                          } transition-colors shadow-sm`}
                          onClick={(e) => goToImage(index, e)}
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={`https://www.jodi4ever.com/${img}`}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Profile details */}
        <div className="md:w-3/5 overflow-y-auto max-h-[70vh] md:max-h-[90vh]">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{profileData.fullName}</h2>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  {[profileData.city, profileData.state, profileData.country].filter(Boolean).join(', ') || 'Location not specified'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium text-gray-700">
                  {profileData.age || '??'} yrs
                </div>
                <div className="text-sm text-gray-500">{profileData.height || 'Height not specified'}</div>
              </div>
            </div>
            
            {/* Verification badge */}
            {profileData.isVerified && (
              <div className="mb-4 bg-green-50 border border-green-100 rounded-lg p-3 flex items-center">
                <SquareCheck size={18} className="text-green-500 mr-2" />
                <span className="text-green-700 text-sm font-medium">Verified Profile</span>
              </div>
            )}
            
            {/* Brief profile description */}
            {profileData.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">About Me</h3>
                <p className="text-gray-700">{profileData.description}</p>
              </div>
            )}
            
            {/* Basic Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InfoItem 
                  icon={<Calendar size={16} className="text-gray-500" />} 
                  label="Date of Birth" 
                  value={formatDate(profileData.dob)} 
                />
                <InfoItem 
                  icon={<Users size={16} className="text-gray-500" />} 
                  label="Marital Status" 
                  value={profileData.marital_status} 
                />
                <InfoItem 
                  icon={<Languages size={16} className="text-gray-500" />} 
                  label="Mother Tongue" 
                  value={profileData.mother_tongue} 
                />
                <InfoItem 
                  icon={<Utensils size={16} className="text-gray-500" />} 
                  label="Diet" 
                  value={profileData.diet} 
                />
              </div>
            </div>
            
            {/* Religion & Community */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Religion & Community</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InfoItem 
                  icon={<AlignJustify size={16} className="text-gray-500" />} 
                  label="Religion" 
                  value={profileData.religion} 
                />
                <InfoItem 
                  icon={<AlignJustify size={16} className="text-gray-500" />} 
                  label="Caste" 
                  value={profileData.caste} 
                />
                <InfoItem 
                  icon={<AlignJustify size={16} className="text-gray-500" />} 
                  label="Manglik" 
                  value={profileData.manglik} 
                />
                <InfoItem 
                  icon={<AlignJustify size={16} className="text-gray-500" />} 
                  label="Horoscope" 
                  value={profileData.thoughts_on_horoscope} 
                />
              </div>
            </div>
            
            {/* Career & Education */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Career & Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InfoItem 
                  icon={<Briefcase size={16} className="text-gray-500" />} 
                  label="Occupation" 
                  value={profileData.occupation} 
                />
                <InfoItem 
                  icon={<GraduationCap size={16} className="text-gray-500" />} 
                  label="Education" 
                  value={profileData.highest_education} 
                />
                <InfoItem 
                  icon={<Building size={16} className="text-gray-500" />} 
                  label="Employed In" 
                  value={profileData.employed_in} 
                />
                <InfoItem 
                  icon={<DollarSign size={16} className="text-gray-500" />} 
                  label="Annual Income" 
                  value={profileData.annual_income} 
                />
              </div>
            </div>
            
            {/* Family Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Family Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InfoItem 
                  icon={<Users size={16} className="text-gray-500" />} 
                  label="Family Type" 
                  value={profileData.familyType} 
                />
                <InfoItem 
                  icon={<Users size={16} className="text-gray-500" />} 
                  label="Family Status" 
                  value={profileData.familyStatus} 
                />
                <InfoItem 
                  icon={<Users size={16} className="text-gray-500" />} 
                  label="Brothers" 
                  value={profileData.brothers || '0'} 
                />
                <InfoItem 
                  icon={<Users size={16} className="text-gray-500" />} 
                  label="Sisters" 
                  value={profileData.sisters || '0'} 
                />
              </div>
            </div>
            
            {/* Contact Information - Only show if user has permission */}
            {profileData.numberVisibility && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <InfoItem 
                    icon={<Phone size={16} className="text-gray-500" />} 
                    label="Phone" 
                    value={profileData.phone} 
                  />
                  <InfoItem 
                    icon={<Mail size={16} className="text-gray-500" />} 
                    label="Email" 
                    value={profileData.email} 
                  />
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-between gap-4 mt-8 pt-4 border-t border-gray-100">
              <button 
                onClick={handleConnect}
                disabled={isLoadingConnect}
                className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
              >
                <UserPlus size={18} className="mr-2" />
                Connect
              </button>
              <button 
                className="flex-1 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors flex items-center justify-center"
              >
                <MessageCircle size={18} className="mr-2" />
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;