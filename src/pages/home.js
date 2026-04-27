import headerHome from '../assets/images/header-home.jpg';
import { renderIcons } from '../assets/js/utils/icons';
import { listingCard } from '../assets/js/components/cards/listingCard';
import { getPaginatedListings } from '../assets/js/utils/fetch';
import { showToast } from '../assets/js/components/toasts/toast';
import { usePagination } from '../assets/js/utils/usePagination';
import { renderPaginationControls } from '../assets/js/components/pagination/paginationControls.js';

export function home() {

  // Sorting
  let currentSort = 'newest';

  // Pagination
  const pagination = usePagination(loadListings);
  let pageLimit = 8;

  // Fetch and render listings
  async function loadListings() {
    const container = document.getElementById('listings-container');
    if (!container) return;

    // CHANGE LATER to a spinning loader
    container.innerHTML = `
    <p class="text-black-500/60">Loading listings…</p>
  `;

    try {
      const response = await getPaginatedListings(pagination.getPage(), pageLimit, 'created', 'desc');
      const listings = response.data || [];
      pagination.updatePageCount(response.meta.pageCount || 1);

      container.innerHTML = `
      <h2 class="text-4xl font-medium mb-6">Active listings</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4">
        ${listings.map((listing) => listingCard(listing)).join('')}
      </div>
      <div id="pagination-controls" class="flex items-center justify-center gap-2 md:gap-4 mt-8"></div>
    `;
      renderPaginationControls(pagination);
      countdownListings(listings);
    } catch (error) {
      console.error('Error loading listings:', error);
      showToast('Failed to load listings. Please try again later.', 'error');
      container.innerHTML = `
      <div class="px-6 md:px-8 lg:px-16 py-12">
        <p class="text-red-500">Failed to load listings. Please try again later.</p>
      </div>
    `;
    }
    renderIcons();
  }

  // SOURCE: inspiration from https://www.youtube.com/watch?v=34kbdFLpff8 (27.apr. 2026)
  function countdownListings(listings) {
    listings.forEach((listing) => {
      const countdownElement = document.getElementById(`countdown-${listing.id}`);
      if (!countdownElement) return;

      function tick() {
        const now = new Date();
        const endsAtDate = new Date(listing.endsAt);
        const timeRemaining = endsAtDate - now;

        const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

        countdownElement.textContent = timeRemaining > 0 ? `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m left` : 'Auction ended';

        if (timeRemaining <= 0) {
          countdownElement.textContent = 'Auction ended';
          countdownElement.classList.remove('tag-blue-light');
          countdownElement.classList.add('tag-gray');
        } else {
          countdownElement.classList.remove('tag-gray');
          countdownElement.classList.add('tag-blue-light');
        }
      }

      tick();
      setInterval(tick, 1000);
    });
  }

  setTimeout(loadListings, 0);

  return `
    <section class="relative text-white-500 mb-8">
      <img src="${headerHome}" alt="Hero image" class="w-full h-162.5 object-cover">
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
    <section id="listings-container" class="px-6 md:px-8 lg:px-16 mb-8"></section>
    <section class="px-6 md:px-8 lg:px-16">
      <section id="cta-container" class=""></section>
    </section>
  `;
}