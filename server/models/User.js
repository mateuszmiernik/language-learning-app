const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs'); // Bcrypt do haszowania haseł

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Jeśli hasło nie jest zmieniane, nie rób ni
    const salt = await bcrypt.genSalt(10); // Generowanie soli
    this.password = await bcrypt.hash(this.password, salt); // Haszowanie hasła
    next(); // Kontynuuj zapisywanie dokumentu
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;