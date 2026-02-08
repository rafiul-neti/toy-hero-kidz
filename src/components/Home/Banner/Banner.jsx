import React from "react";
import Image from "next/image";
import { fontBangla } from "@/lib/fonts";

const Banner = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 space-y-5">
        <h1 className={`text-6xl font-bold ${fontBangla.className} leading-20`}>
          আপনার শিশুকে দিন একটি <span className="text-primary">সুন্দর ভবিষ্যৎ</span>
        </h1>
        <p className="">Buy every toy with upto 15% Discount</p>
        <button className="btn btn-primary btn-outline">Explore Toys</button>
      </div>

      <div className="flex-1">
        <Image
          src="/assets/hero.png"
          alt="hero_image"
          width={500}
          height={400}
        ></Image>
      </div>
    </div>
  );
};

export default Banner;
