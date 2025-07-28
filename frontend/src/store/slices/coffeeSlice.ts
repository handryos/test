export const fetchCoffeeById = createAsyncThunk(
  "coffee/fetchCoffeeById",
  async (id: number) => {
    return await CoffeeService.getCoffeeById(id);
  }
);

export const createCoffee = createAsyncThunk(
  "coffee/createCoffee",
  async (payload: Omit<Coffee, "id" | "createdAt" | "updatedAt">) => {
    return await CoffeeService.createCoffee(payload);
  }
);

export const updateCoffee = createAsyncThunk(
  "coffee/updateCoffee",
  async ({
    id,
    payload,
  }: {
    id: number;
    payload: Omit<Coffee, "id" | "createdAt" | "updatedAt">;
  }) => {
    return await CoffeeService.updateCoffee(id, payload);
  }
);

export const deleteCoffee = createAsyncThunk(
  "coffee/deleteCoffee",
  async (id: number) => {
    await CoffeeService.deleteCoffee(id);
    return id;
  }
);
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Coffee,
  CoffeesResponse,
  CoffeeService,
} from "@/features/coffee/services/api";

export const fetchCoffees = createAsyncThunk(
  "coffee/fetchCoffees",
  async ({
    page,
    limit,
    reset,
    type,
  }: {
    page: number;
    limit: number;
    reset?: boolean;
    type?: string;
  }) => {
    const response = await CoffeeService.getCoffees(page, limit, type);

    return { ...response, reset };
  }
);

export interface CoffeeState {
  coffees: Coffee[];
  filteredCoffees: Coffee[];
  selectedFilter: string;
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  pageSize: number;
}

const initialState: CoffeeState = {
  coffees: [],
  filteredCoffees: [],
  selectedFilter: "all",
  currentPage: 1,
  hasNextPage: true,
  totalPages: 1,
  isLoading: false,
  error: null,
  pageSize: 6,
};

const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilter = action.payload;
      state.coffees = [];
      state.filteredCoffees = [];
      state.currentPage = 1;
      state.hasNextPage = true;
      state.error = null;
    },
    resetCoffees: (state) => {
      state.coffees = [];
      state.filteredCoffees = [];
      state.currentPage = 1;
      state.hasNextPage = true;
      state.error = null;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoffees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCoffees.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, meta, reset } = action.payload;

        if (reset) {
          state.coffees = data;
        } else {
          const merged = [...state.coffees, ...data];
          const unique = Array.from(
            new Map(merged.map((c) => [c.id, c])).values()
          );
          state.coffees = unique;
        }

        state.currentPage = meta.page;
        state.hasNextPage = meta.hasNextPage;
        state.totalPages = meta.totalPages;

        state.filteredCoffees = state.coffees;
      });
  },
});

export const { setFilter, resetCoffees, setPageSize } = coffeeSlice.actions;
export default coffeeSlice.reducer;
