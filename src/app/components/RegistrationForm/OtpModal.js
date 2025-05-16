"use client";
import { useEffect, useState, useRef } from "react";
import { useVerifyOtpSignUpMutation } from "@/lib/services/api";
import { useDispatch } from "react-redux";
import { setStep, setOTPVerified } from "@/lib/features/profile/profileSlice";
import Image from "next/image";
import { Check, X, Clock, RefreshCw, Phone } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function OtpModal({ phone, onClose }) {
  const dispatch = useDispatch();
  const [verifyOtp, { isLoading }] = useVerifyOtpSignUpMutation();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const inputRefs = useRef([]);

  // Initialize timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error message when user types
    setErrorMessage("");

    // Auto-focus next input if value is entered
    if (value && index < 3) {
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
    else if (e.key === "Enter") {
      if (otp.every((digit) => digit !== "")) {
        document.getElementById("otp-btn")?.click(); // manually trigger submit
      }
    }
  };

  // Handle paste event to auto-fill all inputs
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (pastedData.length === 4) {
      const newOtp = pastedData.split("");
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
      const res = await verifyOtp({ phone: phone, otp: otp.join("") }).unwrap();

      if (res.success && res.token) {
        // Show success animation
        setIsSuccess(true);
        localStorage.setItem("token", res.token);
        toast.success("OTP verified successfully! Redirecting...");
        // Wait for animation to complete before redirecting
        setTimeout(() => {
          dispatch(setOTPVerified(true));
          dispatch(setStep(1));
          onClose();
        }, 1500);
      }
    } catch (err) {
      setErrorMessage(err?.data?.message || "Invalid OTP. Please try again.");
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    // Reset OTP fields
    setOtp(["", "", "", ""]);

    // Reset timer
    setTimer(60);
    setCanResend(false);

    // Reset error message
    setErrorMessage("");

    // Focus first input
    inputRefs.current[0].focus();

    // Here you would typically call your resend OTP API
    // For now, just show a success message
    setErrorMessage("OTP sent successfully!");
    toast.success("OTP sent successfully! Please check your phone.");
    setTimeout(() => setErrorMessage(""), 3000);
  };

  const allOtpEntered = otp.every((digit) => digit !== "");

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full relative overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="p-6 sm:p-8">
            {/* Header with verification illustration */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                {/* <Phone className="h-8 w-8 text-primary" /> */}
                <Image
                  src="/images/jodi4ever_logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="invert"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Verify Your Phone
              </h2>
              <p className="text-gray-600 mt-2">
                We&apos;ve sent a verification code to
                <br />
                <span className="font-medium">
                  +91 {phone.replace(/(\d{5})(\d{5})/, "$1 $2")}
                </span>
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
              <Toaster position="right-bottom" />

              {/* Error message */}
              {/* {errorMessage && (
              <div className={`text-center text-sm ${
                errorMessage.includes("success") ? "text-green-600" : "text-red-600"
              }`}>
                {errorMessage}
              </div>
            )} */}

              {/* Verify button */}
              <button
                onClick={handleVerifyOtp}
                type="submit"
                id="otp-btn"
                disabled={!allOtpEntered || isLoading || isSuccess}
                className={`relative w-full py-3 rounded-lg text-white font-medium transition duration-300 flex items-center justify-center ${
                  !allOtpEntered || isLoading
                    ? "bg-primary/60"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isLoading ? (
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

              {/* Resend OTP section */}
              <div className="text-center text-sm">
                {canResend ? (
                  <button
                    onClick={handleResend}
                    className="text-primary hover:text-primary/80 font-medium flex items-center justify-center mx-auto"
                  >
                    <RefreshCw size={14} className="mr-1" />
                    Resend OTP
                  </button>
                ) : (
                  <div className="flex items-center justify-center text-gray-600">
                    <Clock size={14} className="mr-1" />
                    Resend OTP in{" "}
                    <span className="mx-1 font-medium">
                      {formatTime(timer)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom decoration bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-primary to-primary"></div>
        </div>
      </div>
    </>
  );
}
