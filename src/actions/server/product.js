import { ObjectId } from "mongodb";

const { productsColl } = require("@/lib/dbConnect");

export const getProducts = async () => {
  const products = await productsColl.find().toArray();
  return products || [];
};

export const getSingleProducts = async (id) => {
  if (!id.length === 24) return {};

  const query = { _id: new ObjectId(id) };
  const product = await productsColl.findOne(query);
  return { ...product, _id: product._id.toString() } || {};
};
