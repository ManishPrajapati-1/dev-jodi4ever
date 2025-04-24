import Image from "next/image";

export default function WhyChooseSection() {
    const features = [
      {
        img: "/images/verifiedIcon.png",
        title: "Genuine Profiles",
        description: "Connect with verified members, backed by 100% verified mobile numbers.",
      },
      {
        img: "/images/handShake.png",
        title: "Most Trusted",
        description: "India’s most trusted wedding matrimony platform, chosen by millions.",
      },
      {
        img: "/images/wedding.png",
        title: "2000+ Weddings",
        description: "Thousands of successful matches made with love and trust.",
      },
    ];
  
    return (
      <section className="features-section py-20 px-4 md:px-0 bg-[#f8f8fa] flex justify-center mt-46">
          <div className="bg-[linear-gradient(to_bottom,_#5b5c75_0%,_#5b5c75_40%,_transparent_100%)] p-10 text-white">

            
            {/* Header Content */}
            <div className="text-center mb-14 space-y-6 my-10 md:my-24">
              <h3 className="text-sm md:text-lg uppercase tracking-wider text-[#f3ce00]">#1 Wedding Website</h3>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#4ddad6]">Why Choose Us</h1>
              <p className="text-base md:text-xl max-w-2xl mx-auto text-gray-200">
                Discover why millions trust us to help them find their life partner.
              </p>
            </div>
  
            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
                >
                  <Image width={100} height={100} src={item.img} alt={item.title} className="h-16 w-16 mb-5" />
                  <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
        </div>
      </section>
    );
  }
  