import { useAuth } from "../assets/js/utils/useAuth";

export function comingSoon() {
  return `
    <div class="flex flex-col items-center gap-6 py-16 px-6 md:px-8 lg:px-16 text-center">
      <h1 class="text-4xl font-bold">Coming Soon</h1>
      <p class="text-lg">This feature is currently under development. Stay tuned for updates!</p>
      <div class="flex flex-row gap-4 justify-center">
        <a href="#/" class="btn-small btn-border">Go to Home</a>
        ${useAuth().isLoggedIn() ? `<a href="#/profile/${useAuth().getUserData().name}" class="btn-small btn-border">Go to Profile</a>` : `<a href="#/login" class="btn-small btn-border">Login</a>`}
      </div>
    </div>
  `;
}