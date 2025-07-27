import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@/shared/components/ui/Typography";
import { Title } from "@/shared/components/ui/Title";

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
    className="bg-coffee-card rounded-2xl shadow-card p-10 flex flex-col items-center w-full max-w-4xl mx-auto md:max-w-5xl lg:max-w-6xl"
    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    layout
  >
    <div className="w-full flex justify-start mb-2">
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
    <img
      src={imageUrl}
      alt={name}
      width={600}
      height={180}
      className="w-[600px] h-[180px] object-cover rounded-2xl mb-8"
    />
    <div>
      <Typography
        colorizedTypography
        className="mb-1 text-1xl md:text-2xl text-coffee-primary font-semibold"
      >
        {name}
      </Typography>
    </div>
    <div>
      <Typography className="mb-2">
        {description || "Missing description"}
      </Typography>
    </div>
    <motion.p className="text-white font-bold text-xl mb-2">
      {price.toFixed(2)} €
    </motion.p>
  </motion.div>
);
