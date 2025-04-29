import StoreProvider from "@/app/store/StoreProvider";
import Header from "./Components/Header";
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
            <main className="flex-1 px-4 md:px-8 py-6 max-w-3xl mx-auto">
              <div className="bg-white shadow-lg rounded-lg p-6">
                {children}
              </div>
            </main>

            {/* Optional Footer */}
            <footer className="bg-secondary text-white text-center py-3 text-sm">
              &copy; {new Date().getFullYear()} MyApp. All rights reserved.
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
