import Banner from "@/components/Home/Banner/Banner";
import Products from "@/components/Home/Products/Products";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Hero Kidz | Educational & Fun Toys for Kids",
  description:
    "Explore a wide range of educational and fun toys for kids. Learning boards, creative toys, and safe play tools — only at Hero Kidz.",

  openGraph: {
    title: "Hero Kidz | Educational & Fun Toys for Kids",
    description:
      "Educational toys that make learning fun. Safe, non-toxic toys for children of all ages.",
    images: [
      {
        url: "https://i.ibb.co.com/0RjhKhST/image.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz Homepage",
      },
    ],
  },
};

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="min-h-screen space-y-20">
      <p>{JSON.stringify(session)}</p>
      <section>
        <Banner />
      </section>

      <section>
        <Products />
      </section>
    </div>
  );
}
