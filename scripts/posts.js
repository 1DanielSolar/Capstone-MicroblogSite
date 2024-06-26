/* Posts Page JavaScript */
"use strict";

"use strict";

// Ensure there is only one fetchPosts function
function fetchPosts() {
    const loginData = getLoginData();
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${loginData.token}`);

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=20&offset=0', {
        headers: myHeaders
    })
    .then(response => response.json())
    .then(data => {
        displayPosts(data);
    })
    .catch(error => console.error('Error fetching posts:', error));
}

// Ensure there is only one displayPosts function
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'card mb-3';
        postCard.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${post.username}</h5>
            <p class="card-text">${post.text}</p>
            <p class="card-text"><small class="text-muted">${new Date(post.createdAt).toLocaleString()}</small></p>
            <button class="btn btn-outline-primary like-button" data-post-id="${post._id}">
                <i class="bi bi-heart"></i> 
                <span class="like-count">${post.likes.length}</span>
            </button>
        </div>
    `;
        postsContainer.appendChild(postCard);
    });

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            toggleLike(postId, this);
        });
    });
}

// Remove the duplicate fetchPosts and displayPosts functions