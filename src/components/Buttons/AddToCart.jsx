"use client"
import { generateUserId } from "@/actions/server/user";
import { FaShoppingCart } from "react-icons/fa";

const AddToCart = ({ className, product }) => {
  const handleCart = () => {
    alert(product._id)
  };
  return (
    <button onClick={handleCart} className={`btn btn-primary ${className}`}>
      <FaShoppingCart />
      Add to Cart
    </button>
  );
};

export default AddToCart;
