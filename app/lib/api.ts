/**
 * API Client for Parallax Backend
 * Base URL: http://localhost:8000/api/v1
 */

const API_BASE_URL = "http://localhost:8000/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network or parsing error
    throw new ApiError(0, `Network error: ${(error as Error).message}`);
  }
}

/**
 * API Methods
 */
export const api = {
  /**
   * Health check
   */
  health: () => fetchApi<{ status: string }>("/health"),

  /**
   * Research endpoints (placeholder - update based on your backend)
   */
  research: {
    create: (query: string) =>
      fetchApi("/research", {
        method: "POST",
        body: JSON.stringify({ query }),
      }),
    
    get: (id: string) => fetchApi(`/research/${id}`),
    
    list: () => fetchApi("/research"),
  },
};

export default api;
