import { callApi } from "@/shared/services/callApi";

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
  };
}

export class AuthService {
  static async login(name: string, password: string): Promise<AuthResponse> {
    return callApi<AuthResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ name, password }),
      }
    );
  }

  static async register(name: string, password: string): Promise<AuthResponse> {
    return callApi<AuthResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({ name, password }),
      }
    );
  }
}
