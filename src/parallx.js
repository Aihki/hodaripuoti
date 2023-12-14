const isPartiallyVisible = (el) => {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight && rect.bottom >= 0;
};

const handleScroll = () => {
  const menuItems = document.querySelectorAll('#menu .menu-item-container');

  menuItems.forEach((item) => {
    if (isPartiallyVisible(item)) {
      item.classList.add('reveal');
    }
  });
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
