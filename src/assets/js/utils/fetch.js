import { useAuth } from './useAuth.js';
import { useFetch } from './useFetch.js';

const API_KEY = import.meta.env.VITE_API_KEY;

/* ────────────────────── Listings ────────────────────── */

/**
 * Fetches all listings from the API with optional sorting.
 * @param {string} sort - The field to sort by (default is 'created').
 * @param {string} sortOrder - The order of sorting, either 'asc' or 'desc' (default is 'desc').
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function getAllListings(sort = 'created', sortOrder = 'desc') {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/listings?_bids=true&_seller=true&sort=${sort}&sortOrder=${sortOrder}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches paginated listings from the API with optional sorting.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - Limited to 8 listings per page.
 * @param {string} sort - Sorted by created date.
 * @param {string} sortOrder - Sort order is set to descending.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function getPaginatedListings(page = 1, limit = 8, sort = 'created', sortOrder = 'desc') {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/listings?_bids=true&_seller=true&_active=true&page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches a single listing by its ID from the API.
 * @param {string} id - The ID of the listing to fetch.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function getListingById(id) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/listings/${id}?_bids=true&_seller=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Searches listings based on a query and optional filters.
 * @param {string} query
 * @param {string} tag - The tag to filter by.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - Limited to 8 listings per page.
 * @param {string} sort - Sorted by created date.
 * @param {string} sortOrder - Sort order is set to descending.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function searchListings(query, tag = '', page = 1, limit = 8, sort = 'created', sortOrder = 'desc') {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/listings/search/?q=${encodeURIComponent(query)}&_tag=${encodeURIComponent(tag)}&_bids=true&_seller=true&_comments=true&_reactions=true&page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Filters listings based on a tag and optional parameters.
 * @param {string} tag - The tag to filter by.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - Limited to 8 listings per page.
 * @param {string} sort - Sorted by created date.
 * @param {string} sortOrder - Sort order is set to descending.
 * @param {boolean} onlyActive - Whether to fetch only active listings (default is true).
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function filterListingsByTag(tag, page = 1, limit = 8, sort = 'created', sortOrder = 'desc', onlyActive = true) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/listings?_tag=${encodeURIComponent(tag)}&_bids=true&_seller=true&_comments=true&_reactions=true${onlyActive ? '&_active=true' : ''}&page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Creates a new listing.
 * @param {Object} listingData - The data for the new listing.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function createListing(listingData) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch('/auction/listings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
    body: JSON.stringify(listingData)
  });
  return data;
};

/**
 * Updates an existing listing.
 * @param {string} listingId - The ID of the listing to update.
 * @param {Object} listingData - The data to update the listing with.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function updateListing(listingId, listingData) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/listings/${listingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
    body: JSON.stringify(listingData)
  });
  return data;
};

/**
 * Deletes a listing.
 * @param {string} id - The ID of the listing to delete.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function deleteListing(id) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/listings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Places a bid on a listing.
 * @param {string} listingId - The ID of the listing to bid on.
 * @param {number} bidAmount - The amount to bid.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function placeBid(listingId, bidAmount) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/listings/${listingId}/bids`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
    body: JSON.stringify({ amount: Number(bidAmount) })
  });
  return data;
};

/* ────────────────────── Profiles ────────────────────── */

/**
 * Fetches all profiles from the API.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function getAllProfiles() {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch('/auction/profiles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches data for a single profile.
 * @param {string} profileName - The name of the profile to fetch.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function getSingleProfileData(profileName) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/profiles/${profileName}?_listings=true&_wins=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Updates an existing profile.
 * @param {string} profileName - The name of the profile to update.
 * @param {Object} profileData - The data to update the profile with.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function updateProfile(profileName, profileData) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/profiles/${profileName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
    body: JSON.stringify(profileData)
  });
  return data;
};

/**
 * Fetches listings for a single profile.
 * @param {string} profileId - The ID of the profile to fetch listings for.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of listings per page.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function getSingleProfileListings(profileId, page = 1, limit = 8) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/profiles/${profileId}/listings?_bids=true&_seller=true&_comments=true&_reactions=true&page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches bids for a single profile.
 * @param {string} profileName - The name of the profile to fetch bids for.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of bids per page.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function getBidsByProfile(profileName, page = 1, limit = 8) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/profiles/${profileName}/bids?_listings=true&_bids=true&page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches wins for a single profile.
 * @param {string} profileName - The name of the profile to fetch wins for.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of wins per page.
 * @returns {Promise<Object>} The data returned from the API.
 */
export async function getWinsByProfile(profileName, page = 1, limit = 100) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/profiles/${profileName}/wins?_listings=true&page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};
