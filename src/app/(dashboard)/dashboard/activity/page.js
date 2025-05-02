// app/activity/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ActivityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('followers')
  const [activityData, setActivityData] = useState({
    followers: [],
    following: [],
    requestedTo: [],
    requestedFrom: []
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      // Fetch activity data from your API
      // This is mock data, replace with actual API call
      setTimeout(() => {
        setActivityData({
          followers: [
            { id: 1, name: 'Komal Yadav', image: '/profiles/komal.jpg', location: 'Delhi', age: 27 },
            { id: 2, name: 'Manisha Bharti', image: '/profiles/manisha.jpg', location: 'Delhi', age: 26 },
            { id: 3, name: 'Riya Sharma', image: '/profiles/user1.jpg', location: 'Mumbai', age: 28 },
          ],
          following: [
            { id: 2, name: 'Manisha Bharti', image: '/profiles/manisha.jpg', location: 'Delhi', age: 26 },
            { id: 3, name: 'Shipra Rohilla', image: '/profiles/shipra.jpg', location: 'Delhi', age: 25 },
            { id: 4, name: 'Amit Kumar', image: '/profiles/user2.jpg', location: 'Bangalore', age: 30 },
            { id: 5, name: 'Priya Patel', image: '/profiles/user3.jpg', location: 'Ahmedabad', age: 27 },
          ],
          requestedTo: [
            { id: 6, name: 'Neha Gupta', image: '/profiles/user4.jpg', location: 'Chennai', age: 29 },
            { id: 7, name: 'Rahul Verma', image: '/profiles/user5.jpg', location: 'Kolkata', age: 31 },
          ],
          requestedFrom: [
            { id: 8, name: 'Ankit Singh', image: '/profiles/user6.jpg', location: 'Jaipur', age: 28 },
            { id: 9, name: 'Pooja Sharma', image: '/profiles/user7.jpg', location: 'Pune', age: 26 },
            { id: 10, name: 'Vijay Malhotra', image: '/profiles/user8.jpg', location: 'Hyderabad', age: 32 },
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
          <p className="mt-4 text-gray-600">Loading activity data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-6 py-4 font-medium ${activeTab === 'followers' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('followers')}
          >
            Followers ({activityData.followers.length})
          </button>
          <button
            className={`px-6 py-4 font-medium ${activeTab === 'following' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('following')}
          >
            Following ({activityData.following.length})
          </button>
          <button
            className={`px-6 py-4 font-medium ${activeTab === 'requestedTo' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('requestedTo')}
          >
            Requested ({activityData.requestedTo.length})
          </button>
          <button
            className={`px-6 py-4 font-medium ${activeTab === 'requestedFrom' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('requestedFrom')}
          >
            Pending ({activityData.requestedFrom.length})
          </button>
        </div>
        
        {/* Content Area */}
        <div className="p-6">
          {activityData[activeTab].length === 0 ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-600">No {activeTab} yet</h3>
              <p className="mt-2 text-gray-500">
                {activeTab === 'followers' && "You don't have any followers yet."}
                {activeTab === 'following' && "You're not following anyone yet."}
                {activeTab === 'requestedTo' && "You haven't sent any connection requests."}
                {activeTab === 'requestedFrom' && "You don't have any pending connection requests."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activityData[activeTab].map(profile => (
                <div key={profile.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="flex items-center p-4">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-gray-600">{profile.age} yrs, {profile.location}</p>
                    </div>
                  </div>
                  
                  <div className="border-t p-3 flex justify-between">
                    {activeTab === 'followers' && (
                      <>
                        <button className="text-sm font-medium text-gray-600 hover:text-red-600">View Profile</button>
                        <button className="text-sm font-medium text-red-600 hover:text-red-700">Remove</button>
                      </>
                    )}
                    
                    {activeTab === 'following' && (
                      <>
                        <button className="text-sm font-medium text-gray-600 hover:text-red-600">View Profile</button>
                        <button className="text-sm font-medium text-red-600 hover:text-red-700">Unfollow</button>
                      </>
                    )}
                    
                    {activeTab === 'requestedTo' && (
                      <>
                        <button className="text-sm font-medium text-gray-600 hover:text-red-600">View Profile</button>
                        <button className="text-sm font-medium text-red-600 hover:text-red-700">Cancel Request</button>
                      </>
                    )}
                    
                    {activeTab === 'requestedFrom' && (
                      <>
                        <button className="text-sm font-medium text-green-600 hover:text-green-700">Accept</button>
                        <button className="text-sm font-medium text-red-600 hover:text-red-700">Decline</button>
                      </>
                    )}
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