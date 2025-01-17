const express = require('express');
const router = express.Router();
const { addFlashcardSet, getFlashcardSets, deleteFlascardSet } = require('../controllers/flashcardController'); 
const { protect } = require('../middleware/authMiddleware');

// Trasa POST: Dodawanie nowego zestawu fiszek
router.post('/', protect, addFlashcardSet);

// Trasa GET: Pobieranie zestawów fiszek użytkownika
router.get('/', protect, getFlashcardSets);

// Trasa DELETE: Usuwanie zestawu fiszek po ID
router.delete('/:id', protect, deleteFlascardSet);

module.exports = router;