// app/liked-users/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function LikedUsersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('likedByMe')
  const [likedUsers, setLikedUsers] = useState({
    likedByMe: [],
    likedMe: [],
    mutual: []
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      // Fetch liked users from your API
      // This is mock data, replace with actual API call
      setTimeout(() => {
        setLikedUsers({
          likedByMe: [
            { id: 1, name: 'Komal Yadav', age: 27, location: 'Delhi', profession: 'Tax Consultant', image: '/profiles/komal.jpg' },
            { id: 2, name: 'Manisha Bharti', age: 26, location: 'Delhi', profession: 'Tax Consultant', image: '/profiles/manisha.jpg' },
            { id: 3, name: 'Pooja Sharma', age: 28, location: 'Mumbai', profession: 'Teacher', image: '/profiles/user7.jpg' },
            { id: 4, name: 'Priya Patel', age: 25, location: 'Ahmedabad', profession: 'Software Engineer', image: '/profiles/user3.jpg' },
          ],
          likedMe: [
            { id: 2, name: 'Manisha Bharti', age: 26, location: 'Delhi', profession: 'Tax Consultant', image: '/profiles/manisha.jpg' },
            { id: 3, name: 'Shipra Rohilla', age: 25, location: 'Delhi', profession: 'Tax Consultant', image: '/profiles/shipra.jpg' },
            { id: 5, name: 'Ankit Singh', age: 29, location: 'Bangalore', profession: 'Business Analyst', image: '/profiles/user6.jpg' },
          ],
          mutual: [
            { id: 2, name: 'Manisha Bharti', age: 26, location: 'Delhi', profession: 'Tax Consultant', image: '/profiles/manisha.jpg' },
          ]
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
          <p className="mt-4 text-gray-600">Loading liked profiles...</p>
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
        
        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`px-6 py-4 font-medium ${activeTab === 'likedByMe' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('likedByMe')}
          >
            Profiles I Liked ({likedUsers.likedByMe.length})
          </button>
          <button 
            className={`px-6 py-4 font-medium ${activeTab === 'likedMe' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('likedMe')}
          >
            Profiles Who Liked Me ({likedUsers.likedMe.length})
          </button>
          <button 
            className={`px-6 py-4 font-medium ${activeTab === 'mutual' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('mutual')}
          >
            Mutual Likes ({likedUsers.mutual.length})
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {likedUsers[activeTab].length === 0 ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-600">No profiles found</h3>
              <p className="mt-2 text-gray-500">
                {activeTab === 'likedByMe' && "You haven't liked any profiles yet."}
                {activeTab === 'likedMe' && "No one has liked your profile yet."}
                {activeTab === 'mutual' && "You don't have any mutual likes yet."}
              </p>
              
              {activeTab === 'likedByMe' && (
                <Link href="/" className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                  Discover Profiles
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedUsers[activeTab].map(user => (
                <div key={user.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="relative h-64">
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="bg-white rounded-full p-2 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-600">{user.age} yrs, {user.location}</p>
                    <p className="text-gray-600">{user.profession}</p>
                    
                    <div className="mt-4 flex space-x-2">
                      <Link href={`/profile/${user.id}`} className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-md hover:bg-gray-200 transition">
                        View Profile
                      </Link>
                      
                      {activeTab === 'likedByMe' && (
                        <button className="flex-1 bg-red-100 text-red-700 py-2 rounded-md hover:bg-red-200 transition">
                          Unlike
                        </button>
                      )}
                      
                      {activeTab === 'likedMe' && (
                        <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-md hover:bg-green-200 transition">
                          Like Back
                        </button>
                      )}
                      
                      {activeTab === 'mutual' && (
                        <Link href={`/chat/${user.id}`} className="flex-1 bg-blue-100 text-blue-700 text-center py-2 rounded-md hover:bg-blue-200 transition">
                          Message
                        </Link>
                      )}
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