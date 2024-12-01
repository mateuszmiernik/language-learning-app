require('dotenv').config();  // Załaduj zmienne środowiskowe z pliku .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Połącz się z MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Uruchom serwer
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
