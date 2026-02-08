"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const CartButton = () => {
  const session = useSession();
  const router = useRouter();
  const islogin = session?.status === "authenticated";

  const handleGoToCart = () => {
    // 1. Force the dropdown to close by blurring the active element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // 2. Navigation Logic
    if (islogin) {
      router.push("/cart");
    } else {
      router.push(`/login?callbackUrl=/cart`);
    }
  };

  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-primary btn-outline btn-circle"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />{" "}
            </svg>
            <span className="badge badge-sm bg-red-600 text-white indicator-item left-1">
              {3}
            </span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">{3} Items</span>
            <span className="text-info">Subtotal: $999</span>
            <div className="card-actions">
              <button
                onClick={handleGoToCart}
                className="btn btn-primary btn-block"
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartButton;
