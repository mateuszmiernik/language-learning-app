import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TEST_JWT;

const BASE_URL = 'http://localhost:5000/api/flashcards'; // Adres twojego API

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

        if (response.status === 200) {
            console.log(data);
            return data.token;
        }
        
    } catch (error) {
        console.error('Błąd połączenia logowania:', error)
        return null
    }
};


// Testowanie tras

// ADD
async function testPostFlashcard() {
    const token = await getAuthToken();
    console.log(token);
    

    if (!token) {
        console.error('brak tokenu');
        return;
    }

    try {
        console.log('--- Testowanie POST /api/flashcards ---');

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: 'New set 2',
                description: 'test description 2',
                cards: [
                    {term: 'term1', definition: 'def1'},
                    {term: 'term2', definition: 'def2'},
                ]
            })
        });

        const data = await response.json();
        console.log('Odpowiedz POST: ', data);
        
        if (response.status === 201) {
            console.log('POST /api/flashcards: SUKCES');
        } else {
            console.error('POST /api/flashcards: BŁĄD', response.status);
        }

        return data;
    } catch (error) {
        console.error('Błąd w POST /api/flashcards:', error);
    }
};

(async () => {
    await testPostFlashcard();
})();


// 