"use client";

import { useState } from 'react';
import Header from "@/app/components/Header";
import { 
  FaSitemap, 
  FaSearch, 
  FaHome,
  FaUserPlus,
  FaInfoCircle,
  FaQuestion,
  FaFileAlt,
  FaLock,
  FaCrown,
  FaEnvelope,
  FaChevronDown
} from "react-icons/fa";

export default function Sitemap() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Define site structure based on the sitemap.xml
  const sitePages = [
    {
      title: 'Home',
      url: '/',
      description: 'Main landing page of Jodi4ever',
      category: 'Main Pages',
      icon: <FaHome className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Create Profile',
      url: '/create-profile',
      description: 'Create your personal profile on Jodi4ever',
      category: 'User Account',
      icon: <FaUserPlus className="w-5 h-5 text-green-600" />
    },
    {
      title: 'Contact Us',
      url: '/contact',
      description: 'Get in touch with our support team',
      category: 'Support',
      icon: <FaEnvelope className="w-5 h-5 text-yellow-600" />
    },
    {
      title: 'About Us',
      url: '/about',
      description: 'Learn more about Jodi4ever and our mission',
      category: 'Information',
      icon: <FaInfoCircle className="w-5 h-5 text-cyan-600" />
    },
    {
      title: 'FAQs',
      url: '/faqs',
      description: 'Frequently asked questions about our services',
      category: 'Support',
      icon: <FaQuestion className="w-5 h-5 text-fuchsia-600" />
    },
    {
      title: 'Terms of Service',
      url: '/terms',
      description: 'Our terms and conditions of service',
      category: 'Legal',
      icon: <FaFileAlt className="w-5 h-5 text-gray-600" />
    },
    {
      title: 'Privacy Policy',
      url: '/privacy',
      description: 'How we handle and protect your data',
      category: 'Legal',
      icon: <FaLock className="w-5 h-5 text-green-600" />
    },
    {
      title: 'Premium Services',
      url: '/premium',
      description: 'Explore our premium features and membership options',
      category: 'Services',
      icon: <FaCrown className="w-5 h-5 text-amber-600" />
    }
  ];

  // Filter pages based on search term
  const filteredPages = sitePages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group pages by category
  const categories = {};
  filteredPages.forEach(page => {
    if (!categories[page.category]) {
      categories[page.category] = [];
    }
    categories[page.category].push(page);
  });

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gradient-to-b">
        <div className="container mx-auto py-4 px-4 md:px-8 max-w-5xl">
          {/* Header Section */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary to-btn-hover px-6 py-8 text-center">
              <div className="flex justify-center mb-4">
                <FaSitemap className="text-white w-16 h-16 bg-white/20 p-3 rounded-full" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Sitemap
              </h1>
              <p className="text-white/80 max-w-2xl mx-auto">
                Quick access to all pages on Jodi4Ever
              </p>
            </div>

            <div className="p-6 md:p-10 bg-white">
              {/* Search Bar */}
              <div className="mb-10 max-w-2xl mx-auto">
                <div className="bg-purple-50 rounded-xl p-6 shadow-sm">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search pages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Sitemap Categories */}
              <div className="space-y-10">
                {Object.keys(categories).length > 0 ? (
                  Object.keys(categories).map((category, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center bg-indigo-50 p-4 rounded-lg border-l-4 border-primary mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {categories[category].map((page) => (
                          <a 
                            key={page.url} 
                            href={page.url}
                            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition flex items-start gap-4"
                          >
                            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                              {page.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800 text-lg">{page.title}</h3>
                              <p className="text-gray-600 mt-1">{page.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-xl shadow-md">
                    <div className="inline-flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                      <FaSearch className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No matching pages found</h3>
                    <p className="text-gray-600">Please try a different search term.</p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-btn-hover transition"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Section */}
              <div className="mt-10 text-center">
                <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500 font-medium">
                  Updated May 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}