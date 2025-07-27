import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CoffeeCard } from "./CoffeeCard";
import { CoffeeTypeFilter } from "./CoffeeTypeFilter";

interface ShowcaseBodyProps {
  filteredCoffees: any[];
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export const ShowcaseBody: React.FC<ShowcaseBodyProps> = ({
  filteredCoffees,
  selectedFilter,
  setSelectedFilter,
}) => (
  <motion.div
    className="w-full py-4 px-4 md:px-8 max-w-6xl"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
  >
    <div className="mb-10 text-center">
      <motion.p
        className="font-title text-ui-white mb-2 text-2xl md:text-5xl"
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
        <CoffeeTypeFilter
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            className="contents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCoffees.map((coffee, index) => (
              <motion.div
                key={coffee.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  layout: { duration: 0.3 },
                }}
              >
                <CoffeeCard {...coffee} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  </motion.div>
);
