import React from 'react';

const Register = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className=''>
            <h2 className=''>Register</h2>
            <div className='flex'>
                <div>
                    <label>Username</label>
                    <input
                        type='text'
                        className=''
                        placeholder='Enter username'
                    />
                </div>  
            </div>
        </form>
        </div>
        
    )
}

export default Register;