import { getSingleProfileData, getBidsByProfile, getSingleProfileListings, getWinsByProfile } from '../assets/js/utils/fetch.js';
import { getUserCredits } from '../assets/js/utils/credits.js';
import useModal from '../assets/js/utils/useModal.js';
import { editProfileModal } from '../assets/js/components/modals/editProfileModal.js';
import { useAuth } from '../assets/js/utils/useAuth.js';
import useTabs, { createTab } from '../assets/js/utils/useTabs.js';
import { listingCard } from '../assets/js/components/cards/listingCard.js';
import { listingCountdown, renderBidListingCountdown } from '../assets/js/utils/dateUtils.js';
import { bidOnCard } from '../assets/js/components/cards/bidOnCard.js';

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
  // Bids placed
  const bidsByProfile = await getBidsByProfile(profileName);
  const bidsByProfileData = bidsByProfile?.data || [];
  const profileTotalBids = bidsByProfileData.length;
  // Credits
  const profileCredits = await getUserCredits();

  const bidsWonByProfile = await getWinsByProfile(profileName);
  const bidsWonByProfileData = bidsWonByProfile?.data || [];

  const profileListings = await getSingleProfileListings(profileName);
  const profileListingsData = profileListings?.data || [];
  // Edit profile modal
  setTimeout(() => {
    // Only show edit/delete buttons if the user is logged in and is the seller of the listing
    const { isLoggedIn, getUserData } = useAuth();
    const user = getUserData();
    if (isLoggedIn() && user.name === profileData.name) {
      const { openModal } = useModal();
      document.getElementById('edit-btn')?.addEventListener('click', () => openModal(editProfileModal(profileData)));
    }
    countdownListings(profileListingsData);
  }, 0);

  // Countdown for listings
  function countdownListings(listings) {
    listings.forEach((listing) => {
      const countdownElement = document.getElementById(`countdown-${listing.id}`);
      if (countdownElement) listingCountdown(countdownElement, listing.endsAt);
    });
  }

  // Create listing cards
  const listingHTML = document.createElement('div');
  listingHTML.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4";
  if (profileListingsData.length > 0) {
    profileListingsData.forEach(listing => {
      listingHTML.appendChild(listingCard(listing, () => { }));
    });
  } else {
    listingHTML.innerHTML = '<p>You have not created any listings yet.</p>';
  }

  // Create bid cards
  const bidsHTML = document.createElement('div');
  bidsHTML.classList = "grid grid-cols-1 lg:grid-cols-2 gap-6";
  if (bidsByProfileData.length > 0) {
    bidsByProfileData.forEach(bid => {
      bidsHTML.appendChild(bidOnCard(bid, bidsWonByProfileData.some(wonBid => wonBid.id === bid.listing.id))); // Check if the bid is a winning bid
    });
  } else {
    bidsHTML.innerHTML = '<p>You have not placed any bids yet.</p>';
  }

  // set up tabs
  const bidsTab = createTab('My bids', bidsHTML);
  const listingTab = createTab('My listings', listingHTML);

  const tabs = useTabs([listingTab, bidsTab]);

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
                <button id="edit-btn" class="btn-border btn-medium">
                  Edit profile
                  <i data-lucide="pencil" width="16px" height="16px"></i>
                </button>
              </div>
              <p class="text-base font-normal text-black-500 mt-4">${profileBio}</p>
            </div>
          </div>
          <ul class="grid grid-cols-3 gap-2 md:gap-4 xl:mb-10">
            <li class="flex flex-col items-center px-4.5 py-4 border border-gray-600 rounded-default">
              <p class="text-xl md:text-3xl text-blue-medium-500 font-bold">${profileListingsData.length}</p>
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
        ${tabs.renderTabs().tabsNav.outerHTML}
        ${tabs.renderTabs().tabsContent.outerHTML}
      </section>
    </div>
  `;
}