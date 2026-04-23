export function pageNotFound() {
  return `
    <div class="flex flex-col items-center gap-6 py-16">
      <h1 class="text-4xl font-bold">Page Not Found</h1>
      <p class="text-lg">The page you are looking for does not exist. Please check the URL or return to the <a href="#/" class="text-blue-500">home page</a>.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="#/" class="btn-small btn-border">Go to Home</a>
        <a href="#/listing" class="btn-small btn-border">Go to Listing</a>
        <a href="#/profile" class="btn-small btn-border">Go to Profile</a>
        <a href="#/login" class="btn-small btn-border">Go to Login</a>
        <a href="#/register" class="btn-small btn-border">Go to Register</a>
        <a href="#/coming-soon" class="btn-small btn-border">Go to Coming Soon</a>
      </div>
    </div>
  `;
}