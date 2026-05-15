import { showToast } from "../components/toasts/toast";
import { getSingleProfileData } from "./fetch";
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
      bio: "This is my bio",
      avatar: {
        url: "https://images.unsplash.com/photo-1680355455579-e851904eb784?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Placeholder avatar"
      },
      banner: {
        url: "https://images.unsplash.com/photo-1614850523011-8f49ffc73908?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  async function updateStoreUserData() {
    const response = await getSingleProfileData(getUserData().name);
    localStorage.setItem('storeUserData', JSON.stringify(response.data));
    return response.data;
  }

  async function getStoreUserData() {
    const storedData = localStorage.getItem('storeUserData');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      const updatedData = await updateStoreUserData();
      return updatedData;
    }
  }

  /**
   * Logs out the current user by clearing local storage and redirecting to the home page.
   */
  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profileName');
    localStorage.removeItem('userData');
    localStorage.removeItem('storeUserData');
    showToast(`Logged out successfully! Redirecting to home...`, 'success', 5000);
    window.location.hash = '';
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
    getStoreUserData,
    updateStoreUserData,
    isLoggedIn,
    logout,
    getToken,
  };
};
