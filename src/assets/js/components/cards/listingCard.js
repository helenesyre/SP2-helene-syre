import { useAuth } from "../../utils/useAuth";
import useModal from "../../utils/useModal.js";
import { editListingModal } from "../modals/editListingModal.js";
import { deleteListingModal } from "../modals/deleteListingModal.js";

export function listingCard(listing, deleteAndRefreshFunction) {
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

  /* CC Container - Buttons */
  const { getUserData, isLoggedIn } = useAuth();
  const user = getUserData();
  if (!isLoggedIn() || (new Date(listing.endsAt) < new Date())) {
    // user is not logged in or listing has ended
    const loginPrompt = document.createElement('button');
    loginPrompt.classList = "btn-medium btn-primary";
    loginPrompt.textContent = "See listing";

    const openLinkIcon = document.createElement('i');
    openLinkIcon.dataset.lucide = "external-link";
    openLinkIcon.classList = "size-5";

    loginPrompt.appendChild(openLinkIcon);
    contentContainerBody.appendChild(loginPrompt);
  } else if (isLoggedIn() && listing.seller?.email === user?.email) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList = "flex items-center gap-2";

    const editButton = document.createElement('button');
    editButton.classList = "btn-medium btn-primary";
    editButton.id = "edit-btn";
    editButton.textContent = "Edit";

    const deleteBtn = document.createElement('button');
    const deleteIcon = document.createElement('i');
    deleteIcon.dataset.lucide = "trash-2";
    deleteIcon.classList = "size-5";
    deleteBtn.classList = "btn-icon btn-ghost hover:bg-feedback-error-bg hover:text-feedback-error-icon";
    deleteBtn.id = "delete-btn";
    deleteBtn.appendChild(deleteIcon);

    const { openModal } = useModal();
    editButton.addEventListener('click', (event) => {
      if (event.target.closest('#edit-btn')) {
        event.preventDefault();
        const modalEditContent = editListingModal(listing);
        openModal(modalEditContent);
      }
    });

    const modalDeleteContent = deleteListingModal(listing.id, deleteAndRefreshFunction);


    buttonContainer.appendChild(editButton);

    if (listing._count?.bids <= 0) {
      deleteBtn.addEventListener('click', (event) => {
        if (event.target.closest('#delete-btn')) {
          event.preventDefault();
          openModal(modalDeleteContent);
        }
      });
      buttonContainer.appendChild(deleteBtn);
    }

    contentContainerBody.appendChild(buttonContainer);

  } else if (isLoggedIn()) {
    const buttonLink = document.createElement('a');
    buttonLink.classList = "btn-medium btn-primary";
    buttonLink.textContent = "Bid now";

    const openLinkIcon = document.createElement('i');
    openLinkIcon.dataset.lucide = "external-link";
    openLinkIcon.classList = "size-5";

    buttonLink.appendChild(openLinkIcon);
    contentContainerBody.appendChild(buttonLink);
  }

  contentContainer.appendChild(contentContainerBody);
  cardContainer.appendChild(contentContainer);

  return cardContainer;
}