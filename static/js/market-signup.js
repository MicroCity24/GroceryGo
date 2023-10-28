const form = document.getElementById('register-form');

form.addEventListener('submit', registerMarket);

async function registerMarket(event) {
    event.preventDefault();
    const name = document.getElementById('username');
    const email = document.getElementById('email'); 
    const password = document.getElementById('password'); 

    const result = await fetch('/api/register-market', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: username.value, 
            email: email.value,
            password: password.value,
        }),
    })
    .then((res) => res.json())
    .catch((err) => alert(err.message));

    if (result.status === 'ok') {
        location.replace('market-login.html');
        localStorage.setItem('token', result.data);
    } else {
        alert(result.error);
    }
}
