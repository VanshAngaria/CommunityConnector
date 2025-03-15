import { QueryClient } from '@tanstack/react-query';

export const API_BASE_URL = 'http://localhost:5000';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const apiRequest = async (method: string, path: string, data?: any) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    
    try {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    } catch (e) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  
  return response.json();
};

export const getQueryFn = (options?: { on401?: 'returnNull' }) => {
  return async ({ queryKey }: { queryKey: string[] }) => {
    try {
      return await apiRequest('GET', queryKey[0]);
    } catch (error) {
      if (options?.on401 === 'returnNull' && error instanceof Error && error.message === 'Unauthorized') {
        return null;
      }
      throw error;
    }
  };
};
