import Link from 'next/link';

export default function CtaSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 text-white py-16 px-3">
      <div
        className=" text-center py-12 px-12 rounded shadow-lg"
        style={{
          background: "linear-gradient(129.99deg, #4A90E2, #8A2BE2 47.43%)",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your Perfect Match?
        </h2>
        <p className="mb-8 text-lg md:text-xl">
          Join thousands of happy couples who found their life partners through
          our service. Register now to begin your journey!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/create-profile" className="bg-btn text-white px-6 py-3 rounded-md font-semibold hover:bg-btn-hover transition-all duration-300">
            Create Free Profile
          </Link>
          <Link href="/contact" className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold border border-white hover:bg-gray-300 transition-all duration-300">
            Help and Support
          </Link>
        </div>
      </div>
      
    </div>
  );
}
