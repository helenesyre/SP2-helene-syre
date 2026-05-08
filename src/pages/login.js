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
    <div class="flex items-center justify-center mt-14">
      <div class="flex flex-col gap-8 card-auth w-full md:max-w-lg mx-6 md:mx-auto text-center">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl">Welcome Back!</h1>
          <p class="text-base text-black-300">Sign in to continue where you left off!</p>
        </div>
        ${form}
        <div class="flex flex-row items-center">
          <div class="flex-1 h-px bg-gray-500"></div>
          <span class="mx-4 text-black-500">or sign in with</span>
          <div class="flex-1 h-px bg-gray-500"></div>
        </div>

        <div class="flex flex-col items-center gap-4">
          <div class="flex flex-row items-center justify-center gap-4 w-full">
            <button class="btn-medium btn-border flex items-center gap-2 w-full">
              <i class="fa-brands fa-google text-xl"></i>
              Google
            </button>
            <button class="btn-medium btn-border flex items-center gap-2 w-full">
              <i class="fa-brands fa-facebook text-xl"></i>
              Facebook
            </button>
          </div>
          <p class="text-base text-black-300">Don't have an account? <a href="#/register" class="text-blue-medium-500 font-bold hover:underline">Sign up</a>.</p>
        </div>
      </div>
    </div>
  `;
};