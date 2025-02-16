import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { TrashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';
import { addFlashcardSet, updateFlashcardSet } from '../api/FlashcardApi';
import { getFlashcardSetById } from '../api/FlashcardApi';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AddEditFlashcard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashcards, setFlashcards] = useState([{ id: uuidv4(), term: '', definition: '' }]);
    const [message, setMessage] = useState('');
    const [isViewMode, setIsViewMode] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchFlashcardSet = async () => {
                try {
                    const existingSet = await getFlashcardSetById(id);
                    setTitle(existingSet.title);
                    setDescription(existingSet.description);
                    setFlashcards(existingSet.flashcards);
                    // console.log('set by id: ', existingSet);
                    // console.log('set by id: ', typeof(existingSet.flashcards[1]._id));
                } catch (error) {
                    setMessage('Failed to load flashcard set.')
                }
            };
            fetchFlashcardSet();
            // console.log('AddEditFlashcard.js - flashcards: ', flashcards)
        }
    }, [id]);

    useEffect(() => {
        setIsViewMode(location.pathname.includes('/view'));
    }, [location.pathname]);

    const handleAddFlashcard = () => {
        setFlashcards([...flashcards, { id: uuidv4(), term: '', definition: ''}]);
        // console.log('AddEditFlashcard.js - flashcards: ', flashcards);
    }

    const handleRemoveFlashcard = (idToRemove) => {
        console.log('REMOVING flashcard with id: ', idToRemove);
        const updatedFlashcards = flashcards.filter(
            (flashcard) => flashcard.id !== idToRemove && flashcard._id !== idToRemove
        );
        // console.log('UPDATED flashcards: ', updatedFlashcards);
        setFlashcards(updatedFlashcards);
    }

    const handleChangeFlashcard = (id, field, value) => {
        const updatedFlashcards = flashcards.map((flashcard) => {
            if (flashcard.id === id || flashcard._id === id) {
                return { ...flashcard, [field]: value }
            }
            return flashcard;
        });

        setFlashcards(updatedFlashcards);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (flashcards.length === 0) {
            setMessage('You must add at least one flashcard.');
            return;
        } 

        // Usuwamy UUID z fiszek przed wysłaniem do backendu
        const flashCardsWithoutUUID = flashcards.map(({ id, ...rest }) => rest);

        try {
            if (id) {
                await updateFlashcardSet(id, {title, description, flashcards});
                setMessage('Flashcard set updated successfully!');
            } else {
                await addFlashcardSet(title, description, flashcards);
                setMessage('Flashcard set created successfully!');
                setTitle('');
                setDescription('');
                setFlashcards([{ id: uuidv4(), term: '', definition: ''}]);
            }
            navigate('/flashcards');
        }
        catch (error) {
            setMessage(error.message || 'An unexpected error occurred.');
        }
    };

    const handleDragEnd = (result) => {
        console.log("Drag result:", result);
        if (!result.destination || isViewMode) return; // Ignorujemy, jeśli brak miejsca docelowego lub tryb podglądu
        
        console.log("Source:", result.source.droppableId);
        console.log("Destination:", result.destination.droppableId);

        const updatedFlashcards = Array.from(flashcards);
        const [movedItem] = updatedFlashcards.splice(result.source.index, 1);
        updatedFlashcards.splice(result.destination.index, 0, movedItem);

        setFlashcards(updatedFlashcards);
    };

    // console.log("AddEditFlashcard.js - Flashcards:", flashcards);
    // console.log("AddEditFlashcard.js - Flashcards - IDs:", flashcards.map(f => f._id));

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Link to={id ? `/flashcards/${id}` : '/flashcards'} className='absolute top-4 left-4 z-10 p-2 rounded-full hover:bg-gray-200 transition'>
                <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
            </Link>

            <form onSubmit={handleSubmit} className='w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-bold mb-4'>
                        { isViewMode ? 'View Flashcard Set' : id ? 'Edit Flashcard Set' : 'Create a New Flashcard Set'}
                    </h1>
                    {!isViewMode && (
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
                        >
                            { id ? 'Update' : 'Create'}
                        </button>
                    )}
                </div>
            
                {/* Title Input */}
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Set Title</label>
                    <input 
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border border-gray-300 rounded p-2 w-full'
                        placeholder='Enter set title'
                        required
                        readOnly={isViewMode}
                    />
                </div>

                {/* Description Textarea */}
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Description (optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='border border-gray-300 rounded p-2 w-full'
                        placeholder='Enter set description (max 255 characters)'
                        maxLength={255}
                        readOnly={isViewMode}
                    />
                    <p className='text-xs text-gray-500'>
                        {description.length} / 255
                    </p>
                </div>

                {/* Flashcards */}
                {flashcards.length > 0 && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId='flashcards'>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {flashcards.map((flashcard, index) => (
                                        <Draggable
                                            key={flashcard._id || flashcard.id}
                                            draggableId={flashcard._id || flashcard.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...(!isViewMode ? provided.dragHandleProps : {})} // Blokujemy przeciąganie w trybie podglądu
                                                    className="mb-4 p-4 bg-gray-100 rounded shadow"
                                                >
                                                    <div className='flex justify-between items-center mb-2'>
                                                        <h2 className='text-lg font-semibold'>Flashcard</h2>
                                                        {!isViewMode && (
                                                            <button
                                                                type='button'
                                                                onClick={() => handleRemoveFlashcard(flashcard._id || flashcard.id)}
                                                                className="group p-2 rounded-full bg-transparent hover:bg-red-100 transition-all duration-300 ease-in-out"
                                                            >
                                                                <TrashIcon className="h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out group-hover:text-red-500 group-hover:scale-110" />
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className='flex space-x-4 mb-8'>
                                                        <div className='w-1/2'>
                                                            <input
                                                                type='text'
                                                                value={flashcard.term}
                                                                onChange={(e) => handleChangeFlashcard(flashcard._id || flashcard.id, 'term', e.target.value)}
                                                                className='border-b border-black p-2 w-full'
                                                                required
                                                                readOnly={isViewMode}
                                                            />
                                                            <span className='block mt-1.5 text-xs text-gray-400'>Term</span>
                                                        </div>
                                                        
                                                        <div className='w-1/2'>
                                                            <input 
                                                                type='text'
                                                                value={flashcard.definition}
                                                                onChange={(e) => handleChangeFlashcard(flashcard._id || flashcard.id, 'definition', e.target.value)}
                                                                className='border-b border-black p-2 w-full'
                                                                required
                                                                readOnly={isViewMode} 
                                                            />
                                                            <span className='block mt-1.5 text-xs text-gray-400'>Definition</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}

                {!isViewMode && (
                    <button
                    type='button'
                    onClick={handleAddFlashcard}
                    className='bg-green-500 text-white px-4 py-2 rounded mb-4'
                >
                    Add Flashcard
                </button>
                )}
                
                {message && (
                    <div
                        className={`p-2 mb-4 ${
                            message.includes('successfully') ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {message}
                    </div>
                )}
            </form>
        </div>
    )
}

export default AddEditFlashcard;