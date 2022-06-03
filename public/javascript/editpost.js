// functionality to enable users to edit and/or delete their own posts

function editPostHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('input[name="post-title"]').value.trim();
    const post_content = document.querySelector('#post-content').value;
    // extract id from url array
    const id = window.location.toString().split('/')[
        window.location.toString().split('/')
        ];
    const response = fetch(`/api/posts/${id}`, {
        method: 'PUT',
            body: JSON.stringify({
                post_title,
                post_content
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

document.querySelector('.save-edit').addEventListener('submit', editPostHandler);