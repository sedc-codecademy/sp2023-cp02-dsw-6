const hamburger = document.querySelector('.hamburger');
const hiddenOptions = document.querySelector('.hiddenOptions');

hamburger.addEventListener('click', () => {
  hiddenOptions.classList.toggle('hidden');
});