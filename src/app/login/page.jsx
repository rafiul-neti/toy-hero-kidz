import LoginForm from "@/components/Auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to HeroKidz
        </h1>

        {/* Form */}
        <LoginForm />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="grow h-px bg-gray-300" />
        </div>

        {/* Google login */}
        <button
          className="w-full border flex items-center justify-center gap-3 
          py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            width={20}
            height={20}
          />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Register toggle */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
