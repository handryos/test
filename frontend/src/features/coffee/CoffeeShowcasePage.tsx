"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShowcaseHeader } from "./components/ShowcaseHeader";
import { ShowcaseBody } from "./components/ShowcaseBody";
import { ShowcaseFooter } from "./components/ShowcaseFooter";
import { CoffeeCard } from "./components/CoffeeCard";
import { CreateCoffeeButton } from "./components/CreateCoffeeButton";
import { Typography } from "@/shared/components/ui/Typography";
import { CoffeeTypeFilter } from "./components/CoffeeTypeFilter";

type CoffeeType = "Arabic" | "Robusta";

interface Coffee {
  type: CoffeeType;
  name: string;
  price: number;
  imageUrl: string;
}

const coffeeData = [
  {
    id: 1,
    type: "Arabic" as const,
    name: "Dark Roast",
    description: "Free in the MVST office",
    price: 19.0,
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    type: "Robusta" as const,
    name: "Americano",
    description: "Free in the MVST office",
    price: 20.0,
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    type: "Arabic" as const,
    name: "Cappuccino",
    description: "Free in the MVST office",
    price: 15.0,
    imageUrl:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    type: "Robusta" as const,
    name: "Decaf Americano",
    description: "Free in the MVST office",
    price: 18.0,
    imageUrl:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    type: "Arabic" as const,
    name: "Pina Roast",
    description: "Free in the MVST office",
    price: 19.0,
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    type: "Arabic" as const,
    name: "Raphael Original",
    description: "Free in the MVST office",
    price: 16.0,
    imageUrl:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80",
  },
];

export const CoffeeShowcasePage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredCoffees = coffeeData.filter((coffee) => {
    if (selectedFilter === "all") return true;
    return coffee.type.toLowerCase() === selectedFilter;
  });

  return (
    <>
      <div className="min-h-screen bg-ui-black flex flex-col items-center">
        <ShowcaseHeader />
        <ShowcaseBody
          filteredCoffees={filteredCoffees}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <ShowcaseFooter />
      </div>
    </>
  );
};
