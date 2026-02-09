import React from "react";
import Link from "next/link";
import { TbError404, TbHome, TbSearch, TbArrowLeft } from "react-icons/tb";
import { fontBangla } from "@/lib/fonts";

const NotFound = () => {
  return (
    <div
      className={`min-h-[70vh] flex items-center justify-center px-4 ${fontBangla.className} antialiased`}
    >
      <div className="max-w-md w-full text-center">
        {/* Animated Icon Section */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150"></div>
          <TbSearch className="text-9xl text-primary animate-pulse relative z-10" />
          <div className="absolute -top-2 -right-2">
            <TbError404 className="text-5xl text-secondary rotate-12" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-black mb-4 text-base-content">
          অর্ডারটি খুঁজে পাওয়া যাচ্ছে না!
        </h1>
        <p className="text-base-content/70 text-lg mb-10 leading-relaxed">
          দুঃখিত, আপনি যে অর্ডার আইডিটি খুঁজছেন তা সঠিক নয় অথবা ডাটাবেজে পাওয়া
          যায়নি। দয়া করে সঠিক লিঙ্কটি চেক করুন।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="btn btn-primary btn-lg gap-3 text-lg h-14 shadow-lg shadow-primary/20"
          >
            <TbHome className="text-2xl" />
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/products"
            className="btn btn-outline btn-lg gap-3 text-lg h-14"
          >
            <TbArrowLeft className="text-2xl" />
            কেনাকাটা চালিয়ে যান
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-5 pt-8 border-t border-base-200">
          <p className="text-sm opacity-80">
            আপনার যদি মনে হয় এটি কোনো কারিগরি ত্রুটি, তবে আমাদের সাপোর্ট টিমে
            যোগাযোগ করুন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
