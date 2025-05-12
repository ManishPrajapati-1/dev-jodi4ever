import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLoginUserMutation, useVerifyLoginOtpMutation } from "@/lib/services/api";
import { Check, X, Clock, RefreshCw, Phone } from "lucide-react";

export default function LoginModal({ isVisible, setIsVisible }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [verifyLoginOtp, { isLoading: isOtpLoading }] = useVerifyLoginOtpMutation();
  
  const inputRefs = useRef([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const phone = watch("phone");

  // Timer effect
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendOTP = async () => {
    setErrorMessage("");
    
    try {
      const response = await loginUser({ phone: phone }).unwrap();
      if (response.success) {
        setStep(2);
        setTimer(60);
        setCanResend(false);
        
        // Focus first OTP input
        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 100);
      }
    } catch (err) {
      setErrorMessage(err?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  const onSubmit = async (data) => {
    sendOTP();
  };

  const handleResend = () => {
    if (canResend) {
      // Reset OTP fields
      setOtp(["", "", "", ""]);
      
      // Reset timer and error message
      setCanResend(false);
      setErrorMessage("");
      
      // Send OTP again
      sendOTP();
    }
  };

  const handleBackToEdit = () => {
    setOtp(["", "", "", ""]);
    setStep(1);
    setErrorMessage("");
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 1);
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Clear error message when user types
    setErrorMessage("");

    // Auto-focus next input if value is entered
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1].focus();
      }
    } 
    // Handle left arrow
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } 
    // Handle right arrow
    else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste event to auto-fill all inputs
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, '').slice(0, 4);
    
    if (pastedData.length === 4) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      
      // Focus the last input
      if (inputRefs.current[3]) {
        inputRefs.current[3].focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.join("").length !== 4) {
      setErrorMessage("Please enter a complete 4-digit OTP");
      return;
    }

    try {
      const res = await verifyLoginOtp({ phone, otp: otp.join("") }).unwrap();
      
      if (res.success && res.data.token) {
        // Show success animation
        setIsSuccess(true);
        localStorage.setItem("token", res.data.token);
        
        // Wait for animation to complete before redirecting
        setTimeout(() => {
          setIsVisible(false);
          router.push("/dashboard/profile");
        }, 1500);
      }
    } catch (err) {
      setErrorMessage(err?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const allOtpEntered = otp.every((digit) => digit !== "");

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 sm:px-0 overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
            {/* Close button */}
            <button 
              onClick={() => setIsVisible(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              {step === 1 ? (
                <>
                  {/* Login Header */}
                  <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Image src="/images/jodi4ever_logo.png" alt="Logo" width={50} height={50} className="invert" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                    <p className="text-gray-600 mt-2">Log in to access your account</p>
                  </div>

                  {/* Phone Input Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">+91</span>
                        </div>
                        <input
                          id="phone"
                          type="number"
                          inputMode="numeric"
                          placeholder="Enter your 10-digit number"
                          className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition ${
                            errors.phone
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500/50"
                              : "border-gray-300 focus:border-primary focus:ring-primary/50"
                          }`}
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Enter a valid 10-digit phone number",
                            },
                          })}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                      {errorMessage && step === 1 && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorMessage}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 rounded-lg text-white font-medium transition duration-300 flex items-center justify-center ${
                        !isValid || isLoginLoading ? "bg-primary/60" : "bg-primary hover:bg-primary/90"
                      }`}
                      disabled={!isValid || isLoginLoading}
                    >
                      {isLoginLoading ? (
                        <>
                          <div className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending OTP...
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </form>

                  {/* Registration link */}
                  <p className="text-center mt-6 text-sm text-gray-600">
                    New to Jodi4Ever?{" "}
                    <Link
                      href="/create-profile"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Register for Free
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  {/* OTP Header */}
                  <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Image src="/images/jodi4ever_logo.png" alt="Logo" width={50} height={50} className="invert" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Verify Your Phone</h2>
                    <p className="text-gray-600 mt-2">
                      We&apos;ve sent a verification code to
                      <br />
                      <span className="font-medium">+91 {phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
                    </p>
                  </div>

                  {/* OTP Input fields */}
                  <div className="space-y-6">
                    <div className="flex justify-center gap-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          value={digit}
                          maxLength={1}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          className={`w-14 h-14 text-center text-xl font-semibold border-2 ${
                            errorMessage ? "border-red-300" : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition`}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>

                    {/* Error message */}
                    {errorMessage && (
                      <div className={`text-center text-sm ${
                        errorMessage.includes("success") ? "text-green-600" : "text-red-600"
                      }`}>
                        {errorMessage}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="space-y-3">
                      {/* Verify button */}
                      <button
                        onClick={handleVerifyOtp}
                        disabled={!allOtpEntered || isOtpLoading || isSuccess}
                        className={`relative w-full py-3 rounded-lg text-white font-medium transition duration-300 flex items-center justify-center ${
                          !allOtpEntered || isOtpLoading ? "bg-primary/60" : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {isOtpLoading ? (
                          <>
                            <div className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Verifying...
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="mr-2 h-5 w-5" />
                            Verified Successfully
                          </>
                        ) : (
                          "Verify OTP"
                        )}
                      </button>

                      {/* Back to edit button */}
                      <button
                        onClick={handleBackToEdit}
                        className="w-full py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium transition hover:bg-gray-50"
                        disabled={isOtpLoading || isSuccess}
                      >
                        Edit Phone Number
                      </button>
                    </div>

                    {/* Resend OTP section */}
                    <div className="text-center text-sm">
                      {canResend ? (
                        <button
                          onClick={handleResend}
                          className="text-primary hover:text-primary/80 font-medium flex items-center justify-center mx-auto"
                          disabled={isOtpLoading || isSuccess}
                        >
                          <RefreshCw size={14} className="mr-1" />
                          Resend OTP
                        </button>
                      ) : (
                        <div className="flex items-center justify-center text-gray-600">
                          <Clock size={14} className="mr-1" />
                          Resend OTP in <span className="mx-1 font-medium">{formatTime(timer)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom decoration bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-primary to-primary"></div>
          </div>
        </div>
      )}
    </>
  );
}