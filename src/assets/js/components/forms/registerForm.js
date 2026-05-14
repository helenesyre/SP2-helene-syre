import { useAuth } from "../../utils/useAuth";
import { validateNoroffEmail, validatePassword, validateUsername, validationErrorMessageHTML } from "../../utils/validation";
import { renderIcons } from "../../utils/icons";

/**
 * Attaches submit handler and validation to the register form.
 */
export function setupRegisterFormListeners() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    document.querySelectorAll('.form_error').forEach(errorElement => errorElement.remove());
    // Validate form inputs
    const formData = new FormData(event.target);
    let isValid = true;
    for (const [name, value] of formData.entries()) {
      switch (name) {
        case 'username':
          if (value && validateUsername(value)) {
            continue;
          } else {
            isValid = false;
            event.target.querySelector('#username').parentElement.innerHTML += validationErrorMessageHTML('Username can only contain letters, numbers, and underscores.');
          }
          break;
        case 'email':
          if (value && validateNoroffEmail(value)) {
            continue;
          } else {
            isValid = false;
            event.target.querySelector('#email').parentElement.innerHTML += validationErrorMessageHTML('Please enter a valid email address.');
          }
          break;
        case 'password':
          if (value && validatePassword(value)) {
            continue;
          } else {
            isValid = false;
            event.target.querySelector('#password').parentElement.innerHTML += validationErrorMessageHTML('Password must be at least 8 characters long and include uppercase, lowercase and number.');
          }
          break;
        default:
          break;
      };
    };
    renderIcons();

    if (isValid) {
      // Submit the form - API registration
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');

      const auth = useAuth();
      await auth.register(username, email, password);
    }
  });
};

/**
 * Creates the register form element.
 * @returns {string} The HTML string for the register form.
 */
export function registerForm() {
  const form = document.createElement('form');
  form.id = 'registerForm';
  form.className = 'flex flex-col gap-6 text-sm text-start';

  form.innerHTML = `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <label for="username" class="font-semibold">Username<span class="text-feedback-error-icon">*</span></label>
          <input type="text" id="username" name="username" aria-label="Username" placeholder="Username" class="input-field" required>
        </div>

        <div class="flex flex-col gap-1">
          <label for="email" class="font-semibold">Email<span class="text-feedback-error-icon">*</span></label>
          <input type="email" id="email" name="email" aria-label="Email" placeholder="Email" class="input-field" required>
        </div>

        <div class="flex flex-col gap-1">
          <label for="password" class="font-semibold">Password<span class="text-feedback-error-icon">*</span></label>
          <input type="password" id="password" name="password" aria-label="Password" placeholder="Password" class="input-field" required>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <input type="checkbox" id="terms" name="terms" required>
        <label for="terms" class="text-sm text-black-500">I agree to the <span class="text-blue-medium-500 font-bold cursor-pointer hover:underline">Terms</span> and <span class="text-blue-medium-500 font-bold cursor-pointer hover:underline">Privacy Policy</span></label>
      </div>
    </div>

    <button type="submit" class="btn-medium btn-primary w-full">
      Register
      <i data-lucide="log-in" class="size-6"></i>
    </button>
  `;
  return form.outerHTML;
};