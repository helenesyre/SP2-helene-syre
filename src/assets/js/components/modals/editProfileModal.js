import useModal from '../../utils/useModal.js';
import { updateProfile } from "../../utils/fetch.js";
import { validateImgUrl } from "../../utils/validation.js";
import { showToast } from '../toasts/toast.js';
import { useAuth } from '../../utils/useAuth.js';

/**
 * Creates a modal for editing the user's profile.
 * @param {Object} profileData - The current profile data of the user.
 * @returns {HTMLElement} The modal element.
 */
export function editProfileModal(profileData) {
  const { closeModal } = useModal();

  /**
   * Adds a banner image URL to the profile.
   * @param {string} url - The banner image URL to add.
   * @param {string} alt - The alt text for the banner image.
   * @returns {void}
   */
  function addBannerUrl(url = '', alt = '') {
    const bannerUrl = url || bannerUrlInput.value.trim();
    const bannerAlt = alt || bannerAltInput.value.trim();
    if (!bannerUrl || !validateImgUrl(bannerUrl)) {
      showToast('Invalid banner image URL', 'error');
      return;
    }
    bannerPreview.src = bannerUrl;
    bannerPreview.alt = bannerAlt || 'Profile banner';
  }

  /**
   * Adds an avatar image URL to the profile.
   * @param {string} url - The avatar image URL to add.
   * @param {string} alt - The alt text for the avatar image.
   * @returns {void}
   */
  function addAvatarUrl(url = '', alt = '') {
    const avatarUrl = url || avatarUrlInput.value.trim();
    const avatarAlt = alt || avatarAltInput.value.trim();
    if (!avatarUrl || !validateImgUrl(avatarUrl)) {
      showToast('Invalid profile image URL', 'error');
      return;
    }
    avatarPreview.src = avatarUrl;
    avatarPreview.alt = avatarAlt || 'Profile image';
  }

  /**
   * Handles the form submission for editing the profile.
   * @param {Event} event - The form submission event.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const bannerUrl = formData.get('banner-url').trim();
    const bannerAlt = formData.get('banner-alt').trim();
    const avatarUrl = formData.get('avatar-url').trim();
    const avatarAlt = formData.get('avatar-alt').trim();
    const bio = formData.get('bio').trim();

    const response = await updateProfile(profileData.name, {
      banner: bannerUrl ? { url: bannerUrl, alt: bannerAlt } : null,
      avatar: avatarUrl ? { url: avatarUrl, alt: avatarAlt } : null,
      bio,
    });

    const auth = useAuth();
    await auth.updateStoreUserData();

    if (response.data) {
      showToast('Profile updated successfully!', 'success');
      closeModal();
      const loadEvent = new Event('reloadRoute');
      window.dispatchEvent(loadEvent);
    } else {
      showToast('Failed to update profile. Please try again.', 'error');
    }
  }

  /* ---- Modal container ---- */
  const modal = document.createElement('div');
  modal.className = 'bg-white rounded-default w-full max-w-lg m-6 p-6 overflow-y-auto max-h-[90vh]';

  /* ---- Content without buttons ---- */
  const modalContent = document.createElement('div');
  modalContent.className = 'flex flex-col gap-6';

  /* ---- Form ---- */
  const form = document.createElement('form');
  form.className = 'mt-4';
  form.onsubmit = handleSubmit;

  /* ---- Modal header ---- */
  const modalHeader = document.createElement('div');
  modalHeader.className = 'flex items-center justify-between';

  const modalTitle = document.createElement('h2');
  modalTitle.className = 'text-xl font-semibold text-black-500';
  modalTitle.textContent = 'Edit profile';

  const closeButton = document.createElement('button');
  const closeIcon = document.createElement('i');
  closeIcon.setAttribute('data-lucide', 'x');
  closeButton.appendChild(closeIcon);
  closeButton.className = 'text-black-500 hover:text-blue-500 cursor-pointer';
  closeButton.onclick = closeModal;

  /* ---- Modal body ---- */
  const modalBody = document.createElement('div');
  modalBody.className = 'flex flex-col gap-6';

  /* ---- Modal body input fields ---- */
  const inputFields = document.createElement('div');
  inputFields.className = 'flex flex-col gap-4 border border-gray-600 rounded-default p-4';


  /* ---- Banner image section ---- */
  const bannerOuterContainer = document.createElement('div');
  bannerOuterContainer.className = 'flex flex-col gap-2';

  const bannerTitle = document.createElement('h3');
  bannerTitle.className = 'text-lg font-medium text-black-500';
  bannerTitle.textContent = 'Profile banner';

  const bannerSectionContainer = document.createElement('div');
  bannerSectionContainer.className = 'flex flex-col items-center gap-2 border border-gray-600 rounded-default p-4';

  bannerOuterContainer.appendChild(bannerTitle);
  bannerOuterContainer.appendChild(bannerSectionContainer);

  const bannerInputContainer = document.createElement('div');
  bannerInputContainer.className = 'flex flex-col md:flex-row gap-2 w-full';

  /* Banner image displayed */
  const bannerPreviewWrapper = document.createElement('div');
  bannerPreviewWrapper.className = 'relative mb-2 rounded-default overflow-hidden';

  const bannerPreview = document.createElement('img');
  bannerPreview.className = 'w-36 h-20 object-cover';
  bannerPreview.src = profileData.banner?.url || 'https://placehold.co/600x200/dadada/aaa?text=No+Banner';
  bannerPreview.alt = profileData.banner?.alt || 'Profile banner preview';

  const bannerPreviewLabel = document.createElement('p');
  bannerPreviewLabel.className = 'absolute bottom-0 left-0 right-0 w-full bg-blue-light-500 text-blue-medium-500 text-xs font-semibold px-1 py-0.5 text-center';
  bannerPreviewLabel.textContent = 'Banner';

  bannerPreviewWrapper.appendChild(bannerPreview);
  bannerPreviewWrapper.appendChild(bannerPreviewLabel);
  bannerSectionContainer.appendChild(bannerPreviewWrapper);

  /* Banner image URL */
  const bannerUrlLabel = document.createElement('label');
  bannerUrlLabel.textContent = 'Banner image URL';
  bannerUrlLabel.className = 'sr-only';
  const bannerUrlInput = document.createElement('input');
  bannerUrlInput.setAttribute('type', 'text');
  bannerUrlInput.setAttribute('name', 'banner-url');
  bannerUrlInput.setAttribute('placeholder', 'Paste an image URL - https://...');
  bannerUrlInput.setAttribute('aria-label', 'Add a banner image to your profile by entering an image URL');
  bannerUrlInput.className = 'input-field';
  bannerUrlInput.value = profileData.banner?.url || '';

  /* Banner image alt text */
  const bannerAltLabel = document.createElement('label');
  bannerAltLabel.textContent = 'Banner image description';
  bannerAltLabel.className = 'sr-only';

  const bannerAltInput = document.createElement('input');
  bannerAltInput.setAttribute('type', 'text');
  bannerAltInput.setAttribute('name', 'banner-alt');
  bannerAltInput.setAttribute('placeholder', 'Banner image description');
  bannerAltInput.setAttribute('aria-label', 'Write a description for the banner image you want to add');
  bannerAltInput.className = 'input-field';
  bannerAltInput.value = profileData.banner?.alt || '';

  /* Banner image add button */
  const bannerUrlAddButton = document.createElement('button');
  bannerUrlAddButton.setAttribute('type', 'button');
  bannerUrlAddButton.className = 'btn-medium btn-secondary w-full md:w-fit';
  bannerUrlAddButton.textContent = 'Add';
  bannerUrlAddButton.onclick = () => addBannerUrl();

  /* Banner image help text */
  const bannerHelpText = document.createElement('p');
  bannerHelpText.className = 'text-xs text-black-200 w-full';
  bannerHelpText.textContent = 'Only URL link is supported.';

  bannerInputContainer.appendChild(bannerUrlLabel);
  bannerInputContainer.appendChild(bannerUrlInput);
  bannerInputContainer.appendChild(bannerAltInput);
  bannerInputContainer.appendChild(bannerUrlAddButton);
  bannerSectionContainer.appendChild(bannerInputContainer);
  bannerSectionContainer.appendChild(bannerHelpText);
  modalBody.appendChild(bannerOuterContainer);

  /* ---- Avatar image section ---- */
  const avatarOuterContainer = document.createElement('div');
  avatarOuterContainer.className = 'flex flex-col gap-2';

  const avatarTitle = document.createElement('h3');
  avatarTitle.className = 'text-lg font-medium text-black-500';
  avatarTitle.textContent = 'Profile image';

  const avatarSectionContainer = document.createElement('div');
  avatarSectionContainer.className = 'flex flex-col items-center gap-2 border border-gray-600 rounded-default p-4';

  avatarOuterContainer.appendChild(avatarTitle);
  avatarOuterContainer.appendChild(avatarSectionContainer);

  const avatarInputContainer = document.createElement('div');
  avatarInputContainer.className = 'flex flex-col md:flex-row gap-2 w-full';

  /* Avatar image displayed */
  const avatarPreviewWrapper = document.createElement('div');
  avatarPreviewWrapper.className = 'relative mb-2 rounded-default overflow-hidden';

  const avatarPreview = document.createElement('img');
  avatarPreview.className = 'size-24 object-cover';
  avatarPreview.src = profileData.avatar?.url || 'https://placehold.co/150x150/dadada/aaa?text=No+Avatar';
  avatarPreview.alt = profileData.avatar?.alt || 'Profile image preview';

  const avatarPreviewLabel = document.createElement('p');
  avatarPreviewLabel.className = 'absolute bottom-0 left-0 right-0 w-full bg-blue-light-500 text-blue-medium-500 text-xs font-semibold px-1 py-0.5 text-center';
  avatarPreviewLabel.textContent = 'Avatar';

  avatarPreviewWrapper.appendChild(avatarPreview);
  avatarPreviewWrapper.appendChild(avatarPreviewLabel);
  avatarSectionContainer.appendChild(avatarPreviewWrapper);

  /* Avatar image URL */
  const avatarUrlLabel = document.createElement('label');
  avatarUrlLabel.textContent = 'Avatar image URL';
  avatarUrlLabel.className = 'sr-only';

  const avatarUrlInput = document.createElement('input');
  avatarUrlInput.setAttribute('type', 'text');
  avatarUrlInput.setAttribute('name', 'avatar-url');
  avatarUrlInput.setAttribute('placeholder', 'Paste an image URL - https://...');
  avatarUrlInput.setAttribute('aria-label', 'Add a profile image to your profile by entering an image URL');
  avatarUrlInput.className = 'input-field';
  avatarUrlInput.value = profileData.avatar?.url || '';

  /* Avatar image alt text */
  const avatarAltLabel = document.createElement('label');
  avatarAltLabel.textContent = 'Profile image description';
  avatarAltLabel.className = 'sr-only';

  const avatarAltInput = document.createElement('input');
  avatarAltInput.setAttribute('type', 'text');
  avatarAltInput.setAttribute('name', 'avatar-alt');
  avatarAltInput.setAttribute('placeholder', 'Profile image description');
  avatarAltInput.setAttribute('aria-label', 'Write a description for the profile image you want to add');
  avatarAltInput.className = 'input-field';
  avatarAltInput.value = profileData.avatar?.alt || '';

  /* Avatar image add button */
  const avatarUrlAddButton = document.createElement('button');
  avatarUrlAddButton.setAttribute('type', 'button');
  avatarUrlAddButton.className = 'btn-medium btn-secondary w-full md:w-fit';
  avatarUrlAddButton.textContent = 'Add';
  avatarUrlAddButton.onclick = () => addAvatarUrl();

  /* Avatar image help text */
  const avatarHelpText = document.createElement('p');
  avatarHelpText.className = 'text-xs text-black-200 w-full';
  avatarHelpText.textContent = 'Only URL link is supported.';

  avatarInputContainer.appendChild(avatarUrlLabel);
  avatarInputContainer.appendChild(avatarUrlInput);
  avatarInputContainer.appendChild(avatarAltInput);
  avatarInputContainer.appendChild(avatarUrlAddButton);
  avatarSectionContainer.appendChild(avatarInputContainer);
  avatarSectionContainer.appendChild(avatarHelpText);
  modalBody.appendChild(avatarOuterContainer);

  /* ---- Bio ---- */
  const bioContainer = document.createElement('div');
  bioContainer.className = 'flex flex-col gap-1';
  const bioLabel = document.createElement('label');
  bioLabel.textContent = 'Bio ';
  bioLabel.className = 'text-sm font-semibold text-black-500';

  const bioInput = document.createElement('textarea');
  bioInput.setAttribute('name', 'bio');
  bioInput.setAttribute('placeholder', 'Describe yourself - interests, background, or any relevant details...');
  bioInput.setAttribute('aria-label', 'Write a bio for your profile');
  bioInput.classList = 'input-field h-20';
  bioInput.required = true;
  bioInput.value = profileData.bio || '';
  bioContainer.appendChild(bioLabel);
  bioContainer.appendChild(bioInput);
  inputFields.appendChild(bioContainer);
  modalBody.appendChild(inputFields);

  /* ---- Modal footer ---- */
  const modalFooter = document.createElement('div');
  modalFooter.className = 'flex items-center justify-end gap-4 mt-2';

  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('type', 'button');
  cancelButton.className = 'btn-medium btn-ghost';
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = closeModal;

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.className = 'btn-medium btn-primary';
  submitButton.textContent = 'Save profile';

  modalFooter.appendChild(cancelButton);
  modalFooter.appendChild(submitButton);

  /* ---- Append all to modal container ---- */
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modal.appendChild(modalHeader);
  form.appendChild(modalBody);
  form.appendChild(modalFooter);
  modal.appendChild(form);

  return modal;
};

