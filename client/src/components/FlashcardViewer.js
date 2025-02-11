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
    const [animateFlip, setAnimateFlip] = useState(false);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const flashCardSet = await getFlashcardSetById(id);
                setTitle(flashCardSet.title);
                setDescription(flashCardSet.description);
                setFlashcards(flashCardSet.flashcards);
            } catch (error) {
                setMessage('Failed to load flashcards.');
            }
        }

        fetchFlashcards();
    }, [id]);

    const handleNext = () => {
        setIsFlipped(false);
        setAnimateFlip(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setIsFlipped(false);
        setAnimateFlip(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        setAnimateFlip(true);
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6'>
            {message && <p className='text-red-500 mb-4'>{message}</p>}

            <div className='text-center mb-6'>
                <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
                <p className='text-gray-600'>{description}</p>
            </div>

            {flashcards.length > 0 ? (
                <div className="relative w-96 h-56 cursor-pointer" onClick={handleFlip}>
                    <div
                        className="relative w-full h-full rounded-lg shadow-lg"
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: "1000px",
                            transition: animateFlip ? "transform 0.5s" : "none",
                            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                        }}
                    >
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-green-500 border border-gray-300 p-6 text-xl font-bold rounded-lg"
                            style={{
                                backfaceVisibility: "hidden"
                            }}
                        >
                            {flashcards[currentIndex].term}
                        </div>
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-blue-500 border border-gray-300 p-6 text-xl font-bold rounded-lg"
                            style={{
                                transform: "rotateY(180deg)",
                                backfaceVisibility: "hidden"
                            }}
                        >
                            {flashcards[currentIndex].definition}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Flashcards loading...</p>
            )}

            <div className='mt-6 flex space-x-4'>
                <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md' onClick={handlePrevious}>Previous</button>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md' onClick={handleNext}>Next</button>
            </div>

            <Link to={`/flashcards/${id}/edit`} className='btn btn-primary'>
                EDIT
            </Link>
        </div>
    );
};

export default FlashcardViewer;