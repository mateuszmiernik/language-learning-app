const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Funkcja do rejestrowania użytkownika

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Sprawdź, czy użytkownik istnieje
        const existingUser = await User.findOne( {username });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with the given username already exists.' })
        }

        // Utwórz nowego użytkownika
        const newUser = await User.create( { username, password });

        // Zwróc odpowiedź
        res.status(201).json({ message: 'Registration successful.', userId: newUser._id});
    } catch(error) {
        res.status(500).json({ message: 'Error occured during user registration.', error: error.message })
    }
}

// Funkcja do logowania użytkownika
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Sprawdź, czy użytkownik istnieje
        const user = await User.findOne( {username} );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Porównaj hasła
        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password '});
        }

        // Generowanie access tokena
        const accessToken = jwt.sign( 
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Generowanie refresh tokena
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        // Zapisz refresh token w bazie danych
        user.refreshToken = refreshToken;
        await user.save()

        // Zwracamy accessToken i refreshToken
        res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({message: 'No refresh token provided'});
    }

    try {
        // Sprawdzamy, czy refresh token istnieje w bazie
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Zweryfikuj refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        // Stwórz nowy access token
        const newAccessToken = jwt.sign(
            {id: decoded.id }, 
            process.env.JWT_SECRET,
            {expiresIn: '1h'} 
        );

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.log(("Refresh token error:", error));
        res.statsu(403).json({ message: "Invalid or expired refresh token" });
    }
};

const logoutUser = async (req, res) => {
    const {refreshToken} = req.body;

    try {
        // Znajdź użytkownika i usuń jego refresh token
        await User.updateOne({ refreshToken }, { rehreshToken: null });

        res.json({message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: "Logout failed", error: error.message });
    }
};

module.exports = { loginUser, registerUser, refreshAccessToken, logoutUser };