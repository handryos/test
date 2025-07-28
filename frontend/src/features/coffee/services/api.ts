import { callApi } from "@/shared/services/callApi";
export interface Coffee {
  id: number;
  name: string;
  description: string;
  type: "Arabic" | "Robusta";
  price: number;
  image_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CoffeesResponse {
  data: Coffee[];
  meta: PaginationMeta;
}

export class CoffeeService {
  static async getCoffeeById(id: number): Promise<Coffee> {
    return callApi<Coffee>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/coffees/${id}`,
      {}
    );
  }
  static async createCoffee(
    payload: Omit<Coffee, "id" | "createdAt" | "updatedAt">
  ): Promise<Coffee> {
    return callApi<Coffee>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/coffees`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async updateCoffee(
    id: number,
    payload: Omit<Coffee, "id" | "createdAt" | "updatedAt">
  ): Promise<Coffee> {
    return callApi<Coffee>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/coffees/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
  }

  static async deleteCoffee(id: number): Promise<void> {
    await callApi(`${process.env.NEXT_PUBLIC_API_BASE_URL}/coffees/${id}`, {
      method: "DELETE",
    });
  }
  static async getCoffees(
    page = 1,
    limit = 6,
    type?: string
  ): Promise<CoffeesResponse> {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/coffees?page=${page}&limit=${limit}`;

    if (type && type !== "all") {
      url += `&type=${type}`;
    }

    return callApi<CoffeesResponse>(url, {});
  }

  static async getAllCoffees(): Promise<Coffee[]> {
    return callApi<Coffee[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/coffees`,
      {}
    );
  }
}
