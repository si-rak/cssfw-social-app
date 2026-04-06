const postsContainer = document.getElementById('postsContainer');

const currentUser = JSON.parse(localStorage.getItem('connectifyUser'));
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// SHOW USER EMAIL
document.getElementById('userEmail').textContent = currentUser.email;

// FILTER POSTS (ONLY CURRENT USER)
const userPosts = posts.filter((post) => post.author === currentUser.email);

// RENDER
function renderPosts() {
  postsContainer.innerHTML = '';

  if (userPosts.length === 0) {
    postsContainer.innerHTML = `<p class="text-gray-400">No posts yet.</p>`;
    return;
  }

  userPosts.forEach((post) => {
    const postEl = document.createElement('article');

    postEl.className =
      'bg-cardlight dark:bg-carddark rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden';

    postEl.innerHTML = `
      ${post.image ? `<img src="${post.image}" class="w-full h-48 object-cover" />` : ''}

      <div class="p-5 space-y-2">
        <h3 class="font-semibold">${post.title}</h3>
        <p class="text-sm text-gray-400">${post.content}</p>

        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>@${post.author}</span>

          <div class="flex gap-3">
            <span>❤️ ${post.likes}</span>
          </div>
        </div>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

renderPosts();
