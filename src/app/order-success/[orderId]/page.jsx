import React from "react";
import Link from "next/link";
import {
  TbCircleCheckFilled,
  TbTruckDelivery,
  TbShoppingBag,
} from "react-icons/tb";
import { fontBangla } from "@/lib/fonts";
import ReceiptPrintBtn from "@/components/Buttons/ReceiptPrintBtn";
import { findSingleOrder } from "@/actions/server/order";
import { notFound } from "next/navigation";

const OrderSuccessPage = async ({ params }) => {
  const { orderId } = await params;

  // 1. Validate ID Format first
  // Only 24-character hex strings are valid Mongo IDs
  const isValidId = /^[0-9a-fA-F]{24}$/.test(orderId);

  // to trigger 404 for weird URLs.
  if (!isValidId) {
    notFound();
  }

  // 2. Fetch the order
  const order = await findSingleOrder(orderId);

  // If the ID is 24 chars but no such order exists in DB
  if (!order) {
    notFound();
  }

  return (
    <div
      className={`min-h-[80vh] flex items-center justify-center p-4 ${fontBangla.className} antialiased`}
    >
      <div className="max-w-2xl w-full">
        {/* Main Success Card */}
        <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500">
          {/* Header Section */}
          <div className="bg-primary/5 p-8 md:p-12 text-center border-b border-base-200">
            <div className="flex justify-center mb-4">
              <TbCircleCheckFilled className="text-7xl text-success animate-bounce" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2 tracking-tight">
              অর্ডারটি সফল হয়েছে!
            </h1>
            <p className="text-base-content/70 text-lg">
              আমাদের সাথে কেনাকাটা করার জন্য আপনাকে ধন্যবাদ।
            </p>
          </div>

          <div className="card-body p-6 md:p-10">
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-base-200/30 rounded-xl border border-base-200/50">
                <span className="text-xs opacity-60 block uppercase font-bold tracking-widest mb-1">
                  অর্ডার নম্বর
                </span>
                <span className="text-md font-mono font-bold text-primary break-all">
                  #{orderId}
                </span>
              </div>
              <div className="p-4 bg-base-200/30 rounded-xl border border-base-200/50">
                <span className="text-xs opacity-60 block uppercase font-bold tracking-widest mb-1">
                  পেমেন্ট মেথড
                </span>
                <span className="text-lg font-bold">ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>

            {/* Steps / Info */}
            <div className="bg-primary/5 rounded-2xl p-6 mb-8 flex gap-5 items-start border border-primary/10">
              <div className="p-3 bg-primary text-white rounded-full">
                <TbTruckDelivery className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1 text-primary">
                  পরবর্তী ধাপ
                </h4>
                <p className="text-md opacity-80 leading-relaxed">
                  আমাদের প্রতিনিধি কল করে অর্ডারটি কনফার্ম করবেন। কনফার্ম হওয়ার
                  ৪৮-৭২ ঘণ্টার মধ্যে পণ্যটি আপনার হাতে পৌঁছে যাবে।
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="btn btn-primary flex-1 gap-2 text-lg h-14 shadow-lg shadow-primary/20"
              >
                <TbShoppingBag className="text-2xl" />
                আরও কেনাকাটা করুন
              </Link>
              <ReceiptPrintBtn />
            </div>
          </div>

          <div className="bg-base-200/50 p-4 text-center border-t border-base-200">
            <p className="text-sm opacity-70">
              সরাসরি সহায়তা পেতে:{" "}
              <span className="font-bold">+৮৮০ ১৭XXXXXXXX</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
