import { comingSoon } from "../../../pages/comingSoon";
import { home } from "../../../pages/home";
import { listing } from "../../../pages/listing";
import { login } from "../../../pages/login";
import { register } from "../../../pages/register";
import { profile } from "../../../pages/profile";

/**
 * Defines the routes for the application, mapping URL hash patterns to their corresponding
 * view functions and layout configurations. Each route object contains a regex pattern for
 * matching the URL hash, a view function that returns the HTML content for that route.
 */
export const routes = [
  {
    path: /^#\/$/,
    view: home,
  },
  {
    path: /^#\/profile$/,
    view: profile,
  },
  {
    path: /^#\/listing$/,
    view: listing,
  },
  {
    path: /^#\/register$/,
    view: register,
  },
  {
    path: /^#\/login$/,
    view: login,
  },
  {
    path: /^#\/coming-soon$/,
    view: comingSoon
  },
]