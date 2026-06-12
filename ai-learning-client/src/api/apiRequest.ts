import axios from "axios";

type ApiResponse<T> =
  | {
      success: true;
      data: T;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function requestWithRetry<T>(
  config: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: unknown;
    params?: unknown;
    headers?: Record<string, string>;
  },
  retries = 3,
  delay = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response =
        await api<ApiResponse<T>>(config);

      if (response.data.success) {
        return response.data.data;
      }

      throw new Error(response.data.message);
    } catch (error) {
      lastError = error;

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status && status >= 400 && status < 500) {
          throw error;
        }
      }

      if (attempt < retries) {
        await sleep(delay * attempt);
      }
    }
  }

  throw lastError;
}

export default api;