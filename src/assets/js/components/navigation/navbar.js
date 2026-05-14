import { logo } from '../../../logo/logo.js';
import { useAuth } from '../../utils/useAuth.js';
import useModal from '../../utils/useModal.js';
import { createListingModal } from '../modals/createListingModal.js';
import { renderIcons } from '../../utils/icons.js';

/**
 * Renders visitor navigation.
 * @returns {string} The HTML string for the visitor navigation bar.
 */
function renderVisitorNav() {
  const hash = window.location.hash || '#/';
  const isActive = (path) => hash === path ? 'btn-primary' : 'btn-border';
  return `
    <nav class="flex items-center justify-between p-6 md:px-8 lg:px-16 border-b border-border">
      <a href="#/" aria-label="Nudge logo - go to home" class="w-24 md:w-32 lg:w-40">${logo}</a>
      <ul class="flex flex-row items-center gap-2 md:gap-4">
        <li><a href="#/login" class="btn-small md:btn-medium ${isActive('#/login')}">Log in</a></li>
        <li><a href="#/register" class="btn-small md:btn-medium ${isActive('#/register')}">Register</a></li>
      </ul>
    </nav>
  `;
}

/**
 * Renders logged-in user's navigation, including a mobile menu.
 * @returns {Promise<string>} The HTML string for the logged-in navigation bar.
 */
async function renderLoggedInNav() {
  const { openModal } = useModal();
  const modalContent = createListingModal();
  addEventListener('click', (event) => {
    if (event.target.closest('#new-listing-btn, #new-listing-btn-mobile')) {
      event.preventDefault();
      openModal(modalContent);
    }
  });

  // Fetch user profile data to display profile picture and name in the navbar
  const auth = useAuth();
  const userData = auth.getUserData();
  const profileResponse = await auth.getStoreUserData();
  const userProfilePicture = profileResponse?.avatar?.url || 'https://placehold.co/40x40/dadada/aaa?text=User';
  const userProfileAlt = profileResponse?.avatar?.alt || `${userData.name}'s avatar` || 'User profile picture';
  const userProfileName = profileResponse?.name || userData.name || 'User';
  const userProfileUsername = profileResponse?.username || userData.name || 'username';
  const credits = profileResponse?.credits || 0;

  return `
    <nav class="relative flex items-center justify-between p-6 md:px-8 lg:px-16 border-b border-border">
      <a href="#/" aria-label="Nudge logo - go to home" class="w-24 md:w-32 lg:w-40">${logo}</a>
      <ul class="flex flex-row items-center gap-2 md:gap-4">
      <!-- New listing -->
        <li class="hidden md:block">
          <button id="new-listing-btn" aria-label="Create new listing" class="btn-small md:btn-medium btn-ghost">
            <i data-lucide="circle-plus" class="size-5"></i>
            New listing
          </button>
        </li>

        <!-- Credits -->
        <li>
          <span class="tag-icon tag-blue-light">
            <i data-lucide="circle-dollar-sign" class="size-5"></i>
            ${credits}
          </span>
        </li>

        <!-- User profile -->
        <li class="hidden md:block"><a href="#/profile/${userProfileName}" aria-label="Go to profile"><img src="${userProfilePicture}" alt="${userProfileAlt}" class="size-10 object-cover rounded-default"></a></li>

        <!-- Log out -->
        <li class="hidden md:block">
          <button id="logout-button" aria-label="Log out" class="btn-small md:btn-medium btn-border">
            Log out
          </button>
        </li>

        <!-- Hamburger menu for mobile -->
        <li class="block md:hidden">
          <button id="hamburger-btn" aria-label="Open menu" class="text-black-500 hover:text-blue-500 cursor-pointer flex items-center">
            <i data-lucide="menu" class="size-6"></i>
          </button>
        </li>
      </ul>

      <!-- Mobile menu -->
      <div id="mobile-backdrop" class="hidden fixed md:hidden  inset-0 bg-black/70 z-60">
        <div id="mobile-menu" class="hidden md:hidden absolute top-0 right-0 p-6 w-6/7 h-screen bg-white border border-border shadow-md z-70">
          <div class="flex justify-end">
            <button id="close-mobile-menu" aria-label="Close menu" class="text-black-500 hover:text-blue-500 cursor-pointer">
              <i data-lucide="x" class="size-6"></i>
            </button>
          </div>

          <div class="flex flex-row items-center gap-4">
            <a href="#/profile/${userProfileName}" aria-label="Go to profile"><img src="${userProfilePicture}" alt="${userProfileAlt}" class="size-14 object-cover rounded-default"></a>
            <div>
              <p class="text-lg font-bold text-black-500">${userProfileName}</p>
              <p class="text-base font-normal text-black-300">@${userProfileUsername}</p>
            </div>
          </div>

          <hr class="my-8 border-border">

          <ul class="flex flex-col gap-1">
            <li>
              <a href="#/" aria-label="Go to home" class="flex gap-2 items-center px-4 py-2 rounded-default text-base/5.5 font-bold hover:bg-gray-200">
              <i data-lucide="home" class="size-5"></i>
                Home
              </a>
            </li>
            <li>
              <a id="new-listing-btn-mobile" href="#" aria-label="Create new listing" class="flex gap-2 items-center px-4 py-2 rounded-default text-base/5.5 font-bold hover:bg-gray-200">
              <i data-lucide="circle-plus" class="size-5"></i>
                New listing
              </a>
            </li>
            <li>
              <a href="#/profile/${userProfileName}" aria-label="Go to profile" class="flex gap-2 items-center px-4 py-2 rounded-default text-base/5.5 font-bold hover:bg-gray-200">
              <i data-lucide="user" class="size-5"></i>
                Profile
              </a>
            </li>
            <li>
              <button id="logout-button-mobile" aria-label="Log out" class="flex w-full cursor-pointer gap-2 items-center px-4 py-2 rounded-default text-base/5.5 font-bold hover:bg-gray-200">
              <i data-lucide="log-out" class="size-5"></i>
                Log out
              </button>
            </li>
          </ul>

          <hr class="my-8 border-border">

          <div>
            <p class="text-base font-bold mb-1">My credits:</p>
            <span class="tag-icon tag-blue-light">
              <i data-lucide="circle-dollar-sign" class="size-5"></i>
              ${credits}
            </span>
          </div>
        </div>
      </div>
    </nav>
  `;
}

