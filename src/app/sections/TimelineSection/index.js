import Image from "next/image";

export default function TimelineSection() {
  const steps = [
    {
      id: 1,
      title: "Register",
      subtitle: "CREATE YOUR PROFILE",
      image: "/images/register.png",
      description:
        "Sign up and create your profile to begin your journey towards finding the perfect life partner. It’s quick, easy, and the first step to meaningful connections.",
    },
    {
      id: 2,
      title: "Find your Match",
      subtitle: "CHOOSE YOUR PARTNER",
      image: "/images/findMatch.png",
      description:
        "Explore potential matches based on your preferences and compatibility. Discover profiles that align with your values and lifestyle.",
    },
    {
      id: 3,
      title: "Send Interest",
      subtitle: "CONNECT WITH THEM",
      image: "/images/sendInterest.png",
      description:
        "Like someone? Let them know! Send an interest to start the conversation and show that you're serious about getting to know them.",
    },
    {
      id: 4,
      title: "Get Profile Information",
      subtitle: "EXCHANGE CONTACT INFO",
      image: "/images/getInfo.png",
      description:
        "Once the interest is mutual, exchange detailed profile information to deepen your connection and learn more about each other.",
    },
    {
      id: 5,
      title: "Start Meetups",
      subtitle: "COMMUNICATE AND DISCUSS",
      image: "/images/meetup.png",
      description:
        "Start meaningful conversations, plan meetups, and build a strong foundation for your relationship through open and honest communication.",
    },
    {
      id: 6,
      title: "Getting Marriage",
      subtitle: "CELEBRATE YOUR LOVE",
      image: "/images/marriage.png",
      description:
        "Take the final step in your love journey. Celebrate your union with family and friends as you begin a new chapter together.",
    },
  ];

  return (
    <div className="px-4 md:px-12 py-16">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-lg text-secondary tracking-widest">MOMENTS</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-tertiary">
          How it works
        </h1>
        <div className="mt-4 mx-auto w-20 h-1 bg-primary rounded-full" />
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Scoped Vertical Line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-primary rounded-full z-0" />

        <div className="space-y-20 relative z-10">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-white border-4 border-primary rounded-full" />
              </div>

              {/* Image */}
              <div
                className={`md:w-1/2 flex ${
                  index % 2 === 0 ? "justify-end" : "justify-start"
                } px-4`}
              >
                <Image
                  width={100}
                  height={100}
                  src={step.image}
                  alt={step.title}
                  className="max-w-xs md:max-w-sm w-26 rounded-lg shadow-lg"
                />
              </div>

              {/* Content */}
              {index % 2 === 0 ? (
                <div className="md:w-1/2 text-center md:text-left px-4">
                  <h3 className="text-primary font-semibold text-sm tracking-wider uppercase mb-1">
                    {step.subtitle}
                  </h3>
                  <h2 className="text-2xl md:text-3xl font-bold text-tertiary mb-2">
                    {step.title}
                  </h2>
                  <p className="text-base text-gray-600">{step.description}</p>
                </div>
              ) : (
                <div className="md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right px-4">
                  <h3 className="text-primary font-semibold text-sm tracking-wider uppercase mb-1">
                    {step.subtitle}
                  </h3>
                  <h2 className="text-2xl md:text-3xl font-bold text-tertiary mb-2">
                    {step.title}
                  </h2>
                  <p className="text-base text-gray-600">{step.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
