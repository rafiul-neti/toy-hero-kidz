"use server";

import { cartsColl, productsColl } from "@/lib/dbConnect";
// import { revalidatePath } from "next/cache";
import { cache } from "react";

const { ObjectId } = require("mongodb");

export const addCartItemToDB = async (productId, cartId, incr = true) => {
  const updateResult = await cartsColl.updateOne(
    { productId, cartId },
    { $inc: { quantity: incr ? 1 : -1 } },
  );

  if (updateResult.matchedCount > 0) {
    return JSON.parse(JSON.stringify(updateResult));
  }

  const product = await productsColl.findOne(
    { _id: new ObjectId(productId) },
    { projection: { title: 1, image: 1, price: 1, discount: 1 } },
  );

  if (!product) {
    throw new Error("Product not found");
  }

  const result = await cartsColl.insertOne({
    productId,
    cartId,
    title: product.title,
    image: product.image,
    price: product.price,
    discount: product.discount,
    quantity: 1,
  });

  return { ...result, insertedId: result.insertedId.toString() };
};

export const getCartItemsFromDB = cache(async (cartOwnerId) => {
  const docs = await cartsColl.find({ cartId: cartOwnerId }).toArray();
  const result = docs.map((doc) => ({
    ...doc,
    price: Math.round(doc.price - doc.price * (doc.discount / 100)),
    _id: doc._id.toString(),
  }));
  return { result, totalItems: result.length } || {};
});

export const deleteCartItem = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await cartsColl.deleteOne(query);
  return Boolean(result.deletedCount);
};
