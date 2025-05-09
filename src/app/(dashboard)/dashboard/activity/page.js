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

export default function ActivityPage() {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://65.1.117.252:5002/"
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
  const receivedRequests = receivedRequestsData?.data || []

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
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading activity data...</p>
        </div>
      </div>
    )
  }

  // Get current data based on active tab
  const activeData = 
    activeTab === 'connections' ? connections :
    activeTab === 'sent' ? sentRequests :
    receivedRequests

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'connections' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('connections')}
          >
            Connections ({connections.length})
          </button>
          <button
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'sent' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('sent')}
          >
            Sent Requests ({sentRequests.length})
          </button>
          <button
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'received' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            onClick={() => setActiveTab('received')}
          >
            Received Requests ({receivedRequests.length})
          </button>
        </div>
        
        {/* Content Area */}
        <div className="p-6">
          {activeData.length === 0 ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-600">No {activeTab === 'connections' ? 'connections' : activeTab === 'sent' ? 'sent requests' : 'received requests'} found</h3>
              <p className="mt-2 text-gray-500">
                {activeTab === 'connections' && "You don't have any connections yet."}
                {activeTab === 'sent' && "You haven't sent any connection requests."}
                {activeTab === 'received' && "You don't have any pending connection requests."}
              </p>
            </div>
          ) : (
            <div className="divide-y">
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
                
                return (
                  <div key={connectionId} className="py-4 hover:bg-gray-50 transition">
                    <div className="flex items-center">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={
                            profile.profile_image?.length > 0
                              ? `${baseUrl}${profile.profile_image[0]}`
                              : "/images/default-user.jpg"
                          }
                          alt={profile.fullName || "User"}
                          width={60}
                          height={60}
                          className="rounded-full object-cover object-top"
                        />
                      </div>
                      
                      {/* User Info */}
                      <div className="ml-4 flex-grow">
                        <h3 className="font-semibold">{profile.fullName || "User"}</h3>
                        <div className="flex space-x-2 text-sm text-gray-600">
                          {profile.height && <span>{profile.height}</span>}
                          {profile.city && <span>• {profile.city}</span>}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/profile/${profile._id}`}
                          className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition"
                        >
                          View
                        </Link>
                        
                        {activeTab === 'connections' && (
                          <button 
                            className={`px-3 py-2 text-sm rounded-md transition ${
                              processingId === connectionId && processingAction === 'remove'
                                ? 'bg-gray-100 text-gray-500'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                            onClick={() => handleRemoveConnection(connectionId)}
                            disabled={processingId === connectionId}
                          >
                            {processingId === connectionId && processingAction === 'remove' ? 'Removing...' : 'Remove'}
                          </button>
                        )}
                        
                        {activeTab === 'sent' && (
                          <button 
                            className={`px-3 py-2 text-sm rounded-md transition ${
                              processingId === connectionId && processingAction === 'cancel'
                                ? 'bg-gray-100 text-gray-500'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                            onClick={() => handleCancelRequest(connectionId)}
                            disabled={processingId === connectionId}
                          >
                            {processingId === connectionId && processingAction === 'cancel' ? 'Cancelling...' : 'Cancel'}
                          </button>
                        )}
                        
                        {activeTab === 'received' && (
                          <>
                            <button 
                              className={`px-3 py-2 text-sm rounded-md transition ${
                                processingId === connectionId && processingAction === 'accepted'
                                  ? 'bg-gray-100 text-gray-500'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                              onClick={() => handleRequestResponse(profile._id, connectionId, 'Accepted')}
                              disabled={processingId === connectionId}
                            >
                              {processingId === connectionId && processingAction === 'accepted' ? 'Accepting...' : 'Accept'}
                            </button>
                            <button 
                              className={`px-3 py-2 text-sm rounded-md transition ${
                                processingId === connectionId && processingAction === 'declined'
                                  ? 'bg-gray-100 text-gray-500'
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                              onClick={() => handleRequestResponse(profile._id, connectionId, 'Declined')}
                              disabled={processingId === connectionId}
                            >
                              {processingId === connectionId && processingAction === 'declined' ? 'Declining...' : 'Decline'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}