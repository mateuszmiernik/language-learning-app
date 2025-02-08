import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFlashcardSetById } from '../api/FlashcardApi';

const FlashcardViewer = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [message, setMessage] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const flashCardSet = await getFlashcardSetById(id);
                setTitle(flashCardSet.title);
                setDescription(flashCardSet.description);
                setFlashcards(flashCardSet.flashcards);
                console.log('Success FETCH')
            } catch (error) {
                setMessage('Failed to load flashcards.')
            }
        }

        fetchFlashcards();
    }, [id])

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6'>
            <div className='text-center mb-6'>
                <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
                <p className='text-gray-600'>{description}</p>
            </div>
            
            <div className='w-96 h-56 cursor-pointer'>
                {flashcards.length > 0 ? (
                    <>
                        <div>
                            <div>
                                
                            </div>
                        </div>
                        isFlipped ? <p>{flashcards[0].definition}</p> : <p>{flashcards[0].term}</p>

                    </>
                ) : (
                    <p>Loading flashcards...</p>
                )}
            </div>

            <div>
                <button>Previous</button>
                <button>Next</button>
            </div>

            <Link to={`/flashcards/${id}/edit`} className='btn btn-primary'>
                EDIT
            </Link>
        </div>
    )
}

export default FlashcardViewer;