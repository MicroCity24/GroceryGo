const logoutBtn = document.getElementById('logoutBtn');
const deleteBtn = document.getElementById('deleteBtn');
const token = localStorage.getItem('token');


logoutBtn.addEventListener('click', logout);
deleteBtn.addEventListener('click', deleteCustomer);


function logout(){
    localStorage.removeItem('token');
    location.replace('../index.html');
}

async function deleteCustomer(){
    const result = await fetch(`/api/delete-customer/${token}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .catch((err)=> console.log(err.message))

    if (result.status === 'ok') {
        // Redirect to customer-home.html after successful login
        location.replace('../index.html');
        localStorage.removeItem('token');
    } else {
        alert(result.error);
    }
}