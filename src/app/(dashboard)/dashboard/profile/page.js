// app/profile/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('photos')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      // Fetch user profile data from your API
      // This is mock data, replace with actual API call
      setTimeout(() => {
        setUser({
          name: 'Rahul Sharma',
          age: 28,
          height: "5'10\" (177.8 cm)",
          location: 'Delhi, India',
          profession: 'Software Engineer',
          education: 'B.Tech in Computer Science',
          about: 'I am a software engineer with a passion for building web applications. I enjoy traveling, reading books, and listening to music in my free time.',
          photos: [
            '/user-photos/photo1.jpg',
            '/user-photos/photo2.jpg',
            '/user-photos/photo3.jpg',
            '/user-photos/photo4.jpg',
          ],
          details: {
            religion: 'Hindu',
            caste: 'Brahmin',
            maritalStatus: 'Never Married',
            diet: 'Vegetarian',
            smoking: 'Never',
            drinking: 'Occasionally',
            income: 'Rs. 15-20 Lakh per annum',
            languages: ['English', 'Hindi', 'Punjabi'],
            hobbies: ['Reading', 'Traveling', 'Photography', 'Music']
          }
        })
        setLoading(false)
      }, 1000)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-red-500 to-red-300 relative">
          <div className="absolute bottom-0 left-0 w-full p-6 flex items-end">
            <div className="relative h-32 w-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              <Image
                src="/profile-placeholder.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-6 pb-2">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-white opacity-90">{user.age} yrs, {user.height} | {user.location}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end px-6 py-4 border-b">
          <Link href="/profile/edit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="px-6 py-4 border-b">
          <div className="flex space-x-6">
            <button 
              className={`py-2 font-medium ${activeTab === 'photos' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('photos')}
            >
              Photos
            </button>
            <button 
              className={`py-2 font-medium ${activeTab === 'about' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('about')}
            >
              About Me
            </button>
            <button 
              className={`py-2 font-medium ${activeTab === 'details' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('details')}
            >
              Personal Details
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {user.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-4 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'about' && (
            <div>
              <h3 className="text-lg font-semibold mb-3">About Me</h3>
              <p className="text-gray-700 whitespace-pre-line">{user.about}</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Profession</p>
                  <p className="text-gray-700">{user.profession}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="text-gray-700">{user.education}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Income</p>
                  <p className="text-gray-700">{user.details.income}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Hobbies & Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.details.hobbies.map((hobby, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Religion</p>
                    <p className="text-gray-700">{user.details.religion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Caste</p>
                    <p className="text-gray-700">{user.details.caste}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Marital Status</p>
                    <p className="text-gray-700">{user.details.maritalStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Diet Preference</p>
                    <p className="text-gray-700">{user.details.diet}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Lifestyle</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Smoking</p>
                    <p className="text-gray-700">{user.details.smoking}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drinking</p>
                    <p className="text-gray-700">{user.details.drinking}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Languages Known</p>
                    <p className="text-gray-700">{user.details.languages.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}