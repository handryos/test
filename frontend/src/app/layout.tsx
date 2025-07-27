"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="animate-fade-in bg-ui-bg">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
