document.querySelectorAll('.case-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    const detail = document.getElementById(button.getAttribute('aria-controls'));

    button.setAttribute('aria-expanded', String(!isOpen));
    detail.hidden = isOpen;
  });
});

const tabs = [...document.querySelectorAll('.action-tab')];

function selectTab(selected) {
  tabs.forEach((tab) => {
    const active = tab === selected;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(`panel-${tab.dataset.panel}`).hidden = !active;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});
