
import { fontBangla } from "@/lib/fonts";
import React from "react";
import { TbTruckDelivery, TbReceipt2, TbCheckupList } from "react-icons/tb";

const CartSummary = ({ subTotal }) => {
  const deliveryCharge = subTotal > 1000 ? 0 : 60; // Free delivery over 1000tk
  const tax = subTotal * 0.05; // 5% Tax
  const grandTotal = subTotal + deliveryCharge + tax;

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm sticky top-24">
      <div className="card-body p-6 space-y-4">
        <h3 className={`card-title text-xl font-bold border-b pb-3 ${fontBangla.className}`}>
          অর্ডার সামারি
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-base-content/70">সাব-টোটাল</span>
            <span className="font-semibold">৳{subTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-base-content/70">
              <TbTruckDelivery size={18} />
              <span>ডেলিভারি চার্জ</span>
            </div>
            <span className="font-semibold">
              {deliveryCharge === 0 ? (
                <span className="text-success text-sm font-bold">ফ্রি</span>
              ) : (
                `৳${deliveryCharge}`
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-base-content/70">
              <TbReceipt2 size={18} />
              <span>ভ্যাট (৫%)</span>
            </div>
            <span className="font-semibold">৳{tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="divider my-0"></div>

        <div className="flex justify-between items-center text-lg font-bold">
          <span>মোট খরচ</span>
          <span className="text-primary text-2xl">
            ৳{Math.round(grandTotal).toLocaleString()}
          </span>
        </div>

        <div className="card-actions pt-4">
          <button className="btn btn-primary btn-block btn-lg shadow-md group">
            <TbCheckupList className="text-xl group-hover:scale-110 transition-transform" />
            চেকআউট করুন
          </button>
        </div>

        <p className="text-xs text-center text-base-content/50 mt-2">
          সুরক্ষিত পেমেন্ট এবং দ্রুত ডেলিভারি নিশ্চিত করছি।
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
