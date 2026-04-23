/**
 * Show a toast notification
 * @param {string} message - The message to display in the toast
 * @param {string} [type="success"] - The type of toast (e.g., "success", "error")
 * @param {number} [wait=5000] - The duration in milliseconds before the toast disappears
 * @returns {void}
 */
export function showToast(message, type = "success", wait = 50000) {
  const toast = document.createElement("div");
  const iconElement = document.createElement("i");
  const titleElement = document.createElement("h4");
  const textContentElement = document.createElement("div");
  const closeButton = document.createElement("button");

  toast.className = "rounded-default shadow-md flex justify-between items-start gap-4 p-4 text-lg animate-fadeIn";
  switch (type) {
    case "success":
      toast.classList.add(`bg-green-300`, `text-green-800`);
      textContentElement.appendChild(iconElement);
      iconElement.setAttribute("data-lucide", "circle-check");
      break;
    case "error":
      toast.classList.add(`bg-red-300`, `text-red-800`);
      textContentElement.appendChild(iconElement);
      iconElement.setAttribute("data-lucide", "circle-alert");
      break;
    default:
      toast.classList.add(`bg-gray-300`, `text-gray-800`);
      textContentElement.appendChild(iconElement);
      iconElement.setAttribute("data-lucide", "info");
  }

  titleElement.textContent = message;
  closeButton.innerHTML = `<i data-lucide="x"></i>`;
  closeButton.onclick = () => {
    toast.remove();
  };
  textContentElement.appendChild(titleElement);
  toast.appendChild(textContentElement);
  toast.appendChild(closeButton);

  const container = document.getElementById("toast-container");
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, wait);
}