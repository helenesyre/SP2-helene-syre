/**
 * Show a toast notification
 * @param {string} message - The message to display in the toast
 * @param {string} [type="success"] - The type of toast (e.g., "success", "error")
 * @param {number} [wait=5000] - The duration in milliseconds before the toast disappears
 * @returns {void}
 */
import { renderIcons } from '../../utils/icons.js';

export function showToast(message, type = "success", wait = 5000) {
  const toast = document.createElement("div");
  const iconElement = document.createElement("i");
  const prefix = document.createElement("span");
  const titleElement = document.createElement("h4");
  const textContentElement = document.createElement("div");
  const closeButton = document.createElement("button");

  toast.className = "rounded-default shadow-md flex justify-between items-start gap-4 p-4 text-lg w-fit max-w-[91vw] animate-fadeIn";
  switch (type) {
    case "success":
      toast.classList.add(`bg-feedback-success-bg`, `text-feedback-success-text`);
      textContentElement.appendChild(iconElement);
      textContentElement.classList.add("flex", "items-center", "gap-2");
      iconElement.setAttribute("data-lucide", "circle-check");
      iconElement.classList.add("size-6", "shrink-0");
      prefix.textContent = "Success: ";
      break;
    case "error":
      toast.classList.add(`bg-feedback-error-bg`, `text-feedback-error-text`);
      textContentElement.appendChild(iconElement);
      textContentElement.classList.add("flex", "items-center", "gap-2");
      iconElement.setAttribute("data-lucide", "alert-circle");
      iconElement.classList.add("size-6", "shrink-0", "text-feedback-error-icon");
      prefix.textContent = "Error: ";
      break;
    default:
      toast.classList.add(`bg-feedback-info-bg`, `text-feedback-info-text`);
      textContentElement.appendChild(iconElement);
      textContentElement.classList.add("flex", "items-center", "gap-2");
      iconElement.setAttribute("data-lucide", "info");
      iconElement.classList.add("size-6", "shrink-0")
      prefix.textContent = "";
  }
  if (message.split(": ").length > 1) {
    const status = message.split(": ")[0]; // Get the status code
    prefix.textContent = `${status}: `;
    prefix.classList.add("font-bold");
    titleElement.appendChild(prefix);
    message = message.split(": ")[1]; // Get the part after the status code for error messages
  } else {
    prefix.classList.add("font-bold");
    titleElement.appendChild(prefix);
  }
  titleElement.appendChild(document.createTextNode(message));
  closeButton.innerHTML = `<i data-lucide="x" class="size-6 cursor-pointer"></i>`;
  closeButton.onclick = () => {
    toast.remove();
  };
  textContentElement.appendChild(titleElement);
  toast.appendChild(textContentElement);
  toast.appendChild(closeButton);

  const container = document.getElementById("toast-container");
  container.appendChild(toast);
  renderIcons();
  setTimeout(() => {
    toast.remove();
  }, wait);
}