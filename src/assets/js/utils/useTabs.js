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
      const tabContents = document.querySelectorAll('[data-tab-content]');

      tabButtons.forEach(button => {
        button.classList.toggle('tab-active', button === target);
        button.classList.toggle('tab-inactive', button !== target);
      });

      tabContents.forEach(content => {
        content.classList.toggle('hidden', `#${content.id}` !== target.dataset.tabTarget);
      });
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

    const tabContents = tabs.map((tab, index) => {
      const contentContainer = document.createElement('div');
      contentContainer.id = `tab-content-${index}`;
      contentContainer.dataset.tabContent = '';
      contentContainer.classList = index === 0 ? '' : 'hidden';
      contentContainer.appendChild(tab.content);
      return contentContainer;
    });

    const tabsNav = document.createElement('nav');
    tabsNav.classList = "flex justify-center md:justify-start gap-8 mb-6 text-base font-semibold border-b border-gray-600";
    tabButtons.forEach(button => tabsNav.appendChild(button));

    const tabsContent = document.createElement('div');
    tabsContent.classList = "mb-6";
    tabContents.forEach(content => tabsContent.appendChild(content));

    return { tabsNav, tabsContent };
  }

  return {
    renderTabs,
    switchTab,
  };
}