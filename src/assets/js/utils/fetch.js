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

/* Search listings */

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

/* All listings by profile */

/* All bids by profile */

/* All wins by profile */

/* Search profiles */