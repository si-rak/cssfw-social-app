// ======================
// CHECK AUTH
// ======================
function checkAuth() {
  const user = JSON.parse(localStorage.getItem('connectifyUser') || 'null');

  if (!user || !user.loggedIn) {
    window.location.href = '../index.html';
  }
}

// ======================
// LOGOUT
// ======================
function logoutUser() {
  localStorage.removeItem('connectifyUser');

  // prevent back button access
  window.location.replace('../index.html');
}

// ======================
// PROTECT BACK NAVIGATION
// ======================
function preventBack() {
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.location.replace('../index.html');
  };
}
