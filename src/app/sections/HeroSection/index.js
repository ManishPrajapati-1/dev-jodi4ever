"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Icons } from "@/app/icons";
import Modal from "./Components/Modal";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "@/lib/services/api";

export default function Home() {
  const [image, setImage] = useState("/images/banner1.jpg");
  const [showModal, setShowModal] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  
  // Check if token exists when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Or however you store your token
    setHasToken(!!token);
  }, []);

  // Only fetch user profile if we have a token
  const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined, {
    skip: !hasToken, // Skip the query if we don't have a token
  });
  // console.log(userProfile.data.user.fullName);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const images = ["/images/banner1.jpg", "/images/banner2.jpg"];

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setImage(images[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (hasToken) {
      // User is logged in, navigate to their profile or dashboard
      router.push('/home'); // Or wherever you want to direct them
    }
  }, [hasToken, router])

  const submitForm = (data) => {
    // console.log("Form submitted with data:", data);
    const queryString = new URLSearchParams(data).toString();
    router.push(`/create-profile?${queryString}`);
  };

  // Handle login or continue with profile
  const handleAuthAction = () => {
    if (hasToken && userProfile) {
      // User is logged in, navigate to their profile or dashboard
      router.push('/home'); // Or wherever you want to direct them
    } else {
      // User is not logged in, show login modal
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Background Images */}
        <div
          className={`image-zoom absolute inset-0 -z-10 transform transition-all duration-1000`}
        >
          <Image
            src={image}
            width={1920}
            height={1280}
            alt="Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Overlay + Main */}
        <div className="w-screen bg-black/80 p-8">
          <div className="flex justify-between items-center">
            <Image src="/images/jodi4ever_logo_named.png" width={100} height={100} className="w-14 md:w-18" alt="Jodi4Ever Logo" />
            
            {/* Conditional Login/Continue Button */}
            <span
              className="flex items-center gap-2 font-semibold text-base md:text-xl text-white hover:underline underline-offset-2 cursor-pointer"
              onClick={handleAuthAction}
            >
              {hasToken && userProfile ? (
                <>Continue with {userProfile.data.user.fullName} <Icons.ArrowDown /></>
              ) : (
                <>Login <Icons.ArrowDown /></>
              )}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-8 mt-12">
            {/* Text Section */}
            <div className="text-center md:text-left text-white flex flex-col gap-4">
              <h3 className="text-3xl">
                <span className="font-bold text-4xl">#</span>Matrimony
              </h3>
              <div>
                <h2 className="text-4xl mt-2">Find your</h2>
                <h1 className="text-2xl md:text-5xl mt-2">
                  <span className="text-primary font-bold">Perfect Life Partner</span>{" "}
                  here
                </h1>
              </div>
              <p className="text-2xl mt-4">
                Trusted Matrimony Platform
                {/* Most trusted Matrimony Brand in the World. */}
              </p>
            </div>

            {/* Form Section */}
            <form
              onSubmit={handleSubmit(submitForm)}
              className="drop-shadow-2xl bg-white/90 p-6 rounded-lg shadow-md w-full max-w-md text-black self-end ml-auto"
            >
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">
                  I&apos;m looking for
                </label>
                <select
                  {...register("lookingFor", { required: false })}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-btn"
                >
                  <option value="">Select</option>
                  <option value="Bride">Bride</option>
                  <option value="Groom">Groom</option>
                </select>
                {errors.lookingFor && (
                  <p className="text-btn text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">Age</label>
                <select
                  {...register("age", { required: false })}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-btn"
                >
                  <option value="">Select Age</option>
                  {[...Array(45)].map((_, i) => {
                    const age = i + 21;
                    return (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    );
                  })}
                </select>
                {errors.age && (
                  <p className="text-btn text-sm mt-1">Age is required</p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">
                  Religion
                </label>
                <select
                  {...register("religion", { required: false })}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-btn"
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Jain">Jain</option>
                  <option value="Parsi">Parsi</option>
                  <option value="Jewish">Jewish</option>
                  <option value="Bahai">Bahai</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Other">Other</option>
                </select>
                {errors.religion && (
                  <p className="text-btn text-sm mt-1">Religion is required</p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">
                  Location
                </label>
                <select
                  {...register("location", { required: false })}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-btn"
                >
                  <option value="">Select Location</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
                {errors.location && (
                  <p className="text-btn text-sm mt-1">Location is required</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-btn text-white font-semibold py-2 rounded-md hover:bg-btn-hover cursor-pointer transition"
              >
                Let&apos;s Begin
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal} />
    </>
  );
}