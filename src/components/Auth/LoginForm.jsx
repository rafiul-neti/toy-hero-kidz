"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const params = useSearchParams();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: params.get("callbackUrl"),
    });
    if (!result.ok) {
      toast.error("Please Enter Valid Credentials!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-300`}
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          {/* Toggle button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-500 hover:text-gray-700`}
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
          Forgot password?
        </Link>
      </div>

      {/* Login button */}
      <button type="submit" className={`btn btn-primary text-white btn-block`}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
