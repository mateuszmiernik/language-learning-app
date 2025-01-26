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
            body: JSON.stringify({title, description, cards: flashcardsWithoutUUID})
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
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch flashcard set(s)');
        }

        console.log('GET data:', data);
        
        return await data;
    } catch (error) {
        console.error('Error fetching flashcard sets:', error.message);
        throw error;
    }
};

export const updateFlashcardSet = async () => {
    
};