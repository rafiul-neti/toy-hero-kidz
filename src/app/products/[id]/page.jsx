import { getSingleProducts } from "@/actions/server/product";
import React from "react";
import Image from "next/image";
import { FaStar, FaShoppingCart, FaCheck } from "react-icons/fa";
import AddToCart from "@/components/Buttons/AddToCart";

const ProducDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProducts(id);

  const {
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT: Image */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        <div className="relative h-87.5">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </div>

      {/* RIGHT: Details */}
      <div className="space-y-4">
        {/* Title */}
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg text-gray-500">{bangla}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          <span className="font-medium">{ratings}</span>
          <span className="text-gray-500">({reviews} reviews)</span>
          <span className="text-gray-400">• Sold {sold}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">
            ৳{discountedPrice}
          </span>

          {discount > 0 && (
            <>
              <span className="line-through text-gray-400">৳{price}</span>
              <span className="badge badge-success">{discount}% OFF</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <AddToCart className={`gap-2`} />
          <button className="btn btn-outline">Buy Now</button>
        </div>

        {/* Info bullets */}
        <div className="pt-4 space-y-2">
          {info.map((item, idx) => (
            <p key={idx} className="flex items-center gap-2 text-sm">
              <FaCheck className="text-success" />
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="lg:col-span-2 bg-base-100 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Product Description</h2>
        <p className="whitespace-pre-line text-gray-600">{description}</p>
      </div>

      {/* Q&A */}
      <div className="lg:col-span-2 bg-base-100 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Questions & Answers</h2>

        <div className="space-y-3">
          {qna.map((item, idx) => (
            <div key={idx} className="border-b pb-3">
              <p className="font-medium">{item.question}</p>
              <p className="text-gray-600 text-sm mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducDetails;
