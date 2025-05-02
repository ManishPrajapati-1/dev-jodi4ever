// app/settings/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('account')

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
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-red-600 text-white">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 border-r">
            <nav className="p-4">
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeSection === 'account' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('account')}
              >
                Account Settings
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeSection === 'privacy' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('privacy')}
              >
                Privacy Settings
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeSection === 'notifications' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('notifications')}
              >
                Notification Settings
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeSection === 'premium' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('premium')}
              >
                Premium Membership
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeSection === 'help' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('help')}
              >
                Help & Support
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeSection === 'about' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('about')}
              >
                About Us
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeSection === 'faq' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('faq')}
              >
                FAQs
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeSection === 'policy' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('policy')}
              >
                Privacy Policy
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md mb-4 ${activeSection === 'delete' ? 'bg-red-100 text-red-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSection('delete')}
              >
                Delete Account
              </button>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">App Version: 1.0.0</p>
                <button className="text-sm text-red-600 hover:text-red-800">
                  Logout
                </button>
              </div>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="md:w-3/4 p-6">
            {activeSection === 'account' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          value="user@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          value="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Change Password</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input 
                          type="password" 
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input 
                          type="password" 
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    
                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                      Update Password
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Connected Accounts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <svg className="h-8 w-8 text-[#4267B2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          <div className="ml-3">
                            <p className="font-medium">Facebook</p>
                            <p className="text-sm text-gray-600">Not Connected</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          Connect
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <svg className="h-8 w-8 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                          <div className="ml-3">
                            <p className="font-medium">Twitter</p>
                            <p className="text-sm text-gray-600">Not Connected</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          Connect
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <svg className="h-8 w-8 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          <div className="ml-3">
                            <p className="font-medium">LinkedIn</p>
                            <p className="text-sm text-gray-600">Not Connected</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'privacy' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Profile Visibility</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Who can see my profile?</p>
                          <p className="text-sm text-gray-600">Control who can view your profile details</p>
                        </div>
                        <select className="border rounded-md px-3 py-2">
                          <option>All Members</option>
                          <option>Members I Like</option>
                          <option>Premium Members Only</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show my online status</p>
                          <p className="text-sm text-gray-600">Let others know when you're online</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show when I last visited someone's profile</p>
                          <p className="text-sm text-gray-600">Let others know when you viewed their profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Photo Privacy</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Who can see my photos?</p>
                          <p className="text-sm text-gray-600">Control who can view your photo gallery</p>
                        </div>
                        <select className="border rounded-md px-3 py-2">
                          <option>All Members</option>
                          <option>Connected Members Only</option>
                          <option>Nobody</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Blocked Users</h3>
                    <p className="text-sm text-gray-600 mb-3">You haven't blocked any users yet.</p>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Manage Blocked Users
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Matches</p>
                          <p className="text-sm text-gray-600">Get notified when you have new matches</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Messages</p>
                          <p className="text-sm text-gray-600">Get notified when you receive new messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Profile Views</p>
                          <p className="text-sm text-gray-600">Get notified when someone views your profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Special Offers</p>
                          <p className="text-sm text-gray-600">Receive promotional emails and special offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Push Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable Push Notifications</p>
                          <p className="text-sm text-gray-600">Receive notifications on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'premium' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Premium Membership</h2>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-yellow-800">You are on a Free Plan</h3>
                      <p className="text-yellow-700 mt-1">Upgrade to Premium to unlock all features and get unlimited matches.</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-4 text-center">
                      <h3 className="text-lg font-semibold">Basic</h3>
                      <p className="text-gray-600 text-sm">Free</p>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Create Profile
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Limited Matches
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Basic Search
                        </li>
                        <li className="flex items-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Advanced Filters
                        </li>
                        <li className="flex items-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          See Who Likes You
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 border-t text-center">
                      <p className="text-sm text-gray-600 mb-2">Current Plan</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden border-red-200 shadow-md relative">
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                    <div className="bg-red-600 p-4 text-center text-white">
                      <h3 className="text-lg font-semibold">Premium</h3>
                      <p className="text-white text-opacity-90 text-sm">₹999/month</p>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          All Basic Features
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Unlimited Matches
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Advanced Filters
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          See Who Likes You
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Priority Support
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 border-t">
                      <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-4 text-center">
                      <h3 className="text-lg font-semibold">Platinum</h3>
                      <p className="text-gray-600 text-sm">₹1,999/month</p>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          All Premium Features
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Profile Boost
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Read Receipts
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Premium Matchmaking
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          VIP Support
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 border-t">
                      <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'help' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Help & Support</h2>
                
                <div className="space-y-6">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-medium">Contact Support</h3>
                    </div>
                    <div className="p-4">
                      <p className="mb-4">If you need assistance or have any questions, our support team is here to help.</p>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>support@jodibanao.com</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>+91 1234 567 890</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Send us a message</h4>
                        <textarea 
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          rows={4}
                          placeholder="Type your message here..."
                        ></textarea>
                        <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-medium">Help Topics</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <button className="w-full text-left p-3 border rounded-md hover:bg-gray-50 transition flex justify-between items-center">
                          <span>Account Issues</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="w-full text-left p-3 border rounded-md hover:bg-gray-50 transition flex justify-between items-center">
                          <span>Subscription & Billing</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="w-full text-left p-3 border rounded-md hover:bg-gray-50 transition flex justify-between items-center">
                          <span>Messaging & Connections</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="w-full text-left p-3 border rounded-md hover:bg-gray-50 transition flex justify-between items-center">
                          <span>Profile Setup & Preferences</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="w-full text-left p-3 border rounded-md hover:bg-gray-50 transition flex justify-between items-center">
                          <span>Privacy & Safety</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'about' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">About Us</h2>
                
                <div className="prose max-w-none">
                  <p>Jodi Banao is India's premier matrimonial service dedicated to helping individuals find their perfect life partner. Founded in 2023, we have successfully helped thousands of people find love and companionship.</p>
                  
                  <h3 className="mt-6">Our Mission</h3>
                  <p>Our mission is to make the matrimonial journey seamless, safe, and successful. We believe in the power of meaningful connections and are committed to bringing people together based on compatibility, shared values, and mutual interests.</p>
                  
                  <h3 className="mt-6">What Makes Us Different</h3>
                  <ul>
                    <li>Advanced matching algorithms that consider multiple aspects of compatibility</li>
                    <li>Verified profiles with strict verification processes</li>
                    <li>Privacy-focused approach to matrimonial searches</li>
                    <li>User-friendly interface and seamless communication tools</li>
                    <li>Dedicated customer support available 7 days a week</li>
                  </ul>
                  
                  <h3 className="mt-6">Our Team</h3>
                  <p>Our team consists of dedicated professionals with expertise in technology, psychology, and customer service. We are passionate about creating meaningful connections and helping people find their life partners.</p>
                  
                  <h3 className="mt-6">Contact Information</h3>
                  <p>
                    Jodi Banao Matrimonial Services Pvt. Ltd.<br />
                    123 Connect Road, Delhi, 110001<br />
                    Email: info@jodibanao.com<br />
                    Phone: +91 1234 567 890
                  </p>
                </div>
              </div>
            )}
            
            {activeSection === 'faq' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  <div className="border rounded-md overflow-hidden">
                    <button className="w-full p-4 text-left font-medium flex justify-between items-center bg-gray-50">
                      <span>How do I create a profile?</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="p-4 border-t">
                      <p>To create a profile, click on the "Sign Up" button on the homepage. You'll need to provide some basic information, upload photos, and complete your profile details. The more comprehensive your profile, the better matches you'll receive.</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <button className="w-full p-4 text-left font-medium flex justify-between items-center bg-gray-50">
                      <span>Is my information secure?</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="p-4 border-t">
                      <p>Yes, we take data security and privacy very seriously. All your personal information is encrypted and stored securely. We have strict privacy controls in place, and you can choose what information is visible to other users.</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <button className="w-full p-4 text-left font-medium flex justify-between items-center bg-gray-50">
                      <span>How does the matching system work?</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="p-4 border-t">
                      <p>Our matching system uses advanced algorithms that consider multiple factors including your preferences, interests, values, and compatibility parameters. We analyze these factors to suggest potential matches that align with your requirements and preferences.</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <button className="w-full p-4 text-left font-medium flex justify-between items-center bg-gray-50">
                      <span>What are the benefits of a premium membership?</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="p-4 border-t">
                      <p>Premium membership offers several advantages, including unlimited messaging, advanced search filters, profile visibility boosts, seeing who's interested in you, and priority customer support. Premium members generally have a higher success rate in finding their match.</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <button className="w-full p-4 text-left font-medium flex justify-between items-center bg-gray-50">
                      <span>Can I delete my account?</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="p-4 border-t">
                      <p>Yes, you can delete your account at any time. Go to Settings and select "Delete Account" from the menu. Keep in mind that this action is permanent and all your data will be permanently removed from our system.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'policy' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Privacy Policy</h2>
                
                <div className="prose max-w-none">
                  <p>Last Updated: May 1, 2025</p>
                  
                  <p className="mt-4">At Jodi Banao, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our matrimonial service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.</p>
                  
                  <h3 className="mt-6">Information We Collect</h3>
                  <p>We collect information that you provide directly to us, including:</p>
                  <ul>
                    <li>Personal details such as name, age, gender, height, etc.</li>
                    <li>Contact information including email address, phone number, and location</li>
                    <li>Profile information such as education, profession, family details, and preferences</li>
                    <li>Photos and multimedia content you upload</li>
                    <li>Communication data with other users</li>
                  </ul>
                  
                  <h3 className="mt-6">How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Create and manage your account</li>
                    <li>Provide and improve our services</li>
                    <li>Match you with potential partners based on your preferences</li>
                    <li>Communicate with you about updates, features, and offers</li>
                    <li>Ensure the safety and security of our platform</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                  
                  <h3 className="mt-6">Data Security</h3>
                  <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                  
                  <h3 className="mt-6">Third-Party Disclosure</h3>
                  <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
                  
                  <h3 className="mt-6">Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access and receive a copy of your data</li>
                    <li>Rectify or update your personal information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Data portability</li>
                  </ul>
                  
                  <h3 className="mt-6">Changes to This Privacy Policy</h3>
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
                  
                  <h3 className="mt-6">Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                  <p>
                    Email: privacy@jodibanao.com<br />
                    Phone: +91 1234 567 890
                  </p>
                </div>
              </div>
            )}
            
            {activeSection === 'delete' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Delete Account</h2>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-red-800">Warning: Deleting Your Account</h3>
                      <p className="text-red-700 mt-1">This action is permanent and cannot be undone. All your data, including profile information, matches, and messages will be permanently deleted.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Before you go...</h3>
                  <p className="mb-4">We're sorry to see you leave. Would you mind telling us why you're deleting your account? This will help us improve our service.</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="reason1" name="delete_reason" className="mr-2" />
                      <label htmlFor="reason1">I found my match through Jodi Banao</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="reason2" name="delete_reason" className="mr-2" />
                      <label htmlFor="reason2">I'm taking a break from searching</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="reason3" name="delete_reason" className="mr-2" />
                      <label htmlFor="reason3">I'm not getting good matches</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="reason4" name="delete_reason" className="mr-2" />
                      <label htmlFor="reason4">I found a match elsewhere</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="reason5" name="delete_reason" className="mr-2" />
                      <label htmlFor="reason5">Other reason</label>
                    </div>
                  </div>
                  
                  <textarea 
                    className="w-full mt-4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    placeholder="Additional comments (optional)"
                  ></textarea>
                  
                  <div className="mt-6">
                    <p className="mb-4 font-medium">Please enter your password to confirm account deletion:</p>
                    <input 
                      type="password" 
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter your password"
                    />
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                      Cancel
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}