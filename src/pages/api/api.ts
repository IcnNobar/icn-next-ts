import { API_BASE_URL, ENDPOINTS, HTTP_METHODS } from './apiConstants';

export async function apiRequest(endpoint: string, method: string = HTTP_METHODS.GET, body: any = null) {
  // Check if we're in the browser (to access localStorage)
  const isBrowser = typeof window !== 'undefined';

  // Retrieve 'lang' and 'local' from localStorage, if available
  const lang = isBrowser ? localStorage.getItem('lang') || 'sa' : 'sa';
  const local = isBrowser ? localStorage.getItem('local') || 'jo' : 'jo';

  // Construct the URL for the API request
  const url = `${API_BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lang': lang,   
      'local': local, 
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
