import React, { useState } from 'react';

const Login = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <form className='bg-white p-6 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                <div className="mb-4">
                    <label className='block mb-2 text-gray-700'>Username</label>
                    <input type='text' className="w-full p-2 border rounded-md" required/>
                </div>
                <div className='mb-4'>
                    <label className='block mb-2 text-gray-700'>Password</label>
                    <input type='password' className='w-full p-2 border rounded-md' required/>
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>Log in</button>
            </form>
        </div>
    )
}

export default Login;