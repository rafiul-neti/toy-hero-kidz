"use client";
import { generateUserId } from "@/actions/server/user";
import { FaShoppingCart } from "react-icons/fa";

const AddToCart = ({ className }) => {
  const handleCart = () => {
    console.log(generateUserId());
  };
  return (
    <button onClick={handleCart} className={`btn btn-primary ${className}`}>
      <FaShoppingCart />
      Add to Cart
    </button>
  );
};

export default AddToCart;
