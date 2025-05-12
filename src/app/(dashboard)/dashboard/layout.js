import StoreProvider from "@/app/store/StoreProvider";
import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css";
import Header from "./Components/Header";
import Footer from "@/app/components/Footer/footer"
import { Suspense } from "react";

export const metadata = {
  title: "Jodi4Ever - Find Your Perfect Match",
  description:
    "A matrimonial platform to help you find your perfect life partner",
};

// Loading component for suspense fallback
const LoadingUI = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="inline-block h-12 w-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3 text-gray-600">Loading Jodi4Ever...</p>
    </div>
  </div>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased text-gray-800">
        <StoreProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main Content with Suspense for loading state */}
            <Suspense fallback={<LoadingUI />}>
              <main className="flex-grow container mx-auto">{children}</main>
            </Suspense>

            {/* Footer */}
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
