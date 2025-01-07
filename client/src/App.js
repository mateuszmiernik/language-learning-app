import './App.css';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Flashcards from './components/Flashcards';
import AddFlashcard from './components/AddFlashcard';

function App() {
  return (
      <Routes>
        {/* Strona startowa - logowanie/rejestracja */}
        <Route path='/' element={<Auth />} />

        {/* Strona główna po zalogowaniu */}
        <Route path='/flashcards' element={<Flashcards />} />

        {/* Formularz dodawania nowych fiszek */}
        <Route path='/add-flashcard' element={<AddFlashcard />} />
      </Routes>
  );
}

export default App;