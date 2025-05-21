'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  UserPlus, 
  MessageCircle, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Crown, 
  MessageSquareWarning,
  ChevronLeft,
  ChevronRight,
  Info,
  Check,
  X,
  Cake,
  Ruler,
  Phone,
  Mail,
  User,
  Loader2
} from 'lucide-react';
import { useConnectProfileMutation, useLikeProfileMutation, useDislikeProfileMutation, useViewSingleProfileQuery } from '@/lib/services/api';
import toast, { Toaster } from 'react-hot-toast';
import ProfileModal from './ProfileModal';
import AppDownloadModal from "@/app/components/AppDownloadModal"

// Base URL for profile images
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jodi4ever.com/';

const ProfileCard = ({ profile, onProfileClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [connectProfile, { isLoadingConnect }] = useConnectProfileMutation();
  const [likeProfile, { isLoadingLike }] = useLikeProfileMutation();
  const [dislikeProfile, { isLoadingDislike }] = useDislikeProfileMutation();
  const [isLiked, setIsLiked] = useState(profile.isLiked);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasMultipleImages = profile.profile_image && profile.profile_image.length > 1;

  // Handle like/unlike
  const toggleLike = async (e) => {
    e.stopPropagation();
    try {
      if(isLiked) {
        const res = await dislikeProfile(profile._id).unwrap();
        setIsLiked(false);
        toast.success(res.message);
      } else {
        const res = await likeProfile(profile._id).unwrap();
        setIsLiked(true); 
        toast.success(res.message);
      }
    }
    catch (error) {
      console.log('Like failed:', error);
      toast.error('Failed to like the profile. Please try again.');
    }
  }

  // Handle connect button click
  const handleConnect = async (e) => {
    e.stopPropagation();
    try {
      const res = await connectProfile({profileId: profile._id, status: "Accepted"}).unwrap();
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

  // Image navigation
  const goToNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => 
        prev === profile.profile_image.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const goToPrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? profile.profile_image.length - 1 : prev - 1
      );
    }
  };
  
  const goToImage = (e, index) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Image with Slider */}
      <div 
        className={`relative aspect-[5/4] md:aspect-[4/3] cursor-pointer group ${isHovered ? 'transform scale-[1.02] transition-transform duration-500' : 'transition-transform duration-500'}`} 
        // onClick={() => onProfileClick(profile._id)}
      >
      <Link href={`/home/profile/${profile._id}`} className="p-4">

        {profile.profile_image && profile.profile_image.length > 0 ? (
          
          <div className="relative w-full h-full">
            {/* Current image display */}
            <div className="w-full h-full">
              <Image
                src={`${baseUrl}${profile.profile_image[currentImageIndex]}`}
                alt={`${profile.fullName || 'Profile'}`}
                width={200}
                height={400}
                priority={true}
                className="object-contain w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Image navigation - only show if multiple images */}
            {hasMultipleImages && (
              <>
                {/* Left/Right arrows */}
                <div className="absolute flex justify-between transform -translate-y-1/2 left-3 right-3 top-1/2 z-20 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="bg-primary/40 hover:bg-primary/60 text-white rounded-full p-2 backdrop-blur-sm transition-colors duration-200"
                    onClick={goToPrevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="bg-primary/40 hover:bg-primary/60 text-white rounded-full p-2 backdrop-blur-sm transition-colors duration-200"
                    onClick={goToNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                {/* Image counter */}
                <div className="absolute top-3 right-14 bg-black/40 text-white text-xs font-medium px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                  {currentImageIndex + 1}/{profile.profile_image.length}
                </div>
                
                {/* Dots indicator */}
                <div className="absolute bottom-3 left-0 right-0">
                  <div className="flex justify-center gap-1.5">
                    {profile.profile_image.map((_, index) => (
                      <button 
                        key={index} 
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-white w-3 h-3' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                        onClick={(e) => goToImage(e, index)}
                        aria-label={`View image ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
            <User size={64} className="text-gray-300" />
          </div>
        )}
        
        {/* Like Button */}
        <button 
          onClick={toggleLike} 
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-sm z-20 transition-all duration-300 ${
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
            <Heart size={22} fill={isLiked ? "#dc2626" : "none"} strokeWidth={isLiked ? 0 : 2} />
          )}
        </button>
        
        {/* Premium Badge */}
        {profile.isPremium && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm z-20">
            <Crown size={14} className="mr-1.5" strokeWidth={2.5} />
            PREMIUM
          </div>
        )}
        
        {/* Name & Age overlay on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <h3 className="text-xl font-bold drop-shadow-md">{profile.fullName || 'Name not available'}</h3>
          <p className="text-white/90 drop-shadow-md flex items-center">
            <Cake size={14} className="mr-1.5" /> {profile.age || '??'} years
          </p>
        </div>
</Link>
      </div>
      
      {/* Profile Info */}
      <Link href={`/home/profile/${profile._id}`} className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p 
              // href={`/home/profile/${profile._id}`}
              className="text-lg font-bold text-gray-800 hover:text-red-600 transition-colors duration-200"
            >
              {profile.fullName || 'Name not available'}
            </p>
            <p className="text-sm text-gray-500 flex items-center mt-0.5">
              <MapPin size={14} className="mr-1.5 text-red-500" />
              {profile.city || profile.state || 'Location not specified'}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm font-medium text-gray-700 mb-0.5">
              <Cake size={14} className="mr-1.5 text-gray-500" />
              {profile.age || '??'} yrs
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Ruler size={12} className="mr-1.5 text-gray-400" />
              {profile.height || 'Height not specified'}
            </div>
          </div>
        </div>
        
        <div className="space-y-2.5 mt-3">
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase size={14} className="mr-2 text-gray-500 flex-shrink-0" />
            <span className="truncate">{profile.occupation || 'Occupation not specified'}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap size={14} className="mr-2 text-gray-500 flex-shrink-0" />
            <span className="truncate">{profile.highest_education || 'Education not specified'}</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-3">
            {profile.religion && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                {profile.religion}
              </span>
            )}
            {profile.marital_status && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                {profile.marital_status}
              </span>
            )}
            {profile.diet && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                {profile.diet}
              </span>
            )}
          </div>
        </div>
      </Link>
      
      {/* Action Buttons */}
      <div className="flex border-t border-gray-100">
        <button 
          onClick={handleConnect} 
          className="flex-1 py-3.5 text-center font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors flex items-center justify-center"
          disabled={isLoadingConnect}
        >
          {isLoadingConnect ? (
            <Loader2 size={18} className="animate-spin mr-2 text-red-600" />
          ) : (
            <UserPlus size={18} className="mr-2 text-red-600" />
          )}
          Connect
        </button>
        <div className="w-px bg-gray-100"></div>
        <button 
          className="flex-1 py-3.5 text-center font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            // toast.error("Messaging is only available for premium members");
            // toast.error("This feature is only available in app.")
            setIsModalOpen(true)
          }}
        >
          <MessageCircle size={18} className="mr-2 text-red-600" />
          Message
        </button>
      </div>
      <AppDownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

const ProfileGrid = ({ profiles }) => {
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { 
    data: singleProfileData, 
    isLoading: isLoadingProfile,
    error: profileError
  } = useViewSingleProfileQuery(selectedProfileId, {
    skip: !selectedProfileId,
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    // Clean up when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Handle profile click
  const handleProfileClick = (profileId) => {
    setSelectedProfileId(profileId);
    setIsModalOpen(true);
  };

  // Close modal and reset selected profile
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: Reset selected profile ID
    // setSelectedProfileId(null);
  };

  // Handle like status change
  const handleLikeChange = (profileId, isLiked) => {
    // This function would update the like status in the parent component
    // if you're managing the profiles state there
  };

  // Loading skeleton for profiles
  const ProfileSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="flex gap-1 mt-3">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>
      <div className="h-12 border-t border-gray-100 flex">
        <div className="flex-1 bg-gray-50"></div>
        <div className="w-px bg-gray-100"></div>
        <div className="flex-1 bg-gray-50"></div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Profile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard 
            key={profile._id} 
            profile={profile} 
            // onProfileClick={handleProfileClick}
          />
        ))}
      </div>

      {/* Toaster for notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          success: {
            style: {
              background: '#f0fdf4',
              border: '1px solid #d1fae5',
              padding: '16px',
              color: '#065f46',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              border: '1px solid #fee2e2',
              padding: '16px',
              color: '#991b1b',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
          loading: {
            style: {
              background: '#eff6ff',
              border: '1px solid #dbeafe',
              padding: '16px',
              color: '#1e40af',
            }
          }
        }}
      />
      
      {/* Loading overlay */}
      {isLoadingProfile && selectedProfileId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-red-600 mr-3"></div>
            <span className="text-gray-700 font-medium">Loading profile details...</span>
          </div>
        </div>
      )}
      
      {/* Error handling for profile fetch */}
      {profileError && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" 
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white p-8 rounded-xl shadow-xl max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <X size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Error Loading Profile</h3>
            <p className="text-gray-600 text-center mb-6">
              We&apos;re having trouble loading this profile information. Please try again later.
            </p>
            <button 
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Profile Modal */}
      {/* {singleProfileData && (
        <ProfileModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          profileData={singleProfileData.data}
          onLikeChange={handleLikeChange}
        />
      )} */}
    </div>
  );
};

export default ProfileGrid;