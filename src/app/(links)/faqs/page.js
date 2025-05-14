"use client";

import { useState } from 'react';
import Header from "@/app/components/Header";
import { 
  FaQuestion, 
  FaSearch, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaChevronDown
} from "react-icons/fa";

export default function FAQs() {
    // Sample FAQ data
    const faqData = [
        {
            id: 1,
            question: "What is Jodi4Ever?",
            answer: "Jodi4Ever is a dedicated matchmaking service committed to connecting individuals seeking lifelong companionship. We prioritize security, privacy, and user satisfaction through advanced technology and strict verification measures."
        },
        {
            id: 2,
            question: "How does the matchmaking process work?",
            answer: "Our matchmaking process uses a combination of AI-powered algorithms and human expertise to suggest compatible matches based on your preferences, interests, values, and life goals. The more detailed your profile, the better matches we can find for you."
        },
        {
            id: 3,
            question: "Is my personal information secure?",
            answer: "Yes, we take your privacy very seriously. We use industry-standard encryption and security measures to protect all personal data. We never share your information with third parties without your explicit consent. For more details, please refer to our Privacy Policy."
        },
        {
            id: 4,
            question: "What verification processes do you have in place?",
            answer: "We verify users through multiple methods including phone verification, email verification, and optional ID verification. This helps us maintain a community of genuine individuals and reduces the risk of fake profiles."
        },
        {
            id: 5,
            question: "Can I cancel my premium subscription?",
            answer: "Yes, you can cancel your premium subscription at any time. Once canceled, you'll continue to have access to premium features until the end of your current billing cycle. For more information, please refer to our Cancellation Policy."
        },
        {
            id: 6,
            question: "What makes Jodi4Ever different from other matchmaking services?",
            answer: "Jodi4Ever stands out through our focus on serious relationships leading to marriage, strict verification processes, personalized matchmaking approach, and emphasis on cultural compatibility. We also provide relationship advice and continuous support throughout your journey."
        },
        {
            id: 7,
            question: "How do I report inappropriate behavior?",
            answer: "You can report inappropriate behavior by using the 'Report' button on the user's profile or by contacting our support team directly. We take all reports seriously and investigate them thoroughly to maintain a safe and respectful community."
        },
        {
            id: 8,
            question: "Are there any age restrictions for using Jodi4Ever?",
            answer: "Yes, users must be at least 18 years old to create an account on Jodi4Ever. Our service is designed for adults seeking serious relationships leading to marriage."
        },
        {
            id: 9,
            question: "What premium plans are available?",
            answer: "We offer several premium plans with different durations and features. These include enhanced visibility, priority matching, advanced search filters, read receipts, and more. Visit our Premium Plans page for detailed information on pricing and features."
        },
        {
            id: 10,
            question: "How can I get help if I have issues with my account?",
            answer: "For any issues or questions regarding your account, you can reach out to our support team via email at support@jodi4ever.com or by phone at +91-9899981720. Our team is available Monday through Saturday to assist you."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const filteredFAQs = faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group FAQs by categories for better organization
    const groupedFAQs = [
        {
            category: "General Information",
            faqs: filteredFAQs.slice(0, 3)
        },
        {
            category: "Account & Security",
            faqs: filteredFAQs.slice(3, 7)
        },
        {
            category: "Plans & Support",
            faqs: filteredFAQs.slice(7)
        }
    ].filter(group => group.faqs.length > 0);

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen bg-gradient-to-b">
                <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl">
                    {/* Header Section */}
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-primary to-btn-hover px-6 py-8 text-center">
                            <div className="flex justify-center mb-4">
                                <FaQuestion className="text-white w-16 h-16 bg-white/20 p-3 rounded-full" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Frequently Asked Questions
                            </h1>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                Find answers to common questions about Jodi4Ever&apos;s services, policies, and features
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
                                            placeholder="Search for questions or keywords..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Categories */}
                            <div className="space-y-10">
                                {filteredFAQs.length > 0 ? (
                                    groupedFAQs.map((group, groupIndex) => (
                                        <div key={groupIndex} className="space-y-4">
                                            {groupedFAQs.length > 1 && (
                                                <div className="flex items-center bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 mb-4">
                                                    <h2 className="text-xl font-semibold text-gray-800">{group.category}</h2>
                                                </div>
                                            )}
                                            {group.faqs.map((faq, index) => (
                                                <div 
                                                    key={faq.id} 
                                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                                >
                                                    <button
                                                        className="w-full text-left p-5 focus:outline-none"
                                                        onClick={() => toggleFAQ(faq.id)}
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                                                            <div className={`bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${activeIndex === faq.id ? 'rotate-180' : ''}`}>
                                                                <FaChevronDown className="w-4 h-4 text-purple-600" />
                                                            </div>
                                                        </div>
                                                    </button>
                                                    <div
                                                        className={`px-5 transition-all duration-300 ease-in-out overflow-hidden ${
                                                            activeIndex === faq.id ? 'max-h-96 pb-5 border-t border-gray-100' : 'max-h-0'
                                                        }`}
                                                    >
                                                        <p className="text-gray-600 pt-4">{faq.answer}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-white rounded-xl shadow-md">
                                        <div className="inline-flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                            <FaSearch className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h3 className="text-xl font-medium text-gray-800 mb-2">No matching FAQs found</h3>
                                        <p className="text-gray-600">Please try a different search term or browse our categories.</p>
                                        <button 
                                            onClick={() => setSearchTerm('')}
                                            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-btn-hover transition"
                                        >
                                            Clear Search
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Additional Help Section */}
                            <div className="mt-12 bg-indigo-50 rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-primary mb-4 text-center">Still have questions?</h2>
                                <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
                                    If you couldn&apos;t find the answer you were looking for, our support team is ready to help you.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <a 
                                        href="/contact" 
                                        className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                            <FaEnvelope className="text-indigo-600 w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Contact Support</h3>
                                            <p className="text-sm text-gray-600 mt-1">Get help from our customer support team</p>
                                        </div>
                                    </a>
                                    <a 
                                        href="mailto:support@jodi4ever.com" 
                                        className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                            <FaPhoneAlt className="text-indigo-600 w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Direct Email</h3>
                                            <p className="text-sm text-gray-600 mt-1">Email us at support@jodi4ever.com</p>
                                        </div>
                                    </a>
                                </div>
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