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

/* Search listings */

/* Single listing */

/* Create listing */

/* Update listing */

/* Delete listing */

/* Bid on listing */


/* ────────────────────── Profiles ────────────────────── */

/* All profiles */

/* Single profile */

/* Update profile */

/* All listings by profile */

/* All bids by profile */

/* All wins by profile */

/* Search profiles */