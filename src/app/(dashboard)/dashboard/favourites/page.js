'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useGetFavouritesQuery, useDislikeProfileMutation } from "@/lib/services/api"

export default function LikedUsersPage() {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://65.1.117.252:5002/"
  const [dislikingUserId, setDislikingUserId] = useState(null)
  
  // Use RTK Query hooks
  const { 
    data: likedUsersData, 
    isLoading, 
    isError,
    refetch
  } = useGetFavouritesQuery()
  
  // Dislike profile mutation
  const [dislikeProfile] = useDislikeProfileMutation()

  // Get the liked users data
  const likedUsers = likedUsersData?.data || []
  
  // Filter out any null userLikedTo entries
  const likedByMe = likedUsers.filter(user => user.userLikedTo !== null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    }
  }, [router])

  // Handle unlike functionality
  const handleUnlike = async (userId) => {
    if (!userId) return;
    
    try {
      setDislikingUserId(userId)
      await dislikeProfile(userId).unwrap()
      // Refetch the liked users list after successfully disliking
      refetch()
    } catch (error) {
      console.error('Failed to unlike profile:', error)
    } finally {
      setDislikingUserId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading liked profiles...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-gray-600">Failed to load liked profiles. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-red-600 text-white">
          <h1 className="text-2xl font-bold">Favourites</h1>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {likedByMe.length === 0 ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-600">No profiles found</h3>
              <p className="mt-2 text-gray-500">You haven&apos;t liked any profiles yet.</p>
              
              <Link href="/dashboard" className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                Discover Profiles
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {likedByMe.map(item => (
                <div key={item._id} className="py-4 hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    {/* Profile Image - Small and Rounded */}
                    <div className="flex-shrink-0">
                      <Image
                        src={
                          item.userLikedTo?.profile_image?.length > 0 
                            ? `${baseUrl}${item.userLikedTo.profile_image[0]}` 
                            : "/images/default-user.jpg"
                        }
                        alt={item.userLikedTo?.fullName || "User"}
                        width={60}
                        height={60}
                        className="rounded-full object-cover object-top"
                      />
                    </div>
                    
                    {/* User Info */}
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold text-lg">{item.userLikedTo?.fullName || "User"}</h3>
                      <p className="text-gray-500 text-sm">Liked on {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link 
                        href={`/dashboard/profile/${item.userLikedTo?._id}`} 
                        className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition"
                      >
                        View
                      </Link>
                      <button 
                        className={`px-3 py-2 text-sm rounded-md transition ${
                          dislikingUserId === item.userLikedTo?._id 
                            ? 'bg-gray-100 text-gray-500' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                        onClick={() => handleUnlike(item.userLikedTo?._id)}
                        disabled={dislikingUserId === item.userLikedTo?._id}
                      >
                        {dislikingUserId === item.userLikedTo?._id ? 'Unliking...' : 'Unlike'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}