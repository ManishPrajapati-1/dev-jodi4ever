'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Mock profile data (in a real app, this would come from an API)
const profiles = [
  {
    id: 1,
    name: 'Komal Yadav',
    height: "5'1\" (151.94 cm)",
    location: 'Badarpur',
    caste: 'Vaishya',
    profession: 'Tax Consultant',
    income: 'Rs. 7.5 - 10 Lakh',
    education: 'Diploma',
    maritalStatus: 'Single',
    image: '/images/trust2.jpg'
  },
  {
    id: 2,
    name: 'Manisha Bharti',
    height: "5'1\" (151.94 cm)",
    location: 'Badarpur',
    caste: 'Vaishya',
    profession: 'Tax Consultant',
    income: 'Rs. 7.5 - 10 Lakh',
    education: 'Diploma',
    maritalStatus: 'Single',
    image: '/images/trust3.jpg'
  },
  {
    id: 3,
    name: 'Shipra Rohilla',
    height: "5'1\" (151.94 cm)",
    location: 'Badarpur',
    caste: 'Vaishya',
    profession: 'Tax Consultant',
    income: 'Rs. 4.5 - 7 Lakh',
    education: 'Diploma',
    maritalStatus: 'Single',
    image: '/images/trust4.jpg'
  },
  // Add more profiles as needed
];

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-lg shadow-md p-6 mb-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Jodi Banao!</h1>
        <p className="text-lg opacity-90">Find your perfect life partner from our curated matches.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/partner-preferences" className="bg-white text-red-600 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition">
            Update Preferences
          </Link>
          <Link href="/profile" className="bg-red-700 text-white font-medium px-4 py-2 rounded-md hover:bg-red-800 transition">
            Complete Your Profile
          </Link>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <select id="age" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>18 - 25 years</option>
              <option>26 - 30 years</option>
              <option>31 - 35 years</option>
              <option>36 - 40 years</option>
              <option>41+ years</option>
            </select>
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height</label>
            <select id="height" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
              {/* <option>4&apos;0" - 4'6"</option>
              <option>4&apos;7" - 5'0"</option>
              <option>5&apos;1" - 5'6"</option>
              <option>5&apos;7" - 6'0"</option>
              <option>6&apos;1" and above</option> */}
            </select>
          </div>
          <div>
            <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-1">Religion/Community</label>
            <select id="religion" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
              <option>Sikh</option>
              <option>Jain</option>
              <option>Buddhist</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select id="location" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Kolkata</option>
              <option>Hyderabad</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Apply Filters
        </button>
      </div>
      
      {/* Category Filters */}
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveFilter('all')}
        >
          All Matches
        </button>
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'new' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveFilter('new')}
        >
          New Matches
        </button>
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'premium' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveFilter('premium')}
        >
          Premium Matches
        </button>
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'nearby' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveFilter('nearby')}
        >
          Nearby
        </button>
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'recently' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveFilter('recently')}
        >
          Recently Active
        </button>
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeFilter === 'verified' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveFilter('verified')}
        >
          Verified Profiles
        </button>
      </div>
      
      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-lg shadow overflow-hidden transition transform hover:scale-[1.02] hover:shadow-lg">
            {/* Profile Image */}
            <div className="relative h-80 w-full">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover"
              />
              {/* Favorite Button */}
              <button className="absolute top-4 right-4 bg-white/70 hover:bg-white rounded-full p-2 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Profile Info */}
            <div className="p-4 bg-red-600 text-white">
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-sm">{profile.height} | {profile.location} | {profile.caste}</p>
              
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {profile.profession} | {profile.income}
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  {profile.education} | {profile.maritalStatus}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex divide-x divide-gray-200">
              <button className="flex-1 text-center py-3 font-medium text-gray-700 hover:bg-gray-50 transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Add
              </button>
              <button className="flex-1 text-center py-3 font-medium text-gray-700 hover:bg-gray-50 transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            Previous
          </a>
          <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
            1
          </a>
          <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-red-600 text-white">
            2
          </a>
          <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
            3
          </a>
          <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            Next
          </a>
        </nav>
      </div>
      
      {/* Premium Membership Card */}
      <div className="mt-12 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
        <p className="mb-4">Get unlimited matches, direct messaging, and profile visibility with our premium plans.</p>
        <button className="bg-white text-yellow-600 font-bold py-2 px-6 rounded-md hover:bg-gray-100 transition">
          View Plans
        </button>
      </div>
    </div>
  )
}
