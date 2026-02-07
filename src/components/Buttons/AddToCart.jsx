"use client";
import { addCartItemToDB } from "@/actions/server/cart";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

const AddToCart = ({ className, productId }) => {
  const handleCart = async () => {
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      cartId = crypto.randomUUID();
      localStorage.setItem("cartId", cartId);
    }

    const result = await addCartItemToDB(productId, cartId);
    if (result.insertedId || result.matchedCount) {
      toast.success("Items successfully added to the cart.");
    }
  };

  return (
    <button onClick={handleCart} className={`btn btn-primary ${className}`}>
      <FaShoppingCart />
      Add to Cart
    </button>
  );
};

export default AddToCart;
