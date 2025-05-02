'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/create-profile')
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <p>Checking authentication...</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome to Matrimony</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Example profiles section */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4">
                <div className="h-32 bg-gray-200 rounded-md mb-2"></div>
                <h2 className="text-lg font-medium">User Name {i + 1}</h2>
                <p className="text-sm text-gray-500">Some details</p>
              </div>
            ))}
          </div>
        </div>
        {/* Sidebar section for interactions */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Try updating your preferences</li>
            <li>Send more connection requests</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
