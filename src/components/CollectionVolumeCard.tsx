import Link from 'next/link';
import { Book } from '../types';
import { useState } from 'react';
import StarRating from './StarRating';

interface CollectionVolumeCardProps {
  book: Book;
  updateStatus: (bookId: number, status: 'owned' | 'missing') => void;
}

export default function CollectionVolumeCard({ book, updateStatus }: CollectionVolumeCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleAddBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    updateStatus(book.id, 'owned');
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleRemoveBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);
    updateStatus(book.id, 'missing');
    setTimeout(() => setIsRemoving(false), 1000);
  };

  return (
    <div className="relative group h-full transition-all duration-300">
      <Link 
        href={`/books/${book.id}`} 
        className={`block border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-full
          ${book.status === 'owned' ? 'border-green-400 bg-white' : 'border-amber-400 bg-white'}`}
      >
        <div className="p-3 flex flex-col h-full relative">
          {/* Volume destacado */}
          <div className="flex justify-center mb-2">
            <div className="bg-indigo-600 text-white rounded-md px-3 py-1.5 inline-flex items-center justify-center w-full">
              <span className="text-lg font-bold">Volume {book.volume}</span>
            </div>
          </div>

          {/* Título do livro */}
          <h3 className="text-center text-sm font-medium mb-1 line-clamp-2 group-hover:text-indigo-700 transition-colors">
            {book.title}
          </h3>

          {/* Status badge */}
          <div className="flex justify-center mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.status === 'owned' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
              {book.status === 'owned' ? 'Tenho' : 'Faltando'}
            </span>
          </div>

          {/* Avaliação se disponível */}
          {book.review && (
            <div className="flex justify-center mt-auto pt-1">
              <div className="flex items-center gap-1">
                <StarRating rating={book.review.overall} size="sm" />
                <span className="text-xs text-gray-500">({book.review.overall.toFixed(1)})</span>
              </div>
            </div>
          )}

          {/* Marcador status */}
          <div className={`absolute top-0 left-0 w-2 h-full ${book.status === 'owned' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
        </div>
      </Link>

      {/* Add to collection button for missing books */}
      {book.status === 'missing' && (
        <>
          <button 
            onClick={handleAddBook}
            className={`absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white rounded-full w-7 h-7 shadow-md flex items-center justify-center transform transition-all ${isAdding ? 'scale-125 opacity-0' : 'opacity-90 hover:scale-110'}`}
            aria-label="Adicionar à coleção"
            title="Adicionar à coleção"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Success message when adding */}
          <div className={`absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${isAdding ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 transform transition-transform duration-300 border border-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Adicionado!</span>
            </div>
          </div>
        </>
      )}

      {/* Remove from collection button for owned books */}
      {book.status === 'owned' && (
        <>
          <button 
            onClick={handleRemoveBook}
            className={`absolute bottom-3 right-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full w-7 h-7 shadow-md flex items-center justify-center transform transition-all ${isRemoving ? 'scale-125 opacity-0' : 'opacity-0 group-hover:opacity-90 hover:scale-110'}`}
            aria-label="Marcar como faltante"
            title="Marcar como faltante"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          {/* Feedback message when removing */}
          <div className={`absolute inset-0 bg-amber-500 bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${isRemoving ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 transform transition-transform duration-300 border border-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-sm font-medium">Removido!</span>
            </div>
          </div>
        </>
      )}

      {/* Add to collection button for missing books */}
      {book.status === 'missing' && (
        <>
          <button 
            onClick={handleAddBook}
            className={`absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 shadow-md flex items-center justify-center transform transition-all ${isAdding ? 'scale-125 opacity-0' : 'opacity-90 hover:scale-110'}`}
            aria-label="Adicionar à coleção"
            title="Adicionar à coleção"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Success message when adding */}
          <div className={`absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${isAdding ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 transform transition-transform duration-300 border border-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Adicionado!</span>
            </div>
          </div>
        </>
      )}

      {/* Remove from collection button for owned books */}
      {book.status === 'owned' && (
        <>
          <button 
            onClick={handleRemoveBook}
            className={`absolute bottom-3 right-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full w-8 h-8 shadow-md flex items-center justify-center transform transition-all ${isRemoving ? 'scale-125 opacity-0' : 'opacity-0 group-hover:opacity-90 hover:scale-110'}`}
            aria-label="Marcar como faltante"
            title="Marcar como faltante"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          {/* Feedback message when removing */}
          <div className={`absolute inset-0 bg-amber-500 bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${isRemoving ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 transform transition-transform duration-300 border border-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-sm font-medium">Removido!</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
