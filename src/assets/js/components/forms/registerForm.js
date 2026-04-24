import { useAuth } from "../../utils/useAuth";
import { validateNoroffEmail, validatePassword, validateUsername, validationErrorMessageHTML } from "../../utils/validation";


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

export function registerForm() {
  const form = document.createElement('form');
  form.id = 'registerForm';
  form.className = 'flex flex-col gap-4 w-full max-w-sm';

  form.innerHTML = `
    <div class="flex flex-col gap-1">
      <label for="username" class="font-semibold">Username<span class="text-red-600">*</span></label>
      <input type="text" id="username" name="username" aria-label="Username" placeholder="Username" class="input-field" required>
    </div>

    <div class="flex flex-col gap-1">
      <label for="email" class="font-semibold">Email<span class="text-red-600">*</span></label>
      <input type="email" id="email" name="email" aria-label="Email" placeholder="Email" class="input-field" required>
    </div>

    <div class="flex flex-col gap-1">
      <label for="password" class="font-semibold">Password<span class="text-red-600">*</span></label>
      <input type="password" id="password" name="password" aria-label="Password" placeholder="Password" class="input-field" required>
    </div>
    <button type="submit" class="btn-medium btn-primary w-full">Register</button>
  `;
  return form.outerHTML;
};