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
          <button className="bg-btn text-white px-6 py-3 rounded-md font-semibold hover:bg-btn-hover transition-all duration-300">
            Create Free Profile
          </button>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold border border-white hover:bg-gray-300 transition-all duration-300">
            Help and Support
          </button>
        </div>
      </div>
      <div className="text-sm md:text-base bg-primary text-center py-4 px-12 md:px-22 rounded shadow-lg flex flex-col md:flex-row justify-center gap-4">
        <span className="">Free support: +92 (8800) 68 - 8960 </span>
        <span className="hidden md:inline"> | </span>
        <span> Email: jodi4ever@support.com</span>
      </div>
    </div>
  );
}
