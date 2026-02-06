import { generateUserId, loginUser } from "@/actions/server/user";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { usersColl } from "./dbConnect";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log(credentials);
        const user = await loginUser(credentials);
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials });

      const isExist = await usersColl.findOne({
        email: user.email,
        provider: account?.provider,
      });
      if (isExist) {
        return true;
      }

      const newUser = {
        userId: await generateUserId(),
        provider: account?.provider,
        name: user.name,
        image: user.image,
        email: user.email,
        role: "user",
      };
      const result = await usersColl.insertOne(newUser);
      return result.acknowledged;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, token, user }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};
