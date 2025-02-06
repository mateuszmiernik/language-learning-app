const FlashcardSet = require('../models/FlashcardSet');

const addFlashcardSet = async (req, res) => {
    const {title, description, flashcards} = req.body;

    const userId = req.user.id;

    console.log('flashcardController.js - Request body:', req.body);  // Sprawdź, czy dane są poprawne
    console.log('flashcardController.js - User ID:', userId);  // Sprawdź, czy użytkownik jest zalogowany

    try {
        // Tworzymy nowy zestaw fiszek na podstawie otrzymanych danych
        const newFlashcardSet = new FlashcardSet({
            title,
            description,
            flashcards,
            userId
        });

        // Zapisujemy nowy zestaw w bazie danych
        await newFlashcardSet.save();

        res.status(201).json({message: 'Flashcard set created successfully', newFlashcardSet });
    } catch (error) {
        console.error('Error adding flashcard set:', error);  // Logujemy błąd na serwerze
        res.status(500).json({ message: 'Error adding flashcard set', error: error.message });  // Wysyłamy odpowiedź z błędem
    }
};

const getFlashcardSets = async (req, res) => {
    const userId = req.user.id;

    try {
        // Pobieramy wszystkie zestawy należące do użytkownika
        const flashcardSets = await FlashcardSet.find({ userId });

        if (!flashcardSets || flashcardSets.length === 0) {
            return res.status(404).json({ message: 'No flashcard sets found '});
        }

        // Zwracamy zestawy fiszek w odpowiedzi
        res.status(200).json(flashcardSets);
    } catch (error) {
        console.error('Error getting flashcard sets:', error);  // Logujemy błąd
        res.status(500).json({ message: 'Error fetching flashcard sets', error: error.message });  // Odpowiedź z błędem
    }
};

const getFlashcardSetById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const flashcardSet = await FlashcardSet.findOne({ _id: id, userId });

        if (!flashcardSet) {
            return res.status(404).json({ message: 'Flashcard set not found or does not belong to the user' });
        }
        res.status(200).json(flashcardSet);
    } catch (error) {
        console.error('Error getting flashcard set:', error);
        res.status(500).json({ message: 'Error fetching flashcard set', error: error.message });
    }
};

const updateFlashcardSet = async (req, res) => {
    const { id } = req.params;
    const { title, description, flashcards } = req.body;
    const userId  = req.user.id;

    // console.log("Updating flashcard set...");
    // console.log("Received ID:", id);
    // console.log("Received userId:", userId);
    // console.log(req.body);

    try {
        const flashcardSet = await FlashcardSet.findOneAndUpdate(
            { _id: id, userId },
            { title, description, flashcards },
            { new: true, runValidators: true }
        );

        if (!flashcardSet) {
            return res.status(404).json({ message: 'Flashcard set not found or does not belong to the user' });
        }
        res.status(200).json(flashcardSet);
    } catch (error) {
        console.error('Error updating flashcard set:', error);
        res.status(500).json({ message: 'Error updating flashcard set', error: error.message });
    }

};

const deleteFlascardSet = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; 

    try {
        const flashcardSet = await FlashcardSet.findOne({ _id: id, userId});
        if (!flashcardSet) {
            return res.status(404).jsonn({ message: 'Flashcard set not found or does not belong to the user'});
        }

        // Usuwamy zestaw z bazy danych
        await FlashcardSet.findByIdAndDelete(id);

    } catch (error) {
        console.error('Error deleting flashcard set:', error);  // Logujemy błąd
        res.status(500).json({ message: 'Error deleting flashcard set', error: error.message });  // Odpowiedź z błędem
    }


};

module.exports = { addFlashcardSet, getFlashcardSets, getFlashcardSetById, updateFlashcardSet, deleteFlascardSet };