import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokens } from '../services/authService';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // console.log(`Logging with: ${username} and pw: ${password}`);   // PRINT

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json' 
                },
                body: JSON.stringify({username, password})
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Invalid username or password');
                return;
            } 

            saveTokens(data.accessToken, data.refreshToken);
            console.log('Logged in', data);
            navigate('/flashcards');

        } catch (err){
            console.error('Error', err);
            setError('Unexpected error occured. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className='block mb-2 text-gray-700'>Username</label>
                <input type='text' value={username} onChange={handleUsernameChange} className='w-full p-2 border rounded-md' placeholder='Enter username' autoComplete='username' required/>
            </div>
            <div className='mb-4'>
                <label className='block mb-2 text-gray-700'>Password</label>
                <input type='password' value={password} onChange={handlePasswordChange} className='w-full p-2 border rounded-md' placeholder='Enter password' autoComplete='current-password' required/>
            </div>
            <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>Log in</button>
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        </form>
    )
}

export default Login;