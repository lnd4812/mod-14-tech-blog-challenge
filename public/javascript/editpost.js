// functionality to enable users to edit their own posts

async function editPost(event) {
    event.preventDefault();

    const post_title = document.querySelector('input[name="post-title"]').value.trim();
    // extract id from url array
    const id = window.location.toString().split('/')[
        window.location.toString().split('/') - 1
        ];
    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
            body: JSON.stringify({
                post_title
            }),
            headers: {
                'Content-Type': 'application/json'
            }
    });
    
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post').addEventListener('submit', editPost);