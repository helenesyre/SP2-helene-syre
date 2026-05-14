/**
 * Code inspiration source from:
 * Create a Count Down Timer in 5 Minutes | HTML CSS & JavaScript
 * @publisher: Html Camp
 * @date: 03 October 2024
 * accessed: 28 April 2026
 * link: https://www.youtube.com/watch?v=34kbdFLpff8
*/

/**
 * Starts a countdown timer for a listing element.
 * @param {HTMLElement} element - Where the countdown text will be displayed.
 * @param {string} endsAt - ISO date string.
 * @returns {number} Interval ID.
 */
export function listingCountdown(element, endsAt) {
  function tick() {
    const timeRemaining = new Date(endsAt) - new Date();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    // If the auction has ended, show "Auction ended". Otherwise, show the time remaining.
    if (timeRemaining <= 0) {
      element.textContent = 'Auction ended';
      element.classList.remove('tag-blue-light');
      element.classList.add('tag-gray');
    } else {
      element.textContent = `${days}d ${hours}h ${minutes}m left`;
      element.classList.remove('tag-gray');
      element.classList.add('tag-blue-light');
    }

    // if 0 days left, show hours and minutes only
    if (days === 0 && timeRemaining > 0) {
      element.textContent = `${hours}h ${minutes}m left`;
    }

    // if 0 days and 0 hours left, show minutes only
    if (days === 0 && hours === 0 && timeRemaining > 0) {
      element.textContent = `${minutes}m left`;
    }

    // if less than 1 minute left, show seconds
    if (timeRemaining < 60000 && timeRemaining > 0) {
      element.textContent = `${Math.floor(timeRemaining / 1000)}s left`;
      element.classList.remove('tag-blue-light');
      element.classList.add('tag-red');
    }
  }

  tick();
  return setInterval(tick, 1000);
}

/**
 * Starts a countdown timer for a single listing element.
 * @param {HTMLElement} element - Where the countdown text will be displayed.
 * @param {string} endsAt - ISO date string.
 * @returns {number} Interval ID.
 */
export function singleListingCountdown(element, endsAt) {
  function tick() {
    const timeRemaining = new Date(endsAt) - new Date();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    // If the auction has ended, show "Auction ended". Otherwise, show the time remaining.
    if (timeRemaining <= 0) {
      element.textContent = 'Auction ended';
      element.classList.remove('tag-medium', 'tag-blue-border');
      element.classList.add('tag-medium', 'tag-blue-border');
    } else {
      element.textContent = `${days}d ${hours}h ${minutes}m left`;
      element.classList.remove('tag-medium', 'tag-blue-border');
      element.classList.add('tag-medium', 'tag-blue-border');
    }

    // if 0 days left, show hours and minutes only
    if (days === 0 && timeRemaining > 0) {
      element.textContent = `${hours}h ${minutes}m left`;
    }

    // if 0 days and 0 hours left, show minutes only
    if (days === 0 && hours === 0 && timeRemaining > 0) {
      element.textContent = `${minutes}m left`;
    }

    // if less than 1 minute left, show seconds
    if (timeRemaining < 60000 && timeRemaining > 0) {
      element.textContent = `${Math.floor(timeRemaining / 1000)}s left`;
      element.classList.remove('tag-blue-light');
      element.classList.add('tag-red');
    }
  }

  tick();
  return setInterval(tick, 1000);
}

/**
 * Formats a date string into "DD MMM YYYY" format.
 * @param {string} dateString - The date string in ISO format.
 * @returns {string} The formatted date string.
 */
export function formatEndDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Starts a countdown timer for a bid listing element.
 * @param {HTMLElement} element - Where the countdown text will be displayed.
 * @param {string} endsAt - ISO date string.
 * @returns {number} Interval ID.
 */
export function renderBidListingCountdown(element, endsAt) {
  function tick() {
    const timeRemaining = new Date(endsAt) - new Date();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    // If the auction has ended, show "Auction ended". Otherwise, show the time remaining.
    if (timeRemaining <= 0) {
      element.textContent = 'Auction ended';
      element.classList.add('text-sm', 'font-normal', 'text-black-500');
    } else {
      element.textContent = `${days}d ${hours}h ${minutes}m left`;
    }

    // if 0 days left, show hours and minutes only
    if (days === 0 && timeRemaining > 0) {
      element.textContent = `${hours}h ${minutes}m left`;
    }

    // if 0 days and 0 hours left, show minutes only
    if (days === 0 && hours === 0 && timeRemaining > 0) {
      element.textContent = `${minutes}m left`;
    }

    // if less than 1 minute left, show seconds
    if (timeRemaining < 60000 && timeRemaining > 0) {
      element.textContent = `${Math.floor(timeRemaining / 1000)}s left`;
    }
  }

  tick();
  return setInterval(tick, 1000);
}

/**
 * Initializes countdown timers for multiple listings.
 * @param {Array} listings - An array of listing objects, each containing an `id` and `endsAt` property.
 */
export default function countdownListings(listings) {
  listings.forEach((listing) => {
    const countdownElement = document.getElementById(`countdown-${listing.id}`);
    if (countdownElement) listingCountdown(countdownElement, listing.endsAt);
  });
}