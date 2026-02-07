import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import AddToCart from "../Buttons/AddToCart";

const ProductCard = ({ product }) => {
  const { _id, title, image, price, discount, ratings, reviews, sold } =
    product;

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="card bg-base-100 shadow-xl">
      {/* Image */}
      <figure className="relative h-52">
        <Image src={image} alt={title} fill className="object-contain p-4" />
      </figure>

      {/* Body */}
      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2">{title}</h2>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <FaStar className="text-yellow-400" />
          <span>{ratings}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>

        {/* Sold */}
        <p className="text-sm text-gray-500">Sold: {sold}</p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ৳{discountedPrice}
          </span>

          {discount > 0 && (
            <span className="line-through text-sm text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Button */}
        <div className="card-actions mt-2">
          <AddToCart className={`btn-block`} productId={_id.toString()} />
          <Link
            href={`/products/${_id}`}
            className="btn btn-primary btn-outline btn-sm w-full duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
