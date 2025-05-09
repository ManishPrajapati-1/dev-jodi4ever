// app/notifications/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useGetNotificationsQuery } from "@/lib/services/api"

export default function NotificationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all')
  const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://65.1.117.252:5002/";
  
  // Use RTK Query hook to fetch notifications
  const { 
    data: notificationData, 
    isLoading: isNotificationLoading, 
    isError: isNotificationError 
  } = useGetNotificationsQuery();
  
  // Extract notifications from the response if available
  const notifications = notificationData?.data || []

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    }
  }, [router])

  const markAllAsRead = () => {
    // In a real app, you would call your API to mark all notifications as read
    // For now, we'll just implement client-side UI update
    // You can add an API mutation for this functionality using RTK Query later
    console.log('Mark all as read functionality needs to be implemented with RTK Query')
  }

  const getFilteredNotifications = () => {
    if (activeTab === 'all') {
      return notifications
    } else if (activeTab === 'unread') {
      return notifications.filter(notification => !notification.isRead)
    } else if (activeTab === 'like') {
      return notifications.filter(notification => notification.title?.includes('Liked'))
    } else if (activeTab === 'visit') {
      return notifications.filter(notification => notification.title?.includes('Profile View'))
    } else if (activeTab === 'message') {
      return notifications.filter(notification => notification.title?.includes('Message'))
    } else if (activeTab === 'match') {
      return notifications.filter(notification => 
        notification.title?.includes('Connection Request Accepted') || 
        notification.title?.includes('Friend Request Accepted')
      )
    } else if (activeTab === 'request') {
      return notifications.filter(notification => 
        notification.title?.includes('Friend Request Received') || 
        notification.title?.includes('Connection Request')
      )
    }
    return notifications
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    }
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`
  }

  if (isNotificationLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      </div>
    )
  }
  
  if (isNotificationError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-gray-600">Failed to load notifications. Please try again later.</p>
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
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'request' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
              onClick={() => setActiveTab('request')}
            >
              Requests
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
                key={notification._id} 
                className={`p-4 hover:bg-gray-50 transition ${!notification.isRead ? 'bg-red-50' : ''}`}
              >
                <div className="flex items-start">
                  {/* Profile Image */}
                  {notification.pic && notification.pic.length > 0 ? (
                    <div className="flex-shrink-0">
                      <Image
                        src={`${baseUrl}${notification.pic[0]}`}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full object-cover w-12 h-12"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center bg-red-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {notification.title && <span className="font-semibold">{notification.title}: </span>}
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">{getTimeAgo(notification.createdAt)}</span>
                    </div>
                    
                    {/* Action Buttons based on notification type */}
                    {notification.title?.includes('Liked') && (
                      <div className="mt-2">
                        <Link href={`/dashboard/profile/${notification.user}`}>
                        <button className="text-red-600 text-sm font-medium hover:text-red-700 mr-4 cursor-pointer">
                          View Profile
                        </button>
                        </Link>
                        <button className="text-gray-600 text-sm font-medium hover:text-gray-800">
                          Like Back
                        </button>
                      </div>
                    )}
                    
                    {notification.title?.includes('Profile View') && (
                      <div className="mt-2">
                        <button className="text-red-600 text-sm font-medium hover:text-red-700 mr-4">
                          View Profile
                        </button>
                      </div>
                    )}
                    
                    {notification.title?.includes('Message') && (
                      <div className="mt-2">
                        <button className="text-red-600 text-sm font-medium hover:text-red-700">
                          Reply to Message
                        </button>
                      </div>
                    )}
                    
                    {(notification.title?.includes('Connection Request Accepted') || notification.title?.includes('Friend Request Accepted')) && (
                      <div className="mt-2">
                        <button className="text-red-600 text-sm font-medium hover:text-red-700 mr-4">
                          View Profile
                        </button>
                        <button className="text-green-600 text-sm font-medium hover:text-green-700">
                          Send Message
                        </button>
                      </div>
                    )}
                    
                    {notification.title?.includes('Premium') && (
                      <div className="mt-2">
                        <button className="text-yellow-600 text-sm font-medium hover:text-yellow-700">
                          View Offer
                        </button>
                      </div>
                    )}
                    
                    {(notification.title?.includes('Friend Request Received') || notification.title?.includes('Connection Request')) && (
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
                  
                  {/* Unread Indicator */}
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