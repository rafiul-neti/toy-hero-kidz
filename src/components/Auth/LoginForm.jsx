"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbLoaderQuarter, TbLogin } from "react-icons/tb"; // Modern icons
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const params = useSearchParams();

  const callbackUrl = params.get("callbackUrl") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result.ok) {
        toast.error("ভুল ইমেইল অথবা পাসওয়ার্ড!");
        setLoading(false); // Stop loading on error
      } else {
        toast.success("লগইন সফল হয়েছে!");

        // Use window.location.href for a hard redirect to ensure
        // proxy.js/middleware picks up the new session cookie immediately.
        setTimeout(() => {
          window.location.href = callbackUrl;
        }, 600);
      }
    } catch (error) {
      toast.error("কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">ইমেইল</label>
          <input
            name="email"
            type="email"
            placeholder="আপনার ইমেইল দিন"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc4000]/30 border-gray-200 focus:border-[#fc4000]"
            required
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">পাসওয়ার্ড</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="পাসওয়ার্ড দিন"
              className="w-full px-4 py-2 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-[#fc4000]/30 border-gray-200 focus:border-[#fc4000]"
              required
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#fc4000]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary disabled:bg-primary/80 text-white btn-block gap-2 text-lg"
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <>
              <TbLogin className="text-xl" />
              লগইন করুন
            </>
          )}
        </button>
      </form>

      {/* Register toggle */}
      <p className="text-center text-sm text-gray-600 mt-6">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          রেজিস্ট্রেশন করুন
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
