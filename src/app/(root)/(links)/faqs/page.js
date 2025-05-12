"use client";

import { useState } from 'react';
import Header from "@/app/components/Header"

export default function FAQs() {
    // Sample FAQ data - in a real application, this might come from an API
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

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
                <h1 className="text-3xl font-bold text-center text-primary mb-2">Frequently Asked Questions</h1>
                <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
                    Find answers to common questions about Jodi4Ever&apos;s services, policies, and features.
                </p>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for questions or keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => (
                            <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <button
                                    className="w-full text-left px-6 py-4 focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                                        <svg
                                            className={`w-5 h-5 text-primary transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <div
                                    className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                                        activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                                    }`}
                                >
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 bg-white rounded-lg shadow-md">
                            <p className="text-gray-600">No matching FAQs found. Please try a different search term.</p>
                        </div>
                    )}
                </div>

                {/* Additional Help Section */}
                <div className="mt-12 bg-purple-50 rounded-lg p-6 border border-purple-100">
                    <h2 className="text-xl font-semibold text-primary mb-4">Still have questions?</h2>
                    <p className="text-gray-700 mb-6">
                        If you couldn&apos;t find the answer you were looking for, our support team is ready to help you.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <a 
                            href="/contact" 
                            className="flex items-center justify-center bg-white p-4 rounded-md border border-purple-200 hover:bg-purple-50 transition"
                        >
                            <div className="mr-4 bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-primary">Contact Support</h3>
                                <p className="text-sm text-gray-600">Get help from our customer support team</p>
                            </div>
                        </a>
                        <a 
                            href="mailto:support@jodi4ever.com" 
                            className="flex items-center justify-center bg-white p-4 rounded-md border border-purple-200 hover:bg-purple-50 transition"
                        >
                            <div className="mr-4 bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-primary">Direct Email</h3>
                                <p className="text-sm text-gray-600">Email us at support@jodi4ever.com</p>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}