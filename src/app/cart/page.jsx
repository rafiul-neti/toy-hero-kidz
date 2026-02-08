import Cart from "@/components/Cart/Cart";
import React from "react";

const CartPage = async () => {
  return (
    <section>
      <div className="mt-14 mb-8">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Cart
        </h2>
      </div>

      <div className="pl-5">
        <Cart />
      </div>
    </section>
  );
};

export default CartPage;
