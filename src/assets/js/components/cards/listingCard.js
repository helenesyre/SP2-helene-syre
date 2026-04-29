export function listingCard(listing) {
  const cardContainer = document.createElement('a');
  cardContainer.href = `#/listing/${listing.id}`;
  cardContainer.classList = "group card flex flex-col gap-4";

  /* ---- Image Container ---- */
  const imageContainer = document.createElement('div');
  imageContainer.classList = "relative aspect-3/2 overflow-hidden rounded-default";

  const countdown = document.createElement('span');
  countdown.id = `countdown-${listing.id}`;
  countdown.classList = "absolute top-2 right-2 z-10 tag-medium tag-blue-light";

  const image = document.createElement('img');
  image.src = listing.media?.[0]?.url || 'https://placehold.co/400x300/dadada/aaa?text=No+image&font=open-sans';
  image.alt = listing.media?.[0]?.alt || listing.title;
  image.classList = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300";

  imageContainer.appendChild(countdown);
  imageContainer.appendChild(image);
  cardContainer.appendChild(imageContainer);

  /* ---- Content Container ---- */
  const contentContainer = document.createElement('div');
  contentContainer.classList = "flex flex-col gap-2";

  /* CC Container - Header */
  const contentContainerHeader = document.createElement('div');
  contentContainerHeader.classList = "flex flex-col gap-1";

  const title = document.createElement('h3');
  title.classList = "text-xl font-semibold text-black-500 truncate";
  title.textContent = listing.title || 'Untitled listing';

  const sellerBidCount = document.createElement('p');
  sellerBidCount.classList = "text-black-500 text-sm font-regular";
  const seller = listing.seller?.name || 'unknown';
  const bidCount = listing._count?.bids ?? 0;
  sellerBidCount.textContent = `Posted by @${seller} · ${bidCount} bids`;

  contentContainerHeader.appendChild(title);
  contentContainerHeader.appendChild(sellerBidCount);
  contentContainer.appendChild(contentContainerHeader);

  /* CC divider */
  const divider = document.createElement('hr');
  divider.classList = "border-border";

  contentContainer.appendChild(divider);

  /* CC Container - Body */
  const contentContainerBody = document.createElement('div');
  contentContainerBody.classList = "flex items-center justify-between mt-3";

  /* CC Container - Current Bid Container */
  const currentBidContainer = document.createElement('div');

  const currentBidLabel = document.createElement('p');
  currentBidLabel.classList = "text-sm font-medium text-black-500";
  currentBidLabel.textContent = "Current bid";

  const currentBidValue = document.createElement('p');
  currentBidValue.classList = "text-xl font-bold text-blue-medium-500";
  currentBidValue.textContent = listing.bids[listing.bids.length - 1]?.amount ?? 0;

  currentBidContainer.appendChild(currentBidLabel);
  currentBidContainer.appendChild(currentBidValue);
  contentContainerBody.appendChild(currentBidContainer);

  /* CC Container - Button */
  const buttonLink = document.createElement('a');
  buttonLink.classList = "btn-medium btn-primary";
  buttonLink.textContent = "Bid now";

  const openLinkIcon = document.createElement('i');
  openLinkIcon.dataset.lucide = "external-link";
  openLinkIcon.width = "18px";
  openLinkIcon.height = "18px";

  buttonLink.appendChild(openLinkIcon);
  contentContainerBody.appendChild(buttonLink);
  contentContainer.appendChild(contentContainerBody);
  cardContainer.appendChild(contentContainer);

  return cardContainer;
}