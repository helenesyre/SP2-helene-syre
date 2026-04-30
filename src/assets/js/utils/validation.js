/**
 * Validates a value against a given regex pattern.
 * @param {string} value - The value to validate.
 * @param {string} pattern - The regex pattern as a string.
 * @returns {boolean} True if the value matches the pattern, false otherwise.
 */
function validatePattern(value, pattern) {
  const regex = new RegExp(pattern);
  return regex.test(value);
};

/**
 * Validates a Noroff email address format
 * @param {string} email - The email input value.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validateNoroffEmail(email) {
  // validate only stud.noroff.no emails
  return validatePattern(email, "^[a-zA-Z0-9._%+-]+@stud.noroff.no$");
};

/**
 * Validates username for Noroff API
 * Username must only contain letters, numbers, and underscores (no spaces or special characters)
 * @param {string} username - The username to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validateUsername(username) {
  return validatePattern(username, "^[a-zA-Z0-9_]+$") && username.length > 0;
};

/**
 * Validates password strength
 * Password must be at least 8 characters long
 * Contain at least one uppercase letter, one lowercase letter, and one number
 * @param {string} password - The password to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validatePassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

/**
 * Generates an HTML string for displaying a validation error message.
 * @param {string} message - The error message to display.
 * @returns {string} HTML string for the error message.
 */
export function validationErrorMessageHTML(message = "Validation error") {
  return `
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 form_error" role="alert">
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">${message}</span>
  </div>
`;
};

/**
 * Validates an image URL.
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is valid and uses HTTP or HTTPS, false otherwise.
 */
export function validateImgUrl(url) {
  try {
    const newUrl = new URL(url);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}