import Link from 'next/link';
import { Book } from '../types';
import { useBooks } from '../context/BookContext';
import { useState } from 'react';
import StarRating from './StarRating';

interface BookCardSmallProps {
  book: Book;
}

export default function BookCardSmall({ book }: BookCardSmallProps) {
  const { getCollectionById, updateBookStatus } = useBooks();
  const collection = book.collectionId ? getCollectionById(book.collectionId) : undefined;
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleAddBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    updateBookStatus(book.id, 'owned');

    // Reset the adding state after animation
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleRemoveBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);
    updateBookStatus(book.id, 'missing');

    // Reset the removing state after animation
    setTimeout(() => setIsRemoving(false), 1000);
  };

  return (
    <div className="relative group h-full">
      <Link 
        href={`/books/${book.id}`} 
        className={`block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-full ${book.status === 'owned' ? 'border-green-200 bg-gradient-to-br from-green-100 to-green-50' : 'border-amber-200 bg-gradient-to-br from-amber-100 to-amber-50'}`}
      >
        <div className="p-3 flex flex-col h-full relative">
          {/* Título e autor na parte superior */}
          <div className="mb-1">
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-indigo-700 transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
          </div>

          {/* Informação de coleção se disponível */}
          {collection && (
            <div className="mt-1 mb-1 py-1 px-2 bg-indigo-50 border border-indigo-100 rounded text-xs">
              <div className="flex justify-between items-center">
                <span className="text-indigo-800 font-medium truncate">
                  {collection.name}
                </span>
                {book.volume && (
                  <span className="ml-1 bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                    {book.volume}/{collection.totalVolumes}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rodapé com status e avaliação */}
          <div className="mt-auto pt-1 flex items-center justify-between">
            <span className={`text-xs px-2 py-0.5 rounded-full ${book.status === 'owned' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              {book.status === 'owned' ? 'Tenho' : 'Faltando'}
            </span>

            {book.review && (
              <div className="flex items-center">
                <StarRating rating={book.review.overall} size="xs" />
                <span className="text-xs text-gray-500 ml-0.5">({book.review.overall.toFixed(1)})</span>
              </div>
            )}
          </div>

          {/* Marcador visual no canto */}
          <div className={`absolute top-0 right-0 w-0 h-0 border-t-[25px] ${book.status === 'owned' ? 'border-t-green-200' : 'border-t-amber-200'} border-l-[25px] border-l-transparent`}></div>
        </div>
      </Link>

    {/* Add to collection button for missing books */}
    {book.status === 'missing' && (
      <>
        <button 
          onClick={handleAddBook}
          className={`absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 shadow-md flex items-center justify-center transform transition-all ${isAdding ? 'scale-125 opacity-0' : 'opacity-0 group-hover:opacity-100 hover:scale-110'}`}
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
          className={`absolute bottom-3 right-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full w-8 h-8 shadow-md flex items-center justify-center transform transition-all ${isRemoving ? 'scale-125 opacity-0' : 'opacity-0 group-hover:opacity-100 hover:scale-110'}`}
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
