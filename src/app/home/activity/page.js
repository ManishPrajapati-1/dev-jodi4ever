// app/activity/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  useGetConnectionsQuery, 
  useSendRequestQuery, 
  useGetRequestsQuery,
  useCancelRequestMutation,
  useConnectProfileMutation
} from "@/lib/services/api"
import { 
  UserPlus, 
  UserMinus, 
  Eye, 
  X, 
  Check, 
  Users, 
  ArrowLeft, 
  Clock, 
  Bell, 
  Loader2, 
  MessageCircle,
  MailPlus,
  UserCheck,
  AlertCircle
} from 'lucide-react'

export default function ActivityPage() {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jodi4ever.com/"
  const [activeTab, setActiveTab] = useState('connections')
  const [processingId, setProcessingId] = useState(null)
  const [processingAction, setProcessingAction] = useState(null) // 'cancel', 'accept', or 'decline'
  
  // Fetch connections and requests data from API
  const { 
    data: connectionsData, 
    isLoading: isConnectionsLoading, 
    isError: isConnectionsError,
    refetch: refetchConnections
  } = useGetConnectionsQuery()
  
  const { 
    data: sentRequestsData, 
    isLoading: isSentRequestsLoading, 
    isError: isSentRequestsError,
    refetch: refetchSentRequests
  } = useSendRequestQuery()
  
  const { 
    data: receivedRequestsData, 
    isLoading: isReceivedRequestsLoading, 
    isError: isReceivedRequestsError,
    refetch: refetchReceivedRequests
  } = useGetRequestsQuery()
  
  // API mutations
  const [cancelRequest] = useCancelRequestMutation()
  const [connectProfile] = useConnectProfileMutation()

  // Extract data from API responses
  const connections = connectionsData?.data || []
  const sentRequests = sentRequestsData?.data?.filter(req => req.receiver !== null) || []
  // const receivedRequests = receivedRequestsData?.data || []
  // Below line helps to filter non active users and show data accordingly.
  const receivedRequests = receivedRequestsData?.data.filter((item) => {item.sender != null}) || []

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    }
  }, [router])

  // Handle removing a connection
  const handleRemoveConnection = async (connectionId) => {
    if (!connectionId) return
    
    try {
      setProcessingId(connectionId)
      setProcessingAction('remove')
      await cancelRequest(connectionId).unwrap()
      // Refetch connections after removal
      refetchConnections()
    } catch (error) {
      console.error('Failed to remove connection:', error)
    } finally {
      setProcessingId(null)
      setProcessingAction(null)
    }
  }

  // Handle cancelling a sent request
  const handleCancelRequest = async (connectionId) => {
    if (!connectionId) return
    
    try {
      setProcessingId(connectionId)
      setProcessingAction('cancel')
      await cancelRequest(connectionId).unwrap()
      // Refetch sent requests after cancellation
      refetchSentRequests()
    } catch (error) {
      console.error('Failed to cancel request:', error)
    } finally {
      setProcessingId(null)
      setProcessingAction(null)
    }
  }

  // Handle accepting or declining a received request
  const handleRequestResponse = async (profileId, connectionId, status) => {
    if (!profileId || !connectionId) return
    
    try {
      setProcessingId(connectionId)
      setProcessingAction(status.toLowerCase())
      
      if (status === 'Accepted') {
        // For accepting, use connectProfile with status 'Accepted'
        await connectProfile({ 
          profileId, 
          status: 'Accepted'
        }).unwrap()
        
        // Refresh connections list as a new connection is added
        refetchConnections()
      } else if (status === 'Declined') {
        // For declining, use cancelRequest
        await cancelRequest(connectionId).unwrap()
      }
      
      // Refresh received requests list in both cases
      refetchReceivedRequests()
    } catch (error) {
      console.error(`Failed to ${status.toLowerCase()} request:`, error)
    } finally {
      setProcessingId(null)
      setProcessingAction(null)
    }
  }

  const isLoading = isConnectionsLoading || isSentRequestsLoading || isReceivedRequestsLoading
  const isError = isConnectionsError || isSentRequestsError || isReceivedRequestsError
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-red-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading your connections...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your activity data</p>
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Activity</h3>
          <p className="text-gray-600 mb-6">We&apos;re having trouble loading your connections and requests. Please try again later.</p>
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

  // Get current data based on active tab
  const activeData = 
    activeTab === 'connections' ? connections :
    activeTab === 'sent' ? sentRequests :
    receivedRequests

  // Tab configuration
  const tabs = [
    { 
      id: 'connections', 
      label: 'Connections', 
      count: connections.length,
      icon: <UserCheck size={20} className="mr-2" />
    },
    { 
      id: 'sent', 
      label: 'Sent Requests', 
      count: sentRequests.length,
      icon: <MailPlus size={20} className="mr-2" /> 
    },
    { 
      id: 'received', 
      label: 'Received Requests', 
      count: receivedRequests.length,
      icon: <Bell size={20} className="mr-2" />
    }
  ];

  // Empty state messages
  const emptyStateMessages = {
    connections: {
      title: "No connections yet",
      description: "You haven't connected with anyone yet. Start exploring profiles and send connection requests to find your perfect match.",
      icon: <Users size={40} className="text-gray-300" />
    },
    sent: {
      title: "No sent requests",
      description: "You haven't sent any connection requests yet. Browse profiles and send requests to potential matches.",
      icon: <MailPlus size={40} className="text-gray-300" />
    },
    received: {
      title: "No received requests",
      description: "You don't have any pending connection requests. Complete your profile to attract more potential matches.",
      icon: <Bell size={40} className="text-gray-300" />
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Page Header - Back to Dashboard Link */}
        <div className="mb-6">
          <Link 
            href="/home" 
            className="text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>

        {/* Activity Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div 
            className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${
              activeTab === 'connections' ? 'border-red-600' : 'border-transparent'
            } transition-colors cursor-pointer hover:border-l-4 hover:border-red-600`}
            onClick={() => setActiveTab('connections')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Connections</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{connections.length}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <UserCheck size={24} className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div 
            className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${
              activeTab === 'sent' ? 'border-red-600' : 'border-transparent'
            } transition-colors cursor-pointer hover:border-l-4 hover:border-red-600`}
            onClick={() => setActiveTab('sent')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Sent Requests</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{sentRequests.length}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <MailPlus size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div 
            className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${
              activeTab === 'received' ? 'border-red-600' : 'border-transparent'
            } transition-colors cursor-pointer hover:border-l-4 hover:border-red-600`}
            onClick={() => setActiveTab('received')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Received Requests</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{receivedRequests.length}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Bell size={24} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-6 py-4 font-medium whitespace-nowrap flex items-center transition-colors duration-200 ${
                  activeTab === tab.id 
                    ? 'text-red-600 border-b-2 border-red-600 bg-red-50/30' 
                    : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label} 
                <span className="ml-2 bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          
          {/* Content Area */}
          <div className="p-6">
            {activeData.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  {emptyStateMessages[activeTab].icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{emptyStateMessages[activeTab].title}</h3>
                <p className="text-gray-600 max-w-lg mx-auto mb-6">
                  {emptyStateMessages[activeTab].description}
                </p>
                <Link 
                  href="/home/profile" 
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-lg inline-flex items-center transition-colors duration-200 shadow-sm"
                >
                  {activeTab === 'connections' || activeTab === 'sent' ? (
                    <>
                      <UserPlus size={18} className="mr-2" />
                      Explore Profiles
                    </>
                  ) : (
                    <>
                      <Users size={18} className="mr-2" />
                      Update My Profile
                    </>
                  )}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {activeData.map(item => {
                  // Determine profile data based on tab
                  let profile, connectionId;
                  
                  if (activeTab === 'connections') {
                    profile = item.user;
                    connectionId = item.connectionId;
                  } else if (activeTab === 'sent') {
                    profile = item.receiver;
                    connectionId = item._id;
                  } else { // received
                    profile = item.sender;
                    connectionId = item._id;
                  }
                  
                  if (!profile) return null;
                  
                  // Calculate how long ago the request was sent/received (for sent/received tabs)
                  let requestDate = '';
                  if (activeTab !== 'connections' && item.createdAt) {
                    const date = new Date(item.createdAt);
                    const now = new Date();
                    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                    
                    if (diffInDays === 0) {
                      requestDate = 'Today';
                    } else if (diffInDays === 1) {
                      requestDate = 'Yesterday';
                    } else if (diffInDays < 7) {
                      requestDate = `${diffInDays} days ago`;
                    } else {
                      requestDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }
                  }
                  
                  return (
                    <div 
                      key={connectionId} 
                      className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow duration-200 bg-white"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <Image
                              src={
                                profile.profile_image?.length > 0
                                  ? `${baseUrl}${profile.profile_image[0]}`
                                  : "/images/default-user.jpg"
                              }
                              alt={profile.fullName || "User"}
                              width={70}
                              height={70}
                              className="rounded-lg object-cover object-top"
                            />
                            {activeTab !== 'connections' && (
                              <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                                {activeTab === 'sent' ? (
                                  <Clock size={16} className="text-blue-500" />
                                ) : (
                                  <Bell size={16} className="text-amber-500" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* User Info */}
                        <div className="mt-3 sm:mt-0 sm:ml-4 flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                            <div>
                              <h3 className="font-bold text-gray-800">{profile.fullName || "User"}</h3>
                              <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600 mt-1">
                                {profile.age && (
                                  <span className="flex items-center">
                                    <span className="text-gray-500 mr-1 text-xs">•</span>
                                    {profile.age} yrs
                                  </span>
                                )}
                                {profile.height && (
                                  <span className="flex items-center">
                                    <span className="text-gray-500 mr-1 text-xs">•</span>
                                    {profile.height}
                                  </span>
                                )}
                                {profile.city && (
                                  <span className="flex items-center">
                                    <span className="text-gray-500 mr-1 text-xs">•</span>
                                    {profile.city}
                                  </span>
                                )}
                                {requestDate && (
                                  <span className="flex items-center text-xs text-gray-500 mt-1 sm:mt-0">
                                    <Clock size={14} className="mr-1" />
                                    {requestDate}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Mobile-friendly action buttons below profile info on small screens */}
                            <div className="flex flex-wrap gap-2 mt-3 sm:mt-0 sm:justify-end">
                              <Link
                                href={`/home/profile/${profile._id}`}
                                className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors duration-200"
                              >
                                <Eye size={16} className="mr-1.5" />
                                View Profile
                              </Link>
                              
                              {activeTab === 'connections' && (
                                <>
                                  <button 
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 bg-red-50 text-red-600 hover:bg-red-100"
                                    onClick={() => handleRemoveConnection(connectionId)}
                                    disabled={processingId === connectionId}
                                  >
                                    {processingId === connectionId && processingAction === 'remove' ? (
                                      <>
                                        <Loader2 size={16} className="mr-1.5 animate-spin" />
                                        Removing...
                                      </>
                                    ) : (
                                      <>
                                        <UserMinus size={16} className="mr-1.5" />
                                        Remove
                                      </>
                                    )}
                                  </button>
                                  {/* <button 
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                                  >
                                    <MessageCircle size={16} className="mr-1.5" />
                                    Message
                                  </button> */}
                                </>
                              )}
                              
                              {activeTab === 'sent' && (
                                <button 
                                  className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 bg-red-50 text-red-600 hover:bg-red-100"
                                  onClick={() => handleCancelRequest(connectionId)}
                                  disabled={processingId === connectionId}
                                >
                                  {processingId === connectionId && processingAction === 'cancel' ? (
                                    <>
                                      <Loader2 size={16} className="mr-1.5 animate-spin" />
                                      Cancelling...
                                    </>
                                  ) : (
                                    <>
                                      <X size={16} className="mr-1.5" />
                                      Cancel Request
                                    </>
                                  )}
                                </button>
                              )}
                              
                              {activeTab === 'received' && (
                                <>
                                  <button 
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 bg-green-50 text-green-600 hover:bg-green-100"
                                    onClick={() => handleRequestResponse(profile._id, connectionId, 'Accepted')}
                                    disabled={processingId === connectionId}
                                  >
                                    {processingId === connectionId && processingAction === 'accepted' ? (
                                      <>
                                        <Loader2 size={16} className="mr-1.5 animate-spin" />
                                        Accepting...
                                      </>
                                    ) : (
                                      <>
                                        <Check size={16} className="mr-1.5" />
                                        Accept
                                      </>
                                    )}
                                  </button>
                                  <button 
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 bg-red-50 text-red-600 hover:bg-red-100"
                                    onClick={() => handleRequestResponse(profile._id, connectionId, 'Declined')}
                                    disabled={processingId === connectionId}
                                  >
                                    {processingId === connectionId && processingAction === 'declined' ? (
                                      <>
                                        <Loader2 size={16} className="mr-1.5 animate-spin" />
                                        Declining...
                                      </>
                                    ) : (
                                      <>
                                        <X size={16} className="mr-1.5" />
                                        Decline
                                      </>
                                    )}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Tips Section */}
        {activeTab === 'connections' && connections.length > 0 && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Connection Tips
            </h3>
            <p className="text-gray-600 mb-4">Build meaningful connections with these tips:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Send a personalized message when connecting with someone new
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Respond to messages promptly to show your interest
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Use our premium messaging features for better engagement
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}