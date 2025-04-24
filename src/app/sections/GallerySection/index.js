"use client";
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    src: "/images/gallery10.jpg",
    alt: "Beach wedding setup",
    category: "WEDDING",
    title: "Bride & Groom",
  },
  {
    id: 2,
    src: "/images/gallery11.jpg",
    alt: "Couple on beach",
    category: "WEDDING",
    title: "Beach Ceremony",
  },
  {
    id: 3,
    src: "/images/gallery12.jpg",
    alt: "Bride and groom pose",
    category: "PHOTOSHOOT",
    title: "Outdoor Shoot",
  },
  {
    id: 4,
    src: "/images/gallery13.jpg",
    alt: "Bridesmaids",
    category: "WEDDING",
    title: "Bride & Groom",
  },
  {
    id: 5,
    src: "/images/gallery14.jpg",
    alt: "Couple at sunset",
    category: "PHOTOSHOOT",
    title: "Sunset Views",
  },
  {
    id: 6,
    src: "/images/gallery15.jpg",
    alt: "Evening reception",
    category: "RECEPTION",
    title: "Evening Party",
  },
  {
    id: 7,
    src: "/images/gallery16.jpg",
    alt: "Wedding roses and shoes",
    category: "DETAILS",
    title: "Wedding Accessories",
  },
  {
    id: 8,
    src: "/images/gallery17.jpg",
    alt: "Black and white couple portrait",
    category: "PORTRAITS",
    title: "Elegant Couple",
  },
];

const itemGridClasses = [
  "lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-3 h-[400px]", // item-1
  "lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-2 h-[200px]", // item-2
  "lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-2 h-[200px]", // item-3
  "lg:col-start-7 lg:col-end-10 lg:row-start-2 lg:row-end-3 h-[200px]", // item-4
  "lg:col-start-10 lg:col-end-13 lg:row-start-2 lg:row-end-3 h-[200px]", // item-5
  "lg:col-start-1 lg:col-end-5 lg:row-start-3 lg:row-end-4 h-[200px]", // item-6
  "lg:col-start-5 lg:col-end-9 lg:row-start-3 lg:row-end-4 h-[200px]", // item-7
  "lg:col-start-9 lg:col-end-13 lg:row-start-3 lg:row-end-4 h-[200px]", // item-8
  "lg:col-start-1 lg:col-end-4 lg:row-start-4 lg:row-end-5 h-[200px]", // item-9
  "lg:col-start-4 lg:col-end-7 lg:row-start-4 lg:row-end-5 h-[200px]", // item-10
  "lg:col-start-7 lg:col-end-10 lg:row-start-4 lg:row-end-5 h-[200px]", // item-11
  "lg:col-start-10 lg:col-end-13 lg:row-start-4 lg:row-end-5 h-[200px]", // item-12
];

export default function GallerySection() {
  return (
    <div className="bg-white py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-lg text-secondary tracking-widest">COLLECTIONS</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-tertiary">
          Photo Gallery
        </h1>
        <div className="mt-4 mx-auto w-20 h-1 bg-primary rounded-full" />
      </div>

      {/* Gallery Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0">
        {galleryImages.map((image, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden group ${
              itemGridClasses[idx] || ""
            }`}
          >
            <Image
              width={500}
              height={500}
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transform transition duration-300 ease-in-out group-hover:scale-105"
            />
            {/* Hover Caption Overlay */}
            <div
              className="absolute bottom-0 left-0 w-full px-4 py-3 
                opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
                bg-black/60 
                transition duration-300"
            >
              <div className="text-white text-center">
                <span className="block text-secondary text-xs font-semibold tracking-widest uppercase text-primary-light mb-1">
                  {image.category}
                </span>
                <span className="block text-white text-sm md:text-base font-medium md:font-semibold">
                  {image.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
