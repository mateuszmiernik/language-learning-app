const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async(req, res, next) => {
    let token; 

    // Sprawdzamy, czy nagłówek Authorization istnieje i zaczyna się od "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // Pobieramy token z nagłówka
            token = req.headers.authorization.split(' ')[1]; // Pobieramy token (druga część po "Bearer")

            console.log('Token:', token);
            console.log('JWT_SECRET:', process.env.JWT_SECRET);

            const decoded = jwt.verify(token, process.env.JWT_SECRET) // weryfikujemy token

            req.user = await User.findById(decoded.id).select('-password'); // Pobieramy użytkownika z bazy (bez hasła)

            next(); // Przechodzimy do następnego middleware lub kontrolera
        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(401).json({ message: 'Not authorized, invalid token' });
        }
        
    } else {
        // Brak tokenu w nagłówku
        res.status(401).json({ message: 'Not authorized, no token provided' });
    };
}

module.exports = { protect };