require('dotenv').config();  // Załaduj zmienne środowiskowe z pliku .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import middleware do obsługi CORS
const authRoutes = require('./routes/authRoutes'); // Import tras rejestracji i logowania
const flashcardRoutes = require('./routes/flashcardRoutes'); // Import tras fiszek

const app = express();

// Połącz się z MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Podłączenie tras autoryzacji
app.use('/api/', authRoutes);

// Podłączenie tras dla fiszek
app.use('/api/flashcards', flashcardRoutes);

// Uruchom serwer
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
