import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCoffees,
  resetCoffees,
  setFilter,
  setPageSize,
  CoffeeState,
} from "@/store/slices/coffeeSlice";

export const useCoffeeRedux = (pageSize = 6) => {
  const dispatch = useAppDispatch();
  const coffeeState = useAppSelector((state) => state.coffee) as CoffeeState;

  const {
    coffees,
    filteredCoffees,
    selectedFilter,
    currentPage,
    hasNextPage,
    isLoading,
    error,
    pageSize: currentPageSize,
  } = coffeeState;

  useEffect(() => {
    if (currentPageSize !== pageSize) {
      dispatch(setPageSize(pageSize));
    }
  }, [dispatch, pageSize, currentPageSize]);

  useEffect(() => {
    if (coffees.length === 0) {
      dispatch(
        fetchCoffees({
          page: 1,
          limit: pageSize,
          reset: true,
          type: selectedFilter,
        })
      );
    }
  }, [dispatch, pageSize, coffees.length, selectedFilter]);

  const loadNextPage = useCallback(() => {
    if (hasNextPage && !isLoading) {
      dispatch(
        fetchCoffees({
          page: currentPage + 1,
          limit: pageSize,
          type: selectedFilter,
        })
      );
    }
  }, [dispatch, hasNextPage, isLoading, currentPage, pageSize, selectedFilter]);

  const refreshCoffees = useCallback(() => {
    dispatch(resetCoffees());
    dispatch(
      fetchCoffees({
        page: 1,
        limit: pageSize,
        reset: true,
        type: selectedFilter,
      })
    );
  }, [dispatch, pageSize, selectedFilter]);

  const updateFilter = useCallback(
    (filter: string) => {
      dispatch(setFilter(filter));
      dispatch(
        fetchCoffees({
          page: 1,
          limit: pageSize,
          reset: true,
          type: filter,
        })
      );
    },
    [dispatch, pageSize]
  );

  return {
    coffees: filteredCoffees,
    allCoffees: coffees,
    selectedFilter,
    isLoading,
    error,
    hasNextPage,
    currentPage,
    loadNextPage,
    refreshCoffees,
    updateFilter,
  };
};
