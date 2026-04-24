import { loginForm, setupLoginFormListeners } from '../assets/js/components/forms/loginForm';

/**
 * Renders the login page with a welcoming message and a login form.
 * @returns {string} HTML string representing the login page content.
 */
export function login() {
  const form = loginForm();

  // Schedule listener setup for next tick to ensure form is in DOM
  setTimeout(() => setupLoginFormListeners(), 0);

  return `
    <div class="w-full lg:w-1/2 p-12 mx-auto max-w-sm">
      <h1 class="text-3xl font-bold mb-4">Welcome Back!</h1>
      <p class="text-base text-gray-light">Log in to connect with friends, share your moments, and explore new stories. We're glad to see you back!</p>
      ${form}
    </div>
  `;
};