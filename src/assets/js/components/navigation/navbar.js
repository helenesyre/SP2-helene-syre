import { logo } from '../../../logo/logo.js';
import userProfile from '../../../images/user-profile.jpg';

function renderVisitorNav() {
  return `
    <nav class="flex items-center justify-between p-6 md:px-8 lg:px-16 border-b border-border">
      <a href="/" class="w-24 md:w-32 lg:w-40">${logo}</a>
      <ul class="flex flex-row items-center gap-2 md:gap-4">
        <li><a href="#" class="btn-small md:btn-medium btn-border">Log in</a></li>
        <li><a href="#" class="btn-small md:btn-medium btn-border">Register</a></li>
      </ul>
    </nav>
  `;
}

function renderLoggedInNav() {
  return `
    <nav class="relative flex items-center justify-between p-6 md:px-8 lg:px-16 border-b border-border">
      <a href="/" class="w-24 md:w-32 lg:w-40">${logo}</a>
      <ul class="flex flex-row items-center gap-2 md:gap-4">
      <!-- New listing -->
        <li class="hidden md:block">
          <button class="btn-small md:btn-medium btn-ghost">
            <i data-lucide="circle-plus" width="18px" height="18px"></i>
            New listing
          </button>
        </li>

        <!-- Credits -->
        <li>
          <span class="tag">
            <i data-lucide="circle-dollar-sign" width="18px" height="18px"></i>
            6,100
          </span>
        </li>

        <!-- User profile -->
        <li class="hidden md:block"><a href="#"><img src="${userProfile}" alt="User Profile" class="size-10 object-cover rounded-default"></a></li>

        <!-- Log out -->
        <li class="hidden md:block"><a href="#" class="btn-small md:btn-medium btn-border">Log out</a></li>

        <!-- Hamburger menu for mobile -->
        <li class="block md:hidden">
          <button id="hamburger-btn" class="text-black-500 hover:text-blue-500 cursor-pointer flex items-center">
            <i data-lucide="menu"></i>
          </button>
        </li>
      </ul>

      <!-- Mobile menu -->
      <div id="mobile-menu" class="hidden md:hidden absolute top-0 right-0 p-6 w-6/7 h-screen bg-white border border-border shadow-md z-50">
        <div class="flex justify-end">
          <button id="close-mobile-menu" class="text-black-500 hover:text-blue-500 cursor-pointer">
            <i data-lucide="x"></i>
          </button>
        </div>

        <div class="flex flex-row items-center gap-4">
          <a href="#"><img src="${userProfile}" alt="User Profile" class="size-14 object-cover rounded-default"></a>
          <div>
            <p class="text-lg font-bold text-black-500">Helene Syre</p>
            <p class="text-base font-normal text-black-300">@helenesyre</p>
          </div>
        </div>

        <hr class="my-8 border-border">

        <ul class="flex flex-col gap-1">
          <li>
            <a href="#" class="flex gap-2 items-center px-4 py-2 rounded-default text-base/5.5 font-bold hover:bg-gray-200">
            <i data-lucide="home" width="18px" height="18px"></i>
              Home
            </a>
          </li>
          <li>
            <a href="#" class="flex gap-2 items-center px-4 py-2 rounded-default text-base/5.5 font-bold hover:bg-gray-200">
            <i data-lucide="circle-plus" width="18px" height="18px"></i>
              New listing
            </a>
          </li>
          <li>
            <a href="#" class="flex gap-2 items-center px-4 py-2 rounded-default text-base/5.5 font-bold hover:bg-gray-200">
            <i data-lucide="user" width="18px" height="18px"></i>
              Profile
            </a>
          </li>
          <li>
            <a href="#" class="flex gap-2 items-center px-4 py-2 rounded-default text-base/5.5 font-bold hover:bg-gray-200">
            <i data-lucide="log-out" width="18px" height="18px"></i>
              Log out
            </a>
          </li>
        </ul>

        <hr class="my-8 border-border">

        <div>
          <p class="text-base font-bold mb-1">My credits:</p>
          <span class="tag">
            <i data-lucide="circle-dollar-sign" width="18px" height="18px"></i>
            6,100
          </span>
        </div>
      </div>
    </nav>
  `;
}

export function renderNavbar() {
  const navContainer = document.getElementById('nav-container');
  navContainer.innerHTML = renderVisitorNav();

  /* ADD BACK WHEN USER AUTHENTICATION IS SET UP
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  closeMobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });*/
}