"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Modal from "./Modal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      <header
        className={`sticky top-0 w-full z-30 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-1"
            : "bg-white/90 shadow-sm backdrop-blur-sm py-2"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            {/* <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">
                Jodi<span className="text-primary">4Ever</span>
              </span>
            </Link> */}
            <Link href="/" className="flex items-center">
                        <Image
                          src="/images/wedding.png"
                          alt="Jodi4Ever Logo"
                          width={100} 
                          height={100} 
                          className="w-10 md:w-12 transition-transform hover:scale-105"
                          priority
                        />
                      </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <NavLink href="/" active={isActive("/")}>
                Home
              </NavLink>
              <NavLink href="/about" active={isActive("/about")}>
                About
              </NavLink>
              <NavLink href="/premium" active={isActive("/premium")}>
                Premium
              </NavLink>
              <NavLink href="/faqs" active={isActive("/faqs")}>
                FAQs
              </NavLink>
              <NavLink href="/contact" active={isActive("/contact")}>
                Contact
              </NavLink>
            </nav>

            {/* Authentication Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-primary font-medium hover:text-primary transition"
              >
                Log In
              </button>
              <Link
                href="/create-profile"
                className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary transition"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMenuOpen ? "max-h-96 mt-4 pb-4" : "max-h-0"
            }`}
          >
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="/" active={isActive("/")}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" active={isActive("/about")}>
                About
              </MobileNavLink>
              <MobileNavLink href="/premium" active={isActive("/premium")}>
                Premium
              </MobileNavLink>
              <MobileNavLink href="/faqs" active={isActive("/faqs")}>
                FAQs
              </MobileNavLink>
              <MobileNavLink href="/contact" active={isActive("/contact")}>
                Contact
              </MobileNavLink>
            </nav>

            <div className="flex flex-col space-y-3 mt-6">
              {/* <Link
                href="/login"
                className="w-full px-4 py-2 text-center border border-primary text-primary rounded-md hover:bg-purple-50 transition"
              >
                Log In
              </Link> */}
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-primary font-medium hover:text-primary transition"
              >
                Log In
              </button>
              <Link
                href="/create-profile"
                className="w-full px-4 py-2 text-center bg-primary text-white rounded-md hover:bg-primary transition"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Modal isVisible={showModal} setIsVisible={setShowModal} />
    </>
  );
}

// Desktop NavLink Component
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`font-medium transition-colors duration-200 ${
        active
          ? "text-primary border-b-2 border-primary"
          : "text-gray-700 hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile NavLink Component
function MobileNavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 font-medium rounded-md ${
        active
          ? "bg-purple-100 text-primary"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
