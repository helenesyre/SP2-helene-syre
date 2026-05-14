import countdownListings from "../../../utils/dateUtils";
import { getBidsByProfile, getWinsByProfile } from "../../../utils/fetch";
import { renderIcons } from "../../../utils/icons";
import { useAuth } from "../../../utils/useAuth";
import { usePagination } from "../../../utils/usePagination";
import { bidOnCard } from "../../cards/bidOnCard";
import { renderPaginationControls } from "../../pagination/paginationControls";
import { showToast } from "../../toasts/toast";

/**
 * Profile bids tab logic.
 * @param {string} profileId - The user profile ID for which to fetch and render bids.
 * @returns {Object} - The renderBids function to update the bids display.
 */
export function profileBids(profileId) {
  const pagination = usePagination(renderBids);
  let pageLimit = 8;

  /**
   * Rendering the bids for the given profile.
   */
  async function renderBids() {
    try {
      // Fetch data and update page count
      const bidsResponse = await getBidsByProfile(profileId, pagination.getPage(), pageLimit);
      const bidsData = bidsResponse.data || [];
      pagination.updatePageCount(bidsResponse.meta.pageCount || 1);

      // Fetch all bids won data for the profile
      const bidsWon = await getWinsByProfile(profileId);
      let allBidsWonData = bidsWon.data || [];
      const totalWonPages = bidsWon.meta.pageCount || 1;
      // If there are multiple pages of won bids, fetch them all
      for (let page = 2; page <= totalWonPages; page++) {
        const additionalBidsWon = await getWinsByProfile(profileId, page, 100);
        allBidsWonData = allBidsWonData.concat(additionalBidsWon.data || []);
      }

      // Get container and set content
      const contentContainer = document.getElementById("tab-content");
      contentContainer.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" id="tab-content-container"></div>
        <div id="pagination-controls" class="flex items-center justify-center gap-2 md:gap-4 mt-8"></div>
      `;

      const tabContentContainer = document.getElementById("tab-content-container");
      const isLoggedInUser = useAuth().isLoggedIn() && useAuth().getUserData().name === profileId;

      tabContentContainer.innerHTML = "";
      if (bidsData.length > 0) {
        // For each bid, add it to the container and check if it's a winning bid by comparing with allBidsWonData
        bidsData.forEach(bid => tabContentContainer.appendChild(
          bidOnCard(bid, allBidsWonData.some(wonBid => wonBid.id === bid.listing.id))
        ));
      } else {
        tabContentContainer.innerHTML = `${isLoggedInUser ? '<p>You have not placed any bids yet.</p>' : '<p>This user has not placed any bids yet.</p>'}`;
      }
      // Render pagination controls
      renderPaginationControls(pagination);
      countdownListings(bidsData);
      renderIcons();
    } catch (error) {
      showToast('An error occurred while fetching your bids. Please try again later.', 'error');
    }
  }

  return {
    renderBids
  }
}