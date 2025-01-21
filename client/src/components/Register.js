import React, { useState } from 'react';

const Register = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError]= useState('');

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();


            if (!response.ok) {
                setError(data.message || 'Registration failed.')
                return;
            }

            setSuccess('Registration successful!');
            setUserName('');
            setPassword('');
            console.log('Registration successful:', data);
            

        } catch(error) {
            console.error('Error:', error);
            setError('An unexpected error occured. Please try again.')
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
                    required
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-2 text-gray-700'>Password</label>
                <input 
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    className='w-full p-2 border rounded-md'
                    placeholder='Enter password'
                    required
                />
            </div>
            <button 
                type='submit' 
                className='w-full bg-blue-500 text-white py-2 rounded-md'
            >
                Register
            </button>

            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            {success && <p className='text-green-500 text-sm mt-2'>{success}</p>}
        </form>
    )
}

export default Register;