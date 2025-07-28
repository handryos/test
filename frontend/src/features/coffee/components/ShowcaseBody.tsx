import React from "react";
import { motion } from "framer-motion";
import { CoffeeCarousel } from "./CoffeeCarousel";
import { CoffeeTypeFilter } from "./CoffeeTypeFilter";
import { useCoffeeRedux } from "@/features/coffee/hooks/useCoffeeRedux";

export const ShowcaseBody: React.FC = () => {
  const { selectedFilter, updateFilter } = useCoffeeRedux();

  return (
    <motion.div
      className="w-full py-4 px-4 md:px-8 max-w-6xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <motion.p
        className="font-title text-ui-white text-center mb-12 text-2xl md:text-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        MVST. EXCLUSIVE COFFEE
      </motion.p>

      <motion.div
        className="mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <CoffeeTypeFilter selected={selectedFilter} onSelect={updateFilter} />
      </motion.div>

      <CoffeeCarousel selectedFilter={selectedFilter} />
    </motion.div>
  );
};
