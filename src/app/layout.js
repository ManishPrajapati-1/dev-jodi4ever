import { Poppins } from "next/font/google";
import StoreProvider from "@/app/store/StoreProvider";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer/footer";
import Script from "next/script";

import "@/app/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  // fallback: ["Georgia"],
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Jodi4Ever – Find Your Perfect Match | Trusted Matrimony Platform",
  description:
    "Join Jodi4Ever, a trusted matrimony platform to connect with like-minded singles and discover your soulmate for a lifetime of happiness. Find your partner today and start your journey to love.",
  keywords:
    "matrimony, soulmate, marriage, find a partner, matchmaking, matchmaking service, marriage partner, dating platform, best matrimony site, Indian matrimony, online matchmaking, love, relationships",
  author: "Jodi4Ever Team",
  robots: "index, follow", // to ensure search engines index and follow links
  alternates: {
  canonical: "https://www.jodi4ever.com", // canonical tag to prevent duplicate content
  },
  // Open Graph tags for Facebook and other social media platforms
  openGraph: {
    title: "Jodi4Ever – Find Your Perfect Match",
    description:
      "Discover your soulmate with Jodi4Ever, the leading matrimony platform. Join now and begin your journey to lifelong love and happiness.",
    url: "https://www.jodi4ever.com", // replace with your website URL
    type: "website",
    images: [
      {
        url: "https://www.jodi4ever.com/images/jodi4ever_logo_named.png", // replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Jodi4Ever - Matrimony Platform",
      },
    ],
    locale: "en_US", // added locale information
    siteName: "Jodi4Ever", // added site name
  },

  // Twitter Card tags for Twitter
  twitter: {
    card: "summary_large_image", // use a large image summary card
    title: "Jodi4Ever – Find Your Perfect Match",
    description:
      "Join Jodi4Ever, a trusted matrimony platform that connects like-minded singles. Find your soulmate today.",
    image: "https://www.jodi4ever.com/images/twitter-card.jpg", // replace with actual image URL
    site: "@jodi4ever", // Replace with your Twitter handle if available
    creator: "@jodi4ever", // Added creator tag for attribution
  },

  // Additional metadata for better search engine visibility
  additionalMetaTags: [
    { name: "theme-color", content: "#ff4081" }, // color of browser toolbar on mobile devices
    { name: "apple-mobile-web-app-title", content: "Jodi4Ever" }, // iOS app title if applicable
    { name: "application-name", content: "Jodi4Ever" }, // application name for Windows
    { name: "msapplication-TileColor", content: "#ff4081" }, // tile color for Windows
    { name: "viewport", content: "width=device-width, initial-scale=1.0" }, // responsive design
    { name: "format-detection", content: "telephone=no" }, // prevent phone number formatting
    { property: "og:site_name", content: "Jodi4Ever" }, // redundant but good for SEO
    { name: "google-site-verification", content: "YOUR_VERIFICATION_CODE" }, // replace with your Google verification code
  ],

  // Structured data for rich snippets (optional but recommended)
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jodi4Ever",
    url: "https://www.jodi4ever.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.jodi4ever.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
};

// console.log("metadata", metadata);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - implemented properly using next/script with strategy */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-8WFJLKS5CQ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8WFJLKS5CQ');
            `,
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <StoreProvider>
          <>
            <Image
              src={"/images/leafl.png"}
              alt="leaf left"
              width={100}
              height={100}
              className="fixed top-30 -left-5.5 z-90 w-auto h-auto opacity-75 invisible md:visible"
            />
            <Image
              src={"/images/leafr.png"}
              alt="leaf right"
              width={65}
              height={90}
              className="fixed bottom-0 right-0 z-90 w-auto h-auto opacity-75 invisible md:visible"
            />
          </>
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
