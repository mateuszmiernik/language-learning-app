import React, { useState } from 'react';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(`Logging with: ${username} and pw: ${password}`);   // PRINT

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json' 
                },
                body: JSON.stringify({username, password})
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Logged in:', data);
            } else {
                console.error('Error', data.message);
            }
        } catch (err){
            console.error('Error', err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className='block mb-2 text-gray-700'>Username</label>
                <input type='text' value={username} onChange={handleUsernameChange} className='w-full p-2 border rounded-md' placeholder='Enter username' required/>
            </div>
            <div className='mb-4'>
                <label className='block mb-2 text-gray-700'>Password</label>
                <input type='password' value={password} onChange={handlePasswordChange} className='w-full p-2 border rounded-md' placeholder='Enter password' required/>
            </div>
            <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>Log in</button>
        </form>
    )
}

export default Login;