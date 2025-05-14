"use client";

import Header from "@/app/components/Header";
import {
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaKey,
  FaShareAlt,
  FaUserCog,
} from "react-icons/fa";

export default function Privacy() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gradient-to-b">
        <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl">
          {/* Header Section */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary to-btn-hover px-6 py-8 text-center">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-white w-16 h-16 bg-white/20 p-3 rounded-full" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Privacy Policy
              </h1>
              <p className="text-white/80 max-w-2xl mx-auto">
                We value your privacy and are committed to protecting your
                personal information
              </p>
            </div>

            <div className="p-6 md:p-10 bg-white">
              {/* Introduction */}
              <div className="mb-8 max-w-3xl mx-auto">
                <p className="text-gray-600 leading-relaxed">
                  At Jodi4Ever, we understand the importance of your personal
                  information and are dedicated to maintaining your trust by
                  protecting and respecting your privacy. This Privacy Policy
                  outlines how we collect, use, and safeguard your information.
                </p>
              </div>

              {/* Policy Sections - Now in a single column */}
              <div className="space-y-8">
                {/* Section 1: Data Collection */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-indigo-50 p-4 border-l-4 border-indigo-500">
                    <FaDatabase className="text-indigo-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      1. Data Collection
                    </h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-3">
                      Jodi4Ever gathers and processes information provided by
                      users to improve the effectiveness and security of
                      matchmaking. This encompasses:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>
                        Personal information (such as name, age, gender, and
                        preferences) to tailor your experience.
                      </li>
                      <li>
                        Contact details (including email and phone number) for
                        communication and account verification purposes.
                      </li>
                      <li>
                        Activity monitoring to enhance our platform and ensure
                        user safety.
                      </li>
                      <li>
                        Verification documents for identity confirmation and
                        fraud prevention.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 2: Required Permissions */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-purple-50 p-4 border-l-4 border-purple-500">
                    <FaUserLock className="text-purple-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      2. Required Permissions
                    </h2>
                  </div>
                  <div className="p-6  overflow-y-auto scrollbar-thin">
                    <p className="text-gray-700 mb-3">
                      To facilitate seamless functionality and an improved user
                      experience, Jodi4Ever requests the following permissions:
                    </p>

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          Location
                        </h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                          <li>
                            Assists in identifying matches in your vicinity for
                            a customized matchmaking experience.
                          </li>
                          <li>
                            Enables location-based filters to narrow down search
                            results.
                          </li>
                          <li>
                            Ensures a secure and localized service experience.
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          Camera
                        </h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                          <li>
                            Necessary for uploading profile images and verifying
                            user identity.
                          </li>
                          <li>
                            Facilitates video calls and live profile
                            verification (if applicable).
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          Gallery (Media & Files)
                        </h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                          <li>
                            Permits users to upload profile pictures and share
                            images with potential matches.
                          </li>
                          <li>
                            Essential for securely storing app-related media.
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          SMS
                        </h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                          <li>
                            Utilized for OTP-based account verification and
                            secure login processes.
                          </li>
                          <li>
                            Aids in password recovery and sending important
                            notifications.
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          Vibration
                        </h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                          <li>
                            Enhances user experience by providing haptic
                            feedback for notifications.
                          </li>
                          <li>
                            Notifies users about messages, calls, and app
                            activities.
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          Contacts
                        </h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                          <li>
                            Assists in connecting users with mutual friends for
                            a reliable matchmaking experience.
                          </li>
                          <li>
                            Allows users to invite friends to join Jodi4Ever
                            (with their consent).
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Use of Information */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-blue-50 p-4 border-l-4 border-blue-500">
                    <FaUserCog className="text-blue-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      3. Use of Information
                    </h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      The data collected is utilized to deliver a safe,
                      efficient, and personalized matchmaking experience. Users
                      receive notifications, updates, and promotional
                      communications. The information is also employed for fraud
                      detection, preventing misuse, and ensuring adherence to
                      legal obligations.
                    </p>
                  </div>
                </div>

                {/* Section 4: Security Measures */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-green-50 p-4 border-l-4 border-green-500">
                    <FaKey className="text-green-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      4. Security Measures
                    </h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Jodi4Ever implements encryption and various security
                      protocols to safeguard user data. While we aim to uphold
                      the highest security standards, users are encouraged to
                      activate additional safety features such as two-factor
                      authentication.
                    </p>
                  </div>
                </div>

                {/* Section 5: Data Sharing */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-pink-50 p-4 border-l-4 border-pink-500">
                    <FaShareAlt className="text-pink-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      5. Data Sharing and Retention
                    </h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Jodi4Ever is committed to user privacy and does not sell
                      or distribute user data to third-party marketing
                      organizations. In instances where the law requires it,
                      user information may be disclosed to legal authorities.
                      Data retention is strictly limited to the time necessary
                      to meet legal requirements and ensure security obligations
                      are fulfilled.
                    </p>
                  </div>
                </div>

                {/* Section 6: User Rights */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center bg-amber-50 p-4 border-l-4 border-amber-500">
                    <FaUserCog className="text-amber-600 w-6 h-6 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      6. User Rights
                    </h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      Users are entitled to request access to their personal
                      data, as well as to modify or delete it as they see fit.
                      We provide users with options to opt-out of any marketing
                      communications they may receive.
                    </p>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      All requests for data deletion will be processed within a
                      period of 30 days.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      For any questions or concerns regarding privacy matters,
                      users are encouraged to contact Jodi4Ever support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-10 text-center">
                <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500 font-medium">
                  Last Updated: March 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
