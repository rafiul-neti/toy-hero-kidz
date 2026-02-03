import Link from "next/link";
import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

const NotError = ({text}) => {
  return (
    <div className="min-h-screen flex gap-5 flex-col items-center justify-center">
      <BiSolidErrorAlt size={180} className="text-primary" />
      <h1 className="text-4xl font-bold">{text}</h1>
      <Link href={"/"} className="btn btn-primary btn-outline btn-wide">
        Go Home
      </Link>
    </div>
  );
};

export default NotError;
