"use client";

import { useBooks } from '../../../context/BookContext';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import StarRating from '../../../components/StarRating';
import CollectionVolumeCard from '../../../components/CollectionVolumeCard';

export default function CollectionPage({ params }: { params: { id: string } }) {
  const collectionId = parseInt(params.id);
  const { getCollectionById, getBooksInCollection, getOwnedBooksCountInCollection, updateBookStatus } = useBooks();
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'missing'>('all');
  const [refreshKey, setRefreshKey] = useState(0);

  // Usar refreshKey para garantir que os dados serão atualizados
  const collection = getCollectionById(collectionId);
  if (!collection) {
    notFound();
  }

  // refreshKey é usado como dependência para forçar recálculo
  const allBooksInCollection = getBooksInCollection(collectionId);
  const ownedCount = getOwnedBooksCountInCollection(collectionId);
  const completionPercentage = Math.round((ownedCount / collection.totalVolumes) * 100);

  // Ordenar por volume
  allBooksInCollection.sort((a, b) => (a.volume || 0) - (b.volume || 0));

  // Filtrar livros com base na tab ativa
  const booksToDisplay = activeTab === 'all' 
    ? allBooksInCollection
    : allBooksInCollection.filter(book => book.status === (activeTab === 'owned' ? 'owned' : 'missing'));

  const handleStatusToggle = (bookId: number, currentStatus: 'owned' | 'missing') => {
    // Alternar o status
    const newStatus = currentStatus === 'owned' ? 'missing' : 'owned';
    updateBookStatus(bookId, newStatus);

    // Forçar re-renderização
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="w-full max-w-xs mx-auto rounded-lg shadow-lg overflow-hidden">
            <div className="bg-indigo-50 border border-indigo-200 p-5 flex flex-col">
              <div className="text-center mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm inline-block">
                  {collection.type === 'book' ? 'Coleção de Livros' : 'Coleção de Mangá'}
                </span>
              </div>

              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{collection.name}</h2>
                <p className="text-gray-600 mt-1">{collection.author}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Progresso:</span>
                  <span className="font-semibold">{ownedCount} de {collection.totalVolumes}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{completionPercentage}% completo</span>
                  <span>{collection.totalVolumes - ownedCount} volumes faltando</span>
                </div>
              </div>

              {collection.averageRating && collection.averageRating > 0 && (
                <div className="flex justify-center items-center gap-2 mb-4">
                  <StarRating rating={collection.averageRating} size="lg" />
                  <span className="text-gray-500">({collection.averageRating.toFixed(1)})</span>
                </div>
              )}

              <Link 
                href="/add" 
                className="mt-auto py-2 px-4 bg-indigo-100 text-indigo-700 rounded-md text-center hover:bg-indigo-200 transition-colors"
              >
                Adicionar novo volume
              </Link>
            </div>
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

      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex border-b w-full">
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
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'missing' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('missing')}
            >
              Faltantes ({collection.totalVolumes - ownedCount})
            </button>
            <div className="flex-grow border-b"></div>
            <div className="flex items-center">
              <p className="text-sm text-gray-500 px-4">Passe o mouse para ver opções</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {booksToDisplay.map((book) => (
            <div key={`${book.id}-${book.status}-${refreshKey}`}>
              <CollectionVolumeCard 
                book={book}
                updateStatus={handleStatusToggle}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
