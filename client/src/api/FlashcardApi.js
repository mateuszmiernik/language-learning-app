const API_URL = process.env.REACT_APP_API_URL;

export const addFlashcardSet = async (title, description, flashcards) => {
    try {
        console.log('Before processing:', flashcards);
        // Usuwamy UUID z fiszek przed wysłaniem do backendu
        const flashcardsWithoutUUID = flashcards.map(({id, ...rest}) => rest);
        console.log('Processed flashcards:', flashcardsWithoutUUID);

        const response = await fetch(`${API_URL}/flashcards`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({title, description, flashcards: flashcardsWithoutUUID})
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create flashcard set');
        }

        return data;
    } catch (error) {
        console.error('Error adding flashcard set:', error.message);
        throw error;
    }
};

export const getFlashcardSet = async () => {
    try {
        const response = await fetch(`${API_URL}/flashcards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch flashcard set(s)');
        }

        console.log('FlashcardApi.js - getFlashcardSet:', data);

        // Mapowanie `_id` na `id`
        const mappedData = data.map(set => ({
            ...set,
            id: set._id, // Dodanie aliasu `id` dla `_id`
        }));

        return mappedData;
    } catch (error) {
        console.error('Error fetching flashcard sets:', error.message);
        throw error;
    }
};

export const getFlashcardSetById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/flashcards/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();

        console.log('FlashcardApi.js - getFlashcardSetById:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch flashcard set');
        }

        return data;
    } catch (error) {
        console.error('Error fetching flashcard set:', error.message);
        throw error;
    }
};

export const updateFlashcardSet = async (id, flashcardSet) => {
    console.log("Updating flashcard set with ID:", id); // LOG
    console.log("Data being sent:", flashcardSet); // LOG

    try {
        const response = await fetch(`${API_URL}/flashcards/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(flashcardSet)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update flashcard set');
        }

        return data;
    } catch (error) {
        console.error('Error updating flashcard set:', error.message);
        throw error;
    }
};

export const deleteFlashcardSet = async (id) => {
    try {
        const response = await fetch(`${API_URL}/flashcards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete flashcard set');
        }

        return data;
    } catch (error) {
        console.error('Error deleting flashcard set: ', error.message);
        throw error;
    }
};