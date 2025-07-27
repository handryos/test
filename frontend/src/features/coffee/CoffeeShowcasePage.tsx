"use client";
import React from "react";
import { ShowcaseHeader } from "./components/ShowcaseHeader";
import { ShowcaseBody } from "./components/ShowcaseBody";
import { ShowcaseFooter } from "./components/ShowcaseFooter";

export const CoffeeShowcasePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-light via-coffee-medium to-coffee-dark flex flex-col items-center">
      <ShowcaseHeader />
      <ShowcaseBody />
      <ShowcaseFooter />
    </div>
  );
};
