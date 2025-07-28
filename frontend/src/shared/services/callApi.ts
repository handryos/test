import { toast } from "react-toastify";
import { handleApiError } from "../middlewares/middleware";

export async function callApi<T = any>(
  url: string,
  options: RequestInit = {},
  dispatch?: any
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
    if (dispatch) {
      handleApiError(data, dispatch);
    } else {
      handleApiError(data);
    }
  } else {
    const method = (options.method || "GET").toUpperCase();
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      toast.success("Action realized successfully");
    }
  }
  return data;
}
