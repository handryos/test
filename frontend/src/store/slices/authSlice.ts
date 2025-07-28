import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "@/features/auth/services/authService";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { name: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await AuthService.login(payload.name, payload.password);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: { name: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await AuthService.register(payload.name, payload.password);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Register failed");
    }
  }
);

export interface User {
  id: number;
  name: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload?.access_token && action.payload?.user) {
          state.token = action.payload.access_token;
          state.user = action.payload.user;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.access_token);
          }
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.token = null;
        state.user = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        if (action.payload?.access_token && action.payload?.user) {
          state.token = action.payload.access_token;
          state.user = action.payload.user;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.access_token);
          }
        }
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.token = null;
        state.user = null;
      });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
