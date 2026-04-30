import useModal from '../../utils/useModal.js';
import { createListing } from "../../utils/fetch.js";
import { validateImgUrl } from "../../utils/validation.js";
import { showToast } from '../toasts/toast.js';

/**
 * Creates a modal for creating a new listing.
 * @returns {HTMLElement} The modal element to be rendered in the DOM.
 */
export function createListingModal() {
  const { closeModal } = useModal();

  /* ---- Modal container ---- */
  const modal = document.createElement('div');
  modal.className = 'bg-white rounded-default w-full max-w-lg p-6';

  /* ---- Content without buttons ---- */
  const modalContent = document.createElement('div');
  modalContent.className = 'flex flex-col gap-6';

  /* ---- Modal header ---- */
  const modalHeader = document.createElement('div');
  modalHeader.className = 'flex items-center justify-between';

  const modalTitle = document.createElement('h2');
  modalTitle.className = 'text-xl font-semibold text-black-500';
  modalTitle.textContent = 'Create listing';

  const closeButton = document.createElement('button');
  const closeIcon = document.createElement('i');
  closeIcon.setAttribute('data-lucide', 'x');
  closeButton.appendChild(closeIcon);
  closeButton.className = 'text-black-500 hover:text-blue-500 cursor-pointer';
  closeButton.addEventListener('click', () => closeModal());

  /* ---- Modal body ---- */
  const modalBody = document.createElement('div');
  modalBody.className = 'flex flex-col gap-6';

  /* ---- Form ---- */
  const form = document.createElement('form');
  form.className = 'flex flex-col gap-4 p-3 bg-gray-100 rounded-default';

  /* Title */
  const titleLabel = document.createElement('label');
  const titleRequiredAsterisk = document.createElement('span');
  titleLabel.textContent = 'Title ';
  titleRequiredAsterisk.textContent = '*';
  titleRequiredAsterisk.className = 'text-red-500';
  titleLabel.appendChild(titleRequiredAsterisk);

  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'title');
  titleInput.setAttribute('placeholder', 'e.g. MacBook Air M1 2021');
  titleInput.setAttribute('aria-label', 'Write the title of your listing');
  titleInput.classList = 'input-field';

  /* Tags */
  const tagsLabel = document.createElement('label');
  const tagsRequiredAsterisk = document.createElement('span');
  tagsLabel.textContent = 'Category ';
  tagsRequiredAsterisk.textContent = '*';
  tagsRequiredAsterisk.className = 'text-red-500';
  tagsLabel.appendChild(tagsRequiredAsterisk);

  const tagsInput = document.createElement('input');
  tagsInput.setAttribute('type', 'text');
  tagsInput.setAttribute('name', 'tags');
  tagsInput.setAttribute('placeholder', 'e.g. Electronics, Books, Art');
  tagsInput.setAttribute('aria-label', 'Write the categories of your listing, separated by commas');
  tagsInput.classList = 'input-field';

  /* Auction deadline */
  const deadlineLabel = document.createElement('label');
  const deadlineRequiredAsterisk = document.createElement('span');
  deadlineLabel.textContent = 'Auction deadline ';
  deadlineRequiredAsterisk.textContent = '*';
  deadlineRequiredAsterisk.className = 'text-red-500';
  deadlineLabel.appendChild(deadlineRequiredAsterisk);

  const deadlineInput = document.createElement('input');
  const deadlineHelpText = document.createElement('p');
  deadlineInput.setAttribute('type', 'datetime-local');
  deadlineInput.setAttribute('name', 'deadline');
  deadlineInput.setAttribute('placeholder', 'dd/ mm/ yyyy, --:--');
  deadlineInput.setAttribute('aria-label', 'Set the auction deadline for your listing');
  deadlineInput.classList = 'input-field';
  deadlineHelpText.className = 'text-sm text-black-500';
  deadlineHelpText.textContent = 'Must be a future date';

  /* Description */
  const descriptionLabel = document.createElement('label');
  const descriptionRequiredAsterisk = document.createElement('span');
  descriptionLabel.textContent = 'Description ';
  descriptionRequiredAsterisk.textContent = '*';
  descriptionRequiredAsterisk.className = 'text-red-500';
  descriptionLabel.appendChild(descriptionRequiredAsterisk);

  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('name', 'description');
  descriptionInput.setAttribute('placeholder', 'Describe your item - condition, what\'s included, or any relevant details...');
  descriptionInput.setAttribute('aria-label', 'Write a description for your listing');
  descriptionInput.classList = 'input-field h-32 resize-none';

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(tagsLabel);
  form.appendChild(tagsInput);
  form.appendChild(deadlineLabel);
  form.appendChild(deadlineInput);
  form.appendChild(deadlineHelpText);
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  modalBody.appendChild(form);

  /* ---- Image section ---- */
  const imageSectionContainer = document.createElement('div');
  imageSectionContainer.className = 'flex flex-col gap-2';

  const imageTitle = document.createElement('h3');
  imageTitle.className = 'text-lg font-medium text-black-500';
  imageTitle.textContent = 'Images';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'flex flex-col gap-2';

  imageSectionContainer.appendChild(imageTitle);
  imageSectionContainer.appendChild(imageContainer);

  const imageInputContainer = document.createElement('div');
  imageInputContainer.className = 'flex items-center gap-2';

  /* Image URL */
  const imageUrlInput = document.createElement('input');
  imageUrlInput.setAttribute('type', 'text');
  imageUrlInput.setAttribute('name', 'image-url');
  imageUrlInput.setAttribute('placeholder', 'Paste an image URL - https://...');
  imageUrlInput.setAttribute('aria-label', 'Add an image to your listing by entering an image URL');
  imageUrlInput.classList = 'input-field';

  /* Image alt text */
  const imageAltInput = document.createElement('input');
  imageAltInput.setAttribute('type', 'text');
  imageAltInput.setAttribute('name', 'image-alt');
  imageAltInput.setAttribute('placeholder', 'Image description');
  imageAltInput.setAttribute('aria-label', 'Write a description for the image you want to add');
  imageAltInput.classList = 'input-field';

  /* Image add button */
  const imageUrlAddButton = document.createElement('button');
  imageUrlAddButton.setAttribute('type', 'button');
  imageUrlAddButton.className = 'btn-medium btn-secondary';
  imageUrlAddButton.textContent = 'Add';
  // add image url on click function here

  /* Image help text */
  const imageHelpText = document.createElement('p');
  imageHelpText.className = 'text-sm text-black-500';
  imageHelpText.textContent = 'First image will be the listing cover. Min 5 images, max 10 images.';

  imageInputContainer.appendChild(imageUrlInput);
  imageInputContainer.appendChild(imageAltInput);
  imageInputContainer.appendChild(imageUrlAddButton);
  imageSectionContainer.appendChild(imageInputContainer);
  imageSectionContainer.appendChild(imageHelpText);
  modalBody.appendChild(imageSectionContainer);

  /* ---- Image list ---- */
  const imageListContainer = document.createElement('div');
  imageListContainer.className = 'flex flex-col gap-2';
  const imageList = document.createElement('ul');
  const imageUrls = [];
  imageList.className = 'flex flex-wrap gap-2';
  imageUrls.classList = 'flex flex-wrap gap-2';

  /* Image remove buttons */
  const imageRemoveButtons = [];
  imageRemoveButtons.classList = 'text-red-500 hover:text-red-700';

  imageListContainer.appendChild(imageList);
  modalBody.appendChild(imageListContainer);

  /* ---- Modal footer ---- */
  const modalFooter = document.createElement('div');
  modalFooter.className = 'flex items-center justify-end gap-4';

  const cancelButton = document.createElement('button');
  const submitButton = document.createElement('button');
  cancelButton.className = 'btn-medium btn-ghost';
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => closeModal());
  submitButton.setAttribute('type', 'button');
  submitButton.className = 'btn-medium btn-primary';
  submitButton.textContent = 'Create listing';
  submitButton.addEventListener('click', () => form.requestSubmit());

  modalFooter.appendChild(cancelButton);
  modalFooter.appendChild(submitButton);

  /* ---- Append all to modal container ---- */
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modal.appendChild(modalHeader);
  modal.appendChild(modalBody);
  modal.appendChild(modalFooter);

  /* ---- Event listeners ---- */
  /* Image URL add button */
  imageUrlAddButton.addEventListener('click', () => {
    const url = imageUrlInput.value.trim();
    const alt = imageAltInput.value.trim();
    if (!url || !validateImgUrl(url)) {
      showToast('Invalid image URL', 'error');
      return;
    }
    imageUrls.push({ url, alt });
    // render a list item showing the url with a remove button
    const li = document.createElement('li');
    li.textContent = url;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('type', 'button');
    removeBtn.addEventListener('click', () => {
      const index = imageUrls.findIndex(img => img.url === url && img.alt === alt);
      if (index !== -1) {
        imageUrls.splice(index, 1);
      }
      li.remove();
    });
    li.appendChild(removeBtn);
    imageList.appendChild(li);
    imageUrlInput.value = '';
    imageAltInput.value = '';
  });

  /* Form submission */
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const deadline = formData.get('deadline');
    const tags = formData.get('tags').split(',').map(t => t.trim()).filter(Boolean);

    const response = await createListing({
      title,
      description: description ?? '',
      endsAt: new Date(deadline).toISOString(),
      tags,
      media: imageUrls,
    });

    if (response.data) {
      showToast('Post created successfully!', 'success');
      closeModal();
      setTimeout(() => window.location.reload(), 750);
    } else {
      showToast('Failed to create post. Please try again.', 'error');
    }
  });

  return modal;
};
