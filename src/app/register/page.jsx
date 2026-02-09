import Link from "next/link";
import RegisterForm from "@/components/Auth/RegisterForm";
import SocialLogin from "@/components/Buttons/SocialLogin";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-4 md:p-6 lg:p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>

        {/* Form */}
        <Suspense
          fallback={
            <span className="loading loading-md loading-spinner"></span>
          }
        >
          <RegisterForm />
        </Suspense>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        {/* Google login */}
        <SocialLogin />

        {/* Login link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
