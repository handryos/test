import { configureStore } from "@reduxjs/toolkit";
import coffeeReducer from "./slices/coffeeSlice";
import authReducer from "./slices/authSlice";

const rootReducer = {
  coffee: coffeeReducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
