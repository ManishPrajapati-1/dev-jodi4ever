"use client";

import Header from "@/app/components/Header";
import {
  FaGavel,
  FaUserCheck,
  FaUserShield,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaEdit,
} from "react-icons/fa";

export default function Terms() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gradient-to-b">
        <div className="container mx-auto py-4 px-4 md:px-8 max-w-5xl">
          {/* Header Section */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary to-btn-hover px-6 py-8 text-center">
              <div className="flex justify-center mb-4">
                <FaGavel className="text-white w-16 h-16 bg-white/20 p-3 rounded-full" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Terms & Conditions
              </h1>
              <p className="text-white/80 max-w-2xl mx-auto">
                Please read these terms carefully before using our services
              </p>
            </div>

            <div className="p-6 md:p-10 bg-white">
              {/* Introduction */}
              <div className="mb-8 max-w-3xl mx-auto">
                <p className="text-gray-600 leading-relaxed">
                  Welcome to Jodi4Ever, a legally compliant and strictly monitored matchmaking platform. 
                  By registering and using our services, you acknowledge and agree to abide by these 
                  Terms & Conditions. If you do not accept these terms, you must discontinue the use 
                  of our platform immediately.
                </p>
              </div>

              {/* Terms Sections */}
              <div className="space-y-8">
                {/* Section 1: User Eligibility */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-indigo-50 p-4 border-l-4 border-indigo-500">
                    <FaUserCheck className="text-indigo-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      1. User Eligibility
                    </h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-indigo-600 text-xs font-bold">•</span>
                        </div>
                        <p>Only individuals aged 18 and above are allowed to create an account.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-indigo-600 text-xs font-bold">•</span>
                        </div>
                        <p>This platform is strictly for individuals seeking serious relationships leading to marriage.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-indigo-600 text-xs font-bold">•</span>
                        </div>
                        <p>Users must provide accurate and verifiable information. Any misrepresentation, fraud, or false identity will result in account termination without prior notice.</p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 2: Account Responsibilities */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-purple-50 p-4 border-l-4 border-purple-500">
                    <FaUserShield className="text-purple-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      2. Account Responsibilities
                    </h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-purple-600 text-xs font-bold">•</span>
                        </div>
                        <p>Users must maintain the confidentiality of their login details. Any unauthorized access due to negligence will be the sole responsibility of the user.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-purple-600 text-xs font-bold">•</span>
                        </div>
                        <p>Users should immediately report any unauthorized activity or suspicious behavior.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-purple-600 text-xs font-bold">•</span>
                        </div>
                        <p>We reserve the right to suspend or terminate any account found violating our policies.</p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 3: Code of Conduct */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-blue-50 p-4 border-l-4 border-blue-500">
                    <FaClipboardCheck className="text-blue-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      3. Code of Conduct
                    </h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">•</span>
                        </div>
                        <p>Respect and ethical behavior are mandatory. Harassment, abuse, offensive communication, or fraudulent activity will not be tolerated.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">•</span>
                        </div>
                        <p>Users must not solicit or share personal contact details publicly on the platform.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">•</span>
                        </div>
                        <p>Any attempt to mislead, exploit, or defraud another user will result in immediate legal action and account termination.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">•</span>
                        </div>
                        <p>We strictly prohibit fake profiles, spamming, and inappropriate content.</p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 4: Limitation of Liability */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-amber-50 p-4 border-l-4 border-amber-500">
                    <FaExclamationTriangle className="text-amber-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      4. Limitation of Liability
                    </h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-amber-600 text-xs font-bold">•</span>
                        </div>
                        <p>We provide a matchmaking platform but do not guarantee the success of relationships or marriages.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-amber-600 text-xs font-bold">•</span>
                        </div>
                        <p>We are not liable for any disputes, conflicts, or damages arising from user interactions.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-amber-600 text-xs font-bold">•</span>
                        </div>
                        <p>Users must exercise caution and conduct thorough due diligence before engaging with other members.</p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 5: Modification of Terms */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-green-50 p-4 border-l-4 border-green-500">
                    <FaEdit className="text-green-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      5. Modification of Terms
                    </h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-green-600 text-xs font-bold">•</span>
                        </div>
                        <p>We reserve the right to modify these terms without prior notice.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-green-600 text-xs font-bold">•</span>
                        </div>
                        <p>Major updates will be communicated via email or platform notifications.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Acceptance Section */}
              <div className="mt-10 bg-indigo-50 rounded-xl p-6 text-center">
                <p className="text-gray-700">
                  By using our services, you acknowledge that you have read and understood these Terms & Conditions and agree to be bound by them.
                </p>
              </div>

              {/* Last Updated */}
              <div className="mt-10 text-center">
                <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500 font-medium">
                  Last Updated: May 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}