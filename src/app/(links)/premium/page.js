"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from "@/app/components/Header";
import {
  FaCrown,
  FaCheckCircle,
  FaArrowRight,
  FaQuestionCircle,
  FaHeart,
} from "react-icons/fa";

export default function Premium() {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
    
    // Sample plan data
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
            color: 'indigo'
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
            color: 'purple'
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
            color: 'blue'
        }
    ];

    // Calculate discount percentage
    const getDiscountPercentage = (monthlyPrice, yearlyPrice) => {
        const monthlyYearTotal = monthlyPrice * 12;
        const savings = monthlyYearTotal - yearlyPrice;
        return Math.round((savings / monthlyYearTotal) * 100);
    };

    // FAQ data
    const faqItems = [
        {
            question: "Can I upgrade my plan later?",
            answer: "Yes, you can upgrade your plan at any time. When you upgrade, you'll pay the prorated difference for the remainder of your current billing cycle."
        },
        {
            question: "How do I cancel my subscription?",
            answer: "You can cancel your subscription at any time from your account settings. After cancellation, you'll continue to have access to premium features until the end of your current billing period."
        },
        {
            question: "Are there any refunds if I'm not satisfied?",
            answer: "We offer a 7-day satisfaction guarantee for new premium subscribers. If you're not satisfied, contact our support team within 7 days of your purchase for a full refund."
        },
        {
            question: "Do you offer any discounts?",
            answer: "Yes, we offer discounts for yearly subscriptions as shown above. We also occasionally run special promotions. Subscribe to our newsletter to stay updated on special offers."
        }
    ];

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen bg-gradient-to-b">
                <div className="container mx-auto py-10 px-4 md:px-8 max-w-6xl">
                    {/* Header Section */}
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-12">
                        <div className="bg-gradient-to-r from-primary to-btn-hover px-6 py-8 text-center">
                            <div className="flex justify-center mb-4">
                                <FaCrown className="text-white w-16 h-16 bg-white/20 p-3 rounded-full" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Premium Plans
                            </h1>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                Choose the perfect plan to enhance your matchmaking experience and find your life partner faster
                            </p>
                        </div>

                        <div className="p-6 md:p-10 bg-white">
                            {/* Billing Toggle */}
                            <div className="flex justify-center mb-12">
                                <div className="bg-indigo-50 p-1 rounded-lg inline-flex items-center">
                                    <button
                                        className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                                            billingCycle === 'monthly'
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-gray-600 hover:text-primary'
                                        }`}
                                        onClick={() => setBillingCycle('monthly')}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        className={`px-6 py-3 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                                            billingCycle === 'yearly'
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-gray-600 hover:text-primary'
                                        }`}
                                        onClick={() => setBillingCycle('yearly')}
                                    >
                                        Yearly 
                                        <span className="text-xs font-normal py-1 px-2 bg-green-100 text-green-700 rounded-full">
                                            Save up to 20%
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Pricing Cards */}
                            <div className="grid md:grid-cols-3 gap-8 mb-16">
                                {plans.map((plan) => {
                                    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                                    const discount = getDiscountPercentage(plan.monthlyPrice, plan.yearlyPrice);
                                    
                                    return (
                                        <div 
                                            key={plan.id} 
                                            className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg duration-300 relative ${
                                                plan.mostPopular ? `border-2 border-${plan.color}-500` : ''
                                            }`}
                                        >
                                            {plan.mostPopular && (
                                                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-primary to-btn-hover text-white text-center py-1.5 text-sm font-medium">
                                                    Most Popular
                                                </div>
                                            )}
                                            
                                            <div className={`px-6 py-8 ${plan.mostPopular ? 'pt-12' : ''}`}>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                                
                                                <div className="mt-4 mb-6">
                                                    <div className="flex items-baseline">
                                                        <span className="text-4xl font-extrabold text-gray-900">₹{price}</span>
                                                        <span className="ml-1 text-xl text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                                    </div>
                                                    
                                                    {billingCycle === 'yearly' && (
                                                        <p className="mt-1 text-sm text-green-600 font-medium flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                            </svg>
                                                            Save {discount}% compared to monthly
                                                        </p>
                                                    )}
                                                </div>
                                                
                                                <ul className="mt-6 space-y-4">
                                                    {plan.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-start">
                                                            <FaCheckCircle className={`flex-shrink-0 h-5 w-5 text-${plan.color}-500 mt-0.5`} />
                                                            <span className="ml-2 text-gray-600">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                
                                                <div className="mt-8">
                                                    <a
                                                        href="#"
                                                        className={`block w-full text-center px-4 py-3 rounded-lg font-medium transition-colors ${
                                                            plan.mostPopular
                                                                ? 'bg-gradient-to-r from-primary to-btn-hover text-white hover:opacity-90'
                                                                : `bg-${plan.color}-100 text-${plan.color}-700 hover:bg-${plan.color}-200`
                                                        }`}
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
                            <div className="bg-indigo-50 rounded-xl p-8 mb-16">
                                <div className="flex items-center mb-8 justify-center">
                                    <FaQuestionCircle className="text-indigo-600 w-6 h-6 mr-2" />
                                    <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    {faqItems.map((item, index) => (
                                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                                            <h3 className="text-lg font-medium text-gray-800 mb-3">{item.question}</h3>
                                            <p className="text-gray-600">
                                                {item.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-6 text-center">
                                    <Link href="/faqs" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700">
                                        View all FAQs
                                        <FaArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="bg-gradient-to-r from-primary to-btn-hover rounded-xl overflow-hidden">
                                <div className="p-8 md:p-10 text-center">
                                    <div className="flex justify-center mb-6">
                                        <FaHeart className="text-white w-12 h-12 bg-white/20 p-2 rounded-full" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Ready to Find Your Perfect Match?</h2>
                                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                                        Join thousands of couples who have found their life partners through Jodi4Ever. 
                                        Our premium features can help you find your perfect match faster.
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <Link href="/create-profile" className="px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition font-medium">
                                            Get Started Now
                                        </Link>
                                        <Link href="/contact" className="px-6 py-3 bg-white/20 text-white border border-white/30 rounded-md hover:bg-white/30 transition font-medium">
                                            Contact Sales
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section */}
                            {/* <div className="mt-10 text-center">
                                <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500 font-medium">
                                    All plans include a 7-day money-back guarantee
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}