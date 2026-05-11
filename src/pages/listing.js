import { getListingById } from "../assets/js/utils/fetch";
import { singleListingCountdown } from '../assets/js/utils/dateUtils.js';
import { useAuth } from '../assets/js/utils/useAuth.js';
import useModal from '../assets/js/utils/useModal.js';
import { editListingModal } from '../assets/js/components/modals/editListingModal.js';
import { deleteListingModal } from '../assets/js/components/modals/deleteListingModal.js';
import { renderImageGallery } from "../assets/js/components/imageGallery/imageGallery.js";
import { listingBidCard } from '../assets/js/components/cards/listingBidCard.js';

export async function listing() {
  const id = window.location.hash.split('/')[2];
  const response = await getListingById(id);
  const listingData = response.data;
  const { isLoggedIn, getUserData } = useAuth();
  const user = getUserData();

  /* Listing details */
  const title = listingData.title || 'Untitled Listing';
  const description = listingData.description || 'No description available.';
  const tags = listingData.tags || [];
  const isActive = new Date(listingData.endsAt) > new Date();
  const activeTag = isActive
    ? '<span class="tag-medium tag-green-light">Live</span>'
    : '<span class="tag-medium tag-gray">Closed</span>';

  /* Seller */
  const sellerName = listingData.seller ? listingData.seller.name : 'Unknown Seller';
  const sellerImage = listingData.seller?.avatar?.url || 'https://placehold.co/40x40/dadada/aaa?text=User';
  const sellerImageAlt = listingData.seller?.avatar?.alt || `${sellerName}'s avatar`;

  /* Bid history */
  const bidHistory = [...(listingData.bids || [])]
    .sort((small, big) => big.amount - small.amount)
    .map((bid, index, array) => {
      const isLast = index === array.length - 1;
      const highestBidder = index === 0;
      return `
    <div class="flex items-center justify-between">
      <div class="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-1 md:gap-4 lg:gap-1 xl:gap-4">
        <div class="flex items-center gap-4">
          <img src="${bid.bidder.avatar?.url || 'https://placehold.co/40x40/dadada/aaa?text=User'}" alt="${bid.bidder.avatar?.alt || `${bid.bidder.name}'s avatar`}" class="size-14 object-cover rounded-full">
          <div>
            <p class="text-lg font-bold text-black-500">@${bid.bidder.name}</p>
            <p class="text-base font-medium text-black-300">${new Date(bid.created).toLocaleString()}</p>
          </div>
        </div>
        ${highestBidder ? '<span class="tag-medium tag-green-light">Highest bid</span>' : ''}
      </div>
      <p class="text-xl font-bold text-blue-medium-500">$${bid.amount}</p>
    </div>
    ${isLast ? '' : '<hr class="border-border my-4">'}
    `;
    }).join('') || '<p class="text-black-500 text-center">No bids yet</p>';

  const mediaArr = listingData.media || [];

  const html = `
    <article class="px-6 md:px-8 lg:px-16 py-12">
      <!-- Breadcrumbs -->
      <div class="flex flex-wrap gap-2 items-center justify-between mb-6">
        <nav class="text-base font-medium" aria-label="Breadcrumb">
          <ol class="list-reset flex text-black-200">
            <li><a href="#/" class="hover:underline">Home</a></li>
            <li><span class="mx-2">/</span></li>
            <li class="text-blue-500">${title}</li>
          </ol>
        </nav>
        ${(isLoggedIn() && user.name === listingData.seller?.name) ? `
          <div id="seller-listings-actions" class="flex items-center gap-2">
            ${new Date(listingData.endsAt) < new Date() ? '' : `
              <button id="edit-btn" class="btn-border btn-medium">
                Edit listing
                <i data-lucide="pencil" class="size-5"></i>
              </button>
            `}
            ${listingData._count?.bids > 0 ? '' : `
              <button id="delete-btn" class="btn-icon btn-ghost hover:bg-feedback-error-bg hover:text-feedback-error-icon">
                <i data-lucide="trash-2" class="size-5"></i>
              </button>
            `}
          </div>
          `
      : ''
    }
      </div>

      <!-- Listing details -->
      <section class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-8">
        <div class="flex flex-col gap-8 col-span-1 xl:col-span-7">
          <div id="listing-images">
            <!-- Image gallery will be rendered here -->
          </div>
          <div class="card-large">
            <h2 class="text-xl font-semibold mb-2">About this listing</h2>
            <p class="text-black-500 text-base w-full xl:w-3/4">${description}</p>
            <hr class="my-4 border-border">
            <div class="flex items-center gap-4">
              <img src="${sellerImage}" alt="${sellerImageAlt}" class="size-14 object-cover rounded-full">
              <div>
                <p class="text-lg font-bold text-black-500">${sellerName}</p>
                <p class="text-base font-medium text-black-300">@${sellerName}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-8 col-span-1 xl:col-span-5">
          ${await listingBidCard({ listingData, activeTag, tags })}
          <div class="card-large">
            <h2 class="text-2xl font-semibold mb-8">Bid history</h2>
            <div>
              ${bidHistory}
            </div>
          </div>
        </div>
      </section>
    </article>
  `;

  setTimeout(() => {
    const countdownElement = document.getElementById(`countdown-${listingData.id}`);
    if (countdownElement) singleListingCountdown(countdownElement, listingData.endsAt);

    // Only show edit/delete buttons if the user is logged in and is the seller of the listing
    if (isLoggedIn() && user.name === listingData.seller?.name) {
      const { openModal } = useModal();
      document.getElementById('edit-btn')?.addEventListener('click', () => openModal(editListingModal(listingData)));
      document.getElementById('delete-btn')?.addEventListener('click', () => openModal(deleteListingModal(listingData.id, () => { window.location.hash = ''; })));
    }

    renderImageGallery(mediaArr);
  }, 0);

  return html;
}