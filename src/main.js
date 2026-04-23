import './style.css'
import { renderNavbar } from './assets/js/components/navigation/navbar.js'
import { renderFooter } from './assets/js/components/footer/footer.js';
import { router } from './assets/js/router/index.js';

// Recommended way, to include only the icons you need.
import { createIcons, Menu, CirclePlus, CircleDollarSign, X, User, Home, LogIn, LogOut, CheckCircle, AlertCircle, Info } from 'lucide';

renderNavbar();
renderFooter();
router();

setTimeout(() => {
  createIcons({
    icons: {
      Menu,
      CirclePlus,
      CircleDollarSign,
      X,
      User,
      Home,
      LogIn,
      LogOut,
      CheckCircle,
      AlertCircle,
      Info
    }
  });
}, 0);