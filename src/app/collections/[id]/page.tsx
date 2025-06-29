"use client";

import { useBooks } from '../../../context/BookContext';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { DEFAULT_BOOK_COVER, DEFAULT_COLLECTION_COVER } from '../../../constants';
import StarRating from '../../../components/StarRating';
import CollectionVolumeCard from '../../../components/CollectionVolumeCard';

export default function CollectionPage({ params }: { params: { id: string } }) {
  const collectionId = parseInt(params.id);
  const { getCollectionById, getBooksInCollection, getOwnedBooksCountInCollection, updateBookStatus } = useBooks();
  const [activeTab, setActiveTab] = useState<'all' | 'owned'>('all');

  const collection = getCollectionById(collectionId);
  if (!collection) {
    notFound();
  }

  const allBooksInCollection = getBooksInCollection(collectionId);
  const ownedCount = getOwnedBooksCountInCollection(collectionId);
  const completionPercentage = Math.round((ownedCount / collection.totalVolumes) * 100);

  // Ordenar por volume
  allBooksInCollection.sort((a, b) => (a.volume || 0) - (b.volume || 0));

  // Filtrar livros com base na tab ativa
  const booksToDisplay = activeTab === 'all' 
    ? allBooksInCollection
    : allBooksInCollection.filter(book => book.status === 'owned');

  const handleStatusToggle = (bookId: number, currentStatus: 'owned' | 'missing') => {
    // Verificar se o livro está na visualização atual
    const book = allBooksInCollection.find(b => b.id === bookId);
    if (!book) return;

    // Alternar o status
    const newStatus = currentStatus === 'owned' ? 'missing' : 'owned';
    updateBookStatus(bookId, newStatus);

    // Atualizar os dados
    const updatedBooks = getBooksInCollection(collectionId);
    const updatedOwnedCount = getOwnedBooksCountInCollection(collectionId);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative aspect-[2/3] w-full max-w-xs mx-auto">
            <Image
              src={collection.coverUrl || DEFAULT_COLLECTION_COVER}
              alt={collection.name}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = DEFAULT_COLLECTION_COVER;
              }}
            />
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4 space-y-4">
          <div className="flex items-center gap-2">
            <Link href="/collections" className="text-indigo-600 hover:underline">← Voltar para coleções</Link>
          </div>

          <h1 className="text-3xl font-bold">{collection.name}</h1>
          <p className="text-xl text-gray-600">{collection.author}</p>

          {collection.averageRating && collection.averageRating > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={collection.averageRating} size="lg" />
              <span className="text-gray-500">({collection.averageRating.toFixed(1)})</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {collection.type === 'book' ? 'Livro' : 'Mangá'}
            </span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Status da Coleção</h2>

            <div className="flex justify-between items-center">
              <span>Progresso:</span>
              <span className="font-semibold">{ownedCount} de {collection.totalVolumes}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">{completionPercentage}% completo</span>
              <span className="text-indigo-600 font-medium">
                {collection.totalVolumes - ownedCount} volumes faltando
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('all')}
            >
              Todos os Volumes ({allBooksInCollection.length})
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'owned' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('owned')}
            >
              Tenho ({ownedCount})
            </button>
          </div>
          <p className="text-sm text-gray-500">Passe o mouse para ver opções</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {booksToDisplay.map((book) => (
            <CollectionVolumeCard 
              key={`${book.id}-${book.status}`} 
              book={book}
              updateStatus={handleStatusToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
