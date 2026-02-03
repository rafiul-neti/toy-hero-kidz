import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
});

export const metadata = {
  metadataBase: new URL("https://toy-kidz.vercel.app"),

  title: {
    default: "Toy Kidz | Educational & Fun Toys for Kids",
    template: "%s | Toy Kidz",
  },

  description:
    "Toy Kidz is an online toy store offering educational, safe, and fun toys for kids. Discover learning boards, creative toys, and play-based learning tools for your children.",

  applicationName: "Toy Kidz",

  keywords: [
    "kids toys",
    "educational toys",
    "learning toys",
    "children toys",
    "toy shop online",
    "toy kidz",
    "math learning toys",
    "preschool toys",
  ],

  authors: [{ name: "Toy Kidz Team" }],
  creator: "Toy Kidz",
  publisher: "Toy Kidz",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "Toy Kidz",
    url: "https://toy-kidz.vercel.app",
    title: "Toy Kidz | Educational & Fun Toys for Kids",
    description:
      "Buy educational and fun toys for kids. Safe, non-toxic, and designed for learning through play.",
    images: [
      {
        url: "https://i.ibb.co.com/0RjhKhST/image.png",
        width: 1200,
        height: 630,
        alt: "Toy Kidz Homepage Preview",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Toy Kidz | Educational & Fun Toys for Kids",
    description:
      "Educational, safe, and fun toys for kids. Learn through play with Toy Kidz.",
    images: ["https://i.ibb.co.com/0RjhKhST/image.png"],
  },

  icons: {
    icon: "https://i.ibb.co.com/WvCmbkBw/image.png",
    apple: "https://i.ibb.co.com/WvCmbkBw/image.png",
  },

  alternates: {
    canonical: "https://toy-kidz.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>

        <main className="py-2 md:w-11/12 mx-auto">{children}</main>

        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
