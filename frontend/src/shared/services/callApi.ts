import { handleApiError } from "@/features/auth/middlewares/middleware";
import { toast } from "react-toastify";

export async function callApi<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    ...(options.headers || {}),
    ...(typeof window !== "undefined" && localStorage.getItem("token")
      ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
      : {}),
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  if (!response.ok) {
    handleApiError(data);
  } else {
    const method = (options.method || "GET").toUpperCase();
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      toast.success("Action realized successfully");
    }
  }
  return data;
}
