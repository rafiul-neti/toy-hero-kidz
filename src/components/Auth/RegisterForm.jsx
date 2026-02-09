"use client";
import { postUser } from "@/actions/server/user";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbUserPlus } from "react-icons/tb"; // Modern Icon

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const params = useSearchParams();
  const router = useRouter();

  // Updated brand-focused input classes
  const inputClassNames = `w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc4000]/30 focus:border-[#fc4000] disabled:bg-gray-50`;

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const callbackUrl = params.get("callbackUrl") || "/";

    if (password.length < 8) {
      setErr("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      setLoading(false);
      return;
    }

    const userInfo = { name, email, password };

    try {
      const result = await postUser(userInfo);

      if (result.insertedId) {
        toast.success("রেজিস্ট্রেশন সফল হয়েছে!");

        // Auto-login after successful registration
        const autoLoginUser = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (autoLoginUser.ok) {
          // Hard refresh ensures the proxy logic sees the new session immediately
          setTimeout(() => {
            window.location.href = callbackUrl;
          }, 600);
        } else {
          // If auto-login fails for some reason, send them to login page
          window.location.href = "/login";
        }
      } else {
        toast.error(result.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
        setLoading(false);
      }
    } catch (error) {
      toast.error("সার্ভার সমস্যা! আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm text-gray-600 mb-1 font-medium">
          আপনার নাম
        </label>
        <input
          name="name"
          type="text"
          placeholder="আপনার পুরো নাম লিখুন"
          className={inputClassNames}
          required
          disabled={loading}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-600 mb-1 font-medium">
          ইমেইল
        </label>
        <input
          name="email"
          type="email"
          placeholder="আপনার ইমেইল দিন"
          className={inputClassNames}
          required
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-gray-600 mb-1 font-medium">
          পাসওয়ার্ড
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
            className={`pr-12 ${inputClassNames} ${err ? "border-red-500" : ""}`}
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
        {err && <p className="mt-1 text-xs text-red-600 font-medium">{err}</p>}
      </div>

      {/* Register button */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary btn-block text-white text-lg gap-2"
      >
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <>
            <TbUserPlus className="text-xl" />
            রেজিস্ট্রেশন করুন
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
