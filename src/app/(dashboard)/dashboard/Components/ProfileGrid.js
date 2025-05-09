'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, UserPlus, MessageCircle, GraduationCap, Briefcase, MapPin, Crown, MessageSquareWarning } from 'lucide-react';
import { useConnectProfileMutation, useLikeProfileMutation, useDislikeProfileMutation, useViewSingleProfileQuery } from '@/lib/services/api';
import toast, { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react';
import ProfileModal from './ProfileModal';

const ProfileCard = ({ profile, onProfileClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [connectProfile, { isLoadingConnect, isErrorConnect }] = useConnectProfileMutation();
  const [likeProfile, { isLoadingLike, isErrorLike }] = useLikeProfileMutation();
  const [dislikeProfile, { isLoadingDislike, isErrorDislike }] = useDislikeProfileMutation();
  const [isLiked, setIsLiked] = useState(profile.isLiked);

  const hasMultipleImages = profile.profile_image && profile.profile_image.length > 1;

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


  const handleConnect = async () => {
    try {
      const res = await connectProfile({profileId: profile._id, status: "Accepted"}).unwrap();
      if(res.message.includes('already')) {
        toast.error(res.message, {icon: <MessageSquareWarning className='stroke-yellow-600'/>},);
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.log('Connection failed:', error);
      toast.error('Failed to send connection request. Please try again.');
    }
  }

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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition transform hover:shadow-md hover:translate-y-[-4px]">
      {/* Profile Image with Slider */}
      <div className="relative aspect-[1/1] cursor-pointer" onClick={() => {onProfileClick(profile._id)}}>
        {profile.profile_image && profile.profile_image.length > 0 ? (
          <div className="relative w-full h-full">
            {/* Current image display */}
            <div className="w-full h-full">
              <Image
                src={`http://65.1.117.252:5002/${profile.profile_image[currentImageIndex]}`}
                alt={`${profile.fullName}`}
                width={500}
                height={500}
                priority={true}
                className="object-cover w-full h-full"
              />
            </div>
            
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
                <div className="absolute top-2 right-12 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                  {currentImageIndex + 1}/{profile.profile_image.length}
                </div>
                
                {/* Dots indicator */}
                <div className="absolute bottom-2 left-0 right-0">
                  <div className="flex justify-center gap-1">
                    {profile.profile_image.map((_, index) => (
                      <button 
                        key={index} 
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/70 hover:bg-white'} transition-colors`}
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        
        {/* Favorite Button */}
        <button onClick={toggleLike} className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 transition shadow-sm z-20 cursor-pointer">
          <Heart size={20} className="text-primary" fill={isLiked ? "#ff3366" : "none"} />
        </button>
        
        {/* Premium Badge */}
        {profile.isPremium && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm z-20">
            <Crown size={12} className="mr-1" />
            PREMIUM
          </div>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link href={`/dashboard/profile/${profile._id}`}>
              <h3 className="text-lg font-bold text-gray-800">{profile.fullName}</h3>
            </Link>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin size={14} className="mr-1" />
              {profile.city || profile.state || 'Location not specified'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">
              {profile.age || '??'} yrs
            </div>
            <div className="text-xs text-gray-500">{profile.height || 'Height not specified'}</div>
          </div>
        </div>
        
        <div className="space-y-2 mt-3">
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase size={14} className="mr-2 text-gray-500 flex-shrink-0" />
            <span className="truncate">{profile.occupation || 'Occupation not specified'}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap size={14} className="mr-2 text-gray-500 flex-shrink-0" />
            <span className="truncate">{profile.highest_education || 'Education not specified'}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {profile.religion && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {profile.religion}
              </span>
            )}
            {profile.marital_status && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {profile.marital_status}
              </span>
            )}
            {profile.diet && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {profile.diet}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex border-t border-gray-100">
        <button onClick={handleConnect} className="flex-1 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer">
          <UserPlus size={18} className="mr-2 text-primary" />
          Connect
        </button>
        <div className="w-px bg-gray-100"></div>
        <button className="flex-1 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer">
          <MessageCircle size={18} className="mr-2 text-primary" />
          Message
        </button>
      </div>

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

  const handleProfileClick = (profileId) => {
    setSelectedProfileId(null);
    setSelectedProfileId(profileId);
    setIsModalOpen(true);
    window.target
    // Make sure query is triggered
    // The actual data fetching is handled by the RTK Query hook
  };

  // Close modal and reset selected profile
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // We can choose to keep the profile data cached or reset it
    setSelectedProfileId(null); // Uncomment to reset on close
  };

  const handleLikeChange = (profileId, isLiked) => {
    // Update the profiles state with the new like status
    setProfiles(prevProfiles => 
      prevProfiles.map(profile => 
        profile._id === profileId 
          ? { ...profile, isLiked } 
          : profile
      )
    );
  };

  return (
    <div className='relative'>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Toaster position="right-bottom"/>
        {profiles.map((profile) => (
          <ProfileCard key={profile._id} profile={profile} onProfileClick={handleProfileClick}/>
        ))}
      </div>

      {isLoadingProfile && selectedProfileId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <Loader2 className="animate-spin mr-2 text-primary" size={24} />
            <span className="text-gray-700 font-medium">Loading profile...</span>
          </div>
        </div>
      )}
      
      {/* Error handling for profile fetch */}
      {profileError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-red-600 font-bold text-lg mb-2">Error Loading Profile</h3>
            <p className="text-gray-700">
              There was a problem loading this profile. Please try again later.
            </p>
            <button 
              className="mt-4 w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Profile Modal */}
      {singleProfileData && (
        <ProfileModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          profileData={singleProfileData.data}
          onLikeChange={handleLikeChange}
        />
      )}

    </div>
    
  );
};

export default ProfileGrid;