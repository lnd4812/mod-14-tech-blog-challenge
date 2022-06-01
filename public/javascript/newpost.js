// set up functionality to add a new post

function newPostHandler(event) {
    event.preventDefault();

   const post_title = document.querySelector('input[name="post-title"]').value.trim();
   const post_link = document.querySelector('input[name="post-link"]').value.trim();
//    const post_content = document.querySelector('input[name="post-content"]').value.toString();
          
    const response = fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_link,
            // post_content
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