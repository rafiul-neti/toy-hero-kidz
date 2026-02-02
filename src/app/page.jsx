import Banner from "@/components/Home/Banner/Banner";
import Products from "@/components/Home/Products/Products";

export default function Home() {
  return (
    <div className="min-h-screen space-y-20">
      <section>
        <Banner />
      </section>

      <section>
        <Products />
      </section>
    </div>
  );
}
