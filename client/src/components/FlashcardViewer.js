import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getFlashcardSetById } from '../api/FlashcardApi';
import { deleteFlashcardSet } from '../api/FlashcardApi';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const FlashcardViewer = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [message, setMessage] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animateFlip, setAnimateFlip] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const navigate = useNavigate();

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

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDelete = async () => {
        try {
            await deleteFlashcardSet(id);
            navigate('/flashcards');
        } catch (error) {
            alert(error.message || 'Failed to delete flashcard set');
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6'>
            <Link to='/flashcards' className='absolute top-4 left-4 z-10 p-2 rounded-full hover:bg-gray-200 transition'>
                <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
            </Link>

            <div className="flex flex-col items-start">
                {/* TOOLBAR */}
                <div className='w-full flex justify-between items-center mb-6'>
                    <div className=''>
                        <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
                        <p className='text-gray-600'>{description}</p>
                    </div>

                    <Link to={`/flashcards/${id}/edit`} className='btn btn-primary'>
                        EDIT
                    </Link>
                    <button type='button' onClick={openDeleteModal}>
                        Delete
                    </button>
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
                                style={{ backfaceVisibility: "hidden" }}
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


                <div className='mt-6 flex items-center space-x-4 w-full justify-center'>
                    <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md' onClick={handlePrevious}>Previous</button>
                    <p>{`${currentIndex + 1} / ${flashcards.length}`}</p>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md' onClick={handleNext}>Next</button>
                </div>
            </div>

            {/* MODAL */}
            {isDeleteModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                <div className='bg-white p-6 rounded-lg shadow-lg w-96 text-center'>
                    <h2 className='text-xl font-semibold mb-4'>Delete Flashcard Set</h2>
                    <p className='text-gray-600 mb-7'>Are you sure you want to delete this set?</p>

                    <div className='flex justify-center space-x-4'>
                        <button type='button' onClick={closeDeleteModal} className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition'>Cancel</button>
                        <button type='button' onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition'>Delete</button>
                    </div>
                </div>

            </div>
        )}
        </div>
    );
};

export default FlashcardViewer;