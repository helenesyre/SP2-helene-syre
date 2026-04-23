import { showToast } from "../components/toasts/toast";

const API_URL = 'https://v2.api.noroff.dev';

/**
 * Fetch data from the API
 * @param {string} url - The endpoint URL (relative to the base API URL).
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<object>} The response data from the API.
 * @throws Will throw an error if the fetch fails or if the response is not ok.
 */
export async function useFetch(url, options = {}) {
  try {
    const response = await fetch(API_URL + url, options);
    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access (e.g., token expired)
        localStorage.removeItem('accessToken'); // Clear the token from localStorage
        localStorage.removeItem('profileName'); // Clear the profile name from localStorage
        window.location.hash = '#/login'; // Redirect to login page
      }
      const errorData = await response.json();
      throw new Error(`${errorData.status}: ${errorData.errors?.[0]?.message}` || `HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) {
      return response; // No content to return
    }
    return await response.json();
  } catch (error) {
    showToast(`${error.message}`, 'error');
    throw error;
  };
};

export default useFetch;