import React, { useState } from 'react';
import { TrashIcon } from "@heroicons/react/24/outline";


const AddFlashcard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashcards, setFlashcards] = useState([{ term: '', definition: ''}]);
    const [message, setMessage] = useState('');

    const handleAddFlashcard = () => {
        setFlashcards([...flashcards, { term: '', definition: ''}]);
    }

    const handleRemoveFlashcard = (indexToDelete) => {
        const updatedFlashcards = flashcards.filter((_, index) => index !==indexToDelete);
        setFlashcards(updatedFlashcards);
    }

    const handleChangeFlashcard = (index, field, value) => {
        const updatedFlashcards = flashcards.map((flashcard, i) => 
            i === index ? { ...flashcard, [field]: value} : flashcard
        );
        setFlashcards(updatedFlashcards);
    }


    return (
        <form className='max-w-2xl bg-white p-6 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-4'>Create a New Flashcard Set</h1>
            
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
                {flashcards.map((flashcards, index) => (
                    <div key={index} className='mb-4 border-b pb-4'>
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className='text-lg font-semibold'>Flashcard</h2>
                            <button 
                                onClick={() => handleRemoveFlashcard(index)}
                                className='rounded-sm'
                            >
                                <TrashIcon className='h-4 w-4 text-gray-500' />
                            </button>
                        </div>

                        {/* Term */}
                        <div className='flex space-x-4 mb-8'>
                            <div className='w-1/2'>
                                <input
                                    type='text'
                                    onChange={(e) => handleChangeFlashcard(index, 'term', e.target.value)}
                                    className='border-b border-black p-2 w-full'
                                    required
                                />
                                <span className='block mt-1.5 text-xs text-gray-400'>Term</span>
                            </div>
                            
                            {/* Definition */}
                            <div className='w-1/2'>
                                <input 
                                    type='text'
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
                
   
        </form>

        
    )
}

export default AddFlashcard;