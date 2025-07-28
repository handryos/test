"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ overflowX: "hidden" }}>
      <body>
        <Provider store={store}>
          <div className="animate-fade-in bg-ui-bg">{children}</div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            theme="colored"
          />
        </Provider>
      </body>
    </html>
  );
}
