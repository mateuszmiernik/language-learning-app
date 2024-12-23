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
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-4'>Register</h2>
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
        </div>
    )
}

export default Register;