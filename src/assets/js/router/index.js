import { routes } from './routes.js';
import { pageNotFound } from '../../../pages/pageNotFound.js';

export function router() {
  async function handleRoute() {
    const hash = window.location.hash || '#/';
    const app = document.getElementById('app');

    // Find matching route
    const route = routes.find(route => route.path.test(hash));

    if (route) {
      const content = route.view();
      app.innerHTML = content;
    } else {
      app.innerHTML = pageNotFound();
    }

    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);
}