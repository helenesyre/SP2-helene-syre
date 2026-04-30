import { getListingById } from "../assets/js/utils/fetch";
import { singleListingCountdown, formatEndDate } from '../assets/js/utils/dateUtils.js';

export async function listing() {
  const id = window.location.hash.split('/')[2];
  const response = await getListingById(id);
  const listingData = response.data;

  console.log('Fetched listing data:', listingData);
  /* Listing details */
  const mainImage = listingData.media && listingData.media.length > 0 ? listingData.media[0].url : 'https://via.placeholder.com/400x300?text=No+Image';
  const imageAlt = listingData.media && listingData.media.length > 0 ? listingData.media[0].alt : listingData.title || 'Listing Image';
  const multipleImages = listingData.media && listingData.media.length > 1;
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

  /* Bids */
  const currentBid = listingData.bids && listingData.bids.length > 0 ? listingData.bids[listingData.bids.length - 1].amount : 0;
  const minNextBid = typeof currentBid === 'number' ? `$${currentBid + 1}` : 'Cannot calculate next bid';
  const bidsPlaced = listingData.bids ? listingData.bids.length : 0;

  /* Bid history */
  const bidHistory = [...(listingData.bids || [])]
    .sort((small, big) => big.amount - small.amount)
    .map((bid, index, array) => {
      const isLast = index === array.length - 1;
      const highestBidder = index === 0;
      return `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img src="${bid.bidder.avatar?.url || 'https://placehold.co/40x40/dadada/aaa?text=User'}" alt="${bid.bidder.avatar?.alt || `${bid.bidder.name}'s avatar`}" class="size-14 object-cover rounded-full">
        <div>
          <p class="text-lg font-bold text-black-500">@${bid.bidder.name}</p>
          <p class="text-base font-medium text-black-300">${new Date(bid.created).toLocaleString()}</p>
        </div>
        ${highestBidder ? '<span class="tag-medium tag-green-light">Highest bid</span>' : ''}
      </div>
      <p class="text-xl font-bold text-blue-medium-500">$${bid.amount}</p>
    </div>
    ${isLast ? '' : '<hr class="border-border my-4">'}
    `;
    }).join('') || '<p class="text-black-500 text-center">No bids yet</p>';
  console.log(tags)

  setTimeout(() => {
    const countdownElement = document.getElementById(`countdown-${listingData.id}`);
    if (countdownElement) singleListingCountdown(countdownElement, listingData.endsAt);
  }, 0);

  return `
    <article class="px-6 md:px-8 lg:px-16 py-12">
      <!-- Breadcrumbs -->
      <nav class="text-base font-medium mb-4" aria-label="Breadcrumb">
        <ol class="list-reset flex text-black-200">
          <li><a href="#/" class="hover:underline">Home</a></li>
          <li><span class="mx-2">/</span></li>
          <li class="text-blue-500">${title}</li>
        </ol>
      </nav>

      <!-- Listing details -->
      <section class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-10 gap-8">
        <div class="flex flex-col gap-8 col-span-1 xl:col-span-6">
          <img src="${mainImage}" alt="${imageAlt}" class="w-full h-108 object-cover rounded-default">
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

        <div class="flex flex-col gap-8 col-span-1 xl:col-span-4">
          <div class="card-large">
            <h1 class="mb-2">${title}</h1>
            <div class="flex flex-wrap items-center gap-2 mb-4">
              ${activeTag}
              ${tags.map(tag => `<span class="tag-medium tag-blue-light">${tag}</span>`).join('')}
              <span class="text-black-500 text-sm font-semibold">${bidsPlaced} bids placed</span>
            </div>
            <div class="text-black-500 text-base font-medium">
              <p>Current bid</p>
              <p class="text-5xl font-bold text-blue-medium-500">$${currentBid}</p>
              <p>Minimum next bid: ${minNextBid}</p>
            </div>
            <div class="flex items-center justify-between bg-gray-300 rounded-default p-4 mt-6">
              <div>
                <p class="text-black-500 text-lg font-normal">Auction ends</p>
                <p class="text-black-500 text-2xl font-semibold">${formatEndDate(listingData.endsAt)}</p>
              </div>
              <span id="countdown-${listingData.id}" class="tag-medium tag-blue-border">1h 14m left</span>
            </div>
            <form class="flex flex-col gap-4 mt-6">
              <div class="flex flex-row gap-2">
                <label for="bid-amount" class="sr-only">Your bid</label>
                <input type="number" id="bid-amount" name="bid-amount" placeholder="Enter bid amount" class="input-field flex-1">
                <button type="submit" class="btn-medium btn-primary">Place bid</button>
              </div>
              <p>You have $6,100 available</p>
            </form>
          </div>
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
}