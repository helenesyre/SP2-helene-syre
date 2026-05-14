import { comingSoon } from "../../../pages/comingSoon";
import { home } from "../../../pages/home";
import { listing } from "../../../pages/listing";
import { login } from "../../../pages/login";
import { register } from "../../../pages/register";
import { profile } from "../../../pages/profile";

/**
 * Defines the routes for the application, mapping URL hash patterns to their corresponding
 * view functions and page titles. Each route object contains a regular expression for
 * matching the URL hash, a view function that returns the HTML content for that route,
 * and a title for the page.
 */
export const routes = [
  {
    path: /^#\/$/,
    view: home,
    title: 'Nudge | Home',
  },
  {
    path: /^#\/profile\/([^\/]+)/,
    view: profile,
    title: 'Nudge | Profile',
  },
  {
    path: /^#\/listing\/([^\/]+)/,
    view: listing,
    title: 'Nudge | Listing',
  },
  {
    path: /^#\/register$/,
    view: register,
    title: 'Nudge | Register',
  },
  {
    path: /^#\/login$/,
    view: login,
    title: 'Nudge | Login',
  },
  {
    path: /^#\/coming-soon$/,
    view: comingSoon,
    title: 'Nudge | Coming Soon',
  },
]