"use client";
import React, { useEffect, useState, useMemo } from "react";
import { getCartItemsFromDB } from "@/actions/server/cart";
import { fontBangla } from "@/lib/fonts";
import {
  TbTruckDelivery,
  TbMapPin,
  TbPhone,
  TbUser,
  TbPackage,
  TbMail,
} from "react-icons/tb";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { confirmOrder } from "@/actions/server/order";
import { useRouter } from "next/navigation"; // Added for redirecting

const CheckOut = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button loading
  const [formData, setFormData] = useState({ phone: "", address: "" });

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        if (cartId) {
          const { result } = await getCartItemsFromDB(cartId);
          setCartItems(result || []);
        }
      } catch (error) {
        toast.error("তথ্য লোড করতে সমস্যা হয়েছে");
      } finally {
        setCartLoading(false);
      }
    };
    fetchCheckoutData();
  }, []);

  const subTotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = async () => {
    const { phone, address } = formData;
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    // 1. Validation
    if (!bdPhoneRegex.test(phone)) {
      toast.error("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন");
      return;
    }
    if (address.length < 10) {
      toast.error("বিস্তারিত ঠিকানা প্রদান করুন (কমপক্ষে ১০ অক্ষর)");
      return;
    }

    // 2. Execution
    setIsSubmitting(true);
    const loadingToast = toast.loading("অর্ডারটি প্রসেস করা হচ্ছে...");

    try {
      const cartId = localStorage.getItem("cartId");

      // We pass formData and cartId. Remember, prices are recalculated on server!
      const response = await confirmOrder(formData, cartId);

      if (response.success) {
        toast.success(response.message, { id: loadingToast });
        // Optional: Clear cartId from localStorage if you don't use it elsewhere
        // localStorage.removeItem("cartId");

        // Redirect to a success page or home
        router.push(`/order-success/${response.orderId}`);
      } else {
        toast.error(response.message, { id: loadingToast });
      }
    } catch (error) {
      toast.error("দুঃখিত, কারিগরি সমস্যার কারণে অর্ডারটি সম্পন্ন হয়নি", {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || cartLoading) {
    return (
      <div className="container mx-auto p-20 text-center text-lg">
        লোড হচ্ছে...
      </div>
    );
  }

  const deliveryCharge = subTotal > 1000 ? 0 : 60;
  const tax = subTotal * 0.05;
  const grandTotal = subTotal + deliveryCharge + tax;

  return (
    <div
      className={`container mx-auto px-4 lg:px-0 my-10 ${fontBangla.className} antialiased`}
    >
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <TbPackage className="text-primary" /> শিপিং এবং পেমেন্ট
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body p-6 md:p-8">
              <h2 className="card-title text-xl mb-4 border-b pb-2 font-bold">
                ডেলিভারি তথ্য
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-base font-semibold">
                        আপনার নাম
                      </span>
                    </label>
                    <label className="input input-bordered flex items-center gap-3 bg-base-200/50 cursor-not-allowed h-12">
                      <TbUser className="opacity-60" />
                      <input
                        type="text"
                        value={session?.user?.name || ""}
                        readOnly
                        className="grow text-base"
                      />
                    </label>
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-base font-semibold">
                        ইমেইল ঠিকানা
                      </span>
                    </label>
                    <label className="input input-bordered flex items-center gap-3 bg-base-200/50 cursor-not-allowed h-12">
                      <TbMail className="opacity-60" />
                      <input
                        type="email"
                        value={session?.user?.email || ""}
                        readOnly
                        className="grow text-base"
                      />
                    </label>
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label w-full">
                    <span className="label-text text-base font-bold text-primary">
                      মোবাইল নম্বর (১১ ডিজিট) *
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 h-12 focus-within:outline-primary w-full">
                    <TbPhone className="opacity-60" />
                    <input
                      name="phone"
                      type="tel"
                      className="grow text-base"
                      placeholder="017XXXXXXXX"
                      onChange={handleChange}
                      maxLength={11}
                      disabled={isSubmitting}
                    />
                  </label>
                </div>

                <div className="form-control w-full">
                  <label className="label w-full">
                    <span className="label-text text-base font-bold text-primary">
                      বিস্তারিত ঠিকানা (বাসা/রোড/এলাকা) *
                    </span>
                  </label>
                  <label className="textarea textarea-bordered flex gap-3 pt-3 focus-within:outline-primary min-h-24 w-full">
                    <TbMapPin className="opacity-60 mt-1" />
                    <textarea
                      name="address"
                      className="grow outline-none resize-none bg-transparent text-base"
                      placeholder="আপনার সম্পূর্ণ ঠিকানা এখানে লিখুন..."
                      onChange={handleChange}
                      disabled={isSubmitting}
                    ></textarea>
                  </label>
                </div>

                <div className="bg-info/10 p-4 rounded-xl flex gap-3 mt-4 border border-info/20">
                  <TbTruckDelivery className="text-info text-2xl shrink-0" />
                  <p className="text-sm">
                    <strong>ক্যাশ অন ডেলিভারি:</strong> পণ্য হাতে পাওয়ার পর
                    মূল্য পরিশোধ করুন। বর্তমানে আমরা সারা বাংলাদেশে হোম ডেলিভারি
                    দিচ্ছি।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="card bg-base-100 border border-base-200 shadow-sm sticky top-24">
            <div className="card-body p-6">
              <h2 className="card-title text-xl border-b pb-3 mb-4 font-bold">
                অর্ডার সামারি
              </h2>

              <div className="max-h-56 overflow-y-auto space-y-3 mb-4 pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 items-center border-b border-base-100 pb-2"
                  >
                    <div className="relative w-12 h-12 shrink-0 border rounded-lg overflow-hidden bg-base-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs opacity-60">
                        ৳{item.price} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-sm">
                      ৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between opacity-70">
                  <span>সাব-টোটাল</span>
                  <span>৳{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>ডেলিভারি চার্জ</span>
                  <span>
                    {deliveryCharge === 0 ? "ফ্রি" : `৳${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>ভ্যাট (৫%)</span>
                  <span>৳{tax.toFixed(2)}</span>
                </div>
                <div className="divider my-1 opacity-50"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>সর্বমোট</span>
                  <span className="text-primary text-xl font-bold">
                    ৳{Math.round(grandTotal).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirmOrder}
                disabled={isSubmitting || cartItems.length === 0}
                className={`btn btn-primary btn-block mt-6 text-lg h-12 ${isSubmitting ? "loading" : ""}`}
              >
                {isSubmitting ? "অর্ডার হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
