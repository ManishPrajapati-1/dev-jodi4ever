'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Heart, 
  Eye, 
  MessageCircle, 
  Calendar, 
  X, 
  Loader2, 
  AlertCircle,
  Search,
  ChevronRight,
  UserPlus,
  Filter,
  Cake,
  MapPin
} from 'lucide-react'
import { useGetFavouritesQuery, useDislikeProfileMutation } from "@/lib/services/api"

export default function LikedUsersPage() {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://65.1.117.252:5002/"
  const [dislikingUserId, setDislikingUserId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterView, setFilterView] = useState('list') // 'grid' or 'list'
  
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

  // Filter by search query if provided
  const filteredUsers = searchQuery
    ? likedByMe.filter(user => 
        user.userLikedTo?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.userLikedTo?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.userLikedTo?.occupation?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : likedByMe

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

  // Format date in a more readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-red-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading your favorites...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the profiles you&apos;ve liked</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Favorites</h3>
          <p className="text-gray-600 mb-6">We&apos;re having trouble loading your favorite profiles. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Page Header - Back to Dashboard Link */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-red-600 to-red-500 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Heart size={24} className="mr-3" />
                <h1 className="text-2xl font-bold">Favorites</h1>
                {filteredUsers.length > 0 && (
                  <span className="ml-3 bg-white text-red-600 text-sm font-bold px-2.5 py-1 rounded-full">
                    {filteredUsers.length} profiles
                  </span>
                )}
              </div>
              
              {filteredUsers.length > 0 && (
                <div className="hidden sm:flex space-x-2">
                  <button 
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      filterView === 'grid' 
                        ? 'bg-white/20 text-white' 
                        : 'bg-transparent text-white/80 hover:bg-white/10'
                    }`}
                    onClick={() => setFilterView('grid')}
                    title="Grid View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button 
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      filterView === 'list' 
                        ? 'bg-white/20 text-white' 
                        : 'bg-transparent text-white/80 hover:bg-white/10'
                    }`}
                    onClick={() => setFilterView('list')}
                    title="List View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Search Bar - Only show if there are liked profiles */}
          {/* {filteredUsers.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search favorites by name, location, or occupation..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          )} */}
          
          {/* Content */}
          <div className="p-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-red-50 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Heart size={36} className="text-red-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No favorites yet</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {searchQuery 
                    ? "No profiles match your search. Try different keywords or clear your search."
                    : "You haven't liked any profiles yet. Discover and like profiles to see them here."}
                </p>
                
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm"
                >
                  <UserPlus size={18} className="mr-2" />
                  Discover Profiles
                </Link>
              </div>
            ) : (
              filterView === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map(item => (
                    <div 
                      key={item._id} 
                      className="bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={
                            item.userLikedTo?.profile_image?.length > 0 
                              ? `${baseUrl}${item.userLikedTo.profile_image[0]}` 
                              : "/images/default-user.jpg"
                          }
                          alt={item.userLikedTo?.fullName || "User"}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Liked date overlay */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-red-600 text-xs px-2.5 py-1.5 rounded-full flex items-center shadow-sm">
                          <Heart size={12} className="mr-1.5" fill="currentColor" />
                          {new Date(item.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                        </div>
                        
                        {/* Action buttons on hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <Link 
                            href={`/dashboard/profile/${item.userLikedTo?._id}`} 
                            className="flex-1 flex items-center justify-center px-3 py-2 bg-white/90 backdrop-blur-sm text-gray-700 text-sm rounded-lg hover:bg-white transition-colors"
                          >
                            <Eye size={16} className="mr-1.5" />
                            View
                          </Link>
                          <button 
                            className="flex-1 flex items-center justify-center px-3 py-2 bg-white/90 backdrop-blur-sm text-red-600 text-sm rounded-lg hover:bg-white transition-colors"
                            onClick={() => handleUnlike(item.userLikedTo?._id)}
                            disabled={dislikingUserId === item.userLikedTo?._id}
                          >
                            {dislikingUserId === item.userLikedTo?._id ? (
                              <>
                                <Loader2 size={16} className="mr-1.5 animate-spin" />
                                Unliking...
                              </>
                            ) : (
                              <>
                                <X size={16} className="mr-1.5" />
                                Unlike
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 text-lg">{item.userLikedTo?.fullName || "User"}</h3>
                        <div className="mt-1 text-sm text-gray-600 flex flex-wrap items-center gap-x-3">
                          {item.userLikedTo?.age && (
                            <span className="flex items-center">
                              <Cake size={14} className="mr-1.5 text-gray-400" />
                              {item.userLikedTo.age} yrs
                            </span>
                          )}
                          {item.userLikedTo?.city && (
                            <span className="flex items-center">
                              <MapPin size={14} className="mr-1.5 text-gray-400" />
                              {item.userLikedTo.city}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-4">
                  {filteredUsers.map(item => (
                    <div 
                      key={item._id} 
                      className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow duration-200 bg-white"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <Image
                              src={
                                item.userLikedTo?.profile_image?.length > 0 
                                  ? `${baseUrl}${item.userLikedTo.profile_image[0]}` 
                                  : "/images/default-user.jpg"
                              }
                              alt={item.userLikedTo?.fullName || "User"}
                              width={70}
                              height={70}
                              className="rounded-lg object-cover"
                            />
                            {/* Like indicator */}
                            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                              <Heart size={16} className="text-red-600" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        
                        {/* User Info */}
                        <div className="mt-3 sm:mt-0 sm:ml-4 flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                            <div>
                              <h3 className="font-bold text-gray-800">{item.userLikedTo?.fullName || "User"}</h3>
                              <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-600 mt-1">
                                {item.userLikedTo?.age && (
                                  <span className="flex items-center">
                                    <Cake size={14} className="mr-1.5 text-gray-400" />
                                    {item.userLikedTo.age} yrs
                                  </span>
                                )}
                                {item.userLikedTo?.city && (
                                  <span className="flex items-center">
                                    <MapPin size={14} className="mr-1.5 text-gray-400" />
                                    {item.userLikedTo.city}
                                  </span>
                                )}
                                <span className="flex items-center text-xs">
                                  <Calendar size={14} className="mr-1.5 text-gray-400" />
                                  Liked on {formatDate(item.createdAt)}
                                </span>
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                              <Link
                                href={`/dashboard/profile/${item.userLikedTo?._id}`}
                                className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors duration-200"
                              >
                                <Eye size={16} className="mr-1.5" />
                                View Profile
                              </Link>
                              <button 
                                className="inline-flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors duration-200"
                                onClick={() => handleUnlike(item.userLikedTo?._id)}
                                disabled={dislikingUserId === item.userLikedTo?._id}
                              >
                                {dislikingUserId === item.userLikedTo?._id ? (
                                  <>
                                    <Loader2 size={16} className="mr-1.5 animate-spin" />
                                    Unliking...
                                  </>
                                ) : (
                                  <>
                                    <X size={16} className="mr-1.5" />
                                    Unlike
                                  </>
                                )}
                              </button>
                              <button className="inline-flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                <MessageCircle size={16} className="mr-1.5" />
                                Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
        
        {/* Related Link */}
        {filteredUsers.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {likedByMe.length} favorites
            </div>
            <Link
              href="/dashboard/activity"
              className="text-red-600 hover:text-red-700 font-medium inline-flex items-center"
            >
              <span>View all activity</span>
              <ChevronRight size={16} className="ml-1.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}