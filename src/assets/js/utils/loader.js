/**
 * Renders loader component.
 * @returns {string} An HTML string representing the loader component.
 */
export default function loader() {
  return `
    <div class="flex items-center justify-center w-full py-20">
      <span class="loader"></span>
    </div>
  `;
}