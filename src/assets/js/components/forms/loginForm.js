import { useAuth } from "../../utils/useAuth";
import { validateNoroffEmail, validatePassword, validationErrorMessageHTML } from "../../utils/validation";

export function setupLoginFormListeners() {
  const form = document.querySelector('#loginForm');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    // Validate form inputs
    document.querySelectorAll('.form_error').forEach(errorElement => errorElement.remove());
    const formData = new FormData(event.target);
    let isValid = true;
    for (const [name, value] of formData.entries()) {
      switch (name) {
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
      };
    };

    if (isValid) {
      // Submit the form to API
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const auth = useAuth();
      await auth.login(email, password);
    }
  });
};

export function loginForm() {
  const form = document.createElement('form');
  form.id = 'loginForm';
  form.className = 'flex flex-col gap-6 mt-12 text-sm';

  form.innerHTML = `
    <div class="flex flex-col gap-1">
      <label for="email" class="font-semibold">Email<span class="text-feedback-error-icon">*</span></label>
      <input type="email" id="email" name="email" aria-label="Email" placeholder="Email" class="input-field" required>
    </div>

    <div class="flex flex-col gap-1">
      <label for="password" class="font-semibold">Password<span class="text-feedback-error-icon">*</span></label>
      <input type="password" id="password" name="password" aria-label="Password" placeholder="Password" class="input-field" required>
    </div>
    <button type="submit" class="btn-medium btn-primary w-full">Login</button>
  `;
  return form.outerHTML;
};