import React from "react";
import products from "../../../data/toys.json";
import ProductCard from "@/components/Cards/ProductCard";

const Products = () => {
  return (
    <div>
      <h2 className="text-center text-4xl font-bold mb-10">Our Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-7">
        {products.map((product, ind) => (
          <ProductCard key={ind} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
