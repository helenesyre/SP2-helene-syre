export function listingCard(listing) {
  const image = listing.media?.[0]?.url || 'https://placehold.co/400x300/dadada/aaa?text=No+image&font=open-sans';
  const imageAlt = listing.media?.[0]?.alt || listing.title;
  const title = listing.title || 'Untitled listing';
  const seller = listing.seller?.name || 'unknown';
  const bidCount = listing._count?.bids ?? 0;
  const currentBid = listing.bids[listing.bids.length - 1]?.amount ?? 0;

  const endsIn = '';

  return `
    <a href="#/listing" class="group card flex flex-col gap-4">

      <div class="relative aspect-3/2 overflow-hidden rounded-default">
        <span id="countdown-${listing.id}" class="absolute top-2 right-2 z-10 tag-medium tag-blue-light">${endsIn}</span>
        <img src="${image}" alt="${imageAlt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl font-semibold text-black-500 truncate">${title}</h3>
          <p class="text-black-500 text-sm font-regular">Posted by @${seller} · ${bidCount} bids</p>
        </div>
        <hr class="border-border">
        <div class="flex items-center justify-between mt-3">
          <div>
            <p class="text-sm font-medium text-black-500">Current bid</p>
            <p class="text-xl font-bold text-blue-medium-500">$${currentBid}</p>
          </div>
          <button class="btn-medium btn-primary">
            Bid now
            <i data-lucide="external-link" width="18px" height="18px"></i>
          </button>
        </div>
      </div>

    </a>
  `;
}