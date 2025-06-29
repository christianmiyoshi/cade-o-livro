import Link from 'next/link';
import Image from 'next/image';
import { Book } from '../types';
import { useState } from 'react';
import { DEFAULT_BOOK_COVER } from '../constants';
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
        className={`block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-full 
          ${book.status === 'missing' ? 'opacity-85 grayscale-[15%] border-amber-100 bg-amber-50' : 'border-green-100'}`}
      >
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={book.coverUrl || DEFAULT_BOOK_COVER}
            alt={`Volume ${book.volume}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
            className={`object-cover ${book.status === 'missing' ? 'brightness-95 contrast-95' : ''}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_BOOK_COVER;
            }}
          />
          <div className={`absolute inset-0 flex items-center justify-center ${book.status === 'missing' ? 'bg-black/10 group-hover:bg-black/5' : 'bg-black/0 group-hover:bg-black/10'} transition-all`}></div>

          {book.status === 'missing' && (
            <div className="absolute top-0 right-0 bg-amber-500 text-white rounded-bl-lg px-2 py-1 text-xs font-medium shadow-md">
              Faltando
            </div>
          )}

          <div className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-tl-lg px-2 py-1 text-xs font-medium">
            Vol. {book.volume}
          </div>
        </div>

        <div className="p-2 text-center">
          <span className="font-semibold">Volume {book.volume}</span>
          {book.review && (
            <div className="flex justify-center mt-1">
              <StarRating rating={book.review.overall} size="sm" />
            </div>
          )}
        </div>
      </Link>

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
