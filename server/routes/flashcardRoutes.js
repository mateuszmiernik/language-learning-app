const express = require('express');
const router = express.Router();
const { addFlashcardSet, getFlashcardSets, getFlashcardSetById, updateFlashcardSet, deleteFlascardSet } = require('../controllers/flashcardController'); 
const { protect } = require('../middleware/authMiddleware');

// Trasa POST: Dodawanie nowego zestawu fiszek
router.post('/', protect, addFlashcardSet);

// Trasa GET: Pobieranie zestawów fiszek użytkownika
router.get('/', protect, getFlashcardSets);

// Trasa GET: Pobieranie zestawu fiszek po ID
router.get('/:id', protect, getFlashcardSetById);

// Trasa PUT: Aktualizacja zestawu fiszek po ID
router.put('/:id', protect, updateFlashcardSet);

// Trasa DELETE: Usuwanie zestawu fiszek po ID
router.delete('/:id', protect, deleteFlascardSet);

module.exports = router;