import Link from "next/link";

import Image from "next/image";
import RegisterForm from "@/components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-4 md:p-6 lg:p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>

        {/* Form */}
        <RegisterForm />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        {/* Google login */}
        <button className="w-full border flex items-center justify-center gap-3 py-2 rounded-lg hover:bg-gray-100 transition">
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            width={20}
            height={20}
          />
          Continue with Google
        </button>

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
