import Link from 'next/link';
import { Book } from '../types';
import StarRating from './StarRating';
import { useBooks } from '../context/BookContext';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { collectionId, volume } = book;
  const { getCollectionById } = useBooks();
  const collection = collectionId ? getCollectionById(collectionId) : undefined;

  // Calcular gradiente baseado no status e tipo do livro
  const gradientColors = book.status === 'owned'
    ? 'from-green-100 to-green-50'
    : 'from-amber-100 to-amber-50';

  const borderColor = book.status === 'owned' ? 'border-green-200' : 'border-amber-200';

  return (
    <Link href={`/books/${book.id}`} className="block h-full">
      <div className={`border ${borderColor} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-gradient-to-br ${gradientColors} group`}>
        <div className="p-4 flex flex-col h-full relative">
          {/* Indicador de status e tipo - mais compacto */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${book.status === 'owned' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              <span className="mr-1">{book.status === 'owned' ? '✓' : '○'}</span>
              {book.status === 'owned' ? 'Tenho' : 'Faltando'}
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
              {book.type === 'book' ? 'Livro' : 'Mangá'}
            </span>
          </div>

          {/* Informações do livro - parte principal */}
          <div className="mb-2">
            <h3 className="font-bold text-lg mb-0.5 group-hover:text-indigo-700 transition-colors line-clamp-2">{book.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-1">{book.author}</p>
          </div>

          {/* Informações de coleção se aplicável */}
          {collection && (
            <div className="mt-1 mb-2 px-3 py-2 bg-indigo-50 border border-indigo-100 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-indigo-800 truncate">{collection.name}</span>
                {volume && (
                  <span className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold flex-shrink-0">
                    Vol. {volume}/{collection.totalVolumes}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Avaliação se disponível */}
          {book.review && (
            <div className="mt-auto pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600 mr-1">Avaliação:</span>
                <StarRating rating={book.review.overall} size="sm" />
                <span className="text-xs text-gray-600 ml-1">({book.review.overall.toFixed(1)})</span>
              </div>
            </div>
          )}

          {/* Indicador visual discreto no canto */}
          <div className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] ${book.status === 'owned' ? 'border-t-green-200' : 'border-t-amber-200'} border-l-[40px] border-l-transparent`}></div>
        </div>
      </div>
    </Link>
  );
}
