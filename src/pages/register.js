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
    <div class="flex items-center justify-center mt-14">
      <div class="flex flex-col gap-8 card-auth w-full md:max-w-lg mx-6 md:mx-auto text-center">
        <h1 class="text-3xl">Create an account </h1>
        ${form}
        <div class="flex flex-row items-center">
          <div class="flex-1 h-px bg-gray-500"></div>
          <span class="mx-4 text-black-500">or register with</span>
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
          <p class="text-base text-black-300">Already have an account? <a href="#/login" class="text-blue-medium-500 font-bold hover:underline">Log in</a>.</p>
        </div>
      </div>
    </div>
  `;
};