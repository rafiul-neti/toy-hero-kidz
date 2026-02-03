const ProductDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT: Image */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        <div className="h-87.5 skeleton rounded-lg" />
      </div>

      {/* RIGHT: Details */}
      <div className="space-y-4">
        {/* Title */}
        <div className="h-6 skeleton w-3/4" />
        <div className="h-5 skeleton w-1/2" />

        {/* Rating */}
        <div className="flex gap-2 items-center">
          <div className="h-4 w-4 skeleton rounded-full" />
          <div className="h-4 skeleton w-12" />
          <div className="h-4 skeleton w-24" />
          <div className="h-4 skeleton w-20" />
        </div>

        {/* Price */}
        <div className="flex gap-3 items-center">
          <div className="h-8 skeleton w-24" />
          <div className="h-5 skeleton w-16" />
          <div className="h-5 skeleton w-14" />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <div className="h-10 skeleton w-36 rounded-lg" />
          <div className="h-10 skeleton w-28 rounded-lg" />
        </div>

        {/* Info bullets */}
        <div className="pt-4 space-y-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <div className="h-4 w-4 skeleton rounded-full" />
              <div className="h-4 skeleton w-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="lg:col-span-2 bg-base-100 rounded-xl shadow p-6 space-y-3">
        <div className="h-6 skeleton w-48" />
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="h-4 skeleton w-full" />
        ))}
      </div>

      {/* Q&A */}
      <div className="lg:col-span-2 bg-base-100 rounded-xl shadow p-6 space-y-4">
        <div className="h-6 skeleton w-56" />

        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <div className="h-4 skeleton w-3/4" />
            <div className="h-4 skeleton w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
