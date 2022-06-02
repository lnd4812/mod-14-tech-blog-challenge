// set up comment functionality
async function commentHandler(event) {
    event.preventDefault();

    const comment = document.querySelector('textarea[name="comment-statement"]').value.trim();

    // split url into an array and grab post_id (last item in array; i.e. "length-1")
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }

    console.log(comment, post_id);
}

document.querySelector('.comment-section').addEventListener('submit', commentHandler);