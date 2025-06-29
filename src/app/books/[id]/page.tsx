"use client";

import { useBooks } from '../../../context/BookContext';
import { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_BOOK_COVER } from '../../../constants';
import StarRating from '../../../components/StarRating';
import ReviewForm from '../../../components/ReviewForm';

  export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const bookId = parseInt(resolvedParams.id);
  const { books, addReviewToBook, getCollectionById, updateBookStatus } = useBooks();
  const [isReviewing, setIsReviewing] = useState(false);
  const router = useRouter();

  const book = books.find(b => b.id === bookId);
  if (!book) {
    notFound();
  }

  const collection = book.collectionId ? getCollectionById(book.collectionId) : undefined;

  const handleSubmitReview = (review: any) => {
    addReviewToBook(bookId, review);
    setIsReviewing(false);
  };

  const toggleStatus = () => {
    updateBookStatus(bookId, book.status === 'owned' ? 'missing' : 'owned');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative aspect-[2/3] w-full max-w-xs mx-auto">
            <Image
              src={book.coverUrl || DEFAULT_BOOK_COVER}
              alt={book.title}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = DEFAULT_BOOK_COVER;
              }}
            />
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4 space-y-4">
          <div className="flex items-center gap-2">
            {collection ? (
              <Link href={`/collections/${collection.id}`} className="text-indigo-600 hover:underline">← Voltar para {collection.name}</Link>
            ) : (
              <Link href="/books" className="text-indigo-600 hover:underline">← Voltar para livros</Link>
            )}
          </div>

          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-xl text-gray-600">{book.author}</p>

          {book.review && (
            <div className="flex items-center gap-2">
              <StarRating rating={book.review.overall} size="lg" />
              <span className="text-gray-500">({book.review.overall.toFixed(1)})</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {book.type === 'book' ? 'Livro' : 'Mangá'}
            </span>

            {collection && book.volume && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                Volume {book.volume}
              </span>
            )}

            <span 
              className={`px-3 py-1 rounded-full text-sm cursor-pointer ${book.status === 'owned' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}
              onClick={toggleStatus}
            >
              {book.status === 'owned' ? 'Tenho' : 'Faltando'}
            </span>
          </div>

          {collection && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="font-medium">Parte da coleção:</p>
              <Link href={`/collections/${collection.id}`} className="text-indigo-600 hover:underline">
                {collection.name} ({book.volume} de {collection.totalVolumes})
              </Link>
            </div>
          )}

          <div className="mt-6">
            {!isReviewing && !book.review && (
              <button
                onClick={() => setIsReviewing(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Avaliar Livro
              </button>
            )}

            {!isReviewing && book.review && (
              <button
                onClick={() => setIsReviewing(true)}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors"
              >
                Editar Avaliação
              </button>
            )}
          </div>
        </div>
      </div>

      {isReviewing && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ReviewForm 
            bookType={book.type} 
            initialReview={book.review} 
            onSubmit={handleSubmitReview} 
          />
        </div>
      )}

      {book.review && !isReviewing && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sua Avaliação</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Avaliação Geral:</span>
                <StarRating rating={book.review.overall} size="lg" />
              </div>

              <div className="flex justify-between items-center">
                <span>Papel:</span>
                <StarRating rating={book.review.paper} />
              </div>

              <div className="flex justify-between items-center">
                <span>Impressão:</span>
                <StarRating rating={book.review.print} />
              </div>

              <div className="flex justify-between items-center">
                <span>Encadernação:</span>
                <StarRating rating={book.review.binding} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Capa:</span>
                <StarRating rating={book.review.cover} />
              </div>

              {book.type === 'book' && book.review.translation !== undefined && (
                <div className="flex justify-between items-center">
                  <span>Tradução:</span>
                  <StarRating rating={book.review.translation} />
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Diagramação:</span>
                <StarRating rating={book.review.layout} />
              </div>

              <div className="flex justify-between items-center">
                <span>Durabilidade:</span>
                <StarRating rating={book.review.durability} />
              </div>
            </div>
          </div>

          {book.review.comment && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Comentários:</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded">{book.review.comment}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
