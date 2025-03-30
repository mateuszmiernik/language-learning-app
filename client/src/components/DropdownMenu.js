import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

const DropdownMenu = ({ id, openDeleteModal }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative' tabIndex={0} onBlur={() => {setIsOpen(false)}}>
            <button
                className='p-2 rounded-full hover:bg-gray-200 transition'
                onClick={() => setIsOpen(!isOpen)}
            >
                <EllipsisVerticalIcon className='h-6 w-6 text-gray-500 '/>
            </button>
            {isOpen && (
                <div 
                    className='absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg border z-50'
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {/* Link do edycji */}
                    <Link
                        to={`/flashcards/${id}/edit`}
                        className='flex items-center px-4 py-2 hover:bg-gray-100 transition'
                    >
                        <PencilSquareIcon className="h-6 w-6 text-gray-500 mr-4" />
                        Edit
                    </Link>

                    {/* Link do read-only */}
                    <Link
                        to={`/flashcards/${id}/view`}
                        className='flex items-center px-4 py-2 hover:bg-gray-100 transition'
                    >
                        <DocumentMagnifyingGlassIcon className="h-6 w-6 text-gray-500 mr-4" />
                        View
                    </Link>

                    {/* Link do remove */}
                    <button
                        type='button' 
                        onClick={openDeleteModal}
                        className="flex items-center px-4 py-2 text-red-600 rounded-md hover:bg-gray-100 transition w-full"
                    >
                        <TrashIcon className="h-6 w-6 text-red-600 mr-4" />
                        delete
                    </button>

                    
                </div>
            )}
        </div>
    )

}

export default DropdownMenu;