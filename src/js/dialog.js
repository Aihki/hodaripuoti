////// Dialog /////
const dialog = document.querySelector('dialog');
const closeDialogBtn = document.getElementById('close_dialog');
const burger = document.querySelector('.burgermenu');
const navMenu = document.querySelector('.nav-menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach((n) =>
  n.addEventListener('click', () => {
    burger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

const elements = dialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstElement = elements[0];
const lastElement = elements[elements.length - 1];

/*const trapFocus = (e) => {
  if (e.key === 'Tab') {
    const tabForwards = !e.shiftKey && document.activeElement === lastElement;
    const tabBackwards = e.shiftKey && document.activeElement === firstElement;
    if (tabForwards) {
      e.preventDefault();
      firstElement.focus();
    } else if (tabBackwards) {
      e.preventDefault();
      lastElement.focus();
    }
  }
};*/
