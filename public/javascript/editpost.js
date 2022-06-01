// functionality to enable users to edit and/or delete their own posts

function editPostHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('input[name="post-title"]').value.trim();
    // extract id from url array
    const id = window.location.toString().split('/')[
        window.location.toString().split('/') - 1
        ];
    const response = fetch(`/api/post/${id}`, {
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

document.querySelector('.edit-post').addEventListener('submit', editPostHandler);