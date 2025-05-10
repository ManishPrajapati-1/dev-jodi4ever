'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { 
  Upload, 
  Edit2, 
  Save,
  X,
  Camera,
  Eye,
  Trash2,
  Plus,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  User,
  Users,
  Utensils,
  Languages,
  Home,
  Building,
  Check,
  Cake,
  Ruler,
  Globe,
  Loader2
} from 'lucide-react';

// Import your RTK query mutation
import { useUpdateProfileMutation } from '@/lib/services/api';

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('photos')
  const [isUploading, setIsUploading] = useState(false)
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
      })
      setLoading(false)
    }
  }, [router, userProfile])
  
  const profileImage = userProfile?.profile_image?.[0]
    ? userProfile.profile_image[0].startsWith('http')
      ? userProfile.profile_image[0]
      : baseUrl + userProfile.profile_image[0]
    : "/images/default-user.jpg"
  
  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "height" && { heightInCm: getSelectedCm(value) })
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
      })
    }
    setIsEditing(!isEditing)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Call API to update profile
      const response = await updateProfile(formData).unwrap()
      toast.success('Profile updated successfully!', {
        icon: <Check className="text-green-500" />,
        duration: 3000
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    }
  }

  const getSelectedCm = (heightString) => {
    const match = heightString.match(/(\d+)'(\d+)"/);
    if (match) {
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      return (feet * 30.48 + inches * 2.54).toFixed(2);
    }
    return "0.0";
  };

  // Mock upload photo function (to be implemented)
  const handleUploadPhoto = () => {
    setIsUploading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Photo uploaded successfully!');
      setIsUploading(false);
    }, 1500);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-red-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading your profile...</p>
          <p className="text-gray-500 text-sm mt-2">This will just take a moment</p>
        </div>
      </div>
    )
  }

  // Create Tab Button component
  const TabButton = ({ id, label, isActive, onClick }) => (
    <button 
      className={`py-3 px-4 font-medium transition-colors relative ${
        isActive 
          ? 'text-red-600' 
          : 'text-gray-600 hover:text-red-600'
      }`}
      onClick={() => onClick(id)}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
      )}
    </button>
  );

  // Create FormField component for consistent styling
  const FormField = ({ label, id, type = "text", name, value, onChange, options, placeholder, className = "" }) => (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {type === "select" ? (
        <select
          id={id}
          name={name}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows="4"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  // Create InfoItem component for display mode
  const InfoItem = ({ icon, label, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-1">
        {icon}
        <p className="text-sm text-gray-500 ml-2">{label}</p>
      </div>
      <p className="text-gray-800 font-medium pl-7">{value || "Not specified"}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        <Toaster 
          position="bottom-right"
          toastOptions={{
            success: {
              style: {
                background: '#f0fdf4',
                border: '1px solid #d1fae5',
                padding: '16px',
                color: '#065f46',
              },
            },
            error: {
              style: {
                background: '#fef2f2',
                border: '1px solid #fee2e2',
                padding: '16px',
                color: '#991b1b',
              },
            },
          }}
        />

        {/* Page Header - Back to Dashboard Link */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
        
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-60 bg-gradient-to-r from-red-600 to-red-400 relative">
            <div className="absolute top-4 right-4">
              <button className="bg-white/20 backdrop-blur-sm text-white rounded-lg px-3 py-2 hover:bg-white/30 transition-colors flex items-center">
                <Camera size={18} className="mr-2" />
                <span className="font-medium">Change Cover</span>
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col sm:flex-row items-end">
              <div className="relative h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white group">
                <Image
                  src={profileImage}
                  alt={`${formData.fullName}'s profile`}
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white p-2 rounded-full">
                    <Camera size={18} className="text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 sm:pb-2">
                <h1 className="text-2xl font-bold text-white">{formData.fullName}</h1>
                <p className="text-white/90 font-medium flex flex-wrap items-center gap-2 mt-1">
                  {formData.dob && (
                    <span className="flex items-center">
                      <Cake size={14} className="mr-1.5" /> 
                      {calculateAge(formData.dob)} years
                    </span>
                  )}
                  {formData.height && (
                    <span className="flex items-center">
                      <Ruler size={14} className="mr-1.5" /> 
                      {formData.height}
                    </span>
                  )}
                  {formData.city && (
                    <span className="flex items-center">
                      <MapPin size={14} className="mr-1.5" /> 
                      {[formData.city, formData.country].filter(Boolean).join(', ')}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end px-6 py-4 border-b">
            <button 
              onClick={toggleEditMode}
              className={`px-5 py-2.5 rounded-lg transition flex items-center shadow-sm mr-2 ${
                isEditing 
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              disabled={isSaving}
            >
              {isEditing ? (
                <>
                  <X size={18} className="mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit2 size={18} className="mr-2" />
                  Edit Profile
                </>
              )}
            </button>
            
            {isEditing && (
              <button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition flex items-center shadow-sm"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            )}
          </div>
          
          {/* Tabs */}
          <div className="px-6 py-0 border-b">
            <div className="flex overflow-x-auto scrollbar-hide">
              <TabButton 
                id="photos" 
                label="Photos" 
                isActive={activeTab === 'photos'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="about" 
                label="About Me" 
                isActive={activeTab === 'about'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="details" 
                label="Personal Details" 
                isActive={activeTab === 'details'} 
                onClick={setActiveTab} 
              />
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Camera size={20} className="mr-2 text-red-600" />
                    My Photos
                  </h3>
                  <button 
                    onClick={handleUploadPhoto}
                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center px-4 py-2 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={18} className="mr-2" />
                        Upload New Photos
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userProfile.profile_image && userProfile.profile_image.length > 0 ? (
                    userProfile.profile_image.map((photo, index) => {
                      const photoUrl = photo.startsWith('http') ? photo : baseUrl + photo
                      return (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-100 group">
                          <Image
                            src={photoUrl}
                            alt={`Photo ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="bg-white p-2 rounded-full shadow-md" title="View photo">
                                <Eye size={18} className="text-gray-700" />
                              </button>
                              <button className="bg-white p-2 rounded-full shadow-md" title="Delete photo">
                                <Trash2 size={18} className="text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                      <Camera size={48} className="text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 mb-3">No photos yet. Add some to make your profile stand out!</p>
                      <button 
                        onClick={handleUploadPhoto}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center shadow-sm"
                      >
                        <Upload size={16} className="mr-2" />
                        Upload Your First Photo
                      </button>
                    </div>
                  )}
                  <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                    <button className="flex flex-col items-center justify-center p-4">
                      <Plus size={28} className="text-gray-500 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">Add Photo</span>
                    </button>
                  </div>
                </div>
              </>
            )}
            
            {/* About Me Tab */}
            {activeTab === 'about' && (
              <div>
                {isEditing ? (
                  <form>
                    <div className="mb-6">
                      <FormField
                        label="About Me"
                        id="description"
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself, your interests, and what you're looking for in a partner..."
                      />
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 pt-6 border-t flex items-center">
                      <Briefcase size={20} className="mr-2 text-red-600" />
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                      <FormField
                        label="Profession"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        placeholder="Your current profession"
                      />
                      <FormField
                        label="Highest Education"
                        id="highest_education"
                        type="select"
                        name="highest_education"
                        value={formData.highest_education}
                        onChange={handleInputChange}
                        options={[
                          { value: "High School", label: "High School" },
                          { value: "Bachelor's", label: "Bachelor's" },
                          { value: "Master's", label: "Master's" },
                          { value: "Doctorate", label: "Doctorate" }
                        ]}
                      />
                      <FormField
                        label="Course/Degree"
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        placeholder="Your field of study"
                      />
                      <FormField
                        label="Annual Income"
                        id="annual_income"
                        type="select"
                        name="annual_income"
                        value={formData.annual_income}
                        onChange={handleInputChange}
                        options={[
                          { value: "Rs. 0 - 1 Lakh", label: "Rs. 0 - 1 Lakh" },
                          { value: "Rs. 1 - 2 Lakh", label: "Rs. 1 - 2 Lakh" },
                          { value: "Rs. 2 - 3 Lakh", label: "Rs. 2 - 3 Lakh" },
                          { value: "Rs. 3 - 5 Lakh", label: "Rs. 3 - 5 Lakh" },
                          { value: "Rs. 5 - 7.5 Lakh", label: "Rs. 5 - 7.5 Lakh" },
                          { value: "Rs. 7.5 - 10 Lakh", label: "Rs. 7.5 - 10 Lakh" },
                          { value: "Rs. 10 - 15 Lakh", label: "Rs. 10 - 15 Lakh" },
                          { value: "Rs. 15 - 20 Lakh", label: "Rs. 15 - 20 Lakh" },
                          { value: "Rs. 20 - 30 Lakh", label: "Rs. 20 - 30 Lakh" },
                          { value: "Rs. 30 - 50 Lakh", label: "Rs. 30 - 50 Lakh" },
                          { value: "Rs. 50 Lakh - 1 Crore", label: "Rs. 50 Lakh - 1 Crore" },
                          { value: "Rs. 1 Crore & above", label: "Rs. 1 Crore & above" }
                        ]}
                      />
                      <FormField
                        label="Employed In"
                        id="employed_in"
                        type="select"
                        name="employed_in"
                        value={formData.employed_in}
                        onChange={handleInputChange}
                        options={[
                          { value: "Private Sector", label: "Private Sector" },
                          { value: "Government/Public Sector", label: "Government/Public Sector" },
                          { value: "Self Employed", label: "Self Employed" },
                          { value: "Business/Entrepreneur", label: "Business/Entrepreneur" },
                          { value: "Not Working", label: "Not Working" }
                        ]}
                      />
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                        <User size={20} className="mr-2 text-red-600" />
                        About Me
                      </h3>
                      {formData.description ? (
                        <div className="bg-gray-50 p-5 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {formData.description}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 border-dashed text-center">
                          <p className="text-gray-500">
                            You haven&apos;t added any description yet. Click the &quot;Edit Profile&quot; button to add information about yourself.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-5 text-gray-800 pt-4 border-t flex items-center">
                      <Briefcase size={20} className="mr-2 text-red-600" />
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InfoItem 
                        icon={<Briefcase size={18} className="text-gray-500" />}
                        label="Profession"
                        value={formData.occupation}
                      />
                      <InfoItem 
                        icon={<GraduationCap size={18} className="text-gray-500" />}
                        label="Education"
                        value={formData.highest_education ? `${formData.highest_education}${formData.course ? ` in ${formData.course}` : ""}` : null}
                      />
                      <InfoItem 
                        icon={<DollarSign size={18} className="text-gray-500" />}
                        label="Annual Income"
                        value={formData.annual_income}
                      />
                      <InfoItem 
                        icon={<Building size={18} className="text-gray-500" />}
                        label="Employed In"
                        value={formData.employed_in}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* Personal Details Tab */}
            {activeTab === 'details' && (
              <div>
                {isEditing ? (
                  <form>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                      <User size={20} className="mr-2 text-red-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                      <FormField
                        label="Full Name"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                      <FormField
                        label="Date of Birth"
                        id="dob"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                      <FormField
                        label="Height"
                        id="height"
                        type="select"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        options={Array.from({ length: 37 }, (_, i) => {
                          const feet = Math.floor(i / 12) + 4; // Start at 4 feet
                          const inches = i % 12;
                          const cm = (feet * 30.48 + inches * 2.54).toFixed(2);
                          return {
                            value: `${feet}'${inches}" (${cm} cm)`,
                            label: `${feet}'${inches}" (${cm} cm)`
                          };
                        })}
                      />
                      <FormField
                        label="Marital Status"
                        id="marital_status"
                        type="select"
                        name="marital_status"
                        value={formData.marital_status}
                        onChange={handleInputChange}
                        options={[
                          { value: "Single", label: "Single" },
                          { value: "Divorced", label: "Divorced" },
                          { value: "Widowed", label: "Widowed" },
                          { value: "Separated", label: "Separated" }
                        ]}
                      />
                      <FormField
                        label="Religion"
                        id="religion"
                        type="select"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        options={[
                          { value: "Hindu", label: "Hindu" },
                          { value: "Muslim", label: "Muslim" },
                          { value: "Christian", label: "Christian" },
                          { value: "Sikh", label: "Sikh" },
                          { value: "Buddhist", label: "Buddhist" },
                          { value: "Jain", label: "Jain" },
                          { value: "Other", label: "Other" }
                        ]}
                      />
                      <FormField
                        label="Caste"
                        id="caste"
                        name="caste"
                        value={formData.caste}
                        onChange={handleInputChange}
                      />
                      <FormField
                        label="Mother Tongue"
                        id="mother_tongue"
                        name="mother_tongue"
                        value={formData.mother_tongue}
                        onChange={handleInputChange}
                      />
                      <FormField
                        label="Diet Preference"
                        id="diet"
                        type="select"
                        name="diet"
                        value={formData.diet}
                        onChange={handleInputChange}
                        options={[
                          { value: "Veg", label: "Vegetarian" },
                          { value: "Non-Veg", label: "Non-Vegetarian" },
                          { value: "Eggetarian", label: "Eggetarian" },
                          { value: "Jain", label: "Jain" },
                          { value: "Vegan", label: "Vegan" }
                        ]}
                      />
                      <FormField
                        label="Living With Family"
                        id="living_with_family"
                        type="select"
                        name="living_with_family"
                        value={formData.living_with_family}
                        onChange={handleInputChange}
                        options={[
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" }
                        ]}
                      />
                    </div>

                    <h3 className="text-lg font-semibold mb-4 mt-6 text-gray-800 pt-5 border-t flex items-center">
                      <Globe size={20} className="mr-2 text-red-600" />
                      Location
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                      <FormField
                        label="Country"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                      <FormField
                        label="State"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                      <FormField
                        label="City"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-5 text-gray-800 flex items-center">
                        <User size={20} className="mr-2 text-red-600" />
                        Personal Information
                      </h3>
                      <div className="space-y-4">
                        <InfoItem 
                          icon={<Users size={18} className="text-gray-500" />}
                          label="Religion"
                          value={formData.religion}
                        />
                        <InfoItem 
                          icon={<Users size={18} className="text-gray-500" />}
                          label="Caste"
                          value={formData.caste}
                        />
                        <InfoItem 
                          icon={<Users size={18} className="text-gray-500" />}
                          label="Marital Status"
                          value={formData.marital_status}
                        />
                        <InfoItem 
                          icon={<Utensils size={18} className="text-gray-500" />}
                          label="Diet Preference"
                          value={
                            formData.diet === "Veg" ? "Vegetarian" : 
                            formData.diet === "Non-Veg" ? "Non-Vegetarian" : 
                            formData.diet
                          }
                        />
                        <InfoItem 
                          icon={<Home size={18} className="text-gray-500" />}
                          label="Living With Family"
                          value={formData.living_with_family}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-5 text-gray-800 flex items-center">
                        <Globe size={20} className="mr-2 text-red-600" />
                        Location & Languages
                      </h3>
                      <div className="space-y-4">
                        <InfoItem 
                          icon={<MapPin size={18} className="text-gray-500" />}
                          label="Location"
                          value={[formData.city, formData.state, formData.country].filter(Boolean).join(', ')}
                        />
                        <InfoItem 
                          icon={<Languages size={18} className="text-gray-500" />}
                          label="Mother Tongue"
                          value={formData.mother_tongue}
                        />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-4 mt-8 text-gray-800 pt-5 border-t flex items-center">
                        <User size={20} className="mr-2 text-red-600" />
                        Basic Details
                      </h3>
                      <div className="space-y-4">
                        <InfoItem 
                          icon={<User size={18} className="text-gray-500" />}
                          label="Full Name"
                          value={formData.fullName}
                        />
                        <InfoItem 
                          icon={<Cake size={18} className="text-gray-500" />}
                          label="Date of Birth"
                          value={
                            formData.dob 
                              ? `${new Date(formData.dob).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})} (${calculateAge(formData.dob)} years)`
                              : null
                          }
                        />
                        <InfoItem 
                          icon={<Ruler size={18} className="text-gray-500" />}
                          label="Height"
                          value={formData.height}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Tips Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Profile Completion Tips
          </h3>
          <p className="text-gray-600 mb-4">Complete your profile to increase your chances of finding a perfect match. Here are some tips:</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Upload at least 3-4 clear photos to showcase yourself better
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Write a detailed description about yourself and what you&apos;re looking for
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Complete all personal details for better matching
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Regularly update your profile to appear in recent matches
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}