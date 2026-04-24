import './style.css'
import { renderNavbar } from './assets/js/components/navigation/navbar.js'
import { renderFooter } from './assets/js/components/footer/footer.js';
import { router } from './assets/js/router/index.js';

renderNavbar();
renderFooter();
router();