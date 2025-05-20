import StoreProvider from "@/app/store/StoreProvider";
import Header from "./Components/Header";
import Link from "next/link";
import "@/app/globals.css";
import Footer from "@/app/components/Footer/footer";
import { ArrowLeft, Heart } from "lucide-react";
import FormStepper from "./Components/FormSteper";

export const metadata = {
  metadataBase: "https://www.jodi4ever.com",
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
        url: "/images/wedding.png",
        width: 1200,
        height: 630,
        alt: "Create your Jodi4Ever profile",
      },
    ],
  },
};

export default function CreateProfileLayout({ children }) {
  return (
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header / Banner */}
            <Header />

            {/* Back to home link */}
            {/* <div className="container mx-auto px-4 pt-4">
              <FormStepper />
            </div> */}

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center px-4 md:px-8">
              <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl overflow-hidden">
                {/* Progress indicator could go here */}
                <div className="relative">
                  <div className="container mx-auto px-4 pt-4">
                    <FormStepper />
                  </div>
                  {children}
                </div>
              </div>
            </main>

            {/* Footer */}
            {/* <Footer /> */}
          </div>
        </StoreProvider>

  );
}