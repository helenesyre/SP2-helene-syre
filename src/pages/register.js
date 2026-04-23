import { registerForm, setupRegisterFormListeners } from "../assets/js/components/forms/registerForm";


/**
 * Renders the registration page with a form for creating a new account.
 * @returns {string} HTML string representing the registration page content.
 */
export function register() {
  const form = registerForm();

  // Schedule listener setup for next tick to ensure form is in DOM
  setTimeout(() => setupRegisterFormListeners(), 0);

  return `
    <div class="flex flex-col items-center gap-6 py-16">
      <h1 class="text-3xl">Create an account </h1>
      ${form}
      <p class="text-sm">Already have an account? <a href="#/login" class="text-blue-500 hover:underline">Log in</a>.</p>
    </div>
  `;
};