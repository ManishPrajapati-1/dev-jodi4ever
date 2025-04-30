import StoreProvider from "@/app/store/StoreProvider";
import Header from "./Components/Header";
import Link from "next/link";
import "@/app/globals.css";

export const metadata = {
  title: "Create Your Profile | MyApp",
  description: "Complete your profile to get the most out of MyApp.",
  keywords: ["create profile", "onboarding", "user setup", "MyApp"],
  robots: "noindex, nofollow",
  openGraph: {
    title: "Create Your Profile | MyApp",
    description: "Set up your profile and start using MyApp today.",
    type: "website",
  },
};

export default function CreateProfileLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-tertiary min-h-screen font-sans">
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header / Banner */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center px-4 md:px-8 py-6">
              <div className="bg-white shadow-lg rounded-lg w-100">
                {children}
              </div>
            </main>

            {/* Optional Footer */}
            <footer
              className="bg-secondary text-white text-center py-4 px-4 text-sm md:text-base shadow-inner"
              role="contentinfo"
            >
              <div className="container mx-auto">
                &copy; {new Date().getFullYear()} <strong>Jodi4Ever</strong>.
                All rights reserved.
              </div>
              {/* <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-2 text-xs md:text-sm">
                <Link href="/privacy" className="hover:underline text-white/80">
                  Privacy Policy
                </Link>
                <span className="hidden md:inline-block">|</span>
                <Link href="/terms" className="hover:underline text-white/80">
                  Terms of Service
                </Link>
              </div> */}
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