/**
 * Renders the appropriate navigation bar based on the user's authentication status. If the user is logged in, it shows the logged-in nav; otherwise, it shows the visitor nav. Also sets up event listeners for the mobile menu toggle and logout functionality.
 * @returns {Promise<void>} The function does not return a value but updates the DOM with the appropriate navigation bar.
 */
export async function renderNavbar() {
  const navContainer = document.getElementById('nav-container');
  if (navContainer) {
    const auth = useAuth();
    // If the user is logged in, show the logged-in nav, otherwise show the visitor nav.
    if (auth.isLoggedIn()) {
      navContainer.innerHTML = await renderLoggedInNav();
    } else {
      navContainer.innerHTML = renderVisitorNav();
    }
  }

  renderIcons();

  // Mobile menu toggle functionality
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-backdrop');

  if (mobileMenu && backdrop) {
    const navElement = navContainer.querySelector('nav');

    navElement.addEventListener('click', function (event) {
      if (event.target.closest('#hamburger-btn')) {
        mobileMenu.classList.toggle('hidden');
        backdrop.classList.toggle('hidden');
      }
      if (event.target.closest('#close-mobile-menu')) {
        mobileMenu.classList.add('hidden');
        backdrop.classList.add('hidden');
      }
      if (event.target.closest('#mobile-backdrop')) {
        mobileMenu.classList.add('hidden');
        backdrop.classList.add('hidden');
      }
    });

    const auth = useAuth();
    navElement.addEventListener('click', function (event) {
      if (event.target.closest('#logout-button, #logout-button-mobile')) {
        auth.logout();
        mobileMenu.classList.add('hidden');
        backdrop.classList.add('hidden');
      }
    });
  }
}