'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast' // Assuming you use react-hot-toast for notifications

// Import your RTK query mutation
import { useUpdateProfileMutation } from '@/lib/services/api';

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('photos')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://65.1.117.252:5002/"
  
  // Assuming this is how your redux state is structured
  const userProfile = useSelector((state) => state.user.data?.user)
  
  // RTK Query mutation hook for saving profile updates
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation()
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    height: '',
    country: '',
    state: '',
    city: '',
    annual_income: '',
    employed_in: '',
    highest_education: '',
    course: '',
    occupation: '',
    mother_tongue: '',
    religion: '',
    caste: '',
    marital_status: '',
    diet: '',
    living_with_family: '',
    description: '',
    heightInCm: 23,
    // Add other fields as needed
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
  
    if (!token) {
      router.replace('/create-profile')
      return
    }
    
    if (userProfile) {
      // Initialize form data from userProfile
      setFormData({
        fullName: userProfile.fullName || '',
        dob: userProfile.dob ? new Date(userProfile.dob).toISOString().split('T')[0] : '',
        height: userProfile.height || '',
        country: userProfile.country || '',
        state: userProfile.state || '',
        city: userProfile.city || '',
        annual_income: userProfile.annual_income || '',
        employed_in: userProfile.employed_in || '',
        highest_education: userProfile.highest_education || '',
        course: userProfile.course || '',
        occupation: userProfile.occupation || '',
        mother_tongue: userProfile.mother_tongue || '',
        religion: userProfile.religion || '',
        caste: userProfile.caste || '',
        marital_status: userProfile.marital_status || '',
        diet: userProfile.diet || '',
        living_with_family: userProfile.living_with_family || '',
        description: userProfile.description || '',
        heightInCm: userProfile.heightInCm || 23,
        // Add other fields as needed
      })
      setLoading(false)
    }
  }, [router, userProfile])
  
  const profileImage = userProfile?.profile_image?.[0]
    ? userProfile.profile_image[0].startsWith('http')
      ? userProfile.profile_image[0]
      : baseUrl + userProfile.profile_image[0]
    : "/images/default-profile.png"

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const toggleEditMode = () => {
    if (isEditing) {
      // If currently editing, cancel and reset form data
      setFormData({
        fullName: userProfile.fullName || '',
        dob: userProfile.dob ? new Date(userProfile.dob).toISOString().split('T')[0] : '',
        height: userProfile.height || '',
        country: userProfile.country || '',
        state: userProfile.state || '',
        city: userProfile.city || '',
        annual_income: userProfile.annual_income || '',
        employed_in: userProfile.employed_in || '',
        highest_education: userProfile.highest_education || '',
        course: userProfile.course || '',
        occupation: userProfile.occupation || '',
        mother_tongue: userProfile.mother_tongue || '',
        religion: userProfile.religion || '',
        caste: userProfile.caste || '',
        marital_status: userProfile.marital_status || '',
        diet: userProfile.diet || '',
        living_with_family: userProfile.living_with_family || '',
        description: userProfile.description || '',
        heightInCm: userProfile.heightInCm || 23,
        // Reset other fields as needed
      })
    }
    setIsEditing(!isEditing)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Uncomment when your RTK mutation is ready
      const response = await updateProfile(formData).unwrap()
      // console.log('Profile updated:', response)
      
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        {/* Cover Photo */}
        <div className="h-60 bg-gradient-to-r from-red-600 to-red-400 relative">
          <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col sm:flex-row items-end">
            <div className="relative h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <Image
                src={profileImage}
                alt={`${formData.fullName}'s profile`}
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>
            <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 sm:pb-2">
              <h1 className="text-2xl font-bold text-white">{formData.fullName}</h1>
              <p className="text-white opacity-90">
                {userProfile.dob && new Date().getFullYear() - new Date(userProfile.dob).getFullYear()} yrs, {formData.height} | {formData.city}, {formData.country}
              </p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end px-6 py-4 border-b">
          <button 
            onClick={toggleEditMode}
            className={`px-5 py-2 rounded-md transition flex items-center shadow-sm mr-2 ${
              isEditing 
                ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isEditing ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              )}
            </svg>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          
          {isEditing && (
            <button 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition flex items-center shadow-sm"
              disabled={isSaving}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          )}
        </div>
        
        {/* Tabs */}
        <div className="px-6 py-0 border-b">
          <div className="flex flex-wrap space-x-2 sm:space-x-6">
            <button 
              className={`py-3 px-1 font-medium text-sm sm:text-base transition-colors ${
                activeTab === 'photos' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
              onClick={() => setActiveTab('photos')}
            >
              Photos
            </button>
            <button 
              className={`py-3 px-1 font-medium text-sm sm:text-base transition-colors ${
                activeTab === 'about' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
              onClick={() => setActiveTab('about')}
            >
              About Me
            </button>
            <button 
              className={`py-3 px-1 font-medium text-sm sm:text-base transition-colors ${
                activeTab === 'details' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Personal Details
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'photos' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">My Photos</h3>
                <button className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                  </svg>
                  Upload New Photos
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userProfile.profile_image && userProfile.profile_image.length > 0 ? (
                  userProfile.profile_image.map((photo, index) => {
                    const photoUrl = photo.startsWith('http') ? photo : baseUrl + photo
                    return (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md group">
                        <Image
                          src={photoUrl}
                          alt={`Photo ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button className="bg-white p-2 rounded-full shadow-md mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="bg-white p-2 rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">No photos yet. Add some to make your profile stand out!</p>
                  </div>
                )}
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <button className="flex flex-col items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm text-gray-500 font-medium">Add Photo</span>
                  </button>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'about' && (
            <div>
              {isEditing ? (
                <form>
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 pt-2 border-t">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                      <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.occupation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="highest_education" className="block text-sm font-medium text-gray-700 mb-2">Highest Education</label>
                      <select
                        id="highest_education"
                        name="highest_education"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.highest_education}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Education</option>
                        <option value="High School">High School</option>
                        <option value="Bachelor's">Bachelor&apos;s</option>
                        <option value="Master's">Master&apos;s</option>
                        <option value="Doctorate">Doctorate</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">Course/Degree</label>
                      <input
                        type="text"
                        id="course"
                        name="course"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.course}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="annual_income" className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
                      <select
                        id="annual_income"
                        name="annual_income"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.annual_income}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Income Range</option>
                        <option value="Rs. 0 - 1 Lakh">Rs. 0 - 1 Lakh</option>
                        <option value="Rs. 1 - 2 Lakh">Rs. 1 - 2 Lakh</option>
                        <option value="Rs. 2 - 3 Lakh">Rs. 2 - 3 Lakh</option>
                        <option value="Rs. 3 - 4 Lakh">Rs. 3 - 4 Lakh</option>
                        <option value="Rs. 4 - 5 Lakh">Rs. 4 - 5 Lakh</option>
                        <option value="Rs. 5 - 7.5 Lakh">Rs. 5 - 7.5 Lakh</option>
                        <option value="Rs. 7.5 - 10 Lakh">Rs. 7.5 - 10 Lakh</option>
                        <option value="Rs. 10 - 15 Lakh">Rs. 10 - 15 Lakh</option>
                        <option value="Rs. 15 - 20 Lakh">Rs. 15 - 20 Lakh</option>
                        <option value="Rs. 20 - 30 Lakh">Rs. 20 - 30 Lakh</option>
                        <option value="Rs. 30 - 50 Lakh">Rs. 30 - 50 Lakh</option>
                        <option value="Rs. 50 Lakh - 1 Crore">Rs. 50 Lakh - 1 Crore</option>
                        <option value="Rs. 1 Crore & above">Rs. 1 Crore & above</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="employed_in" className="block text-sm font-medium text-gray-700 mb-2">Employed In</label>
                      <select
                        id="employed_in"
                        name="employed_in"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.employed_in}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Employment Type</option>
                        <option value="Private Sector">Private Sector</option>
                        <option value="Government/Public Sector">Government/Public Sector</option>
                        <option value="Self Employed">Self Employed</option>
                        <option value="Business/Entrepreneur">Business/Entrepreneur</option>
                        <option value="Not Working">Not Working</option>
                      </select>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">About Me</h3>
                  <p className="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">
                    {formData.description || "No description provided yet."}
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 pt-2 border-t">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Profession</p>
                      <p className="text-gray-800 font-medium">{formData.occupation || "Not specified"}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Education</p>
                      <p className="text-gray-800 font-medium">{formData.highest_education} {formData.course ? `in ${formData.course}` : ""}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Annual Income</p>
                      <p className="text-gray-800 font-medium">{formData.annual_income || "Not specified"}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Employed In</p>
                      <p className="text-gray-800 font-medium">{formData.employed_in || "Not specified"}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'details' && (
            <div>
              {isEditing ? (
                <form>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                      <input
                        type="text"
                        id="height"
                        name="height"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="e.g. 5'10''"
                      />
                    </div>
                    <div>
                      <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                      <select
                        id="marital_status"
                        name="marital_status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.marital_status}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                      <select
                        id="religion"
                        name="religion"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.religion}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Buddhist">Buddhist</option>
                        <option value="Jain">Jain</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="caste" className="block text-sm font-medium text-gray-700 mb-2">Caste</label>
                      <input
                        type="text"
                        id="caste"
                        name="caste"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.caste}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="mother_tongue" className="block text-sm font-medium text-gray-700 mb-2">Mother Tongue</label>
                      <input
                        type="text"
                        id="mother_tongue"
                        name="mother_tongue"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.mother_tongue}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-2">Diet Preference</label>
                      <select
                        id="diet"
                        name="diet"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.diet}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Diet</option>
                        <option value="Veg">Vegetarian</option>
                        <option value="Non-Veg">Non-Vegetarian</option>
                        <option value="Eggetarian">Eggetarian</option>
                        <option value="Jain">Jain</option>
                        <option value="Vegan">Vegan</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="living_with_family" className="block text-sm font-medium text-gray-700 mb-2">Living With Family</label>
                      <select
                        id="living_with_family"
                        name="living_with_family"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.living_with_family}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-4 mt-6 text-gray-800 pt-2 border-t">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Religion</p>
                        <p className="text-gray-800 font-medium">{formData.religion || "Not specified"}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Caste</p>
                        <p className="text-gray-800 font-medium">{formData.caste || "Not specified"}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Marital Status</p>
                        <p className="text-gray-800 font-medium">{formData.marital_status || "Not specified"}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Diet Preference</p>
                        <p className="text-gray-800 font-medium">
                          {formData.diet === "Veg" ? "Vegetarian" : 
                           formData.diet === "Non-Veg" ? "Non-Vegetarian" : 
                           formData.diet || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Living With Family</p>
                        <p className="text-gray-800 font-medium">{formData.living_with_family || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Location & Languages</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="text-gray-800 font-medium">
                          {[formData.city, formData.state, formData.country].filter(Boolean).join(', ') || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Mother Tongue</p>
                        <p className="text-gray-800 font-medium">{formData.mother_tongue || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4 mt-6 text-gray-800 pt-2 border-t">Basic Details</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Full Name</p>
                        <p className="text-gray-800 font-medium">{formData.fullName || "Not specified"}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Age</p>
                        <p className="text-gray-800 font-medium">
                          {formData.dob ? `${new Date().getFullYear() - new Date(formData.dob).getFullYear()} years` : "Not specified"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Height</p>
                        <p className="text-gray-800 font-medium">{formData.height || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}