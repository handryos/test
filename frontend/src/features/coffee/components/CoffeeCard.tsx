import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@/shared/components/ui/Typography";
export interface CoffeeCardProps {
  type: "Arabic" | "Robusta";
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({
  type,
  name,
  description,
  price,
  imageUrl,
}) => (
  <motion.div
    className="bg-coffee-card rounded-2xl shadow-card p-6 flex flex-col w-full h-[480px]"
    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    layout
  >
    <div className="w-full flex justify-start mb-3">
      <span
        className={`px-3 tracking-wider py-1 rounded-full text-xs font-normal ${
          type === "Arabic"
            ? "bg-mvst-blue text-ui-white"
            : "bg-ui-typeBg text-ui-white"
        }`}
      >
        {type}
      </span>
    </div>

    <div className="w-full h-[160px] mb-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>

    <div className="flex-1 flex flex-col justify-between text-center min-h-0">
      <div className="mb-3">
        <Typography
          colorizedTypography
          className="text-lg md:text-xl text-coffee-primary font-semibold line-clamp-2"
        >
          {name}
        </Typography>
      </div>

      <div className="flex-1 flex items-start justify-center mb-4">
        <Typography className="text-sm line-clamp-4 text-center">
          {description || "Missing description"}
        </Typography>
      </div>

      <div className="mt-auto">
        <motion.p className="text-white font-bold text-xl">
          {Number(price ?? 0).toFixed(2)} €
        </motion.p>
      </div>
    </div>
  </motion.div>
);
