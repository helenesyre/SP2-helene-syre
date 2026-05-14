import loader from "./loader";

export function createTab(title, content) {
  return { title, content };
}

/**
 * Custom hook for managing tabs in a UI component.
 * @param {Object[]} tabs - An array of tab objects, each containing a title and content.
 * @returns
 */
export default function useTabs(tabs) {
  // create tabs
  function switchTab(event) {
    const target = event.target;
    if (target.dataset.tabTarget) {
      const tabButtons = target.parentElement.querySelectorAll('button');
      const tabContents = document.getElementById('tab-content');

      tabButtons.forEach(button => {
        button.classList.toggle('tab-active', button === target);
        button.classList.toggle('tab-inactive', button !== target);
      });
      // handle content rendering for the active tab
      const activeTab = tabs.find(tab => `#tab-content-${tabs.indexOf(tab)}` === target.dataset.tabTarget);

      tabContents.innerHTML = loader();
      if (activeTab) activeTab.content();
    }
  }

  function setupEventListeners() {
    setTimeout(() => {
      const tabButtons = document.querySelectorAll('button[data-tab-target]');
      tabButtons.forEach(button => button.addEventListener('click', switchTab));
    }, 0);
  }

  function renderTabs() {
    const tabButtons = tabs.map((tab, index) => {
      const button = document.createElement('button');
      button.textContent = tab.title;
      button.dataset.tabTarget = `#tab-content-${index}`;
      button.classList = index === 0 ? 'tab-active' : 'tab-inactive';
      return button;
    });

    setupEventListeners();

    const tabsNav = document.createElement('nav');
    tabsNav.classList = "flex justify-center md:justify-start gap-8 mb-6 text-base font-semibold border-b border-gray-600";
    tabButtons.forEach(button => tabsNav.appendChild(button));

    const tabsContent = document.createElement('div');
    tabsContent.id = 'tab-content'
    tabsContent.innerHTML = loader();
    tabsContent.classList = "mb-6";
    tabs.forEach((tab, index) => {
      if (index === 0) {
        tab.content()
      };
    });

    return { tabsNav, tabsContent };
  }

  return {
    renderTabs,
    switchTab,
  };
}