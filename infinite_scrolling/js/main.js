const filter = document.querySelector('#filter');
const container = document.querySelector('#container');
const loading = document.querySelector('#loading');

let limit = 5;
let page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

async function showPosts() {
    const posts = await getPosts();

    posts.forEach((post) => {
        const p = document.createElement('div');
        p.classList.add('post');
        p.innerHTML = `<small class="post__id">${post.id}</small>
        <h2 class="post__title">${post.title}</h2>
        <p class="post__description">${post.body}</p>`;

        container.appendChild(p);
    });
}

function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 200); 
    }, 1000);
}

document.addEventListener('scroll', (e) => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);

function filterPosts(e) {
    const term = e.target.value.trim().toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.children[1].textContent.toLowerCase();
        const body = post.children[2].textContent.toLowerCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}