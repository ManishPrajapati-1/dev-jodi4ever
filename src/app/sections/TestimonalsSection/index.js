"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icons } from "@/app/icons";

const testimonials = [
  {
    name: "Meera & Arjun",
    city: "Mumbai",
    status: "Married",
    image:
      "/images/jodi1.webp",
    quote:
      "The verification process made us feel secure. We found our perfect match within two months!",
  },
  {
    name: "Ravi & Sneha",
    city: "Delhi",
    status: "Engaged",
    image:
      "/images/jodi2.jpg",
    quote:
      "We connected instantly! Thank you for making this journey so seamless and real.",
  },
  {
    name: "Karan & Priya",
    city: "Bangalore",
    status: "Married",
    image:
      "/images/jodi3.jpg",
    quote: "We were surprised at how quickly we matched. Couldn't be happier!",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount

  }, [currentIndex, total]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <div className="py-8 px-4" id="success-stories">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-tertiary">
          Success Stories
        </h1>
        <div className="mt-4 mx-auto w-20 h-1 bg-primary rounded-full" />
      </div>

      {/* Testimonial Card */}
      <div className="relative max-w-5xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left:[-10px] top-[65%] md:left-[-40px] md:top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-btn-hover transition z-10"
        >
          <Icons.ArrowLeft />
        </button>

        <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 transition-all duration-500 ease-in-out min-h-[320px]">
          {/* Rectangle Image with fixed height */}
          <div className="w-full md:w-2/5 h-64 md:h-96">
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <Image
                width={400}
                height={400}
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-2 left-1/2 transform -translate-1/2 bg-primary text-white p-2 rounded-full shadow-md">
                <Icons.Heart className="animate-pulse" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-3/5 text-center md:text-left space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                {current.name}
              </h2>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                {current.city} · {current.status}
              </p>
            </div>

            <div className="relative">
              <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed">
                <span className="text-3xl text-primary font-serif">“</span>
                {current.quote}
                <span className="text-3xl text-primary font-serif">”</span>
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={nextTestimonial}
          className="absolute right-[-10px] top-[65%] md:right-[-40px] md:top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-btn-hover transition z-10"
        >
          <Icons.ArrowRight />
        </button>
      </div>
    </div>
  );
}
