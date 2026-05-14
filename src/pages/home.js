import headerHome from '../assets/images/header-home.jpg';
import { renderIcons } from '../assets/js/utils/icons';
import { listingCard } from '../assets/js/components/cards/listingCard';
import { filterListingsByTag, getPaginatedListings, searchListings } from '../assets/js/utils/fetch';
import { showToast } from '../assets/js/components/toasts/toast';
import { usePagination } from '../assets/js/utils/usePagination';
import { renderPaginationControls } from '../assets/js/components/pagination/paginationControls.js';
import countdownListings from '../assets/js/utils/dateUtils.js';
import loader from '../assets/js/utils/loader.js';

/**
 * Home page view: initializes listings, search, filters and pagination.
 * @returns {string} HTML string representing the home page.
 */
export function home() {
  // Pagination
  let pagination = usePagination(loadListings);
  let pageLimit = 8;
  let currentTagFilter = 'all';

  /**
   * Handles search form submission. Validates and fetches search results.
   */
  async function handleSearch() {
    const searchInput = document.getElementById("listing-search");
    const query = searchInput.value.trim();

    if (query) {
      try {
        const searchResults = await searchListings(query, '', pagination.getPage(), pageLimit);
        const listings = searchResults.data || [];
        const listingContainer = document.getElementById("listing-container");
        const title = document.getElementById("listings-title");
        listingContainer.innerHTML = "";
        title.textContent = `Results for "${query}"`;
        if (listings.length === 0) {
          listingContainer.innerHTML = `<p class="text-black-500 col-span-full text-center">No results found for "${query}".</p>`;
          listingContainer.classList.add("mb-40", "w-full");
        } else {
          listings.map((listing) => listingContainer.appendChild(listingCard(listing, handleSearch)));
          countdownListings(listings);
        }
        pagination.updatePageCount(searchResults.meta.pageCount || 1);
        renderPaginationControls(pagination);
        renderIcons();
      } catch (error) {
        showToast('Search failed. Please try again.', 'error');
      }
    } else {
      pagination = usePagination(loadListings);
      loadListings();
    }
  }

  /**
   * Handles tag filter changes. Fetches and displays listings based on the selected tag.
   */
  async function handleTagFilterChange() {
    const selectedTag = document.querySelector('input[name="tag"]:checked').value;
    currentTagFilter = selectedTag;
    if (selectedTag === 'all') {
      pagination = usePagination(loadListings);
      loadListings();
    } else {
      try {
        if (selectedTag === 'ending-soon') {
          currentTagFilter = ''; // Show all listings but sort by ending soon
        }
        let sortField = selectedTag === 'ending-soon' ? 'endsAt' : 'created'; // Sort by ending date for "Ending soon", otherwise sort by creation date
        let sortOrder = selectedTag === 'ending-soon' ? 'asc' : 'desc'; // Sort ascending for "Ending soon" to show those ending first, otherwise sort descending to show newest first
        let onlyActive = selectedTag === 'ending-soon' ? true : false; // Only show active listings for "Ending soon"
        const searchResults = await filterListingsByTag(currentTagFilter, pagination.getPage(), pageLimit, sortField, sortOrder, onlyActive);
        const listings = searchResults.data || [];
        const listingContainer = document.getElementById("listing-container");
        const title = document.getElementById("listings-title");
        listingContainer.innerHTML = "";
        title.textContent = selectedTag === 'ending-soon' ? 'Listings ending soon' : `Results for "${currentTagFilter}"`;
        if (listings.length === 0) {
          listingContainer.innerHTML = `<p class="text-black-500 col-span-full text-center">No results found for "${currentTagFilter}".</p>`;
          listingContainer.classList.add("mb-40", "w-full");
        } else {
          listings.map((listing) => listingContainer.appendChild(listingCard(listing, handleTagFilterChange)));
          countdownListings(listings);
        }
        pagination.updatePageCount(searchResults.meta.pageCount || 1);
        renderPaginationControls(pagination);
        renderIcons();
      } catch (error) {
        showToast('Search failed. Please try again.', 'error');
      }
    }
  }

  setTimeout(() => {
    const searchForm = document.getElementById("listing-search-form");
    const searchInput = document.getElementById("listing-search");
    if (searchForm) {
      searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        pagination = usePagination(handleSearch);
        handleSearch();
        // If a tag filter is selected when performing a search, reset it to "All" to avoid confusion
        tagFilters.forEach((filter) => {
          if (filter.value === 'all') {
            filter.checked = true;
          } else {
            filter.checked = false;
          }
        });
      });
    }
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        if (searchInput.value.trim() === "") {
          pagination = usePagination(loadListings);
          loadListings();
        }
      });
    }
    const tagFilters = document.querySelectorAll('input[name="tag"]');
    tagFilters.forEach((filter) => {
      filter.addEventListener('change', () => {
        pagination = usePagination(handleTagFilterChange);
        handleTagFilterChange();
        searchInput.value = ''; // Clear search input when changing tag filter
      });
    });
  }, 0);

  /**
   * Loads listings from the server and updates the DOM. Handles loading states and errors.
   */
  async function loadListings() {
    const container = document.getElementById('listings-container');
    if (!container) return;

    container.innerHTML = loader();

    try {
      const response = await getPaginatedListings(pagination.getPage(), pageLimit, 'created', 'desc');
      const listings = response.data || [];
      pagination.updatePageCount(response.meta.pageCount || 1);

      container.innerHTML = `
        <h2 id="listings-title" class="text-2xl md:text-4xl font-medium mb-6">Active listings</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4" id="listing-container"></div>
        <div id="pagination-controls" class="flex items-center justify-center gap-2 md:gap-4 mt-8"></div>
      `;
      const listingContainer = document.getElementById("listing-container");
      listings.map((listing) => listingContainer.appendChild(listingCard(listing, loadListings)));
      renderPaginationControls(pagination);
      countdownListings(listings);
    } catch (error) {
      showToast('Failed to load listings. Please try again later.', 'error');
      container.innerHTML = `
      <div class="px-6 md:px-8 lg:px-16 py-12">
        <p class="text-feedback-error-text">Failed to load listings. Please try again later.</p>
      </div>
    `;
    }
    renderIcons();
  }
  setTimeout(loadListings, 0);

  return `
    <section class="relative text-white-500 mb-8 h-162.5 bg-black-500">
      <div class="absolute inset-0 z-30 bg-blue-800/80"></div>
      <img src="${headerHome}" alt="Hero" class="relative z-20 w-full h-162.5 object-cover">
      <div class="absolute inset-0 z-40 flex flex-col items-center justify-center text-center max-w-[650px] mx-auto p-6">
        <h1 class="text-3xl md:text-5xl max-w-[570px]">Bid, sell and discover with fellow students</h1>
        <p class="text-base md:text-lg text-white-500/70 max-w-[570px]">A peer-to-peer auction platform exclusively for Noroff students. Start with 1,000 credits.</p>
        <div class="w-full">
          <form id="listing-search-form" onsubmit="event.preventDefault()">
            <!-- Search -->
            <div class="flex my-8 gap-4 bg-white-500 rounded-default p-4 flex-col md:flex-row items-center w-full">
              <div class="flex items-center gap-2 w-full">
                <i data-lucide="search" class="text-black-500 size-6"></i>
                <label for="listing-search" class="sr-only text-black-500">Search listings</label>
                <input type="search" id="listing-search" placeholder="Search listings - e.g. “laptop”" class="input-field">
              </div>
              <button type="submit" class="btn-medium btn-primary w-full md:w-fit">Search</button>
            </div>
            <!-- Filter -->
            <fieldset id="tag-filter" class="flex flex-wrap gap-4 md:gap-2 mt-4 justify-center">
              <legend class="sr-only">Filter by category</legend>
              <div>
                <input type="radio" id="all" name="tag" value="all" class="sr-only peer" checked />
                <label for="all" class="cursor-pointer tag-medium tag-white-border transition peer-checked:bg-blue-light-300 peer-checked:border-blue-light-600 peer-checked:text-blue-medium-500">All</label>
              </div>
              <div>
                <input type="radio" id="electronics" name="tag" value="electronics" class="sr-only peer" />
                <label for="electronics" class="cursor-pointer tag-medium tag-white-border transition peer-checked:bg-blue-light-300 peer-checked:border-blue-light-600 peer-checked:text-blue-medium-500">Electronics</label>
              </div>
              <div>
                <input type="radio" id="art" name="tag" value="art" class="sr-only peer" />
                <label for="art" class="cursor-pointer tag-medium tag-white-border transition peer-checked:bg-blue-light-300 peer-checked:border-blue-light-600 peer-checked:text-blue-medium-500">Art</label>
              </div>
              <div>
                <input type="radio" id="book" name="tag" value="book" class="sr-only peer" />
                <label for="book" class="cursor-pointer tag-medium tag-white-border transition peer-checked:bg-blue-light-300 peer-checked:border-blue-light-600 peer-checked:text-blue-medium-500">Book</label>
              </div>
              <div>
                <input type="radio" id="clothing" name="tag" value="clothing" class="sr-only peer" />
                <label for="clothing" class="cursor-pointer tag-medium tag-white-border transition peer-checked:bg-blue-light-300 peer-checked:border-blue-light-600 peer-checked:text-blue-medium-500">Clothing</label>
              </div>
              <div>
                <input type="radio" id="ending-soon" name="tag" value="ending-soon" class="sr-only peer" />
                <label for="ending-soon" class="cursor-pointer tag-medium tag-white-border transition peer-checked:bg-blue-light-300 peer-checked:border-blue-light-600 peer-checked:text-blue-medium-500">Ending soon</label>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
    <section id="listings-container" class="px-6 md:px-8 lg:px-16 mb-8"></section>
    <section class="px-6 md:px-8 lg:px-16">
      <section id="cta-container" class=""></section>
    </section>
  `;
}