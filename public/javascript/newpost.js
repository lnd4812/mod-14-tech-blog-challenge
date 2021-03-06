// set up functionality to add a new post

async function newPostHandler(event) {
    event.preventDefault();

   const post_title = document.querySelector('input[name="post-title"]').value.trim();
   const post_link = document.querySelector('input[name="post-link"]').value.trim();
   const post_content = document.querySelector("#post-content").value;
   
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_link,
            post_content
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

document.querySelector('.post-entry').addEventListener("submit", newPostHandler);