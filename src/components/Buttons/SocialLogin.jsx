"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

const SocialLogin = () => {
  const params = useSearchParams();
  const handleGoogleSignIn = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className={`w-full border flex items-center justify-center gap-3 
                  py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer`}
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
  );
};

export default SocialLogin;
