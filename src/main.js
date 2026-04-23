import './style.css'
import { renderNavbar } from './assets/js/components/navigation/navbar.js'
import { renderFooter } from './assets/js/components/footer/footer.js';

// Recommended way, to include only the icons you need.
import { createIcons, Menu, CirclePlus, CircleDollarSign, X, User, Home, LogIn, LogOut } from 'lucide';

document.querySelector('#app').innerHTML = `
<section id="center">
  <div>
    <h1>Test 1</h1>
    <h2>Test 2</h2>
    <h3>Test 3</h3>
    <h4>Test 4</h4>
    <h5>Test 5</h5>
    <h6>Test 6</h6>
    <p class="my-8">Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

renderNavbar();
renderFooter();

createIcons({
  icons: {
    Menu,
    CirclePlus,
    CircleDollarSign,
    X,
    User,
    Home,
    LogIn,
    LogOut
  }
});