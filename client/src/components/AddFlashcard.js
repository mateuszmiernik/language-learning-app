import React, { useState } from 'react';
import { TrashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';

const AddFlashcard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashcards, setFlashcards] = useState([{ id: uuidv4(), term: '', definition: ''}]);
    const [message, setMessage] = useState('');

    const handleAddFlashcard = () => {
        setFlashcards([...flashcards, { id: uuidv4(), term: '', definition: ''}]);
    }

    const handleRemoveFlashcard = (id) => {
        const updatedFlashcards = flashcards.filter((flashcard) => flashcard.id !== id);
        setFlashcards(updatedFlashcards);
    }

    const handleChangeFlashcard = (id, field, value) => {
        const updatedFlashcards = flashcards.map((flashcard) => 
            flashcard.id === id ? { ...flashcard, [field]: value} : flashcard
        );
        setFlashcards(updatedFlashcards);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Usuwamy UUID z fiszek przed wysłaniem do backendu
        const flashCardsWithoutUUID = flashcards.map(({ id, ...rest }) => rest);

        try {
            const response = await fetch('http://localhost:5000/api/add-flashcard', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title, description, flashcards: flashCardsWithoutUUID})
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Flashcard set created successfully!');
                setTitle('');
                setDescription('');
                setFlashcards([{ term: '', definition: ''}])
            } else {
                setMessage(data.message || 'Error creating flashcard set.');
            }
        }
        catch (err) {
            setMessage('An unexpected error occured.');
        }
    }


    return (
        <form onSubmit={handleSubmit} className='max-w-2xl bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between'>
            <h1 className='text-2xl font-bold mb-4'>Create a New Flashcard Set</h1>
            <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
                >
                    Create
                </button>
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
                    />
                    <p className='text-xs text-gray-500'>
                        {description.length} / 255
                    </p>
                </div>

                {/* Flashcards */}
                {flashcards.map((flashcard) => (
                    <div key={flashcard.id} className='mb-4 border-b pb-4'>
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className='text-lg font-semibold'>Flashcard</h2>
                            <button
                                onClick={() => handleRemoveFlashcard(flashcard.id)}
                                className="group p-2 rounded-full bg-transparent hover:bg-red-100 transition-all duration-300 ease-in-out"
                                >
                                <TrashIcon className="h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out group-hover:text-red-500 group-hover:scale-110" />
                            </button>
                        </div>

                        {/* Term */}
                        <div className='flex space-x-4 mb-8'>
                            <div className='w-1/2'>
                                <input
                                    type='text'
                                    value={flashcard.term}
                                    onChange={(e) => handleChangeFlashcard(flashcard.id, 'term', e.target.value)}
                                    className='border-b border-black p-2 w-full'
                                    required
                                />
                                <span className='block mt-1.5 text-xs text-gray-400'>Term</span>
                            </div>
                            
                            {/* Definition */}
                            <div className='w-1/2'>
                                <input 
                                    type='text'
                                    value={flashcard.definition}
                                    onChange={(e) => handleChangeFlashcard(flashcard.id, 'definition', e.target.value)}
                                    className='border-b border-black p-2 w-full'
                                    required
                                />
                                <span className='block mt-1.5 text-xs text-gray-400'>Definition</span>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type='button'
                    onClick={handleAddFlashcard}
                    className='bg-green-500 text-white px-4 py-2 rounded mb-4'
                >
                    Add Flashcard
                </button>

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
    )
}

export default AddFlashcard;