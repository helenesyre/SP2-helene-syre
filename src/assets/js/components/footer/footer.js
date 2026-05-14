/**
 * Renders the site footer.
 */
export function renderFooter() {
  const footerContainer = document.getElementById('footer-container');
  // Check what page the user is on, if on home scroll to top, if not, navigate to home
  const currentPath = window.location.hash;
  const isHomePage = currentPath === '#/' || currentPath === '#/index.html';
  footerContainer.addEventListener('click', () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '#/';
    }
  });

  footerContainer.className = 'footer-gradient text-white-500 border-border border-t p-6 py-12 md:px-8 lg:px-16 text-base';
  footerContainer.innerHTML = `
    <section class="flex flex-col gap-2">
      <div class="flex flex-col gap-8 w-72 lg:w-auto">
        <h2>Ready to start bidding?</h2>
        <button class="btn-medium lg:btn-large btn-secondary w-fit">See listings here</button>
      </div>
      <div class="flex flex-col gap-12 lg:flex-row justify-between">
        <!-- Newsletter -->
        <form class="flex flex-col gap-2 my-12 max-w-sm" onsubmit="event.preventDefault()">
          <label for="email" class="font-semibold">Newsletter</label>
          <p class="text-white-500/70 text-lg font-normal">Get notified about new listings, ending auctions, and platform updates.</p>
          <div class="flex flex-row gap-2 mt-8">
            <input type="email" id="email" name="email" placeholder="Enter your email" class="input-field">
            <button type="submit" class="btn-medium btn-secondary w-fit">Subscribe</button>
          </div>
        </form>
        <!-- Links -->
        <div class="flex flex-col gap-12">
          <div class="flex flex-col gap-8 md:flex-row md:gap-16">
            <!-- Column 1 -->
            <div class="flex flex-col gap-3">
              <h3 class="text-lg">Support</h3>
              <ul class="flex flex-col gap-2 text-white-500/70 text-base">
                <li><a href="#" class="hover:underline hover:text-white-500">Help center</a></li>
                <li><a href="#" class="hover:underline hover:text-white-500">Contact us</a></li>
              </ul>
            </div>
            <!-- Column 2 -->
            <div class="flex flex-col gap-3">
              <h3 class="text-lg">Explore</h3>
              <ul class="flex flex-col gap-2 text-white-500/70 text-base">
                <li><a href="#" class="hover:underline hover:text-white-500">Browse listings</a></li>
                <li><a href="#" class="hover:underline hover:text-white-500">Search</a></li>
                <li><a href="#" class="hover:underline hover:text-white-500">Ending soon</a></li>
              </ul>
            </div>
            <!-- Column 3 -->
            <div class="flex flex-col gap-3">
              <h3 class="text-lg">About</h3>
              <ul class="flex flex-col gap-2 text-white-500/70 text-base">
                <li><a href="#" class="hover:underline hover:text-white-500">How it works</a></li>
                <li><a href="#" class="hover:underline hover:text-white-500">Credits explained</a></li>
                <li><a href="#" class="hover:underline hover:text-white-500">Noroff students</a></li>
              </ul>
            </div>
          </div>
          <!-- Social Media -->
          <div class="flex gap-4 justify-start lg:justify-end">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/" aria-label="Facebook" class="flex items-center justify-center size-9 bg-blue-300 hover:bg-blue-400 rounded-default">
              <i class="fa-brands fa-facebook-f text-xl"></i>
            </a>

            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" aria-label="Instagram" class="flex items-center justify-center size-9 bg-blue-300 hover:bg-blue-400 rounded-default">
              <i class="fa-brands fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
    <p class="text-sm mt-12 text-center">&copy; 2026 Nudge. All rights reserved.</p>
  `;
}