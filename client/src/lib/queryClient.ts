import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

function getApiUrl(path: string): string {
  // Use Vite's import.meta.env for environment variables
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  // Ensure the path starts with a slash and doesn't have double slashes
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export async function apiRequest<T = any>(
  method: string,
  url: string,
  data?: unknown,
): Promise<T> {
  const apiUrl = getApiUrl(url);
  const res = await fetch(apiUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.text().catch(() => res.statusText);
    throw new Error(`API request failed: ${res.status} ${error}`);
  }
  
  // Return JSON for non-empty responses
  if (res.status !== 204) { // 204 No Content
    return res.json();
  }
  
  return undefined as unknown as T;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const apiUrl = getApiUrl(queryKey[0] as string);
    const res = await fetch(apiUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// Default query function that will be used for all queries
const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const [url] = queryKey as [string];
  const apiUrl = getApiUrl(url);
  const res = await fetch(apiUrl, {
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Handle unauthorized
      throw new Error('Unauthorized');
    }
    throw new Error('Network response was not ok');
  }
  
  return res.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
