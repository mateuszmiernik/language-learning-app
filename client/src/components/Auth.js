import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white p-6 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-6 text-center'>
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                
                <div className='text-center'>
                    <button 
                        className={`px-4 py-2 text-sm rounded-md ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`px-4 py-2 text-sm rounded-md ml-2 ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={()=> setIsLogin(false)}
                        >
                            Register
                    </button>

                    <div className="mt-6">
                        {isLogin ? <Login /> : <Register />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;