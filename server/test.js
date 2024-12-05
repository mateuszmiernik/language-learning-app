const mongoose = require('mongoose');
const User = require('./models/User'); // Ścieżka do pliku User.js

// Połączenie z MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/testdb', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


const testUser = async () => {
    try {
        // Tworzenie nowego użytkownika
        const user = new User({
            username: "testuser2",
            password: "password123"
        });

        await user.save();
        console.log('User created', user);

        const isMatch = await user.matchPassword('password123');
        console.log('Password is correct', isMatch); // Oczekiwane: true
        
        const isMatchWrong = await user.matchPassword('wrongpassword');
        console.log('Password is correct', isMatchWrong); // Oczekiwane: false
        
    } catch(err) {
        console.error('Error', err);

    } finally {
        mongoose.connection.close()
    }
};

testUser();
