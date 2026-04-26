import headerHome from '../assets/images/header-home.jpg';
import { renderIcons } from '../assets/js/utils/icons';

export function home() {
  renderIcons();

  return `
    <section class="relative text-white-500">
      <img src="${headerHome}" alt="Hero image" class="w-full h-162.5 object-cover mb-8">
      <div class="absolute inset-0 bg-blue-800/80"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center max-w-[650px] mx-auto p-6">
        <h1 class="text-5xl max-w-[570px]">Bid, sell and discover with fellow students</h1>
        <p class="text-lg text-white-500/70 max-w-[570px]">A peer-to-peer auction platform exclusively for Noroff students. Start with 1,000 credits.</p>
        <div class="w-full">
          <form class="flex my-8 gap-4 bg-white-500 rounded-default p-4 flex-col md:flex-row items-center w-full">
            <div class="flex items-center gap-2 w-full">
              <i data-lucide="search" class="text-black-500"></i>
              <label for="listing-search" class="sr-only">Search listings</label>
              <input type="search" id="listing-search" placeholder="Search listings - e.g. “laptop”" class="input-field">
            </div>
            <button type="submit" class="btn-medium btn-primary w-full md:w-fit">Search</button>
          </form>
          <ul class="flex flex-wrap gap-4 md:gap-2 mt-4 justify-center">
            <li>
              <button class="tag-medium tag-blue-light">
                All
              </button>
            </li>
            <li>
              <button class="tag-medium tag-white-border">
                Electronics
              </button>
            </li>
            <li>
              <button class="tag-medium tag-white-border">
                Art & Design
              </button>
            </li>
            <li>
              <button class="tag-medium tag-white-border">
                Books
              </button>
            </li>
            <li>
              <button class="tag-medium tag-white-border">
                Clothing
              </button>
            </li>
            <li>
              <button class="tag-medium tag-white-border">
                Ending soon
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="flex flex-col items-center gap-6 py-16">
      <h1 class="text-4xl font-bold">Home</h1>
      <p class="text-lg">Welcome to the home page! Explore the features and stay tuned for updates.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="#/listing" class="btn-small btn-border">Go to Listing</a>
        <a href="#/profile" class="btn-small btn-border">Go to Profile</a>
        <a href="#/login" class="btn-small btn-border">Go to Login</a>
        <a href="#/register" class="btn-small btn-border">Go to Register</a>
        <a href="#/coming-soon" class="btn-small btn-border">Go to Coming Soon</a>
        <a href="#/page-not-found" class="btn-small btn-border">Go to Page Not Found</a>
      </div>
    </section>
    <section class="px-6 md:px-8 lg:px-16">
      <section id="cta-container" class=""></section>
    </section>
  `;
}