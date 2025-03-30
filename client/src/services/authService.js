const API_URL = process.env.REACT_APP_API_URL;

// ZAPISYWANIE TOKENÓW
export const saveTokens = (accessToken, refreshToken) => {
    console.log("Saving tokens:", accessToken, refreshToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

// POBIERANIE ACCESS TOKENA
export const getAccessToken = () => localStorage.getItem('accessToken');

// POBIERANIE REFRESH TOKENA
export const getRefreshToken = () => localStorage.getItem('refreshToken');

// USUWANIE TOKENÓW (WYLOGOWANIE)
export const logout = async() => {
    try {
        const refreshToken = getRefreshToken();

        if (refreshToken) {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken: getRefreshToken() })
            });
        }
    } catch (error) {
        console.error('Logout error', error)
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('Refresh Token is missing');

        const res = await fetch(`${API_URL}/refresh`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });

        console.log('Refresh response:', res);

        if (!res.ok) {
            console.error('Refresh failed. Logging out.');
            logout(); // Usunięcie tokenów
            return null;
        };

        const data = await res.json();
        saveTokens(data.accessToken, refreshToken);
        return data.accessToken;
    } catch (error) {
        console.error('Refresh error', error);
        logout();
        return null;
    }
};