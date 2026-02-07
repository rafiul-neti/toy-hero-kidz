"use server";

import { cartsColl, productsColl } from "@/lib/dbConnect";

const { ObjectId } = require("mongodb");

export const addCartItemToDB = async (productId, cartId) => {
  const updateResult = await cartsColl.updateOne(
    { productId, cartId },
    { $inc: { quantity: 1 } },
  );

  if (updateResult.matchedCount > 0) {
    return updateResult;
  }

  const product = await productsColl.findOne(
    { _id: new ObjectId(productId) },
    { projection: { title: 1, image: 1, price: 1 } },
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
    quantity: 1,
  });

  return { ...result, insertedId: result.insertedId.toString() };
};
