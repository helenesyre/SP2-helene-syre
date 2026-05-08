import image404 from '../assets/images/404.png';

export function pageNotFound() {
  return `
    <div class="flex flex-col items-center gap-6 py-16 px-6 md:px-8 lg:px-16 text-center">
      <img src="${image404}" alt="404 Error - Page Not Found" class="w-full max-w-2xl">
      <h1 class="text-4xl font-bold">Oops! Page not found</h1>
      <p class="text-lg">The page you are looking for does not exist. Please check the URL or return to the <a href="#/" class="text-blue-500 hover:underline">home page</a>.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="#/" class="btn-small btn-border">Go to Home</a>
        <a href="#/login" class="btn-small btn-border">Sign in</a>
      </div>
    </div>
  `;
}