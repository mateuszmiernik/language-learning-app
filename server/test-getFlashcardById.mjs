import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const TEST_URL = 'http://localhost:5000/api/flashcards/678a6731f58c51d07e70beaf';

// Logowanie

async function getAuthToken() {
    try {
        console.log('--- Logowanie użytkownika ---');
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'test',
                password: 'password'
            })
        });
        
        const data = await response.json();
        // console.log('LOG - getAuthToken', data);
        

        if (response.status === 200) {
            console.log(data);
            return data.token;
        }
        
    } catch (error) {
        console.error('Błąd połączenia logowania:', error)
        return null
    }
};

// Pobieranie zestawu fiszek po ID
async function testGetFlashcardById() {
    const token = await getAuthToken();

    if (!token) {
        console.error('brak tokenu');
        return;
    }

    try {
        console.log('--- Testowanie GET /api/flashcards/:id ---');

        const response = await fetch(`${TEST_URL}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });


        const data = await response.json();
        console.log('LOG - getFlashcardSetById', data);
        
    } catch (error) {
        console.error('Błąd połączenia pobierania zestawu fiszek:', error);
    }
}


(async () => {
    await testGetFlashcardById();
})();