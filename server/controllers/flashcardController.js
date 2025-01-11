const FlashcardSet = require('../models/FlashcardSet');

const addFlashcardSet = async (req, res) => {
    const {title, description, cards} = req.body;

    const userId = req.user.id;

    try {
        // Tworzymy nowy zestaw fiszek na podstawie otrzymanych danych
        const newFlashcardSet = new FlashcardSet({
            title,
            description,
            cards,
            userId
        });

        // Zapisujemy nowy zestaw w bazie danych
        await newFlashcardSet.save();

        res.status(201).json({message: 'Flashcard set created successfully', newFlashcardSet });
    } catch (error) {
        console.error('Error adding flashcard set:', error);  // Logujemy błąd na serwerze
        res.status(500).json({ message: 'Error adding flashcard set', error: error.message });  // Wysyłamy odpowiedź z błędem
    }
}

module.exports = { addFlashcardSet };