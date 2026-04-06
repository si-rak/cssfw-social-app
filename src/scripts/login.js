const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || password.length < 8) {
    alert('Enter valid email and password (min 8 characters)');
    return;
  }

  // SAVE USER
  localStorage.setItem(
    'connectifyUser',
    JSON.stringify({
      email: email,
      loggedIn: true,
    }),
  );

  // REDIRECT
  window.location.href = './feed/index.html';
});
