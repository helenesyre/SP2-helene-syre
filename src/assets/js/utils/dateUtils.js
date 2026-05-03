// SOURCE: inspiration from https://www.youtube.com/watch?v=34kbdFLpff8 (27.apr. 2026)
export function listingCountdown(element, endsAt) {
  function tick() {
    const timeRemaining = new Date(endsAt) - new Date();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    if (timeRemaining <= 0) {
      element.textContent = 'Auction ended';
      element.classList.remove('tag-blue-light');
      element.classList.add('tag-gray');
    } else {
      element.textContent = `${days}d ${hours}h ${minutes}m left`;
      element.classList.remove('tag-gray');
      element.classList.add('tag-blue-light');
    }

    if (timeRemaining < 60000 && timeRemaining > 0) {
      element.textContent = `${Math.floor(timeRemaining / 1000)}s left`;
      element.classList.remove('tag-blue-light');
      element.classList.add('tag-red');
    }
  }

  tick();
  return setInterval(tick, 1000);
}

export function singleListingCountdown(element, endsAt) {
  function tick() {
    const timeRemaining = new Date(endsAt) - new Date();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    if (timeRemaining <= 0) {
      element.textContent = 'Auction ended';
      element.classList.remove('tag-medium', 'tag-blue-border');
      element.classList.add('tag-medium', 'tag-blue-border');
    } else {
      element.textContent = `${days}d ${hours}h ${minutes}m left`;
      element.classList.remove('tag-medium', 'tag-blue-border');
      element.classList.add('tag-medium', 'tag-blue-border');
    }

    if (timeRemaining < 60000 && timeRemaining > 0) {
      element.textContent = `${Math.floor(timeRemaining / 1000)}s left`;
      element.classList.remove('tag-blue-light');
      element.classList.add('tag-red');
    }
  }

  tick();
  return setInterval(tick, 1000);
}

export function formatEndDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}