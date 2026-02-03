"use client"
import NotError from "@/components/Errors/NotError";
import React from "react";

const error = () => {
  return <NotError text={`Something Went Wrong`} />;
};

export default error;
