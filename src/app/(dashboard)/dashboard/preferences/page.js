// app/partner-preferences/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PartnerPreferencesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [preferences, setPreferences] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      // Fetch preferences from your API
      // This is mock data, replace with actual API call
      setTimeout(() => {
        setPreferences({
          ageRange: { min: 25, max: 32 },
          heightRange: { min: "5'0\"", max: "5'8\"" },
          religion: 'Hindu',
          caste: 'Any',
          maritalStatus: 'Never Married',
          education: 'Bachelors or higher',
          profession: ['IT Professional', 'Doctor', 'Engineer', 'Business'],
          location: 'Delhi NCR',
          diet: 'Doesn\'t matter',
          smoking: 'Never',
          drinking: 'Occasional is fine',
          incomeRange: 'Above 8 LPA',
          aboutPartner: 'Looking for someone who is kind, family-oriented, and has good values. Education and career are important, but so is having a good sense of humor and enjoying life.'
        })
        setLoading(false)
      }, 1000)
    }
  }, [router])

  const handleSave = () => {
    // In a real app, you would send the updated preferences to your API
    // This is just for demo purposes
    setIsEditing(false)
    // Show success message or notification
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading preferences...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-red-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Partner Preferences</h1>
          <button 
            className={`px-4 py-2 rounded-md transition ${isEditing ? 'bg-white text-red-600' : 'bg-red-700 text-white hover:bg-red-800'}`}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? 'Save Changes' : 'Edit Preferences'}
          </button>
        </div>
        
        {/* Preferences Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Basic Info Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      value={preferences.ageRange.min}
                      onChange={(e) => setPreferences({...preferences, ageRange: {...preferences.ageRange, min: e.target.value}})}
                      className="w-20 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <span>to</span>
                    <input 
                      type="number" 
                      value={preferences.ageRange.max}
                      onChange={(e) => setPreferences({...preferences, ageRange: {...preferences.ageRange, max: e.target.value}})}
                      className="w-20 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <span>years</span>
                  </div>
                ) : (
                  <p className="text-gray-800">{preferences.ageRange.min} to {preferences.ageRange.max} years</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Height Range</label>
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <select
                      value={preferences.heightRange.min}
                      onChange={(e) => setPreferences({...preferences, heightRange: {...preferences.heightRange, min: e.target.value}})}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option>4'6"</option>
                      <option>4'8"</option>
                      <option>5'0"</option>
                      <option>5'2"</option>
                      <option>5'4"</option>
                      <option>5'6"</option>
                    </select>
                    <span>to</span>
                    <select
                      value={preferences.heightRange.max}
                      onChange={(e) => setPreferences({...preferences, heightRange: {...preferences.heightRange, max: e.target.value}})}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option>5'4"</option>
                      <option>5'6"</option>
                      <option>5'8"</option>
                      <option>5'10"</option>
                      <option>6'0"</option>
                      <option>6'2"</option>
                    </select>
                  </div>
                ) : (
                  <p className="text-gray-800">{preferences.heightRange.min} to {preferences.heightRange.max}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                {isEditing ? (
                  <select
                    value={preferences.religion}
                    onChange={(e) => setPreferences({...preferences, religion: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Hindu</option>
                    <option>Muslim</option>
                    <option>Christian</option>
                    <option>Sikh</option>
                    <option>Jain</option>
                    <option>Buddhist</option>
                    <option>Any</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.religion}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                {isEditing ? (
                  <select
                    value={preferences.caste}
                    onChange={(e) => setPreferences({...preferences, caste: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Brahmin</option>
                    <option>Kshatriya</option>
                    <option>Vaishya</option>
                    <option>Other</option>
                    <option>Any</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.caste}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                {isEditing ? (
                  <select
                    value={preferences.maritalStatus}
                    onChange={(e) => setPreferences({...preferences, maritalStatus: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Never Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                    <option>Separated</option>
                    <option>Any</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.maritalStatus}</p>
                )}
              </div>
            </div>
            
            {/* Professional Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Professional Preferences</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                {isEditing ? (
                  <select
                    value={preferences.education}
                    onChange={(e) => setPreferences({...preferences, education: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>High School</option>
                    <option>Diploma</option>
                    <option>Bachelors or higher</option>
                    <option>Masters or higher</option>
                    <option>Doctorate</option>
                    <option>Any</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.education}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="prof1" className="mr-2" checked={preferences.profession.includes('IT Professional')} />
                      <label htmlFor="prof1">IT Professional</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="prof2" className="mr-2" checked={preferences.profession.includes('Doctor')} />
                      <label htmlFor="prof2">Doctor</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="prof3" className="mr-2" checked={preferences.profession.includes('Engineer')} />
                      <label htmlFor="prof3">Engineer</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="prof4" className="mr-2" checked={preferences.profession.includes('Business')} />
                      <label htmlFor="prof4">Business</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="prof5" className="mr-2" />
                      <label htmlFor="prof5">Any</label>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800">{preferences.profession.join(', ')}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                {isEditing ? (
                  <select
                    value={preferences.location}
                    onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Delhi NCR</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                    <option>Hyderabad</option>
                    <option>Anywhere in India</option>
                    <option>NRI</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.location}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Income Range</label>
                {isEditing ? (
                  <select
                    value={preferences.incomeRange}
                    onChange={(e) => setPreferences({...preferences, incomeRange: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Any</option>
                    <option>Above 5 LPA</option>
                    <option>Above 8 LPA</option>
                    <option>Above 12 LPA</option>
                    <option>Above 16 LPA</option>
                    <option>Above 20 LPA</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.incomeRange}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Lifestyle Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Lifestyle Preferences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diet Preference</label>
                {isEditing ? (
                  <select
                    value={preferences.diet}
                    onChange={(e) => setPreferences({...preferences, diet: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>Eggetarian</option>
                    <option>Doesn't matter</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.diet}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Smoking</label>
                {isEditing ? (
                  <select
                    value={preferences.smoking}
                    onChange={(e) => setPreferences({...preferences, smoking: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Never</option>
                    <option>Occasionally is fine</option>
                    <option>Doesn't matter</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.smoking}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drinking</label>
                {isEditing ? (
                  <select
                    value={preferences.drinking}
                    onChange={(e) => setPreferences({...preferences, drinking: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Never</option>
                    <option>Occasional is fine</option>
                    <option>Doesn't matter</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{preferences.drinking}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* About Partner Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">About Your Ideal Partner</h2>
            
            <div>
              {isEditing ? (
                <textarea
                  value={preferences.aboutPartner}
                  onChange={(e) => setPreferences({...preferences, aboutPartner: e.target.value})}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={5}
                />
              ) : (
                <p className="text-gray-800 whitespace-pre-line">{preferences.aboutPartner}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}