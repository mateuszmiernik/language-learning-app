import './App.css';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Flashcards from './components/Flashcards';
import AddEditFlashcard from './components/AddEditFlashcard';
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
        <Route path='/add-flashcard' element={<AddEditFlashcard />} />

        {/* Formularz edycji fiszek */}
        <Route path='/flashcards/:id/edit' element={<AddEditFlashcard />} />

        {/* Przeglądanie zestawu fiszek */}
        <Route path='flashcards/:id' element={<FlashcardViewer />} />

        {/* Formularz do przegladania */}
        <Route path='flashcards/:id/view' element={<AddEditFlashcard key='view' isViewMode={true}/>} />
      </Routes>
    </div>
  );
}

export default App;