// set up functionality to allow users to delete their own posts

function deletePostHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const response = fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-btn').addEventListener('click', deletePostHandler);