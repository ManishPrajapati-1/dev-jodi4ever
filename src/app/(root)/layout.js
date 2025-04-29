import { Poppins } from "next/font/google";
import StoreProvider from "@/app/store/StoreProvider";
import Image from "next/image";
import Footer from "@/app/components/Footer/footer";

import "@/app/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  // fallback: ["Georgia"],
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// export const metadata = {
//   title: "Jodi4Ever - Home",
//   description: "Jodi4Ever - find you a soulmate",
// };

export const metadata = {
  title: "Jodi4Ever – Find Your Perfect Match | Trusted Matrimony Platform",
  description:
    "Join Jodi4Ever, a trusted matrimony platform to connect with like-minded singles and discover your soulmate for a lifetime of happiness. Find your partner today and start your journey to love.",
  keywords:
    "matrimony, soulmate, marriage, find a partner, matchmaking, matchmaking service, marriage partner, dating platform, best matrimony site, Indian matrimony, online matchmaking, love, relationships",
  author: "Jodi4Ever Team",
  robots: "index, follow", // to ensure search engines index and follow links
  // Open Graph tags for Facebook and other social media platforms
  openGraph: {
    title: "Jodi4Ever – Find Your Perfect Match",
    description:
      "Discover your soulmate with Jodi4Ever, the leading matrimony platform. Join now and begin your journey to lifelong love and happiness.",
    url: "https://www.jodi4ever.com", // replace with your website URL
    type: "website",
    images: [
      {
        url: "https://www.jodi4ever.com/images/og-image.jpg", // replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Jodi4Ever - Matrimony Platform",
      },
    ],
  },

  // Twitter Card tags for Twitter
  twitter: {
    card: "summary_large_image", // use a large image summary card
    title: "Jodi4Ever – Find Your Perfect Match",
    description:
      "Join Jodi4Ever, a trusted matrimony platform that connects like-minded singles. Find your soulmate today.",
    image: "https://www.jodi4ever.com/images/twitter-card.jpg", // replace with actual image URL
    site: "@jodi4ever", // Replace with your Twitter handle if available
  },

  // Additional metadata for better search engine visibility
  additionalMetaTags: [
    { name: "theme-color", content: "#ff4081" }, // color of browser toolbar on mobile devices
    { name: "apple-mobile-web-app-title", content: "Jodi4Ever" }, // iOS app title if applicable
  ],
};

// console.log("metadata", metadata);

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* <Header /> */}
        <StoreProvider>
          <>
            <Image
              src={"/images/leafl.png"}
              alt="leaf left"
              width={100}
              height={100}
              className="fixed top-20 -left-5 z-90 w-auto h-auto opacity-85 invisible md:visible"
            />
            <Image
              src={"/images/leafr.png"}
              alt="leaf right"
              width={65}
              height={90}
              className="fixed bottom-0 right-0 z-90 w-auto h-auto opacity-85 invisible md:visible"
            />
          </>
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
