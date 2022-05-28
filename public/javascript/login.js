// new users required to create an account in order to login
async function createAccount(event) {
    event.preventDefault();

    const username = document.querySelector('#username-create').value.trim();
    const email = document.querySelector('#email-create').value.trim();
    const password = document.querySelector('#password-create').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        })
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

// login for existing users
async function accountLogin(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email, 
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }   else {
                alert(response.statusText);
        }
    }
}

// event listeners for functions creating account for new users & logging in existing users
document.querySelector('.create-account').addEventListener('submit', createAccount);
document.querySelector('.login').addEventListener('submit', accountLogin);