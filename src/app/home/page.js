'use client'

import { useEffect, useState } from 'react'
import { 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  Crown,
  Filter,
  Users,
  Star
} from 'lucide-react';
import ProfileGrid from './Components/ProfileGrid'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useGetMatchingProfilesQuery } from "@/lib/services/api";
import { useDispatch, useSelector } from "react-redux";


export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  
  // Pass the currentPage parameter to the query
  const { data: profilesData, isLoading, isError } = useGetMatchingProfilesQuery(currentPage, { refetchOnMountOrArgChange: true });
 
  // Profiles will be undefined if data is still loading
  const profiles = profilesData?.data || [];
  const pagination = profilesData?.pagination;

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      setLoading(false)
    }
  }, [router])

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    // window.scrollTo(0, 0);
  }

  // Handle previous page
  const handlePreviousPage = () => {
    if (pagination && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // window.scrollTo(0, 0);
    }
  }

  // Handle next page
  const handleNextPage = () => {
    if (pagination && pagination.hasNextPages) {
      setCurrentPage(currentPage + 1);
      // window.scrollTo(0, 0);
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profiles...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-lg">
            <p>Error loading profiles. Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="relative">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M46.5,-78.1C59.3,-72.2,68.5,-58.8,76.4,-44.4C84.2,-30,90.7,-15,89.9,-0.4C89.1,14.1,81.1,28.2,72.2,41.6C63.3,55.1,53.5,67.9,40.5,75.3C27.4,82.7,11.2,84.7,-4.6,81.9C-20.5,79,-40.9,71.4,-53.9,59.3C-66.9,47.2,-72.4,30.7,-76.3,13.5C-80.1,-3.7,-82.2,-21.5,-76.5,-36.2C-70.8,-50.9,-57.2,-62.4,-42.7,-67.6C-28.2,-72.8,-12.9,-71.7,1.4,-74.1C15.8,-76.5,33.6,-84,46.5,-78.1Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="p-6 md:p-8 text-white relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to Jodi4Ever!</h2>
              <p className="text-white/90 mb-6">Find your perfect life partner from our curated matches.</p>
              
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/home/partner-preferences"
                  className="bg-white/20 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-lg hover:bg-white/30 transition-colors shadow-sm flex items-center"
                >
                  <Filter size={18} className="mr-2" />
                  Update Preferences
                </Link>
                <Link 
                  href="/home/profile" 
                  className="bg-white text-primary font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-sm flex items-center"
                >
                  <Users size={18} className="mr-2" />
                  Complete Your Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === 'all' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All Matches
            </button>
            {/* <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === 'new' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveFilter('new')}
            >
              New Matches
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === 'nearby' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveFilter('nearby')}
            >
              Nearby
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === 'favorites' ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveFilter('favorites')}
            >
              Favorites
            </button> */}
          </div>
          
          {/* <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search profiles" 
              className="py-2 pl-10 pr-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary w-full max-w-xs"
            />
          </div> */}
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading matches...</p>
          </div>
        ) : (
          <>
            {/* Profile Cards Grid */}
            <ProfileGrid profiles={profiles} />

            {/* Empty State */}
            {profiles.length === 0 && !isLoading && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Users size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No matches found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your preferences to see more profiles</p>
                <Link 
                  href="/home/partner-preferences" 
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80"
                >
                  <Filter size={16} className="mr-1" />
                  Adjust Preferences
                </Link>
              </div>
            )}
            
            {/* Pagination */}
            {profiles.length > 0 && pagination && (
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-lg overflow-hidden shadow-sm">
                  <button 
                    onClick={handlePreviousPage}
                    className={`px-4 py-2 text-sm border border-gray-200 bg-white flex items-center ${
                      currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Prev
                  </button>
                  
                  {pagination && Array.from({ length: pagination.totalPages }, (_, i) => {
                    // Only show a few page numbers for better UX
                    if (
                      i === 0 || // Always show first page
                      i === pagination.totalPages - 1 || // Always show last page
                      (i >= currentPage - 2 && i <= currentPage + 1) // Show current page and a few around it
                    ) {
                      return (
                        <button 
                          key={i} 
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-4 py-2 text-sm border-t border-b border-r border-gray-200 ${
                            currentPage === i + 1 
                              ? 'bg-primary text-white font-medium' 
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      );
                    }
                    
                    // Add ellipsis for skipped pages
                    if (
                      (i === 1 && currentPage > 3) || 
                      (i === pagination.totalPages - 2 && currentPage < pagination.totalPages - 3)
                    ) {
                      return (
                        <span 
                          key={i}
                          className="px-4 py-2 text-sm border-t border-b border-r border-gray-200 bg-white text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                    
                    return null;
                  })}
                  
                  <button 
                    onClick={handleNextPage}
                    className={`px-4 py-2 text-sm border border-gray-200 bg-white flex items-center ${
                      !pagination?.hasNextPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={!pagination?.hasNextPages}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
        
        {/* Premium Membership Card */}
        <div className="mt-12 bg-white rounded-xl overflow-hidden shadow-md">
          <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 p-1">
            <div className="bg-white rounded-t-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <Crown size={24} className="text-amber-500 mr-2" />
                    <h2 className="text-xl font-bold text-gray-800">Upgrade to Premium</h2>
                  </div>
                  <p className="text-gray-600 mt-1">Get unlimited matches, direct messaging, and priority visibility</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={'/premium'} className="bg-amber-100 text-amber-700 px-5 py-2.5 rounded-lg font-medium hover:bg-amber-200 transition-colors">
                    View Plans
                  </Link>
                  <Link href={'/premium'} className="bg-amber-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors">
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Premium Features */}
          <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-amber-100 rounded-full p-2">
                <Star size={16} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Priority Matches</h3>
                <p className="text-sm text-gray-500">Get featured in premium searches</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-amber-100 rounded-full p-2">
                <MessageCircle size={16} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Direct Messaging</h3>
                <p className="text-sm text-gray-500">Chat with any profile directly</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-amber-100 rounded-full p-2">
                <Users size={16} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Advanced Filters</h3>
                <p className="text-sm text-gray-500">Find your perfect match faster</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}