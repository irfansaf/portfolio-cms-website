const API_URL = 'http://localhost:8888/api';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  // Handle non-2xx responses
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMessage = errorBody.error || errorBody.message || `Request failed with status ${response.status}`;
    // Create an object that mimics the Axios error structure for compatibility/ease of use if needed, 
    // or just throw a simpler error.
    throw new Error(errorMessage);
  }

  // Check if response is empty (e.g. 204 No Content)
  if (response.status === 204) {
      return {} as T;
  }

  return response.json();
}

export const client = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body: any, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: any, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'DELETE' }),
  patch: <T>(endpoint: string, body: any, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
};

export default client;
