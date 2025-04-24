import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Icons } from "@/app/icons";

export default function Modal({ isVisible, setIsVisible }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30); // Seconds for resend timer
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const mobile = watch("mobile");

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

  const sendOTP = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimer(30);
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
                  htmlFor="mobile"
                  className="block text-sm font-medium mb-1"
                >
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter your mobile number"
                  className={`w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 transition ${
                    errors.mobile
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-black/40"
                  }`}
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit mobile number",
                    },
                  })}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mb-3">
                    {errors.mobile.message}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2 bg-btn text-white rounded-lg transition font-semibold flex items-center justify-center"
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
                  onClick={(e) => console.log(otp)}
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
                      <p><span className="text-primary">Didn&apos;t receive the OTP?</span> Resend OTP in {timer}s</p>
                  )}
                </div>
              </div>
            )}

            {step === 1 && (
              <p className="text-center mt-6 text-sm text-gray-600">
                New to Jodi4Ever?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign Up Free &gt;
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
