import countdownListings from "../../../utils/dateUtils";
import { getSingleProfileListings } from "../../../utils/fetch";
import { renderIcons } from "../../../utils/icons";
import { usePagination } from "../../../utils/usePagination";
import { listingCard } from "../../cards/listingCard";
import { renderPaginationControls } from "../../pagination/paginationControls";
import { showToast } from "../../toasts/toast";

export function profileListings(profileId) {
  const pagination = usePagination(renderListings);
  let pageLimit = 8;

  async function renderListings() {
    try {
      // Fetch data and update page count
      const listingResponse = await getSingleProfileListings(profileId, pagination.getPage(), pageLimit);
      const listingData = listingResponse.data || [];
      pagination.updatePageCount(listingResponse.meta.pageCount || 1);

      // Get container and set content
      const contentContainer = document.getElementById("tab-content");
      contentContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4" id="tab-content-container">
          SPINNER PLACEHOLDER
        </div>
        <div id="pagination-controls" class="flex items-center justify-center gap-2 md:gap-4 mt-8"></div>
      `;

      const tabContentContainer = document.getElementById("tab-content-container");
      tabContentContainer.innerHTML = "";
      if (listingData.length > 0) {
        listingData.forEach(listing => tabContentContainer.appendChild(listingCard(listing, () => { })));
      } else {
        tabContentContainer.innerHTML = '<p>You have not created any listings yet.</p>';
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