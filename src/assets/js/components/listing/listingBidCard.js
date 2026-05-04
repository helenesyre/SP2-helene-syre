import { formatEndDate } from '../../utils/dateUtils.js';
import { getUserCredits } from '../../utils/credits.js';

export async function listingBidCard({ listingData, activeTag, tags }) {
  /* Bids */
  const currentBid = listingData.bids && listingData.bids.length > 0 ? listingData.bids[listingData.bids.length - 1].amount : 0;
  const minNextBid = typeof currentBid === 'number' ? `$${currentBid + 1}` : 'Cannot calculate next bid';
  const bidsPlaced = listingData.bids ? listingData.bids.length : 0;

  /* Place bid */
  const credits = await getUserCredits();

  return `
    <div class="card-large flex flex-col gap-8">
      <div>
        <h1 class="mb-2 text-3xl mb:text-4xl">${listingData.title || 'Untitled Listing'}</h1>
        <div class="flex flex-wrap items-center gap-2">
          ${activeTag}
          ${tags.map(tag => `<span class="tag-medium tag-blue-light">${tag}</span>`).join('')}
          <span class="text-black-500 text-sm font-semibold">${bidsPlaced} bids placed</span>
        </div>
      </div>

      <div class="text-black-500 text-base font-medium">
        <p>Current bid</p>
        <p class="text-3xl md:text-5xl font-bold text-blue-medium-500">$${currentBid}</p>
        <p>Minimum next bid: ${minNextBid}</p>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 bg-gray-300 rounded-default p-4">
        <div class="text-center md:text-left">
          <p class="text-black-500 text-lg font-normal">Auction ends</p>
          <p class="text-black-500 text-2xl font-semibold">${formatEndDate(listingData.endsAt)}</p>
        </div>
        <span id="countdown-${listingData.id}" class="tag-medium tag-blue-border"></span>
      </div>

      <form id="bid-form" class="flex flex-col gap-4 items-center">
        <div class="flex flex-row gap-2 w-full">
          <label for="bid-amount" class="sr-only">Your bid</label>
          <input type="number" id="bid-amount" name="bid-amount" placeholder="Enter bid amount" class="input-field flex-1">
          <button type="submit" class="btn-medium btn-primary">Place bid</button>
        </div>
        <p class="text-black-500/70 text-base font-normal">You have $${credits} credits available</p>
      </form>
    </div>
  `;
}
