"use client";
import { useEffect, useState } from "react";
import { Icons } from "@/app/icons";
import Image from "next/image";

const trustData = [
    {
      image: "/images/trust1.jpg",
      name: "John & Emily",
      city: "New York",
      description: "We found true love through Jodi4Ever. It's been magical!",
    },
    {
      image: "/images/trust2.jpg",
      name: "Sarah & Michael",
      city: "Los Angeles",
      description: "Our journey started here, and now we’re inseparable!",
    },
    {
      image: "/images/trust3.jpg",
      name: "Anna & David",
      city: "Chicago",
      description: "Thanks to Jodi4Ever, we are a perfect match.",
    },
    {
      image: "/images/trust4.jpg",
      name: "Lucas & Emma",
      city: "San Francisco",
      description: "From a swipe to a forever bond. We’re grateful!",
    },
    {
      image: "/images/trust5.jpg",
      name: "Liam & Olivia",
      city: "Miami",
      description: "Jodi4Ever brought us together. It's a dream come true.",
    },
  ];
  

export default function TrustSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Dynamically adjust visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < trustData.length - visibleCards ? prevIndex + 1 : 0
      );
    }, 2000);
  
    return () => clearInterval(interval); 
  }, [currentIndex, visibleCards]);

  const maxIndex = trustData.length - visibleCards;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  return (
    <section className="w-full mt-12 md:mt-16 text-center flex flex-col gap-8" id="testimonials">
      <h3 className="text-xl font-medium text-secondary uppercase tracking-wider mb-2">Trusted brand</h3>
      <h2 className="text-4xl sm:text-5xl font-bold text-tertiary mb-10">Trusted by 1500+ Couples</h2>

      <div className="relative flex items-center justify-center">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-32 bg-primary text-white p-3 rounded-full shadow hover:bg-btn-hover z-10"
        >
          <Icons.ArrowLeft />
        </button>

        {/* Cards */}
        <div className="flex gap-6 overflow px-8 max-w-7xl w-full justify-center">
          {trustData.slice(currentIndex, currentIndex + visibleCards).map((item, index) => (
            <div
              key={index}
              className="relative w-72 h-80 bg-white p-6 border rounded-lg shadow-lg transition-transform hover:scale-101"
            >
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 border-4 border-white shadow-md rounded-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-16 text-center space-y-4">
                <div>
                <p className="font-semibold text-xl text-primary">{item.name}</p>
                <p className="text-sm text-gray-500">{item.city}</p>
                    </div>
                <p className="text-sm text-gray-800 mb-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-32 bg-primary text-white p-3 rounded-full shadow hover:bg-btn-hover z-10"
        >
          <Icons.ArrowRight />
        </button>
      </div>
    </section>
  );
}
