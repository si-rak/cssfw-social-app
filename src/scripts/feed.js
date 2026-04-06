const form = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');
const currentUser = JSON.parse(localStorage.getItem('connectifyUser'));
document.getElementById('userEmail').textContent = currentUser.email;

let posts = JSON.parse(localStorage.getItem('posts')) || [];

// INITIAL RENDER
renderPosts();

// ======================
// CREATE POST
// ======================
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();
  const imageInput = document.getElementById('postImage');

  if (!title || !content) return;

  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => createPost(title, content, reader.result);
    reader.readAsDataURL(file);
  } else {
    createPost(title, content, null);
  }
});

// ======================
// CREATE POST FUNCTION
// ======================
function createPost(title, content, image) {
  const newPost = {
    id: Date.now(),
    title,
    content,
    image,
    author: currentUser.email,
    likes: 0,
    time: new Date().toLocaleTimeString(),
  };

  posts.unshift(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));

  form.reset();
  renderPosts();
}

// ======================
// RENDER POSTS
// ======================
function renderPosts() {
  postsContainer.innerHTML = '';

  if (posts.length === 0) {
    postsContainer.innerHTML = `<p class="text-gray-400">No posts yet.</p>`;
    return;
  }

  posts.forEach((post) => {
    const postEl = document.createElement('article');

    postEl.className =
      'bg-cardlight dark:bg-carddark rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden';

    postEl.innerHTML = `
      ${post.image ? `<img src="${post.image}" class="w-full h-48 object-cover" />` : ''}

      <div class="p-5 space-y-2">
        <h3 class="font-semibold">${post.title}</h3>
        <p class="text-sm text-gray-400">${post.content}</p>

        <div class="flex justify-between items-center text-xs text-gray-500">

          <span>@${post.author} • ${post.time}</span>

        <div class="flex gap-4 items-center text-gray-300">

  <!-- LIKE (always visible) -->
  <button data-id="${post.id}" class="likeBtn flex items-center gap-1 text-pink-500 hover:scale-110 transition">
    ❤️ <span class="text-sm">${post.likes}</span>
  </button>

  ${
    post.author === currentUser.email
      ? `
        <!-- EDIT -->
        <button data-id="${post.id}" class="editBtn hover:scale-110 transition">
          ✏️
        </button>

        <!-- DELETE -->
        <button data-id="${post.id}" class="deleteBtn hover:scale-110 transition">
          🗑️
        </button>
      `
      : ''
  }

</div>

        </div>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });

  attachLikeEvents();
  attachEditEvents();
  attachDeleteEvents();
}

// ======================
// LIKE
// ======================
function attachLikeEvents() {
  document.querySelectorAll('.likeBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);

      posts = posts.map((post) => {
        if (post.id === id) post.likes++;
        return post;
      });

      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
    });
  });
}

// ======================
// DELETE
// ======================
function attachDeleteEvents() {
  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);

      if (!confirm('Delete this post?')) return;

      posts = posts.filter((post) => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(posts));

      renderPosts();
    });
  });
}

// ======================
// EDIT
// ======================
function attachEditEvents() {
  document.querySelectorAll('.editBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);

      const post = posts.find((p) => p.id === id);

      const newTitle = prompt('Edit title:', post.title);
      const newContent = prompt('Edit content:', post.content);

      if (!newTitle || !newContent) return;

      posts = posts.map((p) => {
        if (p.id === id) {
          p.title = newTitle;
          p.content = newContent;
        }
        return p;
      });

      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
    });
  });
}
