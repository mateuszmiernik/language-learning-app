import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Flashcards = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Sprawdzamy, czy token istnieje w localStorage
        const token = localStorage.getItem('token'); // pobieramy token z localStorage

        if (!token) {
            // Jeśli tokenu nie ma, przekierowujemy na stronę logowania
            navigate('/');
        }
    }, [navigate]); // useEffect uruchomi się przy załadowaniu komponentu

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Flashcards</h1>
            <p>Welcome to your flashcards dashboard!</p>

            <Link to='/add-flashcard' className='text-blue-500 underline m-4'>
                Add a new flashcard
            </Link>

            <button onClick={handleLogout} className='text-red-500 underline'>Logout</button>
        </div>
    )
}

export default Flashcards;