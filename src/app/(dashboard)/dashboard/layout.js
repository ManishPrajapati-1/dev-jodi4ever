// app/layout.js
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import '@/app/globals.css';

// Font configuration
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jodi Banao - Find Your Perfect Match',
  description: 'A matrimonial platform to help you find your perfect life partner',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Navigation Bar */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/wedding.png"
                  alt="Jodi Banao Logo"
                  width={70}
                  height={70}
                  className="mr-2"
                />
              </Link>

              {/* Navigation Menu - Desktop */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-800 hover:text-red-600 font-medium">
                  Home
                </Link>
                <Link href="/messages" className="text-gray-800 hover:text-red-600 font-medium">
                  Messages
                </Link>
                <Link href="/activity" className="text-gray-800 hover:text-red-600 font-medium">
                  Activity
                </Link>
                <Link href="/partner-preferences" className="text-gray-800 hover:text-red-600 font-medium">
                  Partner Preferences
                </Link>
              </nav>

              {/* User Profile Section */}
              <div className="flex items-center space-x-4">
                {/* Favourites Dropdown */}
                <div className="relative group">
                  <button className="text-gray-700 hover:text-red-600 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  
                  {/* Favourites Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <div className="px-4 py-2 border-b">
                      <h3 className="font-semibold text-gray-700">Favourites</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <div className="p-2 hover:bg-gray-50">
                        <Link href="/favourites" className="flex items-center">
                          <Image
                            src="/profiles/komal.jpg"
                            alt="Komal"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="ml-2">
                            <p className="text-sm font-medium">Komal Yadav</p>
                            <p className="text-xs text-gray-500">27 yrs, Delhi</p>
                          </div>
                        </Link>
                      </div>
                      <div className="p-2 hover:bg-gray-50">
                        <Link href="/favourites" className="flex items-center">
                          <Image
                            src="/profiles/manisha.jpg"
                            alt="Manisha"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="ml-2">
                            <p className="text-sm font-medium">Manisha Bharti</p>
                            <p className="text-xs text-gray-500">26 yrs, Delhi</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <Link href="/favourites" className="block text-center text-sm text-red-600 font-medium p-2 border-t hover:bg-red-50">
                      View All Favourites
                    </Link>
                  </div>
                </div>
                
                {/* Notifications Dropdown */}
                <div className="relative group">
                  <button className="text-gray-700 hover:text-red-600 focus:outline-none">
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                    </div>
                  </button>
                  
                  {/* Notifications Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <div className="px-4 py-2 border-b flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">Notifications</h3>
                      <Link href="/notifications" className="text-xs text-red-600 hover:text-red-800">
                        Mark All as Read
                      </Link>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      <div className="p-3 hover:bg-gray-50 border-b">
                        <Link href="/notifications" className="flex items-start">
                          <Image
                            src="/profiles/komal.jpg"
                            alt="Komal"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="ml-3 flex-grow">
                            <p className="text-sm">
                              <span className="font-medium">Komal Yadav</span> liked your profile
                            </p>
                            <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                          </div>
                          <div className="h-2 w-2 rounded-full bg-red-600 mt-1"></div>
                        </Link>
                      </div>
                      <div className="p-3 hover:bg-gray-50 border-b">
                        <Link href="/notifications" className="flex items-start">
                          <Image
                            src="/profiles/manisha.jpg"
                            alt="Manisha"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="ml-3 flex-grow">
                            <p className="text-sm">
                              <span className="font-medium">Manisha Bharti</span> viewed your profile
                            </p>
                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                          </div>
                          <div className="h-2 w-2 rounded-full bg-red-600 mt-1"></div>
                        </Link>
                      </div>
                      <div className="p-3 hover:bg-gray-50">
                        <Link href="/notifications" className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm">
                              Upgrade to Premium and get 50% off for the first month!
                            </p>
                            <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <Link href="/notifications" className="block text-center text-sm text-red-600 font-medium p-2 border-t hover:bg-red-50">
                      View All Notifications
                    </Link>
                  </div>
                </div>
                
                {/* Settings */}
                <Link href="/settings" className="text-gray-700 hover:text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
                
                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center focus:outline-none">
                    <Image
                      src="/profile-placeholder.jpg"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-gray-200"
                    />
                  </button>
                  
                  {/* Profile Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      My Profile
                    </Link>
                    <Link href="/profile/edit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </Link>
                  </div>
                </div>
                
                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-700 hover:text-red-600 focus:outline-none" id="mobile-menu-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation Menu - Hidden by default */}
            <div className="md:hidden hidden" id="mobile-menu">
              <div className="px-4 py-3 space-y-3 border-t">
                <Link href="/" className="block font-medium text-gray-700 hover:text-red-600">
                  Home
                </Link>
                <Link href="/messages" className="block font-medium text-gray-700 hover:text-red-600">
                  Messages
                </Link>
                <Link href="/activity" className="block font-medium text-gray-700 hover:text-red-600">
                  Activity
                </Link>
                <Link href="/partner-preferences" className="block font-medium text-gray-700 hover:text-red-600">
                  Partner Preferences
                </Link>
                <Link href="/favourites" className="block font-medium text-gray-700 hover:text-red-600">
                  Favourites
                </Link>
                <Link href="/notifications" className="block font-medium text-gray-700 hover:text-red-600">
                  Notifications
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow bg-gray-50">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Jodi Banao</h3>
                  <p className="text-gray-300">Find your perfect life partner with our trusted matrimonial service.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                    <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
                    <li><Link href="/success-stories" className="text-gray-300 hover:text-white">Success Stories</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Help & Support</h4>
                  <ul className="space-y-2">
                    <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQs</Link></li>
                    <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
                    <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
                <p>© {new Date().getFullYear()} Jodi Banao. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
        
        {/* Mobile Menu Toggle Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const mobileMenuButton = document.getElementById('mobile-menu-button');
              const mobileMenu = document.getElementById('mobile-menu');
              
              mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
              });
            });
          `
        }} />
      </body>
    </html>
  );
}