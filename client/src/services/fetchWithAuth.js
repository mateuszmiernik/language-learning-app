import { getAccessToken, getRefreshToken, refreshAccessToken, logout } from './authService';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchWithAuth = async (url, options = {}) => {
    // Pobieramy accessToken
    let accessToken = getAccessToken();

    // Ustawiamy nagłówki z tokenem
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json'
    };

    // Wysyłamy zapytanie
    let response = await fetch(`${API_URL}${url}`, { ...options, headers });

    // Sprawdzamy czy token wygasł
    if (response.status === 401) {
        console.log('Token has expired, trying to refresh...');

        // Próbujemy pobrać nowy accessToken
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
            logout();
            return;
        }

        // Ponawiamy zapytanie z nowym tokenem
        headers.Authorization = `Bearer ${newAccessToken}`;
        response = await fetch(`${API_URL}${url}`, { ...options, headers });
    }

    return response;
}