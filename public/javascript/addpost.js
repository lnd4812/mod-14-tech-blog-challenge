// set up functionality to add a new post

async function newPost(event) {
    event.preventDefault();

    const post_title = document.querySelector('input[name="post-title"]').value.trim();
    const post_link = document.querySelector('input[name="post-link"]').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_link
        }),
        headers: {
            'Content-Type': "application/json"
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.create-post').addEventListener("submit", newPost);