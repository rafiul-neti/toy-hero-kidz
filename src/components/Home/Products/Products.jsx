import React from "react";
import ProductCard from "@/components/Cards/ProductCard";
import { getProducts } from "@/actions/server/product";
import ProductCardSkeleton from "@/components/SkeletonLoaders/ProductCardSkeleton";

const Products = async () => {
  const products = (await getProducts()) || [];
  return (
    <div>
      <h2 className="text-center text-4xl font-bold mb-10">Our Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-7">
        {!products.length ? (
          <ProductCardSkeleton />
        ) : (
          products.map((product, ind) => (
            <ProductCard key={ind} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
