"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        bottom: 20,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          padding: "14px 18px",
          borderRadius: "14px",
          fontSize: "14px",
          background: "#111",
          color: "#fff",
          border: "1px solid #222",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        },

        // SUCCESS TOAST
        success: {
          iconTheme: {
            primary: "#fc4000",
            secondary: "#fff",
          },
          style: {
            border: "1px solid #fc4000",
            background: "rgba(17,17,17,0.95)",
          },
        },

        // ERROR TOAST
        error: {
          iconTheme: {
            primary: "#ff2d2d",
            secondary: "#fff",
          },
          style: {
            border: "1px solid #ff2d2d",
            background: "rgba(17,17,17,0.95)",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
