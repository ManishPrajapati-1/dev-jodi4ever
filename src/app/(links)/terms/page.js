"use client";

import { useState, useEffect } from 'react';
import Header from "@/app/components/Header"
import { useGetTermsPrivacyAboutQuery } from "@/lib/services/api";

export default function Terms() {
    const { data: webData, isLoading, error } = useGetTermsPrivacyAboutQuery();
    
    if (isLoading) {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 py-10 min-h-screen flex items-center justify-center">
                    <div className="animate-pulse w-full max-w-4xl">
                        <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-6"></div>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
                        ))}
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
                        <p className="text-gray-600">We couldn&apos;t load the Terms & Conditions. Please try again later.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
                    {webData?.termConditionDetails ? (
                        <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: webData.termConditionDetails }}
                        />
                    ) : (
                        <div className="text-center py-8">
                            <h2 className="text-xl font-medium text-gray-600">Terms & Conditions content is not available</h2>
                        </div>
                    )}
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 mt-8 border border-purple-100">
                    <h3 className="text-lg font-semibold text-primary mb-3">Have Questions About Our Terms?</h3>
                    <p className="text-gray-700 mb-4">
                        If you have any questions or concerns about our Terms & Conditions, please don&apos;t hesitate to contact our support team.
                    </p>
                    <a 
                        href="mailto:support@jodi4ever.com" 
                        className="inline-block bg-primary text-white px-5 py-2 rounded-md hover:bg-primary transition"
                    >
                        Contact Support
                    </a>
                </div>
            </main>
        </>
    );
}