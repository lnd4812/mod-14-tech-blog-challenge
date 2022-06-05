//login for existing users
async function accountLoginHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username, 
                password
            }),
            headers: { 
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }   else {
                alert('invalid password. If not yet signed up, please create new account to log in');
        }
    }
}

document.querySelector('.login').addEventListener('submit', accountLoginHandler);