import countdownListings from "../../../utils/dateUtils";
import { getSingleProfileListings } from "../../../utils/fetch";
import { renderIcons } from "../../../utils/icons";
import { useAuth } from "../../../utils/useAuth";
import { usePagination } from "../../../utils/usePagination";
import { listingCard } from "../../cards/listingCard";
import { renderPaginationControls } from "../../pagination/paginationControls";
import { showToast } from "../../toasts/toast";

/**
 * Profile listings tab logic.
 * @param {string} profileId - The user profile ID for which to fetch and render listings.
 * @returns {Object} - The renderListings function to update the listings display.
 */
export function profileListings(profileId) {
  const pagination = usePagination(renderListings);
  let pageLimit = 8;

  /**
   * Rendering the listings for the given profile.
   */
  async function renderListings() {
    try {
      // Fetch data and update page count
      const listingResponse = await getSingleProfileListings(profileId, pagination.getPage(), pageLimit);
      const listingData = listingResponse.data || [];
      pagination.updatePageCount(listingResponse.meta.pageCount || 1);

      // Get container and set content
      const contentContainer = document.getElementById("tab-content");
      contentContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4" id="tab-content-container"></div>
        <div id="pagination-controls" class="flex items-center justify-center gap-2 md:gap-4 mt-8"></div>
      `;

      const tabContentContainer = document.getElementById("tab-content-container");
      const isLoggedInUser = useAuth().isLoggedIn() && useAuth().getUserData().name === profileId;

      tabContentContainer.innerHTML = "";
      if (listingData.length > 0) {
        listingData.forEach(listing => tabContentContainer.appendChild(listingCard(listing, renderListings)));
      } else {
        tabContentContainer.innerHTML = `${isLoggedInUser ? '<p>You have not created any listings yet.</p>' : '<p>This user has not created any listings yet.</p>'}`;
      }
      // Render pagination controls
      renderPaginationControls(pagination);
      countdownListings(listingData);
      renderIcons();
    } catch (error) {
      showToast('An error occurred while fetching your listings. Please try again later.', 'error');
    }
  }

  return {
    renderListings
  }
}