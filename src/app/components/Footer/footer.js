import { Icons } from "@/app/icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
    // Footer links organized by sections
    const footerLinks = {
      quickLinks: [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
        { href: "/#success-stories", label: "Success Stories" },
        { href: "/#testimonials", label: "Testimonials" },
      ],
      helpSupport: [
        { href: "/faqs", label: "FAQs" },
        { href: "/terms", label: "Terms & Conditions" },
        { href: "/privacy", label: "Privacy Policy" },
      ],
      services: [
        { href: "/premium", label: "Premium Membership" },
        // { href: "/matchmaking", label: "Matchmaking Services" },
        // { href: "/relationship-advice", label: "Relationship Advice" },
        // { href: "/horoscope-matching", label: "Horoscope Matching" },
      ],
    };
  
    // Social media links
    const socialLinks = [
      {
        name: "Facebook",
        url: "https://www.facebook.com/jodii4ever",
        icon: (
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/jodi4.ever",
        icon: (
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "Twitter",
        url: "https://www.x.com/Jodi4E7313",
        icon: (
          <svg
            className="h-6 w-6"
            fill="currentColor"
            width="100"
            height="100"
            viewBox="0 0 50 50"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
            ></path>
          </svg>
        ),
      },
      {
        name: "YouTube",
        url: "#",
        icon: (
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ];
  
    const contactLinks = {
      phone: "+91 9811981720",
      email: "info.jodi4ever@gmail.com",
    };
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white pt-12 pb-6 shadow-inner">
                  <div className="container mx-auto px-4">
                    {/* Footer Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                      {/* Brand Section */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center mb-4">
                          <Image
                            src="/images/jodi4ever_logo_named.png"
                            alt="Jodi4Ever Logo"
                            width={70}
                            height={70}
                            className="mr-3"
                          />
                          {/* <h3 className="text-2xl font-bold text-white">
                            Jodi4Ever
                          </h3> */}
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                          Find your perfect life partner with our trusted
                          matrimonial service. We connect compatible individuals
                          based on their preferences, values, and aspirations.
                        </p>
                        <div className="flex space-x-4 mb-6">
                          {socialLinks.map((social, index) => (
                            <a
                              key={index}
                              href={social.url}
                              className="text-gray-400 hover:text-white transition-colors duration-200"
                              aria-label={`Follow us on ${social.name}`}
                            >
                              {social.icon}
                            </a>
                          ))}
                        </div>
                      </div>
    
                      {/* Quick Links Section */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                          Quick Links
                        </h4>
                        <ul className="space-y-2">
                          {footerLinks.quickLinks.map((link, index) => (
                            <li key={index}>
                              <Link
                                href={link.href}
                                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                              >
                                <svg
                                  className="w-3 h-3 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
    
                      {/* Help & Support Section */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                          Help & Support
                        </h4>
                        <ul className="space-y-2">
                          {footerLinks.helpSupport.map((link, index) => (
                            <li key={index}>
                              <Link
                                href={link.href}
                                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                              >
                                <svg
                                  className="w-3 h-3 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
    
                      {/* Services Section */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                          Our Services
                        </h4>
                        <ul className="space-y-2">
                          {footerLinks.services.map((link, index) => (
                            <li key={index}>
                              <Link
                                href={link.href}
                                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                              >
                                <svg
                                  className="w-3 h-3 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
    
                    {/* Contact and Newsletter Section */}
                   
    
                    {/* Footer Bottom */}
                    <div className="mt-12 border-t border-gray-700 pt-6">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                          © {currentYear} Jodi4Ever. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                          <ul className="flex space-x-6 text-sm">
                            <li>
                              <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                              >
                                Privacy Policy
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/terms"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                              >
                                Terms & Conditions
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
  );
}
