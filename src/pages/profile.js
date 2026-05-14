import { getSingleProfileData, getBidsByProfile } from '../assets/js/utils/fetch.js';
import useModal from '../assets/js/utils/useModal.js';
import { editProfileModal } from '../assets/js/components/modals/editProfileModal.js';
import { useAuth } from '../assets/js/utils/useAuth.js';
import useTabs, { createTab } from '../assets/js/utils/useTabs.js';
import { profileListings } from '../assets/js/components/tabs/profile/profileListings.js';
import { profileBids } from '../assets/js/components/tabs/profile/profileBids.js';

/**
 * Profile page view: fetches profile data by username from URL, renders profile details, listings and bids tabs.
 * Also handles edit profile action if the user is viewing their own profile.
 * @returns {string} HTML string representing the profile page.
 */
export async function profile() {
  // Get profile name from URL hash
  const hash = window.location.hash;
  const profilePageMatch = hash.match(/^#\/profile\/([^\/]+)/);
  const urlProfileName = profilePageMatch ? profilePageMatch[1] : null;

  let profileResponse;
  try {
    profileResponse = await getSingleProfileData(urlProfileName);
    if (!profileResponse.data) {
      throw Error("Profile not found");
    }
  } catch {
    window.location.hash = '#/page-not-found';
    return;
  }

  // Extract profile data
  const profileData = profileResponse.data;
  // Name
  const profileName = profileData.name || profileData.username || 'User';
  // Username
  const profileUsername = profileName || 'username';
  //Banner
  const profileBanner = profileData.banner?.url || 'https://placehold.co/600x200/dadada/aaa?text=Profile+Banner';
  const profileBannerAlt = profileData.banner?.alt || `${profileName}'s banner` || 'User profile banner';
  // Avatar
  const profileAvatar = profileData.avatar?.url || 'https://placehold.co/150x150/dadada/aaa?text=User';
  const profileAvatarAlt = profileData.avatar?.alt || `${profileName}'s avatar` || 'User profile picture';
  // Bio
  const profileBio = profileData.bio || 'This user has not provided a bio yet.';

  // Tabs
  const { renderListings } = profileListings(urlProfileName);
  const { renderBids } = profileBids(urlProfileName);

  const listingTitle = useAuth().getUserData().name === profileName ? 'My listings' : `Listings`;
  const bidsTitle = useAuth().getUserData().name === profileName ? 'My bids' : `Bids`;
  const listingsTab = createTab(listingTitle, renderListings);
  const bidsTab = createTab(bidsTitle, renderBids);

  let tabs = useTabs([listingsTab, bidsTab]);

  // Edit profile modal
  setTimeout(() => {
    // Only show edit/delete buttons if the user is logged in and is the seller of the listing
    const { isLoggedIn, getUserData } = useAuth();
    const user = getUserData();
    if (isLoggedIn() && user.name === profileData.name) {
      const { openModal } = useModal();
      document.getElementById('edit-btn')?.addEventListener('click', () => openModal(editProfileModal(profileData)));
    }
  }, 0);

  const isLoggedInUser = useAuth().isLoggedIn() && useAuth().getUserData().name === profileData.name;

  return `
    <h1 class="sr-only">${profileName} profile</h1>
    <div>
      <img src="${profileBanner}" alt="${profileBannerAlt}" class="w-full h-48 md:h-56 lg:h-64 xl:h-80 object-cover" />
      <section class="relative z-10 w-full -mt-20 md:-mt-16 lg:-mt-24 px-6 md:px-8 lg:px-16">
        <div class="flex flex-col lg:flex-row flex-wrap items-center lg:items-end mb-6 gap-6 md:gap-9 justify-between">
          <div class="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-9">
            <img src="${profileAvatar}" alt="${profileAvatarAlt}" class="size-40 md:size-60 lg:size-64 xl:size-80 rounded-default object-cover" />
            <div class="lg:max-w-md xl:mb-10">
              <div class="flex flex-row gap-3 items-start justify-between md:justify-normal">
                <div class="flex flex-col gap-1">
                  <h2 class="text-3xl font-semibold text-black-500 capitalize">${profileName}</h2>
                  <p class="text-base font-normal text-black-300">@${profileUsername}</p>
                </div>
                ${isLoggedInUser ? `
                <button id="edit-btn" class="btn-border btn-medium">
                  Edit profile
                  <i data-lucide="pencil" class="size-5"></i>
                </button>
              ` : ''}
              </div>
              <p class="text-base font-normal text-black-500 mt-4">${profileBio}</p>
            </div>
          </div>
            <ul class="grid ${isLoggedInUser ? 'grid-cols-3' : 'grid-cols-2'} gap-2 md:gap-4 xl:mb-10">
              <li class="flex flex-col items-center px-4.5 md:px-7 xl:px-9 py-4 border border-gray-600 rounded-default">
                <p class="text-xl md:text-3xl text-blue-medium-500 font-bold">${profileData._count?.listings}</p>
                <p class="text-sm md:text-base text-black-300 whitespace-nowrap">Listings</p>
              </li>
              <li class="flex flex-col items-center px-4.5 md:px-7 xl:px-9 py-4 border border-gray-600 rounded-default">
                <p class="text-xl md:text-3xl text-blue-medium-500 font-bold">${profileData._count?.wins}</p>
                <p class="text-sm md:text-base text-black-300 whitespace-nowrap">Bids won</p>
              </li>
              ${isLoggedInUser ? `
                <li class="flex flex-col items-center px-4.5 md:px-7 xl:px-9 py-4 border border-gray-600 rounded-default">
                  <p class="text-xl md:text-3xl text-blue-medium-500 font-bold">${profileData.credits}</p>
                  <p class="text-sm md:text-base text-black-300 whitespace-nowrap">Credits</p>
                </li>
              ` : ''}
            </ul>
        </div>
      </section>
      <section class="flex flex-col gap-6 px-6 md:px-8 lg:px-16 mt-14 lg:mt-12">
        ${tabs.renderTabs().tabsNav.outerHTML}
        ${tabs.renderTabs().tabsContent.outerHTML}
      </section>
    </div>
  `;
}