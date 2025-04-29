import { useForm } from 'react-hook-form';
import { useVerifyOtpSignUpMutation } from '@/lib/services/api';
import { useDispatch } from 'react-redux';
import { setStep } from '@/lib/features/profile/profileSlice';

export default function OtpModal({ phone, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [verifyOtp, { isLoading }] = useVerifyOtpSignUpMutation();
  
  const onSubmit = async (data) => {
    try {
      const res = await verifyOtp({ phone, otp: data.otp }).unwrap();
      if (res.success && res.token) {
        localStorage.setItem('token', res.token); // 🔐 Save token
        dispatch(setStep(1)); // ✅ Go to next step
        onClose(); // Close modal
      }
    } catch (err) {
      alert(err?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6">
      <h2 className="text-2xl font-semibold text-center text-pink-600 mb-4">Verify OTP</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            {...register('otp', { required: 'OTP is required' })}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
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
