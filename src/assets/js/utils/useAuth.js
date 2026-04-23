import { showToast } from "../components/toasts/toast";
import useFetch from "./useFetch";

/**
 * Custom hook for authentication-related operations, including login, registration, logout, and token management.
 * @returns {Object} - An object containing authentication methods and properties.
 */
export function useAuth() {
  /**
   * Logs in a user with the provided email and password, saving the access token and user data to local storage upon successful authentication.
   * @param {string} email - The email address of the user attempting to log in.
   * @param {string} password - The password of the user attempting to log in.
   * @returns {Promise<void>} - A promise that resolves when the login process is complete.
   */
  async function login(email, password) {
    try {
      const response = await useFetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response) {
        // Save token and profile name
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("profileName", response.data.name);
        localStorage.setItem("userData", JSON.stringify(response.data));
        showToast(`Login successful! Redirecting to home...`, 'success');
        // Redirect after a short delay to allow toast to be seen
        setTimeout(() => {
          window.location.hash = '#/';
        }, 2000);
      } else {
        showToast(`Login failed: ${response.errors?.[0]?.message || "Check console for details."}`, 'error');
      }
    } catch (error) {
      showToast(`Login failed. Please try again.`, 'error');
    }
  };

  /**
   * Registers a new user with the provided username, email, and password.
   * @param {string} username - The desired username for the new account.
   * @param {string} email - The email address for the new account.
   * @param {string} password - The password for the new account.
   * @returns {Promise<void>} - A promise that resolves when the registration process is complete.
   */
  async function register(username, email, password) {
    const userData = {
      name: username,
      email: email,
      password: password,
      bio: "This is my NightNode bio",
      avatar: {
        url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
        alt: "Placeholder avatar"
      },
      banner: {
        url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
        alt: "Placeholder banner"
      }
    };

    try {
      const response = await useFetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response) {
        showToast('Registration successful! Redirecting to login...', 'success');
        setTimeout(() => {
          window.location.hash = '#/login';
        }, 2000);
      } else {
        showToast('Registration failed. Please try again.', 'error');
      }

    } catch (error) {
      const errorMessage = error?.errors?.[0]?.message || 'Something went wrong. Please try again later.';
    }
  };

  /**
   * Retrieves the current user's data from local storage, if available.
   * @returns {Object|null} - The user data object if available, or null if not found.
   */
  function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };

  /**
   * Logs out the current user by clearing local storage and redirecting to the login page.
   */
  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profileName');
    localStorage.removeItem('userData');
    showToast(`Logged out successfully! Redirecting to login...`, 'success');
    window.location.hash = '#/login';
  };

  /**
   * Checks if a user is currently logged in by verifying the presence of an access token.
   * @returns {boolean} - True if the user is logged in, false otherwise.
   */
  function isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  };

  /**
   * Retrieves the current user's access token from local storage.
   * @returns {string|null} - The access token if available, or null if not found.
   */
  function getToken() {
    return localStorage.getItem('accessToken');
  };

  return {
    login,
    register,
    getUserData,
    isLoggedIn,
    logout,
    getToken,
  };
};
