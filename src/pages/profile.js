import { getSingleProfileData, getBidsByProfile } from '../assets/js/utils/fetch.js';
import { getUserCredits } from '../assets/js/utils/credits.js';

import useModal from '../assets/js/utils/useModal.js';
import { editProfileModal } from '../assets/js/components/modals/editProfileModal.js';
import { useAuth } from '../assets/js/utils/useAuth.js';

export async function profile() {
  // Get profile name from URL hash
  const hash = window.location.hash;
  const profilePageMatch = hash.match(/^#\/profile\/([^\/]+)/);
  const urlProfileName = profilePageMatch ? profilePageMatch[1] : null;

  let profile;
  try {
    profile = await getSingleProfileData(urlProfileName);
  } catch {
    window.location.hash = '#/page-not-found';
    return;
  }

  if (!profile?.data) {
    window.location.hash = '#/page-not-found';
    return;
  }

  // Extract profile data
  const profileData = profile.data;
  console.log('Profile data:', profileData); // Log the profile data for debugging
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
  // Listings
  const profileListings = profileData.listings || [];
  // Bids placed
  const bidsByProfile = await getBidsByProfile(urlProfileName);
  const profileTotalBids = bidsByProfile.data ? bidsByProfile.data.length : 0;
  console.log('Bids by profile:', bidsByProfile); // Log the bids data for debugging
  // Credits
  const profileCredits = await getUserCredits();

  console.log('Wins:', profileData.wins); // Log wins data for debugging

  // My listings and my bids tabs

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

  return `
    <h1 class="sr-only">${profileName} profile</h1>
    <div>
      <img src="${profileBanner}" alt="${profileBannerAlt}" class="w-full h-48 md:h-56 lg:h-64 xl:h-80 object-cover" />
      <section class="relative z-10 w-full -mt-20 md:-mt-16 lg:-mt-24 px-6 md:px-8 lg:px-16">
        <div class="flex flex-col lg:flex-row flex-wrap items-center lg:items-end mb-6 gap-6 md:gap-9 justify-between">
          <div class="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-9">
            <img src="${profileAvatar}" alt="${profileAvatarAlt}" class="size-40 md:size-60 lg:size-64 xl:size-80 rounded-default object-cover" />
            <div class="max-w-md xl:mb-10">
              <div class="flex flex-row gap-3 items-start justify-between md:justify-normal">
                <div class="flex flex-col gap-1">
                  <h2 class="text-3xl font-semibold text-black-500 capitalize">${profileName}</h2>
                  <p class="text-base font-normal text-black-300">@${profileUsername}</p>
                </div>
                <button id="edit-btn" class="btn-border btn-medium">
                  Edit profile
                  <i data-lucide="pencil" width="16px" height="16px"></i>
                </button>
              </div>
              <p class="text-base font-normal text-black-500 mt-4">${profileBio}</p>
            </div>
          </div>
          <ul class="grid grid-cols-3 gap-2 xl:mb-10">
            <li class="flex flex-col items-center px-4.5 py-4 border border-gray-600 rounded-default">
              <p class="text-xl md:text-3xl text-blue-medium-500 font-bold">${profileListings.length}</p>
              <p class="text-sm md:text-base text-black-300 whitespace-nowrap">Listings</p>
            </li>
            <li class="flex flex-col items-center px-4.5 py-4 border border-gray-600 rounded-default">
              <p class="text-xl md:text-3xl text-blue-medium-500 font-bold">${profileTotalBids}</p>
              <p class="text-sm md:text-base text-black-300 whitespace-nowrap">Bids placed</p>
            </li>
            <li class="flex flex-col items-center px-4.5 py-4 border border-gray-600 rounded-default">
              <p class="text-xl md:text-3xl text-blue-medium-500 font-bold">${profileCredits}</p>
              <p class="text-sm md:text-base text-black-300 whitespace-nowrap">Credits</p>
            </li>
          </ul>
        </div>
      </section>
      <section class="flex flex-col gap-6 px-6 md:px-8 lg:px-16 mt-14 lg:mt-12">
        <nav class="flex justify-center md:justify-start gap-8 mb-6 text-base font-semibold border-b border-gray-600">
          <button id="my-listings-btn" class="text-blue-medium-500 border-b-2 border-blue-medium-500 px-6">My listings</button>
          <button id="my-bids-btn" class="text-black-500/60 border-b-2 border-transparent px-6 cursor-pointer hover:text-black-500">My bids</button>
        </nav>
        <div id="profile-content" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${profileListings.length > 0 ? profileListings.map(listing => `
            <div class="card-small flex flex-col gap-4">
              <h4 class="text-lg font-semibold">${listing.title || 'Untitled Listing'}</h4>
              <p class="text-sm text-black-300">${listing.description || 'No description provided.'}</p>
            </div>
          `).join('') : '<p>You have not created any listings yet.</p>'}
        </div>
        <div id="pagination" class="flex items-center justify-center gap-4 mt-6">
          <button id="prev-page-btn" class="btn-small btn-ghost">Previous</button>
          <span id="current-page" class="text-sm text-black-300">Page 1</span>
          <button id="next-page-btn" class="btn-small btn-ghost">Next</button>
        </div>
      </section>
    </div>
  `;
}