import { formatEndDate } from '../../utils/dateUtils.js';
import { placeBid } from '../../utils/fetch.js';
import { showToast } from '../toasts/toast.js';
import { useAuth } from '../../utils/useAuth.js';

export async function listingBidCard({ listingData, activeTag, tags }) {
  /* Bids */
  const currentBid = listingData.bids && listingData.bids.length > 0 ? Math.max(...listingData.bids.map(bid => bid.amount)) : 0;
  const minNextBid = typeof currentBid === 'number' ? `$${currentBid + 1}` : 'Cannot calculate next bid';
  const bidsPlaced = listingData.bids ? listingData.bids.length : 0;

  const auth = useAuth();
  /* Place bid */
  let userData = auth.isLoggedIn() ? await auth.getStoreUserData() : null;
  const credits = userData ? userData.credits : 0;

  async function handleBidSubmit() {
    const bidAmount = document.getElementById("bid-amount").value;
    // check if bid amount is valid
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= currentBid) {
      showToast(`Please enter a valid bid amount greater than the current bid of $${currentBid}.`, 'error');
      return;
    }
    // check if user have enough credits
    if (Number(bidAmount) > credits) {
      showToast(`You do not have enough credits to place this bid.`, 'error');
      return;
    }

    // handle post data
    const response = await placeBid(
      listingData.id,
      bidAmount,
    );

    const auth = useAuth();
    await auth.updateStoreUserData();

    if (response.data) {
      showToast('Bid went through successfully!', 'success');
      setTimeout(() => window.location.reload(), 750);
    }
  }

  function clearForm() {
    const bidAmountInputField = document.getElementById('bid-amount')
    bidAmountInputField.value = '';
  }

  // Different state of the bid form if user is not logged in, logged in or the owner
  function getBidState({ loggedIn, isOwner, isClosed }) {
    if (isClosed && !loggedIn) return 'hidden';
    if (!loggedIn) return 'disabled';
    if (isOwner) return 'hidden';
    if (isClosed) return 'hidden';
    return 'active';
  }

  function renderBidForm() {
    const state = getBidState({
      loggedIn: useAuth().isLoggedIn(),
      isOwner: useAuth().getUserData()?.name === listingData.seller?.name,
      isClosed: new Date(listingData.endsAt) < new Date(),
    });
    switch (state) {
      case 'disabled':
        return `
          <form id="bid-form" class="flex flex-col gap-4 items-center">
            <div class="flex flex-row gap-2 w-full">
              <label for="bid-amount" class="sr-only">Your bid</label>
              <input type="number" id="bid-amount" placeholder="Login to place a bid" class="input-field flex-1" disabled>
              <button type="button" class="btn-medium btn-disabled" disabled>Place bid</button>
            </div>
            <a href="#/login" class="text-black-500/70 text-base font-normal hover:text-black-500 hover:underline">Log in to place a bid</a>
          </form>
        `;
      case 'hidden':
        return '';
      case 'active':
        return `
          <form id="bid-form" class="flex flex-col gap-4 items-center">
            <div class="flex flex-row gap-2 w-full">
              <label for="bid-amount" class="sr-only">Your bid</label>
              <input type="number" id="bid-amount" placeholder="Enter bid amount" class="input-field flex-1">
              <button type="submit" class="btn-medium btn-primary">Place bid</button>
            </div>
            <p class="text-black-500/70 text-base font-normal">You have $${credits} credits available</p>
          </form>
        `;
      default:
        return '';
    }
  }

  setTimeout(() => {
    const bidform = document.getElementById("bid-form")
    if (!bidform) return;
    bidform.addEventListener("submit", (event) => {
      event.preventDefault();
      handleBidSubmit();
      clearForm();
    });
  }, 0)

  return `
    <div class="card-large flex flex-col gap-8">
      <div>
        <h1 class="mb-2 text-3xl mb:text-4xl text-ellipsis line-clamp-2 break-word">${listingData.title || 'Untitled Listing'}</h1>
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
      ${renderBidForm()}
    </div>
  `;
}
