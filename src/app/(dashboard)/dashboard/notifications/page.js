// app/notifications/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function NotificationsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      // Fetch notifications from your API
      // This is mock data, replace with actual API call
      setTimeout(() => {
        setNotifications([
          {
            id: 1,
            type: 'like',
            user: {
              id: 101,
              name: 'Komal Yadav',
              image: '/profiles/komal.jpg'
            },
            message: 'liked your profile',
            time: '10 minutes ago',
            isRead: false
          },
          {
            id: 2,
            type: 'visit',
            user: {
              id: 102,
              name: 'Manisha Bharti',
              image: '/profiles/manisha.jpg'
            },
            message: 'viewed your profile',
            time: '2 hours ago',
            isRead: false
          },
          {
            id: 3,
            type: 'message',
            user: {
              id: 103,
              name: 'Shipra Rohilla',
              image: '/profiles/shipra.jpg'
            },
            message: 'sent you a message',
            time: '1 day ago',
            isRead: true
          },
          {
            id: 4,
            type: 'match',
            user: {
              id: 104,
              name: 'Deepak Singh',
              image: '/profiles/user1.jpg'
            },
            message: 'is a new match for you',
            time: '2 days ago',
            isRead: true
          },
          {
            id: 5,
            type: 'system',
            message: 'Your profile has been successfully verified!',
            time: '3 days ago',
            isRead: true
          },
          {
            id: 5,
            type: 'system',
            message: 'Your profile has been successfully verified!',
            time: '3 days ago',
            isRead: true
          },
          {
            id: 6,
            type: 'premium',
            message: 'Upgrade to Premium and get 50% off for the first month!',
            time: '5 days ago',
            isRead: true
          },
          {
            id: 7,
            type: 'request',
            user: {
              id: 105,
              name: 'Ravi Kumar',
              image: '/profiles/user2.jpg'
            },
            message: 'sent you a connection request',
            time: '1 week ago',
            isRead: true
          }
        ])
        setLoading(false)
      }, 1000)
    }
  }, [router])

  const markAllAsRead = () => {
    // In a real app, you would call your API to mark all notifications as read
    // This is just for demo purposes
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true
    }))
    setNotifications(updatedNotifications)
  }

  const getFilteredNotifications = () => {
    if (activeTab === 'all') {
      return notifications
    } else if (activeTab === 'unread') {
      return notifications.filter(notification => !notification.isRead)
    } else {
      return notifications.filter(notification => notification.type === activeTab)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      </div>
    )
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-red-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button 
            className="px-4 py-2 bg-red-700 rounded-md hover:bg-red-800 transition"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>
        </div>
        
        {/* Tabs */}
        <div className="border-b overflow-x-auto">
          <div className="flex whitespace-nowrap">
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'all' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'unread' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('unread')}
            >
              Unread
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'like' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('like')}
            >
              Likes
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'visit' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('visit')}
            >
              Profile Views
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'message' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('message')}
            >
              Messages
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'match' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('match')}
            >
              Matches
            </button>
          </div>
        </div>
        
        {/* Notifications List */}
        <div className="divide-y">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-600">No notifications found</h3>
              <p className="mt-2 text-gray-500">You don&apos;t have any {activeTab !== 'all' ? activeTab : ''} notifications at the moment.</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition ${!notification.isRead ? 'bg-red-50' : ''}`}
              >
                <div className="flex items-start">
                  {notification.type !== 'system' && notification.type !== 'premium' ? (
                    <div className="flex-shrink-0">
                      <Image
                        src={notification.user.image}
                        alt={notification.user.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center bg-red-100">
                      {notification.type === 'system' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a4 4 0 118 0v7a4 4 0 01-8 0V6a4 4 0 118 0v7a4 4 0 01-8 0V6a4 4 0 118 0v7a4 4 0 01-8 0V6a4 4 0 014-4h.01" />
                        </svg>
                      )}
                    </div>
                  )}
                  
                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between">
                      <div>
                        {notification.type !== 'system' && notification.type !== 'premium' ? (
                          <p className="font-medium">
                            <Link href={`/profile/${notification.user.id}`} className="hover:text-red-600">
                              {notification.user.name}
                            </Link>{' '}
                            {notification.message}
                          </p>
                        ) : (
                          <p className="font-medium">{notification.message}</p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{notification.time}</span>
                    </div>
                    
                    {notification.type === 'like' && (
                      <div className="mt-2">
                        <button className="text-red-600 text-sm font-medium hover:text-red-700 mr-4">
                          View Profile
                        </button>
                        <button className="text-gray-600 text-sm font-medium hover:text-gray-800">
                          Like Back
                        </button>
                      </div>
                    )}
                    
                    {notification.type === 'visit' && (
                      <div className="mt-2">
                        <button className="text-red-600 text-sm font-medium hover:text-red-700 mr-4">
                          View Profile
                        </button>
                      </div>
                    )}
                    
                    {notification.type === 'message' && (
                      <div className="mt-2">
                        <button className="text-red-600 text-sm font-medium hover:text-red-700">
                          Reply to Message
                        </button>
                      </div>
                    )}
                    
                    {notification.type === 'match' && (
                      <div className="mt-2">
                        <button className="text-red-600 text-sm font-medium hover:text-red-700 mr-4">
                          View Profile
                        </button>
                        <button className="text-green-600 text-sm font-medium hover:text-green-700">
                          Send Message
                        </button>
                      </div>
                    )}
                    
                    {notification.type === 'premium' && (
                      <div className="mt-2">
                        <button className="text-yellow-600 text-sm font-medium hover:text-yellow-700">
                          View Offer
                        </button>
                      </div>
                    )}
                    
                    {notification.type === 'request' && (
                      <div className="mt-2">
                        <button className="text-green-600 text-sm font-medium hover:text-green-700 mr-4">
                          Accept
                        </button>
                        <button className="text-red-600 text-sm font-medium hover:text-red-700">
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {!notification.isRead && (
                    <div className="ml-2 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-red-600"></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}