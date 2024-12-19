import fetch from 'node-fetch';

fetch(
    'http://localhost:5000/api/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'testuser_1',
        password: 'password1'
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error: ', error)) 
    