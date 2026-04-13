const postsContainer = document.getElementById('postsContainer');

const currentUser = JSON.parse(localStorage.getItem('connectifyUser'));
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// USER INFO
document.getElementById('userEmail').textContent = currentUser.email;
document.getElementById('profileName').textContent = currentUser.email;

// FILTER POSTS
const userPosts = posts.filter((post) => post.author === currentUser.email);

// RENDER POSTS
function renderPosts() {
  postsContainer.innerHTML = '';

  if (userPosts.length === 0) {
    postsContainer.innerHTML = `
      <div class="col-span-full text-center text-gray-400">
        <p class="text-lg">😕 No posts yet</p>
        <p class="text-sm">Create your first post from the feed</p>
      </div>
    `;
    return;
  }

  userPosts.forEach((post) => {
    const postEl = document.createElement('article');

    postEl.className =
      'bg-cardlight dark:bg-carddark rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden';

    postEl.innerHTML = `
      ${post.image ? `<img src="${post.image}" class="w-full h-48 object-cover" />` : ''}

      <div class="p-5 space-y-2">
        <h3 class="font-semibold text-gray-800 dark:text-white">${post.title}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">${post.content}</p>

        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>@${post.author}</span>
          <span>❤️ ${post.likes} • ${post.time}</span>
        </div>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

renderPosts();
