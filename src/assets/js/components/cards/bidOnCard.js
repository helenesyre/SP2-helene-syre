import { renderBidListingCountdown } from "../../utils/dateUtils";

/**
 * Renders a bid card element for displaying a specific user's bids on the profile page.
 * @param {Object} bid - The bid data with associated listing information.
 * @param {boolean} [bidWon=false] - Indicates if the bid was won.
 * @returns {HTMLElement} The bid card element.
 */
export function bidOnCard(bid, bidWon = false) {
  const cardContainer = document.createElement('a');
  cardContainer.href = `#/listing/${bid.listing?.id}`;
  cardContainer.classList = "group card flex flex-col md:flex-row gap-4 justify-between items-start md:items-center";

  const listingInfoContainer = document.createElement('div');
  listingInfoContainer.classList = "flex flex-row gap-2 items-center";

  // Image
  const image = document.createElement('img');
  image.src = bid.listing?.media?.[0]?.url || 'https://placehold.co/300x200/dadada/aaa?text=No+Image';
  image.alt = bid.listing?.title || 'Untitled Listing';
  image.classList = "size-20 object-cover rounded-default flex-shrink-0";

  // Title and amount container
  const bidInfoContainer = document.createElement('div');
  bidInfoContainer.classList = "flex flex-col gap-0";

  // Title
  const title = document.createElement('h3');
  title.textContent = bid.listing?.title || 'Untitled Listing';
  title.classList = "text-xl font-semibold text-black-500 max-w-sm line-clamp-2 break-all";

  // Bid amount
  const amountContainer = document.createElement('div');
  amountContainer.classList = "flex flex-row gap-2 items-center";

  const yourBidLabel = document.createElement('p');
  yourBidLabel.classList = "text-sm font-medium text-black-500";
  yourBidLabel.textContent = "Your bid:";

  const amount = document.createElement('p');
  amount.textContent = `$${bid.amount}`;
  amount.classList = "text-xl font-bold text-blue-medium-500";

  amountContainer.appendChild(yourBidLabel);
  amountContainer.appendChild(amount);

  // Tag and date container
  const stateContainer = document.createElement('div');
  stateContainer.classList = "flex flex-row md:flex-col w-full md:w-auto items-center md:items-end gap-1 justify-between md:justify-end border-t md:border-t-0 border-gray-500 pt-4 md:pt-0";

  // Won, winning and outbid tags
  const ended = new Date(bid.listing?.endsAt) < new Date();
  let status;
  const tag = document.createElement('span');
  switch (true) {
    case ended && bidWon:
      status = 'Won';
      tag.classList = "tag-medium tag-green-light";
      tag.textContent = status;
      break;
    case !ended:
      status = 'Ongoing';
      tag.classList = "tag-medium tag-blue-light";
      tag.textContent = status;
      break;
    default:
      status = 'Outbid';
      tag.classList = "tag-medium tag-red";
      tag.textContent = status;
  }

  // Date
  const date = document.createElement('p');
  date.classList = "text-sm text-right font-normal text-black-500";
  renderBidListingCountdown(date, bid.listing?.endsAt);

  // Append elements to the card container
  bidInfoContainer.appendChild(title);
  bidInfoContainer.appendChild(amountContainer);

  listingInfoContainer.appendChild(image);
  listingInfoContainer.appendChild(bidInfoContainer);
  cardContainer.appendChild(listingInfoContainer);

  stateContainer.appendChild(tag);
  stateContainer.appendChild(date);
  cardContainer.appendChild(stateContainer);

  return cardContainer;
}
