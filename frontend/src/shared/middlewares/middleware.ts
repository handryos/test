import { toast } from "react-toastify";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";

export function handleApiError(error: any) {
  if (!error) return;

  const message = error?.message;
  const statusCode = error?.statusCode;

  if (Array.isArray(message)) {
    message.forEach((msg: string) => toast.error(msg));
    return;
  }

  if (statusCode === 401) {
    const isInvalidCredentials =
      typeof message === "string" && message.includes("Invalid credentials");

    store.dispatch(logout());
    toast.error(message || "Unauthorized access");

    if (typeof window !== "undefined" && !isInvalidCredentials) {
      window.location.href = "/login";
    }
    return;
  }

  toast.error(message || "An error occurred. Please try again.");
}

export function handleLoginSuccess() {
  if (typeof window !== "undefined") {
    window.location.href = "/home";
  }
}
