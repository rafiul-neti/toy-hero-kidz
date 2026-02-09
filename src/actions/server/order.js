"use server";

import { authOptions } from "@/lib/authOptions";
import { cartsColl, ordersColl } from "@/lib/dbConnect";
import { orderInvoiceTemplate } from "@/lib/emailInvoice";
import { sendEmail } from "@/lib/sendEmail";
import { getServerSession } from "next-auth";

export const confirmOrder = async (formData, cartId) => {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return { success: false, message: "অর্ডার করতে লগইন করুন" };

  let createdOrderId = null;

  try {
    const userEmail = session.user.email;

    // 1. Fetch Cart Items
    const cartItems = await cartsColl.find({ cartId }).toArray();
    if (!cartItems || cartItems.length === 0) throw new Error("EMPTY_CART");

    // 2. Server-side Calculation
    const subTotal = cartItems.reduce((acc, item) => {
      const discountedPrice = Math.round(
        item.price - item.price * (item.discount / 100),
      );
      return acc + discountedPrice * item.quantity;
    }, 0);
    const deliveryCharge = subTotal > 1000 ? 0 : 60;
    const tax = subTotal * 0.05;
    const grandTotal = Math.round(subTotal + deliveryCharge + tax);

    // 3. Prepare Order
    const orderDoc = {
      userId: userEmail,
      customerName: session.user.name,
      customerEmail: userEmail,
      phone: formData.phone,
      address: formData.address,
      items: cartItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        priceAtPurchase: Math.round(
          item.price - item.price * (item.discount / 100),
        ),
        quantity: item.quantity,
        image: item.image,
      })),
      pricing: { subTotal, deliveryCharge, tax, grandTotal },
      status: "pending",
      paymentMethod: "COD",
      createdAt: new Date(),
    };

    // 4. STEP 1: Insert Order
    const orderResult = await ordersColl.insertOne(orderDoc);
    createdOrderId = orderResult.insertedId; // Track this for manual rollback

    // 5. STEP 2: Delete Cart
    const deleteResult = await cartsColl.deleteMany({ cartId });

    if (deleteResult.deletedCount === 0) {
      // If cart deletion fails, we "Rollback" by deleting the order we just made
      await ordersColl.deleteOne({ _id: createdOrderId });
      throw new Error("DELETE_FAILED");
    }

    // 📧 Send Invoice Email
    sendEmail({
      to: session?.user.email,
      subject: "Your Order Invoice - Hero Kidz",
      html: orderInvoiceTemplate({
        orderId: orderResult.insertedId.toString(),
        items: cartItems,
        grandTotal,
      }),
    }).catch((err) =>
      console.error("Email sending failed, but order is safe:", err),
    );;

    return {
      success: true,
      message: "আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!",
      orderId: orderResult.insertedId.toString(),
    };
  } catch (error) {
    console.error("Order Process Error:", error.message);

    // If the order was created but something failed later, clean it up!
    if (createdOrderId && error.message !== "EMPTY_CART") {
      await ordersColl.deleteOne({ _id: createdOrderId });
    }

    const userMessage =
      error.message === "EMPTY_CART"
        ? "আপনার কার্টটি খালি।"
        : "দুঃখিত, অর্ডারটি সম্পন্ন করা যায়নি।";

    return { success: false, message: userMessage };
  }
};
