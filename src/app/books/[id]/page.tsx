"use client";

import { useBooks } from '../../../context/BookContext';
import { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
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
          <div className="w-full max-w-xs mx-auto rounded-lg shadow-lg overflow-hidden">
            <div className={`h-full ${book.status === 'owned' ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'} border p-5 flex flex-col`}>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {book.type === 'book' ? 'Livro' : 'Mangá'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${book.status === 'owned' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {book.status === 'owned' ? 'Tenho' : 'Faltando'}
                </span>
              </div>

              {book.volume && (
                <div className="mb-4 text-center">
                  <span className="text-2xl font-bold px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg inline-block">
                    Volume {book.volume}
                  </span>
                </div>
              )}

              {collection && (
                <div className="mb-4 p-3 bg-indigo-50 rounded-lg text-center border border-indigo-100">
                  <p className="text-sm font-medium text-indigo-800">Parte da coleção:</p>
                  <p className="font-medium">{collection.name}</p>
                </div>
              )}

              {book.review && (
                <div className="flex justify-center mt-4 mb-2">
                  <div className="flex items-center gap-2">
                    <StarRating rating={book.review.overall} size="lg" />
                    <span className="text-gray-500">({book.review.overall.toFixed(1)})</span>
                  </div>
                </div>
              )}

              <button
                onClick={toggleStatus}
                className={`mt-auto py-2 px-4 rounded-md w-full ${book.status === 'owned' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-green-100 text-green-800 hover:bg-green-200'} transition-colors`}
              >
                {book.status === 'owned' ? 'Marcar como faltante' : 'Adicionar à coleção'}
              </button>
            </div>
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
