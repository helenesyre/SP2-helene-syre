import { useAuth } from './useAuth.js';
import { useFetch } from './useFetch.js';

const API_KEY = import.meta.env.VITE_API_KEY;

/* ────────────────────── Listings ────────────────────── */

/* All listings */
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

/* Single listing */
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

/* Search and filter listings */
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

/* Filter listings by tag */
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

/* Create listing */
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

/* Update listing */
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

/* Delete listing */
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

/* Bid on listing */
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

/* All profiles */
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

/* Single profile */
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

/* Update profile */
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

/* All listings by profile */
export async function getSingleProfileListings(profileId) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/profiles/${profileId}/listings?_bids=true&_seller=true&_comments=true&_reactions=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/* All bids by profile */
export async function getBidsByProfile(profileName) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/profiles/${profileName}/bids?_listings=true&_bids=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/* All wins by profile */
export async function getWinsByProfile(profileName) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/auction/profiles/${profileName}/wins?_listings=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/* Search profiles */