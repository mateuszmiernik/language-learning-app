import './App.css';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Flashcards from './components/Flashcards';
import AddFlashcard from './components/AddEditFlashcard';
import FlashcardViewer from './components/FlashcardViewer';

function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
       <Routes>
        {/* Strona startowa - logowanie/rejestracja */}
        <Route path='/' element={<Auth />} />

        {/* Strona główna po zalogowaniu */}
        <Route path='/flashcards' element={<Flashcards />} />

        {/* Formularz dodawania nowych fiszek */}
        <Route path='/add-flashcard' element={<AddFlashcard />} />

        {/* Formularz edycji fiszek */}
        <Route path='/flashcards/:id/edit' element={<AddFlashcard />} />

        {/* Przeglądanie zestawu fiszek */}
        <Route path='flashcards/:id' element={<FlashcardViewer />} />
      </Routes>
    </div>
  );
}

export default App;