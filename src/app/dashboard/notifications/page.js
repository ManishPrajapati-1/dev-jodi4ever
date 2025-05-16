// app/notifications/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useGetNotificationsQuery } from "@/lib/services/api"
import { 
  Bell, 
  Heart, 
  Eye, 
  MessageCircle, 
  UserCheck, 
  UserPlus, 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Award, 
  Loader2,
  Check,
  X,
  Filter
} from 'lucide-react'

export default function NotificationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jodi4ever.com/";
  
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

  // Get notification icon based on type
  const getNotificationIcon = (notification) => {
    if (notification.title?.includes('Liked')) {
      return <Heart size={20} className="text-red-600" />
    } else if (notification.title?.includes('Profile View')) {
      return <Eye size={20} className="text-blue-600" />
    } else if (notification.title?.includes('Message')) {
      return <MessageCircle size={20} className="text-green-600" />
    } else if (notification.title?.includes('Connection Request Accepted') || notification.title?.includes('Friend Request Accepted')) {
      return <UserCheck size={20} className="text-primary" />
    } else if (notification.title?.includes('Friend Request Received') || notification.title?.includes('Connection Request')) {
      return <UserPlus size={20} className="text-amber-600" />
    } else if (notification.title?.includes('Premium')) {
      return <Award size={20} className="text-amber-500" />
    } else {
      return <Bell size={20} className="text-gray-600" />
    }
  }

  // Calculate unread counts for each category
  const unreadCount = notifications.filter(n => !n.isRead).length
  const likesCount = notifications.filter(n => n.title?.includes('Liked')).length
  const likesUnreadCount = notifications.filter(n => n.title?.includes('Liked') && !n.isRead).length
  const visitCount = notifications.filter(n => n.title?.includes('Profile View')).length
  const visitUnreadCount = notifications.filter(n => n.title?.includes('Profile View') && !n.isRead).length
  const messageCount = notifications.filter(n => n.title?.includes('Message')).length
  const messageUnreadCount = notifications.filter(n => n.title?.includes('Message') && !n.isRead).length
  const matchCount = notifications.filter(n => 
    n.title?.includes('Connection Request Accepted') || 
    n.title?.includes('Friend Request Accepted')
  ).length
  const matchUnreadCount = notifications.filter(n => 
    (n.title?.includes('Connection Request Accepted') || 
    n.title?.includes('Friend Request Accepted')) && !n.isRead
  ).length
  const requestCount = notifications.filter(n => 
    n.title?.includes('Friend Request Received') || 
    n.title?.includes('Connection Request')
  ).length
  const requestUnreadCount = notifications.filter(n => 
    (n.title?.includes('Friend Request Received') || 
    n.title?.includes('Connection Request')) && !n.isRead
  ).length

  if (isNotificationLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-red-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading notifications...</p>
          <p className="text-gray-500 text-sm mt-2">Fetching your recent updates</p>
        </div>
      </div>
    )
  }
  
  if (isNotificationError) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Notifications</h3>
          <p className="text-gray-600 mb-6">We&apos;re having trouble loading your notifications. Please try again later.</p>
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

  const filteredNotifications = getFilteredNotifications()
  
  // Configuration for tabs
  const tabs = [
    { id: 'all', label: 'All', count: notifications.length, unread: unreadCount, icon: <Bell size={18} className="mr-2" /> },
    { id: 'unread', label: 'Unread', count: unreadCount, unread: unreadCount, icon: <Bell size={18} className="mr-2" /> },
    { id: 'like', label: 'Likes', count: likesCount, unread: likesUnreadCount, icon: <Heart size={18} className="mr-2" /> },
    // { id: 'visit', label: 'Profile Views', count: visitCount, unread: visitUnreadCount, icon: <Eye size={18} className="mr-2" /> },
    // { id: 'message', label: 'Messages', count: messageCount, unread: messageUnreadCount, icon: <MessageCircle size={18} className="mr-2" /> },
    { id: 'match', label: 'Matches', count: matchCount, unread: matchUnreadCount, icon: <UserCheck size={18} className="mr-2" /> },
    { id: 'request', label: 'Requests', count: requestCount, unread: requestUnreadCount, icon: <UserPlus size={18} className="mr-2" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Page Header - Back to Dashboard Link */}
          <Link
            href="/dashboard" 
            className="mb-6 text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center group"
          >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Dashboard</span>
          </Link>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-red-600 to-red-500 text-white">
            <div className="flex flex-col justify-between items-center md:items-start">
              <div className="flex items-center">
                <Bell size={24} className="mr-3" />
                <h1 className="text-xl md:text-2xl font-bold">Notifications</h1>
                {/* {unreadCount > 0 && (
                  <span className="ml-3 bg-white text-red-600 text-sm font-bold px-2.5 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                )} */}
              </div>
              {/* <button 
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 flex items-center backdrop-blur-sm"
                onClick={markAllAsRead}
              >
                <CheckCircle size={18} className="mr-2" />
                Mark All as Read
              </button> */}
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b overflow-x-auto flex scrollbar-hide">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors duration-200 flex items-center ${
                  activeTab === tab.id 
                    ? 'text-red-600 border-b-2 border-red-600 bg-red-50/30' 
                    : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`ml-2 text-xs rounded-full px-2 py-0.5 ${
                    activeTab === tab.id
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {tab.unread > 0 && tab.id !== 'unread' && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
            ))}
          </div>
          
          {/* Mobile Filter Dropdown (shows on small screens) */}
          <div className="md:hidden p-4 border-b">
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                {tabs.map(tab => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label} ({tab.count})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
          
          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <div className="py-16 text-center px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <Bell size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No notifications found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                You don&apos;t have any {activeTab !== 'all' ? activeTab : ''} notifications at the moment.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map(notification => (
                <div 
                  key={notification._id} 
                  className={`p-5 hover:bg-gray-50 transition-colors duration-200`}
                >
                  {/* ${
                    !notification.isRead ? 'bg-red-50/50 border-l-4 border-red-500' : ''
                  }` */}
                  <div className="flex">
                    {/* Profile Image with Icon Indicator */}
                    <div className="flex-shrink-0 relative">
                      {notification.pic && notification.pic.length > 0 ? (
                        <Image
                          src={`${baseUrl}${notification.pic[0]}`}
                          alt="Profile"
                          width={50}
                          height={50}
                          className="rounded-lg object-cover w-12 h-12"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100">
                          <User size={24} className="text-gray-400" />
                        </div>
                      )}
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                        {getNotificationIcon(notification)}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div className="mb-1 sm:mb-0 pr-8 sm:pr-0">
                          <p className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title && <span className="font-semibold">{notification.title}</span>}
                          </p>
                          {/* <p className={`${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                            {notification.message}
                          </p> */}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                          <Clock size={14} className="mr-1.5 flex-shrink-0" />
                          <span>{getTimeAgo(notification.createdAt)}</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons based on notification type */}
                      {/* <div className="mt-3 flex flex-wrap gap-2">
                        {notification.title?.includes('Liked') && (
                          <>
                            <Link
                              href={`/dashboard/profile/${notification.user}`}
                              className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                              <Eye size={16} className="mr-1.5" />
                              View Profile
                            </Link>
                            <button className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors duration-200">
                              <Heart size={16} className="mr-1.5" />
                              Like Back
                            </button>
                          </>
                        )}
                        
                        {notification.title?.includes('Profile View') && (
                          <Link
                            href={`/dashboard/profile/${notification.user}`}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 transition-colors duration-200"
                          >
                            <Eye size={16} className="mr-1.5" />
                            View Profile
                          </Link>
                        )}
                        
                        {notification.title?.includes('Message') && (
                          <button className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600 text-sm rounded-lg hover:bg-green-100 transition-colors duration-200">
                            <MessageCircle size={16} className="mr-1.5" />
                            Reply to Message
                          </button>
                        )}
                        
                        {(notification.title?.includes('Connection Request Accepted') || notification.title?.includes('Friend Request Accepted')) && (
                          <>
                            <Link
                              href={`/dashboard/profile/${notification.user}`}
                              className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-primary text-sm rounded-lg hover:bg-purple-100 transition-colors duration-200"
                            >
                              <Eye size={16} className="mr-1.5" />
                              View Profile
                            </Link>
                            <button className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600 text-sm rounded-lg hover:bg-green-100 transition-colors duration-200">
                              <MessageCircle size={16} className="mr-1.5" />
                              Send Message
                            </button>
                          </>
                        )}
                        
                        {notification.title?.includes('Premium') && (
                          <button className="inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-600 text-sm rounded-lg hover:bg-amber-100 transition-colors duration-200">
                            <Award size={16} className="mr-1.5" />
                            View Offer
                          </button>
                        )}
                        
                        {(notification.title?.includes('Friend Request Received') || notification.title?.includes('New Connection Request')) && (
                          <>
                            <button className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600 text-sm rounded-lg hover:bg-green-100 transition-colors duration-200">
                              <Check size={16} className="mr-1.5" />
                              Accept
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors duration-200">
                              <X size={16} className="mr-1.5" />
                              Decline
                            </button>
                          </>
                        )}
                      </div> */}
                    </div>
                    
                    {/* Unread Indicator */}
                    {!notification.isRead && (
                      <div className="ml-2 hidden sm:block">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-600"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Notification Settings Link */}
        {/* <div className="mt-6 text-center">
          <Link
            href="/settings/notifications"
            className="text-red-600 hover:text-red-700 font-medium inline-flex items-center"
          >
            <span>Manage Notification Settings</span>
            <ArrowLeft size={16} className="ml-1.5 rotate-180" />
          </Link>
        </div> */}
      </div>
    </div>
  )
}

// User component for fallback avatar
const User = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);