// app/messages/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function MessagesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      // Fetch conversations from your API
      // This is mock data, replace with actual API call
      setTimeout(() => {
        setConversations([
          {
            id: 1,
            user: {
              id: 101,
              name: 'Komal Yadav',
              image: '/profiles/komal.jpg',
              lastActive: 'Online',
              lastSeen: 'now'
            },
            messages: [
              { id: 1, text: 'Hi, how are you?', sentByMe: false, time: '10:30 AM' },
              { id: 2, text: 'I\'m good, thanks! How about you?', sentByMe: true, time: '10:32 AM' },
              { id: 3, text: 'I\'m doing well. Would you like to chat?', sentByMe: false, time: '10:35 AM' },
            ],
            unread: 1
          },
          {
            id: 2,
            user: {
              id: 102,
              name: 'Manisha Bharti',
              image: '/profiles/manisha.jpg',
              lastActive: 'Last seen',
              lastSeen: '2 hours ago'
            },
            messages: [
              { id: 1, text: 'Hello!', sentByMe: false, time: 'Yesterday' },
              { id: 2, text: 'Hi Manisha! Nice to meet you', sentByMe: true, time: 'Yesterday' },
              { id: 3, text: 'Nice to meet you too!', sentByMe: false, time: 'Yesterday' },
              { id: 4, text: 'What are your hobbies?', sentByMe: true, time: 'Yesterday' },
            ],
            unread: 0
          },
          {
            id: 3,
            user: {
              id: 103,
              name: 'Shipra Rohilla',
              image: '/profiles/shipra.jpg',
              lastActive: 'Last seen',
              lastSeen: 'yesterday'
            },
            messages: [
              { id: 1, text: 'Hey, I saw your profile and I think we have a lot in common!', sentByMe: false, time: '3 days ago' },
            ],
            unread: 0
          },
        ])
        setSelectedConversation(1) // Select first conversation by default
        setLoading(false)
      }, 1000)
    }
  }, [router])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // In a real app, you would call your API to send the message
    // This is just for demo purposes
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [...conv.messages, {
            id: conv.messages.length + 1,
            text: message,
            sentByMe: true,
            time: 'Just now'
          }]
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setMessage('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  const currentConversation = conversations.find(conv => conv.id === selectedConversation)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Messages</h2>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`flex items-center p-4 border-b cursor-pointer transition hover:bg-gray-50 ${selectedConversation === conversation.id ? 'bg-red-50' : ''}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    <Image 
                      src={conversation.user.image}
                      alt={conversation.user.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                    {conversation.user.lastActive === 'Online' && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{conversation.user.name}</h3>
                      <span className="text-xs text-gray-500">
                        {conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].time : ''}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate w-40">
                        {conversation.messages.length > 0 ? 
                          (conversation.messages[conversation.messages.length - 1].sentByMe ? 'You: ' : '') + 
                          conversation.messages[conversation.messages.length - 1].text 
                          : 'No messages yet'}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Area */}
          {currentConversation ? (
            <div className="hidden md:flex flex-col w-2/3">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center">
                <Image 
                  src={currentConversation.user.image}
                  alt={currentConversation.user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-semibold">{currentConversation.user.name}</h3>
                  <p className="text-xs text-gray-500">
                    {currentConversation.user.lastActive === 'Online' ? 'Online' : `${currentConversation.user.lastActive} ${currentConversation.user.lastSeen}`}
                  </p>
                </div>
                <div className="ml-auto">
                  <button className="text-gray-600 hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4">
                {currentConversation.messages.map(msg => (
                  <div key={msg.id} className={`mb-4 flex ${msg.sentByMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sentByMe ? 'bg-red-100 text-red-900' : 'bg-gray-100'}`}>
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sentByMe ? 'text-red-500' : 'text-gray-500'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <form onSubmit={sendMessage} className="flex items-center">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow border rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button 
                    type="submit" 
                    className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center w-2/3">
              <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-600">Select a conversation</h3>
                <p className="mt-2 text-gray-500">Choose a conversation from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}