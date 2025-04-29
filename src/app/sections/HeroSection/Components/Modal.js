import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Icons } from "@/app/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLoginUserMutation, useVerifyLoginOtpMutation } from "@/lib/services/api";

export default function Modal({ isVisible, setIsVisible }) {
  // const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [verifyLoginOtp, { isOTPLoading }] = useVerifyLoginOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
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

  const sendOTP = async () => {
    setLoading(true);
    try {
      await loginUser({phone: phone}).unwrap();
    }
    catch (err) {
      console.log(`Error: ${err}`)
    }
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimer(60);
      setCanResend(false);
    }, 1500);
  };

  const onSubmit = async (data) => {
    sendOTP();
  };

  const handleResend = () => {
    if (canResend) {
      sendOTP();
    }
  };

  const handleBackToEdit = () => {
    setOtp(["", "", "", ""]);
    setStep(1);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
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

  const handleVerifyOtp = async () => {
    try {
          const res = await verifyLoginOtp({ phone, otp: otp.join("") }).unwrap();
          console.log(res.data.token);
          if (res.success && res.data.token) {
            localStorage.setItem('token', res.data.token); // 🔐 Save token
            // onClose(); // Close modal
          }
        } catch (err) {
          alert(err?.data?.message || 'Invalid OTP');
        }
  }

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 sm:px-0 overflow-hidden">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative">
            <div className="relative flex justify-center items-center mb-6">
              <button
                onClick={() =>
                  step === 1 ? setIsVisible(false) : handleBackToEdit()
                }
                className="absolute left-0 text-gray-400 hover:text-gray-700"
                aria-label="Back"
              >
                <Icons.ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg md:text-xl font-semibold text-center">
                {step === 1 ? "Welcome back! Please login" : "Enter OTP"}
              </h2>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  phone Number
                </label>
                <input
                  id="phone"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 transition ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-black/40"
                  }`}
                  {...register("phone", {
                    required: "phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mb-3">
                    {errors.phone.message}
                  </p>
                )}

                <button
                  type="submit"
                  className={`${
                    !isValid ? "bg-gray-800/60" : "bg-btn hover:bg-btn-hover"
                  } w-full py-2 text-white rounded-lg transition font-semibold flex items-center justify-center`}
                  disabled={!isValid || loading}
                >
                  {loading ? (
                    <>
                      <Icons.Loader className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            ) : (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium mb-1">
                  Enter OTP
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
                    !allOtpEntered
                      ? "bg-gray-800/60"
                      : "bg-btn hover:bg-btn-hover"
                  }  text-white rounded-lg transition font-semibold`}
                  disabled={!allOtpEntered}
                >
                  Verify OTP
                </button>

                <div className="text-center mt-3 text-sm text-gray-600">
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
                </div>
              </div>
            )}

            {step === 1 && (
              <p className="text-center mt-6 text-sm text-gray-600">
                New to Jodi4Ever?{" "}
                <Link
                  href="/create-profile"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Register for Free &gt;
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
