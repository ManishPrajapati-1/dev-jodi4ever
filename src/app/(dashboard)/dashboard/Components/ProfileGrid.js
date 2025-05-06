'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, UserPlus, MessageCircle, GraduationCap, Briefcase, MapPin, Crown } from 'lucide-react';

const ProfileCard = ({ profile }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const hasMultipleImages = profile.profile_image && profile.profile_image.length > 1;
  
  const goToNextImage = (e) => {
    e.preventDefault();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => 
        prev === profile.profile_image.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const goToPrevImage = (e) => {
    e.preventDefault();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? profile.profile_image.length - 1 : prev - 1
      );
    }
  };
  
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition transform hover:shadow-md hover:translate-y-[-4px]">
      {/* Profile Image with Slider */}
      <div className="relative aspect-[1/1]">
        {profile.profile_image && profile.profile_image.length > 0 ? (
          <div className="relative w-full h-full">
            {/* Current image display */}
            <div className="w-full h-full">
              <Image
                src={`http://65.1.117.252:5002/${profile.profile_image[currentImageIndex]}`}
                alt={`${profile.fullName}`}
                fill
                className="object-cover"
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
                        onClick={() => goToImage(index)}
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
        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 transition shadow-sm z-20">
          <Heart size={20} className="text-primary" fill={profile.isLiked ? "#ff3366" : "none"} />
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
            <h3 className="text-lg font-bold text-gray-800">{profile.fullName}</h3>
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
        <button className="flex-1 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
          <UserPlus size={18} className="mr-2 text-primary" />
          Connect
        </button>
        <div className="w-px bg-gray-100"></div>
        <button className="flex-1 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
          <MessageCircle size={18} className="mr-2 text-primary" />
          Message
        </button>
      </div>
    </div>
  );
};

const ProfileGrid = ({ profiles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile._id} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileGrid;