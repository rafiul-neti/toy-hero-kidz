import React from "react";

const OrderSuccessSkeleton = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card Skeleton */}
        <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden animate-pulse">
          {/* Header Section */}
          <div className="bg-base-200 p-8 md:p-12 text-center border-b border-base-200">
            {/* Icon Skeleton */}
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-base-300"></div>
            </div>

            {/* Title Skeleton */}
            <div className="h-8 bg-base-300 rounded-lg w-3/4 mx-auto mb-4"></div>

            {/* Subtitle Skeleton */}
            <div className="h-6 bg-base-300 rounded-lg w-1/2 mx-auto"></div>
          </div>

          {/* Body Section */}
          <div className="card-body p-6 md:p-10">
            {/* Order Details Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[1, 2].map((item) => (
                <div key={item} className="space-y-3">
                  <div className="h-4 bg-base-300 rounded w-1/3"></div>
                  <div className="h-6 bg-base-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>

            {/* Info Box Skeleton */}
            <div className="bg-base-200/50 rounded-2xl p-5 mb-8 flex gap-4 items-start">
              <div className="h-10 w-10 bg-base-300 rounded-full shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-base-300 rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                  <div className="h-4 bg-base-300 rounded w-5/6"></div>
                  <div className="h-4 bg-base-300 rounded w-4/6"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="h-14 bg-base-300 rounded-lg"></div>
              </div>
              <div className="flex-1">
                <div className="h-14 bg-base-300 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="bg-base-200/30 p-4 text-center">
            <div className="h-4 bg-base-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessSkeleton;
