const form = document.getElementById('register-form');

form.addEventListener('submit', registerCustomer);

async function registerCustomer(event){
    event.preventDefault();
    const username = document.getElementById('username');
    const email = document.getElementById('email')
    const password = document.getElementById('password')
  
    const result = await fetch('/api/register-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password:password.value
      })
    })
    .then((res)=> res.json())
    .catch((err)=> alert(err.message))
  
    if(result.status === 'ok'){
      location.replace('customer-login.html')
      localStorage.setItem('token', result.data)
    }
    else{
      alert(result.error)
    }
  }