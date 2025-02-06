import { useParams, Link } from 'react-router-dom';

const FlashcardViewer = () => {
    const { id } = useParams();
    console.log("Flashcard ID:", id); // Debugowanie

    return (
        <div>
            <h1>Flashcard Set</h1>
            <div className="">
                <p>Term: </p>
                <p>Definition: </p>
            </div>
            <Link to={`/flashcards/${id}/edit`} className='btn btn-primary'>
                EDIT
            </Link>
        </div>
    )
}

export default FlashcardViewer;