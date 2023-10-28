const form = document.getElementById('login-form');

form.addEventListener('submit', loginUser);

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const result = await fetch('/api/login-customer', { // Change this to the actual API endpoint for logging in
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
        // Redirect to customer-home.html after successful login
        location.replace('customer-home.html');
        localStorage.setItem('token', result.data);
    } else {
        alert(result.error);
    }
}
