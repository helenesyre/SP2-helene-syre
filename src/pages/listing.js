export function listing() {
  return `
    <div class="flex flex-col items-center gap-6 py-16">
      <h1 class="text-4xl font-bold">Listing</h1>
      <p class="text-lg">Explore the listings and find what you're looking for. Stay tuned for updates!</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="#/" class="btn-small btn-border">Go to Home</a>
        <a href="#/profile" class="btn-small btn-border">Go to Profile</a>
        <a href="#/login" class="btn-small btn-border">Go to Login</a>
        <a href="#/register" class="btn-small btn-border">Go to Register</a>
        <a href="#/coming-soon" class="btn-small btn-border">Go to Coming Soon</a>
        <a href="#/page-not-found" class="btn-small btn-border">Go to Page Not Found</a>
      </div>
    </div>
  `;
}