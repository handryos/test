import { Typography } from "@/shared/components/ui/Typography";
import React from "react";

const types = [
  { label: "All", value: "all" },
  { label: "Robusta", value: "Robusta" },
  { label: "Arabic", value: "Arabic" },
];

export const CoffeeTypeFilter: React.FC<{
  selected: string;
  onSelect: (type: string) => void;
}> = ({ selected, onSelect }) => (
  <div className="flex w-full max-w-md mx-auto bg-ui-typeBg rounded-full overflow-hidden shadow-card">
    {types.map((type) => (
      <button
        key={type.value}
        onClick={() => onSelect(type.value)}
        className={`flex-1 py-2 text-sm md:text-base font-medium tracking-wide transition-colors duration-200
          ${
            selected === type.value
              ? "bg-ui-white text-black shadow-card hover:bg-mvst-orange hover:text-ui-white scale-100 hover:scale-110 transition-transform duration-200"
              : "bg-ui-typeBg text-ui-white hover:bg-ui-card hover:text-mvst-orange hover:scale-105 transition-transform duration-200"
          }
        `}
        style={{
          boxShadow:
            selected === type.value
              ? "0 4px 24px 0 rgba(0,0,0,0.08)"
              : undefined,
        }}
      >
        <Typography
          className={`tracking-wide text-center align-middle ${
            selected === type.value ? "text-black" : "text-white"
          }`}
        >
          {type.label}
        </Typography>
      </button>
    ))}
  </div>
);
