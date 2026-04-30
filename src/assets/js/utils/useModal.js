import { renderIcons } from "./icons";

/**
 * Custom hook for managing modal dialogs, providing functions to open and close modals, as well as tracking the modal's open state.
 * @returns {Object} - An object containing the openModal and closeModal functions, as well as the isOpen state.
 */
export default function useModal() {
  let isOpen = false;
  let onBackdropClick;
  let onKeyDown;

  function openModal(content) {
    const modal = document.getElementById('modal');
    if (modal.innerHTML === '') {
      modal.appendChild(content)
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      isOpen = true;

      onBackdropClick = (event) => { if (event.target === modal) closeModal(); };
      onKeyDown = (event) => { if (event.key === 'Escape') closeModal(); };
      modal.addEventListener('click', onBackdropClick);
      document.addEventListener('keydown', onKeyDown);
    }
    renderIcons();
  }

  function closeModal() {
    const modal = document.getElementById('modal');
    modal.innerHTML = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    isOpen = false;

    modal.removeEventListener('click', onBackdropClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  return { openModal, closeModal, isOpen };
};