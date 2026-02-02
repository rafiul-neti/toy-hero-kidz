const ProductCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      {/* Image skeleton */}
      <div className="h-52 skeleton rounded-t-xl" />

      <div className="card-body p-4 space-y-3">
        {/* Title */}
        <div className="h-4 skeleton w-3/4" />
        <div className="h-4 skeleton w-1/2" />

        {/* Rating */}
        <div className="h-3 skeleton w-1/3" />

        {/* Sold */}
        <div className="h-3 skeleton w-1/4" />

        {/* Price */}
        <div className="flex gap-2">
          <div className="h-4 skeleton w-16" />
          <div className="h-4 skeleton w-12" />
        </div>

        {/* Button */}
        <div className="h-9 skeleton w-full rounded-lg" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
