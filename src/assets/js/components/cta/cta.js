import { useAuth } from "../../utils/useAuth";

function renderVisitorCta() {
  return `
    <section class="bg-green-light-500 p-8 mb-16 md:mb-20 rounded-default flex flex-col gap-9 md:flex-row items-center md:items-end md:justify-between max-w-5xl mx-auto">
      <div class="flex flex-col gap-3 w-full md:flex-1">
        <span class="tag-large tag-green-light w-fit">
          Students only
        </span>
        <h2 class="text-3xl font-bold text-black-500">Join the auction - it's free to start</h2>
        <p class="text-lg text-black-500/70">Register with your @stud.noroff.no email and get 1,000 free credits. Create listings, place bids and manage your profile.</p>
      </div>
      <div class="flex flex-col gap-2 w-full md:w-fit md:shrink-0 md:items-end">
        <a href="#/register" class="btn-large btn-border-black w-full md:w-fit">
          Create account
          <i data-lucide="arrow-right" width="20px" height="20px"></i>
        </a>
        <a href="#/login" class="btn-large btn-border-black w-full md:w-fit">Already have an account?</a>
      </div>
    </section>
  `;
}

function renderLoggedInCta() {
  return `
    <section class="bg-green-light-500 p-8 mb-16 md:mb-20 rounded-default flex flex-col gap-9 md:flex-row items-center md:items-end md:justify-between max-w-5xl mx-auto">
      <div class="flex flex-col gap-3 w-full md:flex-1">
        <span class="tag-large tag-green-light w-fit">
          Students only
        </span>
        <h2 class="text-3xl font-bold text-black-500">Got something to sell?</h2>
        <p class="text-lg text-black-500/70">List it in minutes and start receiving bids from fellow students. Your listing goes live immediately.</p>
      </div>
      <a href="#/coming-soon" class="btn-large btn-border-black w-full md:w-fit">
          Create a listing
          <i data-lucide="circle-plus" width="20px" height="20px"></i>
        </a>
    </section>
  `;
}

export function renderCta() {
  const ctaContainer = document.getElementById('cta-container');
  if (ctaContainer) {
    const auth = useAuth();
    // If the user is logged in, show the logged-in CTA, otherwise show the visitor CTA.
    if (auth.isLoggedIn()) {
      ctaContainer.innerHTML = renderLoggedInCta();
    } else {
      ctaContainer.innerHTML = renderVisitorCta();
    }
  }
}