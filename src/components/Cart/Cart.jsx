"use client";
import React, { useEffect, useMemo, useState } from "react";
import { TbHorseToy } from "react-icons/tb";
import CartCard from "@/components/Cards/CartCard";
import Link from "next/link";
import {
  addCartItemToDB,
  getCartItemsFromDB,
  deleteCartItem,
} from "@/actions/server/cart";
import CartSkeleton from "../SkeletonLoaders/CartSkeleton";
import CartSummary from "./CartSummary";
import DeleteConfirmModal from "@/components/Modals/DeleteConfirmModal";
import { fontBangla } from "@/lib/fonts";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // State for Modal and Deletion logic
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        let cartId = localStorage.getItem("cartId");
        if (!cartId) {
          cartId = crypto.randomUUID();
          localStorage.setItem("cartId", cartId);
        }
        const { result } = await getCartItemsFromDB(cartId);
        setCartItems(result || []);
      } catch (error) {
        console.error("Failed to fetch cart", error);
        toast.error("কার্ট লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    getCartItems();
  }, []);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((accum, item) => accum + item.price * item.quantity, 0),
    [cartItems],
  );

  // --- Quantity Update Logic (Optimistic) ---
  const handleItemQuantity = async (productId, cartId, incr) => {
    const initialItems = [...cartItems];

    // Optimistic Update
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: incr ? item.quantity + 1 : item.quantity - 1 }
          : item,
      ),
    );

    setUpdatingId(productId);
    try {
      const result = await addCartItemToDB(productId, cartId, incr);
      if (!result.matchedCount) throw new Error("Update failed");
    } catch (error) {
      setCartItems(initialItems); // Rollback
      toast.error("পরিমাণ আপডেট করা সম্ভব হয়নি");
    } finally {
      setUpdatingId(null);
    }
  };

  // --- Deletion Logic ---
  const openDeleteModal = (item) => setItemToDelete(item);
  const closeDeleteModal = () => setItemToDelete(null);

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteCartItem(itemToDelete._id);
      if (result) {
        setCartItems((prev) => prev.filter((i) => i._id !== itemToDelete._id));
        toast.success(`${itemToDelete.title} মুছে ফেলা হয়েছে`);
        closeDeleteModal();
      }
    } catch (error) {
      toast.error("মুছে ফেলা সম্ভব হয়নি");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 min-h-screen">
      {loading ? (
        <div className="my-10">
          <CartSkeleton />
        </div>
      ) : cartItems.length === 0 ? (
        <div className="my-10 text-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300 space-y-5">
          <h2
            className={`text-4xl font-bold text-base-content/80 ${fontBangla.className}`}
          >
            আপনি কার্টে কোন প্রোডাক্ট এড করেন নি
          </h2>
          <Link href="/products" className="btn btn-primary btn-lg btn-wide">
            <TbHorseToy size={24} /> পন্য দেখুন
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10">
          {/* LEFT SIDE: Items List */}
          <div className="lg:col-span-8 space-y-4">
            <h1 className={`text-3xl font-bold mb-6 ${fontBangla.className}`}>
              আপনার শপিং কার্ট ({cartItems.length})
            </h1>
            {cartItems.map((item) => (
              <CartCard
                key={item._id}
                item={item}
                handleDeleteClick={() => openDeleteModal(item)}
                handleItemQuantity={handleItemQuantity}
                isUpdating={updatingId === item.productId}
              />
            ))}
          </div>

          {/* RIGHT SIDE: Summary */}
          <div className="lg:col-span-4">
            <CartSummary subTotal={cartTotal} />
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!itemToDelete}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Cart;
