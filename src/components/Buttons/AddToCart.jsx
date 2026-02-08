"use client";
import { addCartItemToDB } from "@/actions/server/cart";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

const AddToCart = ({ className, productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAddToCart = async () => {
    setIsLoading(true);
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      cartId = crypto.randomUUID();
      localStorage.setItem("cartId", cartId);
    }

    const result = await addCartItemToDB(productId, cartId);
    if (result.insertedId || result.matchedCount) {
      toast.success("Items successfully added to the cart.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`btn btn-primary ${className}`}
    >
      {isLoading ? (
        <CgSpinner size={25} className="animate-spin" />
      ) : (
        <>
          <FaShoppingCart /> {"Add to Cart"}{" "}
        </>
      )}
    </button>
  );
};

export default AddToCart;
