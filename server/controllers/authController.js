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

        // Generuj token JWT
        const token = jwt.sign( 
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Token ważny przez 1 godzinę
        );

        // Zwróć odpowiedź z tokenem
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { loginUser, registerUser };