const ACCESS_PASSWORD = '25 mei 2026';

const loginScreen = document.querySelector('#loginScreen');
const siteContent = document.querySelector('#siteContent');
const loginForm = document.querySelector('#loginForm');
const passwordInput = document.querySelector('#sitePassword');
const loginMessage = document.querySelector('#loginMessage');
const rememberInput = document.querySelector('#rememberMe');

function unlockSite() {
  loginScreen.hidden = true;
  siteContent.hidden = false;
}

if (
  sessionStorage.getItem('welcomeWorldUnlocked') === 'yes' ||
  localStorage.getItem('welcomeWorldRemembered') === 'yes'
) {
  unlockSite();
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  if (passwordInput.value.trim() === ACCESS_PASSWORD) {
    if (rememberInput.checked) {
      localStorage.setItem('welcomeWorldRemembered', 'yes');
    } else {
      sessionStorage.setItem('welcomeWorldUnlocked', 'yes');
    }

    loginMessage.textContent = '';
    unlockSite();
  } else {
    loginMessage.textContent = 'Kamu ga sayang sama aku 😠🥺';
    passwordInput.value = '';
    passwordInput.focus();
  }
});

document.querySelector('#togglePassword').addEventListener('click', () => {
  const showing = passwordInput.type === 'text';
  passwordInput.type = showing ? 'password' : 'text';
  document.querySelector('#togglePassword').setAttribute(
    'aria-label',
    showing ? 'Tampilkan password' : 'Sembunyikan password'
  );
});

const heartField = document.querySelector('.hearts');
const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!reduceMotion && heartField) {
  const colors = ['#f4b4bc', '#ffd9d8', '#e895a7'];

  function addFloatingHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--size', `${20 + Math.random() * 18}px`);
    heart.style.setProperty('--duration', `${8 + Math.random() * 6}s`);
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    heartField.append(heart);
    heart.addEventListener('animationend', () => heart.remove(), {
      once: true
    });
  }

  window.setInterval(addFloatingHeart, 520);
}