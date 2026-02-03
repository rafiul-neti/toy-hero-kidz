import Logo from "@/components/Logo/Logo";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
      <h1 className="text-3xl font-extrabold animate-pulse">Loading...</h1>

      <div className="animate-ping">
        <Logo />
      </div>
    </div>
  );
};

export default loading;
