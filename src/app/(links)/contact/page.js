"use client";

import { useState } from 'react';
import Header from "@/app/components/Header";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form validation
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({
                submitted: true,
                success: false,
                message: 'Please fill out all required fields.'
            });
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setFormStatus({
                submitted: true,
                success: true,
                message: 'Thank you for your message! We will get back to you soon.'
            });
            // Reset form
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen bg-gradient-to-b">
                <div className="container mx-auto py-4 px-4 md:px-8 max-w-5xl">
                    {/* Header Section */}
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-primary to-btn-hover px-6 py-8 text-center">
                            <div className="flex justify-center mb-4">
                                <FaEnvelope className="text-white w-16 h-16 bg-white/20 p-3 rounded-full" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Get in Touch
                            </h1>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                Have questions about our services? We&apos;re here to help you every step of the way.
                            </p>
                        </div>

                        <div className="p-6 md:p-10 bg-white">
                            {/* Introduction */}
                            <div className="mb-8 max-w-3xl mx-auto">
                                <p className="text-gray-600 leading-relaxed">
                                    Need help with your account? Want to provide feedback? Or just have questions about 
                                    our matchmaking services? We&apos;d love to hear from you. Use any of the contact methods 
                                    below or fill out our contact form, and our team will get back to you as soon as possible.
                                </p>
                            </div>

                            {/* Contact Form and Info */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Left Column - Contact Information */}
                                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center bg-indigo-50 p-4 border-l-4 border-indigo-500">
                                        <FaPhoneAlt className="text-indigo-600 w-6 h-6 mr-3" />
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Contact Information
                                        </h2>
                                    </div>
                                    <div className="p-6">
                                        <ul className="space-y-5">
                                            <li className="flex items-start">
                                                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                                    <FaEnvelope className="text-indigo-600 w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800">Email</h3>
                                                    <p className="text-gray-600 mt-1">support@jodi4ever.com</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                                    <FaPhoneAlt className="text-indigo-600 w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800">Phone</h3>
                                                    <p className="text-gray-600 mt-1">+91-9899981720</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                                    <FaMapMarkerAlt className="text-indigo-600 w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800">Office Address</h3>
                                                    <p className="text-gray-600 mt-1">Delhi - 110066</p>
                                                </div>
                                            </li>
                                        </ul>

                                        <div className="mt-8 pt-6 border-t border-gray-100">
                                            <div className="flex items-center mb-4">
                                                <FaClock className="text-indigo-600 w-5 h-5 mr-3" />
                                                <h3 className="font-medium text-gray-800">Business Hours</h3>
                                            </div>
                                            <div className="space-y-2 pl-8 text-gray-600">
                                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                                <p>Saturday: 10:00 AM - 4:00 PM</p>
                                                <p>Sunday: Closed</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-gray-100">
                                            <div className="flex items-center mb-4">
                                                <h3 className="font-medium text-gray-800">Connect With Us</h3>
                                            </div>
                                            <div className="flex space-x-4">
                                                <a href="https://www.facebook.com/jodii4ever" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition">
                                                    <FaFacebookF />
                                                </a>
                                                <a href="https://www.instagram.com/jodi4.ever" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition">
                                                    <FaInstagram />
                                                </a>
                                                <a href="https://www.x.com/Jodi4E7313" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition">
                                                    <FaTwitter />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Contact Form */}
                                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center bg-purple-50 p-4 border-l-4 border-purple-500">
                                        <FaEnvelope className="text-purple-600 w-6 h-6 mr-3" />
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Send Us a Message
                                        </h2>
                                    </div>
                                    <div className="p-6">
                                        {formStatus.submitted && (
                                            <div className={`mb-6 p-4 rounded-md ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {formStatus.message}
                                            </div>
                                        )}
                                        
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name *</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email *</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message *</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows="5"
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    required
                                                ></textarea>
                                            </div>
                                            
                                            <button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-primary to-btn-hover text-white py-3 rounded-md hover:opacity-90 transition font-medium"
                                            >
                                                Send Message
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section */}
                            {/* <div className="mt-10 text-center">
                                <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500 font-medium">
                                    We typically respond within 24 hours
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}