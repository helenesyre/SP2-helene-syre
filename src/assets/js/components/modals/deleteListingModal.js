import useModal from '../../utils/useModal.js';
import { deleteListing } from "../../utils/fetch.js";
import { showToast } from '../toasts/toast.js';

/**
 * Creates a modal for deleting a listing.
 * @param {number} listingId - The ID of the listing to be deleted.
 * @param {Function} deleteAndRefreshFunction - Callback to refresh the UI after deletion.
 * @returns {HTMLElement} The modal element.
 */
export function deleteListingModal(listingId, deleteAndRefreshFunction) {
  const { closeModal } = useModal();

  /* ---- Modal container ---- */
  const modal = document.createElement('div');
  modal.className = 'bg-white rounded-default w-full max-w-lg m-6 p-6';

  /* ---- Modal header ---- */
  const modalHeader = document.createElement('div');
  modalHeader.className = 'flex items-center justify-between';

  const modalTitle = document.createElement('h2');
  modalTitle.className = 'text-xl font-semibold text-black-500';
  modalTitle.textContent = 'Delete listing?';

  const closeButton = document.createElement('button');
  const closeIcon = document.createElement('i');
  closeIcon.setAttribute('data-lucide', 'x');
  closeButton.appendChild(closeIcon);
  closeButton.className = 'text-black-500 hover:text-blue-500 cursor-pointer';
  closeButton.addEventListener('click', () => closeModal());

  /* ---- Modal body ---- */
  const modalBody = document.createElement('div');
  modalBody.className = 'flex flex-col gap-6';

  modalBody.appendChild(modalHeader);

  /* ---- Delete confirmation message ---- */
  const deleteMessage = document.createElement('p');
  deleteMessage.className = 'text-black-500';
  deleteMessage.textContent = 'Are you sure you want to delete this listing? This action cannot be undone.';
  modalBody.appendChild(deleteMessage);

  /* ---- Modal footer ---- */
  const modalFooter = document.createElement('div');
  modalFooter.className = 'flex items-center justify-end gap-4';

  const cancelButton = document.createElement('button');
  const submitButton = document.createElement('button');
  cancelButton.className = 'btn-medium btn-ghost';
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => closeModal());
  submitButton.setAttribute('type', 'button');
  submitButton.className = 'btn-medium btn-error';
  submitButton.textContent = 'Delete';
  submitButton.addEventListener('click', async () => {
    try {
      const response = await deleteListing(listingId);
      if (response.status === 204) {
        showToast('Listing deleted successfully!', 'success');
        closeModal();
        deleteAndRefreshFunction(); // Call the function to refresh the UI after deletion
      } else {
        showToast('Failed to delete listing. Please try again.', 'error');
      }
    } catch {
      // useFetch already shows a toast for errors
    }
  });

  modalFooter.appendChild(cancelButton);
  modalFooter.appendChild(submitButton);

  /* ---- Append all to modal container ---- */
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modal.appendChild(modalHeader);
  modal.appendChild(modalBody);
  modal.appendChild(modalFooter);

  return modal;
};
