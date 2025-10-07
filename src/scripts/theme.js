// === Theme Toggle ===
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
const knob = toggle.querySelector('div');

function setTheme(isDark) {
  if (isDark) {
    html.classList.add('dark');
    localStorage.theme = 'dark';
    knob.style.transform = 'translateX(1.5rem)';
  } else {
    html.classList.remove('dark');
    localStorage.theme = 'light';
    knob.style.transform = 'translateX(0)';
  }
}

// Initialize from storage
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  setTheme(true);
} else {
  setTheme(false);
}

// Toggle on click
toggle.addEventListener('click', () => {
  const isDark = !html.classList.contains('dark');
  setTheme(isDark);
});

// === Mobile Menu Toggle with Animation ===
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  const bars = menuBtn.querySelectorAll('span');

  menuBtn.addEventListener('click', () => {
    // Toggle dropdown
    mobileMenu.classList.toggle('hidden');

    // Animate bars (hamburger → X)
    bars[0].classList.toggle('rotate-45');
    bars[0].classList.toggle('translate-y-2');

    bars[1].classList.toggle('opacity-0');

    bars[2].classList.toggle('-rotate-45');
    bars[2].classList.toggle('-translate-y-2');
  });
}
