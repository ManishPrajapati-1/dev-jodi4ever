"use client";

import { useState } from 'react';
import Header from "@/app/components/Header"

export default function Premium() {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
    
    // Sample plan data - in a real application, this might come from an API
    const plans = [
        {
            id: 'basic',
            name: 'Basic',
            monthlyPrice: 499,
            yearlyPrice: 4999,
            features: [
                'View up to 10 profiles per day',
                'Basic matching algorithm',
                'Send up to 30 messages per month',
                'View contact details after mutual interest',
                'Email support'
            ],
            mostPopular: false,
            color: 'primary'
        },
        {
            id: 'premium',
            name: 'Premium',
            monthlyPrice: 999,
            yearlyPrice: 9999,
            features: [
                'View unlimited profiles',
                'Advanced matching algorithm',
                'Unlimited messages',
                'Priority in search results',
                'See who viewed your profile',
                'Read receipts for messages',
                '24/7 priority support'
            ],
            mostPopular: true,
            color: 'primary'
        },
        {
            id: 'vip',
            name: 'VIP',
            monthlyPrice: 1999,
            yearlyPrice: 19999,
            features: [
                'All Premium features',
                'Dedicated relationship consultant',
                'Personalized matchmaking',
                'Background verification of matches',
                'Video call feature',
                'Offline meetup arrangements',
                'Exclusive VIP-only events'
            ],
            mostPopular: false,
            color: 'primary'
        }
    ];

    // Calculate discount percentage
    const getDiscountPercentage = (monthlyPrice, yearlyPrice) => {
        const monthlyYearTotal = monthlyPrice * 12;
        const savings = monthlyYearTotal - yearlyPrice;
        return Math.round((savings / monthlyYearTotal) * 100);
    };

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
                <h1 className="text-3xl font-bold text-center text-primary mb-2">Premium Plans</h1>
                <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
                    Choose the perfect plan to enhance your matchmaking experience and find your life partner faster.
                </p>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-10">
                    <div className="bg-gray-100 p-1 rounded-lg inline-flex items-center">
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                billingCycle === 'monthly'
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-gray-700 hover:text-primary'
                            }`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                billingCycle === 'yearly'
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-gray-700 hover:text-primary'
                            }`}
                            onClick={() => setBillingCycle('yearly')}
                        >
                            Yearly <span className="text-xs text-green-600 font-normal">(Save up to 20%)</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => {
                        const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                        const discount = getDiscountPercentage(plan.monthlyPrice, plan.yearlyPrice);
                        
                        return (
                            <div 
                                key={plan.id} 
                                className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300 relative ${
                                    plan.mostPopular ? 'border-2 border-primary' : ''
                                }`}
                            >
                                {plan.mostPopular && (
                                    <div className="absolute top-0 inset-x-0 bg-primary text-white text-center py-1 text-sm font-medium">
                                        Most Popular
                                    </div>
                                )}
                                
                                <div className={`px-6 py-8 ${plan.mostPopular ? 'pt-10' : ''}`}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    
                                    <div className="mt-4 mb-6">
                                        <div className="flex items-baseline">
                                            <span className="text-4xl font-extrabold text-gray-900">₹{price}</span>
                                            <span className="ml-1 text-xl text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                        </div>
                                        
                                        {billingCycle === 'yearly' && (
                                            <p className="mt-1 text-sm text-green-600">
                                                Save {discount}% compared to monthly
                                            </p>
                                        )}
                                    </div>
                                    
                                    <ul className="mt-6 space-y-4">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="ml-2 text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <div className="mt-8">
                                        <a
                                            href="#"
                                            className={`block w-full text-center px-4 py-3 rounded-lg font-medium ${
                                                plan.mostPopular
                                                    ? 'bg-primary text-white hover:bg-primary'
                                                    : 'bg-primary-100 text-primary hover:bg-primary-200'
                                            } transition`}
                                        >
                                            Get Started
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-center text-primary mb-8">Frequently Asked Questions</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-medium text-primary mb-3">Can I upgrade my plan later?</h3>
                            <p className="text-gray-600">
                                Yes, you can upgrade your plan at any time. When you upgrade, you&apos;ll pay the prorated difference for the remainder of your current billing cycle.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-medium text-primary mb-3">How do I cancel my subscription?</h3>
                            <p className="text-gray-600">
                                You can cancel your subscription at any time from your account settings. After cancellation, you&apos;ll continue to have access to premium features until the end of your current billing period.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-medium text-primary mb-3">Are there any refunds if I&apos;m not satisfied?</h3>
                            <p className="text-gray-600">
                                We offer a 7-day satisfaction guarantee for new premium subscribers. If you&apos;re not satisfied, contact our support team within 7 days of your purchase for a full refund.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-medium text-primary mb-3">Do you offer any discounts?</h3>
                            <p className="text-gray-600">
                                Yes, we offer discounts for yearly subscriptions as shown above. We also occasionally run special promotions. Subscribe to our newsletter to stay updated on special offers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-primary-100 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Ready to Find Your Perfect Match?</h2>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Join thousands of couples who have found their life partners through Jodi4Ever. 
                        Our premium features can help you find your perfect match faster.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/register" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary transition font-medium">
                            Get Started Now
                        </a>
                        <a href="/contact" className="px-6 py-3 bg-white text-primary border border-primary-300 rounded-md hover:bg-primary-50 transition font-medium">
                            Contact Sales
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}