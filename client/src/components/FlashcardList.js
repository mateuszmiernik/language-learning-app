import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFlashcardSet } from'../api/FlashcardApi';

const FlashcardList = () => {
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sets = await getFlashcardSet();
                setFlashcardSets(sets);
            } catch (error) {
                setMessage(error.message || 'An unexpected error occured.')
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mt-4'>
            {message ? (<p className='text-red-500'>{message}</p>) :
            flashcardSets.length === 0 ? (
                <p>No flashcard sets available. Create one!</p>
            ) :
            flashcardSets.map((set) => (
                <Link to={`/flashcards/${set.id}`} key={set.id} className='mb-4 block'>
                    <div className='bg-white border p-4 hover:shadow-lg transition-shadow duration-200 rounded-lg shadow-lg'>
                        <h2 className='font-bold text-xl'>{set.title}</h2>
                        <p>{set.description}</p>
                        <p>Number of flashcards: {set.flashcards.length}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
};

export default FlashcardList;