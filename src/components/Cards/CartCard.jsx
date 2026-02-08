"use client";

import { deleteCartItem } from "@/actions/server/cart";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartCard = ({
  item,
  handleItemQuantity,
  handleDeleteClick,
  isUpdating,
}) => {
  const { title, image, price, quantity, productId, cartId } = item;
  const totalPrice = price * quantity;

  return (
    <div
      className="flex items-center gap-4 border border-gray-300 rounded-xl p-1.5 
                 bg-white shadow-sm"
    >
      {/* image */}
      <div className="w-20 h-20 relative shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* title */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-500">
          ৳{price} × {quantity}
        </p>
      </div>

      {/* quantity controller */}
      <div className="flex items-center gap-2">
        {/* minus */}
        <button
          onClick={() => handleItemQuantity(productId, cartId, false)}
          disabled={quantity <= 1 || isUpdating}
          className={`p-1.5 rounded border transition cursor-pointer 
          ${
            quantity <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <FaMinus size={12} />
        </button>

        <span className="w-6 text-center text-sm font-medium">{quantity}</span>

        {/* plus */}
        <button
          disabled={quantity >= 10 || isUpdating}
          onClick={() => handleItemQuantity(productId, cartId, true)}
          className={`p-1.5 rounded border hover:bg-gray-100 transition cursor-pointer ${
            quantity >= 10
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <FaPlus size={12} />
        </button>
      </div>

      {/* price */}
      <div className="w-20 text-right font-semibold text-sm">৳{totalPrice}</div>

      {/* delete */}
      <button
        onClick={handleDeleteClick}
        className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartCard;
