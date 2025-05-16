"use client";

import Header from "@/app/components/Header";
import {
  FaHandshake,
  FaUserShield,
  FaHeart,
  FaSearch,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

export default function About() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gradient-to-b">
        <div className="container mx-auto py-4 px-4 md:px-8 max-w-5xl">
          {/* Header Section */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary to-btn-hover px-6 py-8 text-center">
              <div className="flex justify-center mb-4">
                <FaHandshake className="text-white w-16 h-16 bg-white/20 p-3 rounded-full" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                About Jodi4Ever
              </h1>
              <p className="text-white/80 max-w-2xl mx-auto">
                Dedicated to connecting individuals seeking lifelong companionship
              </p>
            </div>

            <div className="p-6 md:p-10 bg-white">
              {/* Introduction */}
              <div className="mb-8 max-w-3xl mx-auto">
                <p className="text-gray-600 leading-relaxed">
                  Jodi4Ever is a dedicated matchmaking service committed to connecting individuals seeking lifelong companionship. 
                  We prioritize security, privacy, and user satisfaction. Our platform leverages advanced technology and strict 
                  verification measures to foster genuine connections while ensuring a safe and respectful environment.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Our goal is to help users find compatible matches based on shared values, interests, and personal preferences. 
                  We continuously update and refine our services to provide the best possible experience.
                </p>
              </div>

              {/* About Sections - Now in a single column */}
              <div className="space-y-8">
                {/* Section 1: Our Mission */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-indigo-50 p-4 border-l-4 border-indigo-500">
                    <FaHeart className="text-indigo-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Our Mission
                    </h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      At Jodi4Ever, our mission is to create meaningful connections that lead to lifelong companionship. 
                      We strive to provide a safe, secure, and personalized matchmaking experience that respects 
                      our users&apos; privacy and preferences.
                    </p>
                  </div>
                </div>

                {/* Section 2: Our Values */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-purple-50 p-4 border-l-4 border-purple-500">
                    <FaCheckCircle className="text-purple-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Our Values
                    </h2>
                  </div>
                  <div className="p-6">
                    <ul className="grid md:grid-cols-2 gap-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <FaUserShield className="text-purple-600 w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Trust and Security</h3>
                          <p className="text-gray-600 text-sm mt-1">In every interaction</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <FaHeart className="text-purple-600 w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Respect</h3>
                          <p className="text-gray-600 text-sm mt-1">For cultural and personal preferences</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <FaLock className="text-purple-600 w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Privacy</h3>
                          <p className="text-gray-600 text-sm mt-1">As a fundamental right</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <FaSearch className="text-purple-600 w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Continuous Improvement</h3>
                          <p className="text-gray-600 text-sm mt-1">Of our services</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 3: Why Choose Jodi4Ever */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-blue-50 p-4 border-l-4 border-blue-500">
                    <FaHandshake className="text-blue-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Why Choose Jodi4Ever?
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                          <FaLock className="text-blue-600 w-5 h-5" />
                        </div>
                        <h3 className="font-medium text-gray-800 mb-2">Secure Platform</h3>
                        <p className="text-gray-600 text-sm">Advanced security measures to protect your data and privacy</p>
                      </div>
                      
                      <div className="bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                          <FaUserShield className="text-blue-600 w-5 h-5" />
                        </div>
                        <h3 className="font-medium text-gray-800 mb-2">Verified Profiles</h3>
                        <p className="text-gray-600 text-sm">Strict verification process ensures authentic user profiles</p>
                      </div>
                      
                      <div className="bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                          <FaSearch className="text-blue-600 w-5 h-5" />
                        </div>
                        <h3 className="font-medium text-gray-800 mb-2">Smart Matching</h3>
                        <p className="text-gray-600 text-sm">Advanced algorithms to find compatible matches based on your preferences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="mt-10 text-center">
                <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500 font-medium">
                  Connecting Hearts Since 2023
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}