import StoreProvider from "@/app/store/StoreProvider";
import Header from "./Components/Header";
import Link from "next/link";
import "@/app/globals.css";
import { ArrowLeft, Heart } from "lucide-react";

export const metadata = {
  title: "Create Your Profile | Jodi4Ever",
  description: "Complete your profile to get the most out of Jodi4Ever.",
  keywords: ["create profile", "onboarding", "user setup", "Jodi4Ever"],
  robots: "noindex, nofollow",
  openGraph: {
    title: "Create Your Profile | Jodi4Ever",
    description: "Set up your profile and start using Jodi4Ever today.",
    type: "website",
    images: [
      {
        url: "/images/og-profile-creation.jpg",
        width: 1200,
        height: 630,
        alt: "Create your Jodi4Ever profile",
      },
    ],
  },
};

export default function CreateProfileLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-tertiary/40 to-tertiary/10 min-h-screen font-sans">
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header / Banner */}
            <Header />

            {/* Back to home link */}
            <div className="container mx-auto px-4 pt-4">
              <Link 
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center px-4 md:px-8 py-8">
              <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl overflow-hidden">
                {/* Progress indicator could go here */}
                <div className="relative">
                  {children}
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer
              className="bg-secondary text-white py-6 px-4 shadow-inner"
              role="contentinfo"
            >
              <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center justify-center md:justify-start">
                      <Heart className="h-5 w-5 text-primary mr-2" />
                      <span className="font-bold text-lg">Jodi4Ever</span>
                    </div>
                    <p className="text-sm text-white/80 mt-1">
                      Finding your perfect match since {new Date().getFullYear()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div>
                      <h3 className="font-medium mb-2 text-center md:text-left">Legal</h3>
                      <div className="flex flex-row md:flex-col gap-3 md:gap-2 text-sm">
                        <Link href="/privacy" className="hover:underline text-white/80 transition-colors hover:text-white">
                          Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:underline text-white/80 transition-colors hover:text-white">
                          Terms of Service
                        </Link>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2 text-center md:text-left">Support</h3>
                      <div className="flex flex-row md:flex-col gap-3 md:gap-2 text-sm">
                        <Link href="/contact" className="hover:underline text-white/80 transition-colors hover:text-white">
                          Contact Us
                        </Link>
                        <Link href="/faq" className="hover:underline text-white/80 transition-colors hover:text-white">
                          FAQs
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/20 text-center text-sm text-white/60">
                  &copy; {new Date().getFullYear()} Jodi4Ever. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}