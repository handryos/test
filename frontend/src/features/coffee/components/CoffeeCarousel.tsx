import { CoffeeService } from "../services/api";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CoffeeCard } from "./CoffeeCard";
import { CoffeeModal } from "./CoffeeModal";
import { useCoffeeRedux } from "@/features/coffee/hooks/useCoffeeRedux";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface CoffeeCarouselProps {
  selectedFilter: string;
}

export const CoffeeCarousel: React.FC<CoffeeCarouselProps> = ({
  selectedFilter,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setSelectedCoffeeId(id);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCoffeeId(null);
  };
  const {
    coffees,
    isLoading,
    error,
    hasNextPage,
    loadNextPage,
    updateFilter,
    selectedFilter: currentFilter,
    refreshCoffees,
  } = useCoffeeRedux(6);
  const observerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const CARDS_PER_PAGE = 6;
  const totalPages = Math.ceil(coffees.length / CARDS_PER_PAGE);

  const currentCoffees = useMemo(() => {
    return coffees.slice(
      currentPage * CARDS_PER_PAGE,
      (currentPage + 1) * CARDS_PER_PAGE
    );
  }, [coffees, currentPage]);

  useEffect(() => {
    if (selectedFilter !== currentFilter) {
      updateFilter(selectedFilter);
    }
  }, [selectedFilter, currentFilter, updateFilter]);

  useEffect(() => {
    setCurrentPage(0);
  }, [coffees]);

  useEffect(() => {
    if (currentPage >= totalPages - 2 && hasNextPage && !isLoading) {
      loadNextPage();
    }
  }, [currentPage, totalPages, hasNextPage, isLoading, loadNextPage]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          loadNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isLoading, loadNextPage]);

  if (error) {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-coffee-primary text-white rounded-lg hover:bg-opacity-80 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <div className="mb-10 text-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="absolute -left-0 md:-left-6 top-1/2 transform -translate-y-1/2 z-10 bg-coffee-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextPage}
            disabled={
              currentPage >= totalPages - 1 && !hasNextPage && !isLoading
            }
            className="absolute -right-0 md:-right-6 top-1/2 transform -translate-y-1/2 z-10 bg-coffee-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          <div className="overflow-hidden mx-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedFilter}-${currentPage}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
              >
                {currentCoffees.map((coffee, index) => (
                  <motion.div
                    key={coffee.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                  >
                    <CoffeeCard
                      type={coffee.type}
                      name={coffee.name}
                      description={coffee.description}
                      price={coffee.price}
                      imageUrl={coffee.image_url}
                      id={coffee.id}
                      onEdit={() => handleOpenModal(coffee.id)}
                      onDelete={() => setConfirmDeleteId(coffee.id)}
                    />
                    {typeof confirmDeleteId === "number" && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-[#181818] rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center">
                          <button
                            className="absolute top-4 right-6 text-white text-2xl font-bold hover:text-coffee-primary"
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            &times;
                          </button>
                          <h2 className="text-center text-2xl font-bold text-white mb-6">
                            Confirm Deletion
                          </h2>
                          <p className="text-white mb-8">
                            Are you sure you want to delete this coffee?
                          </p>
                          <div className="flex gap-4 w-full justify-center">
                            <button
                              className="flex-1 py-3 rounded-full border-2 border-coffee-primary text-coffee-primary font-semibold bg-transparent hover:bg-coffee-primary hover:text-white transition-colors"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="flex-1 py-3 rounded-full bg-red-600 text-white font-semibold border-2 border-red-600 hover:bg-opacity-90 transition-colors"
                              onClick={async () => {
                                if (typeof confirmDeleteId === "number") {
                                  await CoffeeService.deleteCoffee(
                                    confirmDeleteId
                                  );
                                  setConfirmDeleteId(null);
                                  refreshCoffees();
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                <CoffeeModal
                  open={modalOpen}
                  onClose={handleCloseModal}
                  coffeeId={selectedCoffeeId}
                  onSave={refreshCoffees}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPage
                    ? "bg-coffee-primary"
                    : "bg-gray-400 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {isLoading && (
          <motion.div
            className="flex justify-center items-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="animate-spin" size={32} />
            <span className="ml-3 text-ui-white">Loading more coffees...</span>
          </motion.div>
        )}

        {!hasNextPage &&
          currentPage >= totalPages - 1 &&
          coffees.length > 0 && (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-ui-label">
                You already seen all our exclusive coffees!
              </p>
            </motion.div>
          )}
      </div>
    </motion.div>
  );
};
