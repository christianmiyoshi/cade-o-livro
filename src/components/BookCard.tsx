import Image from 'next/image';
import Link from 'next/link';
import { Book } from '../types';
import { DEFAULT_BOOK_COVER } from '../constants';
import StarRating from './StarRating';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image 
          src={book.coverUrl || DEFAULT_BOOK_COVER} 
          alt={`Capa de ${book.title}`} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority={false}
          onError={(e) => {
            // Fallback para imagem padrão se a URL falhar
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_BOOK_COVER;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>

        {book.review && (
          <div className="mb-2">
            <StarRating rating={book.review.overall} />
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 capitalize">{book.type}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${book.status === 'owned' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {book.status === 'owned' ? 'Tenho' : 'Faltando'}
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}
