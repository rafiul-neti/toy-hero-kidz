import React from "react";
import Link from "next/link";
import {
  TbCircleCheckFilled,
  TbTruckDelivery,
  TbShoppingBag,
} from "react-icons/tb";
import { fontBangla } from "@/lib/fonts";
import ReceiptPrintBtn from "@/components/Buttons/ReceiptPrintBtn";
import OrderSuccessSkeleton from "@/components/SkeletonLoaders/OrderSuccessSkeleton";

const OrderSuccessPage = async ({ params }) => {
  const { orderId } = await params;

  // Show skeleton while loading
  if (!orderId) {
    return <OrderSuccessSkeleton />;
  }

  return (
    <div
      className={`min-h-[80vh] flex items-center justify-center p-4 ${fontBangla.className} antialiased`}
    >
      <div className="max-w-2xl w-full">
        {/* Main Success Card */}
        <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden">
          <div className="bg-primary/5 p-8 md:p-12 text-center border-b border-base-200">
            <div className="flex justify-center mb-4">
              <TbCircleCheckFilled className="text-7xl text-success animate-bounce" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
              অর্ডারটি সফল হয়েছে!
            </h1>
            <p className="text-base-content/70 text-lg">
              আমাদের সাথে কেনাকাটা করার জন্য আপনাকে ধন্যবাদ।
            </p>
          </div>

          <div className="card-body p-6 md:p-10">
            {/* Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <span className="text-sm opacity-60 block uppercase tracking-wider">
                  অর্ডার নম্বর
                </span>
                <span className="text-lg font-mono font-bold text-primary break-all">
                  #{orderId}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-sm opacity-60 block uppercase tracking-wider">
                  পেমেন্ট মেথড
                </span>
                <span className="text-lg font-bold flex items-center gap-2">
                  ক্যাশ অন ডেলিভারি (COD)
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-base-200/50 rounded-2xl p-5 mb-8 flex gap-4 items-start">
              <TbTruckDelivery className="text-3xl text-primary shrink-0" />
              <div>
                <h4 className="font-extrabold text-[24px] mb-1 tracking-widest">
                  পরবর্তী ধাপ
                </h4>
                <p className="text-lg opacity-90 leading-relaxed tracking-wide">
                  আমাদের একজন প্রতিনিধি আপনার মোবাইল নম্বরে ফোন করে অর্ডারটি
                  কনফার্ম করবেন। কনফার্ম হওয়ার ৪৮-৭২ ঘণ্টার মধ্যে আপনি ডেলিভারি
                  পেয়ে যাবেন।
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="btn btn-primary flex-1 gap-2 text-lg h-14"
              >
                <TbShoppingBag className="text-xl" />
                আরও কেনাকাটা করুন
              </Link>
              <ReceiptPrintBtn />
            </div>
          </div>

          <div className="bg-base-200/30 p-4 text-center">
            <p className="text-sm">
              কোনো জিজ্ঞাসা থাকলে কল করুন: +৮৮০ ১৭XXXXXXXX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default OrderSuccessPage;
