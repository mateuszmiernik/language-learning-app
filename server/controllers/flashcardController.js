const FlashcardSet = require('../models/FlashcardSet');

const addFlashcardSet = async (req, res) => {
    const {title, description, cards} = req.body;

    const userId = req.user.id;

    console.log('Request body:', req.body);  // Sprawdź, czy dane są poprawne
    console.log('User ID:', userId);  // Sprawdź, czy użytkownik jest zalogowany

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
}

const deleteFlascardSet = async (req, res) => {
    const { id } = req.params; // ID zestawu z parametrów URL
    const userId = req.user.id; // ID zalogowanego użytkownika

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


}

module.exports = { addFlashcardSet, getFlashcardSets, deleteFlascardSet };