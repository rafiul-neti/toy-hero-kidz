"use server";
import { usersColl } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function generateUserId() {
  const prefix = "USER";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = crypto.randomUUID().toString("hex").toUpperCase();

  return `${prefix}-${date}-${random}`;
}

export const postUser = async (payload) => {
  const { name, email, password } = payload;

  //checking the payload is valid or not
  if (
    !email ||
    !password ||
    !typeof email === "string" ||
    !email.includes("@")
  ) {
    return { message: "please enter valid credentials." };
  }

  // checking the user is exist or not
  const isExist = await usersColl.findOne({ email });
  if (isExist) {
    return { message: "an user already exists with this email!" };
  }

  // create user
  const newUser = {
    userId: await generateUserId(),
    provider: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 14),
    role: "user",
  };

  // insert the user into database
  const result = await usersColl.insertOne(newUser);

  if (result.acknowledged) {
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
  }
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  //checking the payload is valid or not
  if (
    !email ||
    !password ||
    !typeof email === "string" ||
    !email.includes("@")
  ) {
    return null;
  }

  // checking the user is exist or not
  const user = await usersColl.findOne({ email });
  if (!user) {
    return null;
  }

  // checking password
  const isMatched = await bcrypt.compare(password, user.password);
  if (isMatched) return user;
  else return null;
};
