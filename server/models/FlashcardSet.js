const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    term: { type: String, required: true },
    definition: { type: String, required: true }
});

const flashcardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, maxLength: 255 },
    flashcards: [cardSchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
},
{
    timestamps: true
});

module.exports = mongoose.model('FlashcardSet', flashcardSchema);