"use client";

import { useState, useEffect } from 'react';
import Header from "@/app/components/Header"
import Image from 'next/image';
import { useGetTermsPrivacyAboutQuery } from "@/lib/services/api";

export default function About() {
    const { data: webData, isLoading, error } = useGetTermsPrivacyAboutQuery();
    console.log(webData)
    if (isLoading) {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 py-10 min-h-screen flex items-center justify-center">
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-full mb-2.5"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-full mb-2.5"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-2.5"></div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 py-10 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-red-600 mb-2">Oops! Something went wrong</h2>
                        <p className="text-gray-600">We couldn&apos;t load the About Us content. Please try again later.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-16 max-w-5xl">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
                    {webData?.data.aboutUsDetails ? (
                        <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: webData.data.aboutUsDetails }}
                        />
                    ) : (
                        <div className="text-center py-8">
                            <h2 className="text-xl font-medium text-gray-600">About Us content is not available</h2>
                        </div>
                    )}
                </div>

                <div className="mt-10 grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-primary mb-4">Our Mission</h2>
                        <p className="text-gray-700">
                            At Jodi4Ever, our mission is to create meaningful connections that lead to lifelong companionship. 
                            We strive to provide a safe, secure, and personalized matchmaking experience that respects 
                            our users&apos; privacy and preferences.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-primary mb-4">Our Values</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Trust and security in every interaction</li>
                            <li>Respect for cultural and personal preferences</li>
                            <li>Privacy as a fundamental right</li>
                            <li>Continuous improvement of our services</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mt-10">
                    <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Why Choose Jodi4Ever?</h2>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        <div className="text-center p-4">
                            <div className="bg-purple-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="font-medium text-lg mb-2">Secure Platform</h3>
                            <p className="text-gray-600 text-sm">Advanced security measures to protect your data and privacy</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="bg-purple-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="font-medium text-lg mb-2">Verified Profiles</h3>
                            <p className="text-gray-600 text-sm">Strict verification process ensures authentic user profiles</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="bg-purple-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-medium text-lg mb-2">Smart Matching</h3>
                            <p className="text-gray-600 text-sm">Advanced algorithms to find compatible matches based on your preferences</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}