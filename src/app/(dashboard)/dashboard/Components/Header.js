"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetUserProfileQuery } from "@/lib/services/api";
import { updateUserProfile } from "@/lib/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const { data: userProfile, isLoading, isError } = useGetUserProfileQuery();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://65.1.117.252:5002/";

 

    useEffect(() => {
      if (userProfile && !isLoading && !isError) {
        dispatch(updateUserProfile(userProfile?.data?.user));
      }
    }, [userProfile, dispatch, isLoading, isError]);

  // console.log(userProfile, "userProfile");
  
  if (isLoading) return <div></div>;
  if (isError) return <div>Error loading profile</div>;

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/wedding.png"
              alt="Jodi Banao Logo"
              width={70}
              height={70}
              className="mr-2"
            />
          </Link>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-800 hover:text-red-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/dashboard/messages"
              className="text-gray-800 hover:text-red-600 font-medium"
            >
              Messages
            </Link>
            <Link
              href="/dashboard/activity"
              className="text-gray-800 hover:text-red-600 font-medium"
            >
              Activity
            </Link>
            <Link
              href="/dashboard/preferences"
              className="text-gray-800 hover:text-red-600 font-medium"
            >
              Partner Preferences
            </Link>
          </nav>

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Favourites Dropdown */}
            <div className="relative group mt-2">
              <button className="text-gray-700 hover:text-red-600 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </button>

              {/* Favourites Dropdown Menu */}
              <div className="absolute right-0 mt-0 w-64 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <div className="px-4 py-2 border-b">
                  <h3 className="font-semibold text-gray-700">Favourites</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="p-2 hover:bg-gray-50">
                    <Link href="/favourites" className="flex items-center">
                      <Image
                        src="/profiles/komal.jpg"
                        alt="Komal"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-2">
                        <p className="text-sm font-medium">Komal Yadav</p>
                        <p className="text-xs text-gray-500">27 yrs, Delhi</p>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2 hover:bg-gray-50">
                    <Link href="/favourites" className="flex items-center">
                      <Image
                        src="/profiles/manisha.jpg"
                        alt="Manisha"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-2">
                        <p className="text-sm font-medium">Manisha Bharti</p>
                        <p className="text-xs text-gray-500">26 yrs, Delhi</p>
                      </div>
                    </Link>
                  </div>
                </div>
                <Link
                  href="/favourites"
                  className="block text-center text-sm text-red-600 font-medium p-2 border-t hover:bg-red-50"
                >
                  View All Favourites
                </Link>
              </div>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative group mt-2">
              <button className="text-gray-700 hover:text-red-600 focus:outline-none">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </div>
              </button>

              {/* Notifications Dropdown Menu */}
              <div className="absolute right-0 mt-0 w-80 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <div className="px-4 py-2 border-b flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700">Notifications</h3>
                  <Link
                    href="/notifications"
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Mark All as Read
                  </Link>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  <div className="p-3 hover:bg-gray-50 border-b">
                    <Link href="/notifications" className="flex items-start">
                      <Image
                        src="/profiles/komal.jpg"
                        alt="Komal"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-3 flex-grow">
                        <p className="text-sm">
                          <span className="font-medium">Komal Yadav</span> liked
                          your profile
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          10 minutes ago
                        </p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-red-600 mt-1"></div>
                    </Link>
                  </div>
                  <div className="p-3 hover:bg-gray-50 border-b">
                    <Link href="/notifications" className="flex items-start">
                      <Image
                        src="/profiles/manisha.jpg"
                        alt="Manisha"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-3 flex-grow">
                        <p className="text-sm">
                          <span className="font-medium">Manisha Bharti</span>{" "}
                          viewed your profile
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          2 hours ago
                        </p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-red-600 mt-1"></div>
                    </Link>
                  </div>
                  <div className="p-3 hover:bg-gray-50">
                    <Link href="/notifications" className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          Upgrade to Premium and get 50% off for the first
                          month!
                        </p>
                        <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                      </div>
                    </Link>
                  </div>
                </div>
                <Link
                  href="/notifications"
                  className="block text-center text-sm text-red-600 font-medium p-2 border-t hover:bg-red-50"
                >
                  View All Notifications
                </Link>
              </div>
            </div>

            {/* Settings */}
            {/* <Link href="/settings" className="text-gray-700 hover:text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link> */}

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center focus:outline-none">
                <Image
                  src={
                    userProfile.data.user.profile_image.length > 0 ?
                    baseUrl + userProfile.data.user.profile_image[0] :
                    "/images/default-user.jpg"
                  }
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-200"
                />
              </button>

              {/* Profile Dropdown Menu */}
              <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  My Profile
                </Link>
                {/* <Link
                  href="/profile/edit"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </Link> */}
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </Link>
                <Link
                  href="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-red-600 focus:outline-none"
              id="mobile-menu-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Hidden by default */}
        <div className="md:hidden hidden" id="mobile-menu">
          <div className="px-4 py-3 space-y-3 border-t">
            <Link
              href="/dashboard"
              className="block font-medium text-gray-700 hover:text-red-600"
            >
              Home
            </Link>
            <Link
              href="/dashboard/messages"
              className="block font-medium text-gray-700 hover:text-red-600"
            >
              Messages
            </Link>
            <Link
              href="/dashboard/activity"
              className="block font-medium text-gray-700 hover:text-red-600"
            >
              Activity
            </Link>
            <Link
              href="/dashboard/preferences"
              className="block font-medium text-gray-700 hover:text-red-600"
            >
              Partner Preferences
            </Link>
            <Link
              href="/dashboard/favourites"
              className="block font-medium text-gray-700 hover:text-red-600"
            >
              Favourites
            </Link>
            <Link
              href="/dashboard/notifications"
              className="block font-medium text-gray-700 hover:text-red-600"
            >
              Notifications
            </Link>
          </div>
        </div>
      </header>
      {/* Mobile Menu Toggle Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const mobileMenuButton = document.getElementById('mobile-menu-button');
              const mobileMenu = document.getElementById('mobile-menu');
              
              mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
              });
            });
          `,
        }}
      />
    </>
  );
}
