const mongoose = require('mongoose');
const FlashcardSet = require('./models/FlashcardSet');

const migrateCardsToFlashcards = async () => {
    await mongoose.connect('mongodb://localhost:27017/language-learning-app');

    const flashcardSets = await FlashcardSet.find({});
    console.log(`Found ${flashcardSets.length} flashcard sets`);

    if (flashcardSets.length === 0) {
        console.log("No flashcard sets found. Check your database.");
        await mongoose.disconnect();
        return;
    }

    for (const set of flashcardSets) {
        console.log(`Migrating flashcard set with ID: ${set._id}`);

        // 🛠 Sprawdzamy, czy `cards` istnieje i jest tablicą
        let newFlashcards = [];
        if (Array.isArray(set.cards) && set.cards.length > 0) {
            newFlashcards = [...set.cards]; // Kopiujemy `cards`
        } 

        try {
            await FlashcardSet.updateOne(
                { _id: set._id }, 
                {
                    $set: { flashcards: newFlashcards },  // Ustawiamy poprawne `flashcards`
                    $unset: { cards: 1 } // ❌ Usuwamy `cards`
                }
            );

            console.log(`✅ Migration successful for ID: ${set._id}`);
        } catch (error) {
            console.error(`❌ Error migrating ID: ${set._id}`, error);
        }
    }

    console.log('Migration completed!');
    await mongoose.disconnect();
};

migrateCardsToFlashcards().catch(err => {
    console.error('Migration failed', err);
    mongoose.disconnect();
});
