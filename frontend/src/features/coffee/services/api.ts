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
  static async getCoffees(page = 1, limit = 6, type?: string): Promise<CoffeesResponse> {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/coffees?page=${page}&limit=${limit}`;
    
    if (type && type !== 'all') {
      url += `&type=${type}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJ0ZXN0ZTEzIiwiaWF0IjoxNzUzNjE3OTkxLCJleHAiOjE3NTM3MDQzOTF9.m-mvMbYlno0L6iXTuIoxHckmRi_1rIeyTqx9YeeGK7s`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch coffees");
    }

    return data;
  }

  static async getAllCoffees(): Promise<Coffee[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/coffees`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch coffees");
    }

    return response.json();
  }
}
