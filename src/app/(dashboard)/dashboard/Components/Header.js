"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetUserProfileQuery, useGetNotificationsQuery } from "@/lib/services/api";
import { updateUserProfile } from "@/lib/features/user/userSlice";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: userProfile, isLoading, isError } = useGetUserProfileQuery();
  const { data: notificationData } = useGetNotificationsQuery();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://65.1.117.252:5002/";
  const profileMenuRef = useRef(null);

  // Get unread notifications count
  const unreadCount = notificationData?.data?.filter(notification => !notification.isRead)?.length || 0;

  useEffect(() => {
    if (userProfile && !isLoading && !isError) {
      dispatch(updateUserProfile(userProfile?.data?.user));
    }
  }, [userProfile, dispatch, isLoading, isError]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/create-profile');
    }
  }, [router]);
  
  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  if (isLoading) return <div className="w-full h-16 bg-white animate-pulse"></div>;
  if (isError) return <div className="w-full h-16 bg-white flex items-center justify-center text-red-500"></div>;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    // Close profile menu when opening mobile menu
    if (!isMobileMenuOpen) setProfileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/');
  }

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const profileImage = userProfile?.data?.user?.profile_image?.length > 0
    ? baseUrl + userProfile.data.user.profile_image[0]
    : "/images/default-user.jpg";

  const navLinks = [
    { href: "/dashboard", label: "Home" },
    { href: "/dashboard/activity", label: "Activity" },
    { href: "/dashboard/preferences", label: "Partner Preferences" }
  ];

  const profileMenuItems = [
    { 
      href: "/dashboard/profile", 
      label: "My Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      href: "/settings", 
      label: "Settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      href: "/logout", 
      label: "Logout",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )
    }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/wedding.png"
              alt="Jodi Banao Logo"
              width={100} 
              height={100} 
              className="w-14 md:w-16 transition-transform hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-red-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* User Actions Section */}
          <div className="flex items-center space-x-6">
            {/* Favourites Link */}
            <Link href="/dashboard/favourites" className="text-gray-700 hover:text-red-600 focus:outline-none transition-colors duration-200 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Favorites"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Notifications Link */}
            <Link href="/dashboard/notifications" className="text-gray-700 hover:text-red-600 focus:outline-none transition-colors duration-200 relative">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-label="Notifications"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
            </Link>

            {/* User Profile Menu - Desktop */}
            <div className="relative hidden md:block" ref={profileMenuRef}>
              <button 
                className="flex items-center focus:outline-none group"
                onClick={toggleProfileMenu}
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <div className="relative overflow-hidden rounded-full border-2 border-gray-200 group-hover:border-red-400 transition-all duration-200">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10"
                  />
                </div>
                <svg 
                  className={`ml-1 h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100 transition-all duration-200 ease-in-out">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {userProfile?.data?.user?.fullName || "User"}
                    </p>
                  </div>
                  {profileMenuItems.map((item) => (
                   (item.label === "Logout") ? (
                    <button
                      key={item.href}
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                    >
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      {item.label}
                    </button>
                   ) :
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                    >
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Profile Link */}
            <Link href="/dashboard/profile" className="md:hidden">
              <div className="relative overflow-hidden rounded-full border-2 border-gray-200 hover:border-red-400 transition-all duration-200">
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-8 h-8"
                />
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700 hover:text-red-600 focus:outline-none transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            <nav className="bg-white divide-y divide-gray-100">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                href="/dashboard/favourites"
                className="block px-4 py-3 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Favourites
                </div>
              </Link>
              
              <Link
                href="/dashboard/notifications"
                className="block px-4 py-3 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </Link>
              
              <div className="bg-gray-50">
                {profileMenuItems.map((item) => (
                  (item.label === "Logout") ? (
                    <button
                      key={item.href}
                      onClick={handleLogout}
                      className="block px-4 py-3 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                    >
                      <div className="flex items-center">
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      {item.label}
                    </div>
                    </button>
                   ) :
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}