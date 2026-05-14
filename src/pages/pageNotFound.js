import image404 from '../assets/images/404.png';
import { useAuth } from '../assets/js/utils/useAuth';

/**
 * Renders a "Page Not Found" page with a message and links to navigate back to home and profile or login page.
 * @returns {string} HTML string representing the "Page Not Found" page.
 */
export function pageNotFound() {
  return `
    <div class="flex flex-col items-center gap-6 py-16 px-6 md:px-8 lg:px-16 text-center">
      <img src="${image404}" alt="404 Error - Page Not Found" class="w-full max-w-2xl">
      <h1 class="text-4xl font-bold">Oops! Page not found</h1>
      <p class="text-lg">The page you are looking for does not exist. Please check the URL or return to the home page.</p>
      <div class="flex flex-row gap-4 justify-center">
        <a href="#/" class="btn-small btn-border">Go to Home</a>
        ${useAuth().isLoggedIn() ? `<a href="#/profile/${useAuth().getUserData().name}" class="btn-small btn-border">Go to Profile</a>` : `<a href="#/login" class="btn-small btn-border">Login</a>`}
      </div>
    </div>
  `;
}