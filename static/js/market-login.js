const form = document.getElementById('login-form');

form.addEventListener('submit', loginMarket);

async function loginMarket(event) {
    event.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const result = await fetch('/api/login-market', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value, 
            password: password.value,
        }),
    })
    .then((res) => res.json())
    .catch((err) => alert(err.message));

    if (result.status === 'ok') {
        location.replace('market-home.html');
        localStorage.setItem('token', result.data);
    } else {
        alert(result.error);
    }
}
