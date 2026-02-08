import React from "react";

const CartSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Side: Product Cards List */}
      <div className="lg:col-span-8 space-y-4">
        {/* Title Skeleton */}
        <div className="skeleton h-8 w-48 mb-6"></div>

        {/* Card Skeletons */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-center justify-between p-4 border border-base-200 rounded-2xl gap-4"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="skeleton w-20 h-20 rounded-xl shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="skeleton h-5 w-40"></div>
                <div className="skeleton h-4 w-24"></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="skeleton w-8 h-8 rounded-full"></div>
              <div className="skeleton w-10 h-6"></div>
              <div className="skeleton w-8 h-8 rounded-full"></div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="skeleton h-6 w-16"></div>
              <div className="skeleton w-10 h-10 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side: Summary Sidebar Skeleton */}
      <div className="lg:col-span-4">
        <div className="card bg-base-100 border border-base-200 p-6 space-y-6">
          <div className="skeleton h-7 w-1/2 mb-2"></div> {/* Title */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-4 w-12"></div>
            </div>
            <div className="flex justify-between">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-16"></div>
            </div>
          </div>
          <div className="border-t pt-4 flex justify-between">
            <div className="skeleton h-6 w-24"></div>
            <div className="skeleton h-6 w-20"></div>
          </div>
          <div className="skeleton h-12 w-full rounded-lg"></div> {/* Button */}
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
