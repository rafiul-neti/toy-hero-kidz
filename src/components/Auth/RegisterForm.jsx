"use client";
import { postUser } from "@/actions/server/user";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const params = useSearchParams();
  const router = useRouter();

  const inputClassNames = `w-full px-1 md:px-2 lg:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300`;

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 8) {
      setErr("Password must be 8 characters or longer!");
      return;
    }

    const userInfo = {
      name,
      email,
      password,
    };

    const result = await postUser(userInfo);

    if (result.insertedId) {
      toast.success("Registration Successful. Please Login.");
      const autoLoginUser = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (autoLoginUser.ok) {
        router.push(params.get("callbackUrl") || "/login");
      } else {
      }
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter your full name"
          className={`${inputClassNames}`}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className={`${inputClassNames}`}
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
            className={`pr-12 ${inputClassNames}`}
            required
          />

          {err && <small className="my-1 text-red-700">{err}</small>}

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

      {/* Register button */}
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-semibold transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
