import { toast } from "react-toastify";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";

export function handleApiError(error: any) {
  if (!error) return;

  const isInvalidCredentials = error?.message?.includes("Invalid credentials");

  if (error?.statusCode === 401) {
    store.dispatch(logout());
    toast.error(error?.message || "An error occurred. Please try again.");
    if (typeof window !== "undefined" && !isInvalidCredentials) {
      window.location.href = "/login";
    }
    return;
  }
}
export function handleLoginSuccess() {
  if (typeof window !== "undefined") {
    window.location.href = "/home";
  }
}
