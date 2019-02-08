const mainNav = document.getElementById('js-nav');
const navBarToggle = document.getElementById('toggler');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});
