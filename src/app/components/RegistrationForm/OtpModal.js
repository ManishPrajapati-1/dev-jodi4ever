"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { useVerifyOtpSignUpMutation } from "@/lib/services/api";
import { useDispatch } from "react-redux";
import { setStep } from "@/lib/features/profile/profileSlice";

export default function OtpModal({ phone, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [verifyOtp, { isLoading }] = useVerifyOtpSignUpMutation();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const onSubmit = async (data) => {
    await handleVerifyOtp();
    // try {
    //   const res = await verifyOtp({ phone, otp: data.otp }).unwrap();
    //   if (res.success && res.token) {
    //     localStorage.setItem('token', res.token); // 🔐 Save token
    //     dispatch(setStep(1)); // ✅ Go to next step
    //     onClose(); // Close modal
    //   }
    // } catch (err) {
    //   alert(err?.data?.message || 'Invalid OTP');
    // }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp({ phone: phone, otp: otp.join("") }).unwrap();
      console.log(res.token);
      if (res.success && res.token) {
        localStorage.setItem("token", res.token); // 🔐 Save token
        dispatch(setStep(1));
      }
    } catch (err) {
      alert(err?.data?.message || "Invalid OTP");
    }
  };

  const handleKeyUp = (e, index) => {
    // Move to next input on typing
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        const input = document.getElementById(`otp-${index - 1}`);
        input?.focus();
      }
    } else if (e.key !== "Backspace" && otp[index].length === 1 && index < 3) {
      const input = document.getElementById(`otp-${index + 1}`);
      input?.focus();
    }
  };

  const allOtpEntered = otp.every((digit) => digit !== "");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6">
        <Image
          src="/images/jodi4ever_logo_named.png"
          width={48}
          height={48}
          alt="Logo"
          className="w-10 md:w-12 bg-gray-800 shadow-lg mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-center text-pink-600 mb-2">
          Verify OTP
        </h2>

        <p className="text-center text-gray-700">
          Enter the 4-digit verification code sent to your phone number{" "}
          <strong>+91 {phone}</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* <div>
          <input
            type="text"
            placeholder="Enter OTP"
            {...register('otp', { required: 'OTP is required' })}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div> */}

          <div>
            <label htmlFor="otp" className="block text-sm font-medium mb-1">
              {/* Enter OTP */}
            </label>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="number"
                  value={digit}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                  className="w-12 h-12 text-center border border-gray-400/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 transition"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              className={`w-full mt-4 py-2 ${
                !allOtpEntered ? "bg-gray-800/60" : "bg-btn hover:bg-btn-hover"
              }  text-white rounded-lg transition font-semibold`}
              disabled={!allOtpEntered || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>

            {/* <div className="text-center mt-3 text-sm text-gray-600">
                  {canResend ? (
                    <button
                      onClick={handleResend}
                      className="text-blue-600 hover:underline"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <p>
                      <span className="text-primary">
                        Didn&apos;t receive the OTP?
                      </span>{" "}
                      Resend OTP in {timer}s
                    </p>
                  )}
                </div> */}
          </div>

          {/* <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button> */}
        </form>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 mt-4 underline hover:text-gray-700 text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
