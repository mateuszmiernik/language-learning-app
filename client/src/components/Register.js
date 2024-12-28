import React, { useState } from 'react';

const Register = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            console.log(data);
            

        } catch(error) {
            console.error('Error:', error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label className='block mb-2 text-gray-700'>Username</label>
                <input
                    type='text'
                    value={username}
                    onChange={handleUserNameChange}
                    className='w-full p-2 border rounded-md'
                    placeholder='Enter username'
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-2 text-gray-700'>Password</label>
                <input 
                    type='text'
                    value={password}
                    onChange={handlePasswordChange}
                    className='w-full p-2 border rounded-md'
                    placeholder='Enter password'
                />
            </div>
            <button 
                type='submit' 
                className='w-full bg-blue-500 text-white py-2 rounded-md'
            >
                Register
            </button>
        </form>
    )
}

export default Register;