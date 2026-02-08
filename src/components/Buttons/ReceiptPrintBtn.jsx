"use client";
import React from "react";
import { TbPrinter } from "react-icons/tb";

const ReceiptPrintBtn = () => {
  return (
    <button
      onClick={() => window.print()}
      className="btn btn-outline flex-1 gap-2 text-lg h-14"
    >
      <TbPrinter className="text-xl" />
      রশিদ প্রিন্ট করুন
    </button>
  );
};

export default ReceiptPrintBtn;
