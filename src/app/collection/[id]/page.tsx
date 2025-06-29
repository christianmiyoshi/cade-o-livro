"use client";

import { useBooks } from '../../../context/BookContext';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, use } from 'react';
import BookCardCollection from '../../../components/BookCardCollection';

  export default function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const collectionId = parseInt(resolvedParams.id);
  const { getCollectionById, getBooksInCollection, getOwnedBooksCountInCollection, updateBookStatus } = useBooks();

  const collection = getCollectionById(collectionId);
  if (!collection) {
    notFound();
  }

  const allBooksInCollection = getBooksInCollection(collectionId);
  const ownedCount = getOwnedBooksCountInCollection(collectionId);
  const completionPercentage = Math.round((ownedCount / collection.totalVolumes) * 100);

  // Ordenar por volume
  allBooksInCollection.sort((a, b) => (a.volume || 0) - (b.volume || 0));

  // Filtrar livros por status
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'missing'>('all');

  const booksInCollection = allBooksInCollection.filter(book => {
    if (activeTab === 'all') return true;
    return book.status === activeTab;
  });


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative aspect-[2/3] w-full max-w-xs mx-auto">
            <Image
              src={collection.coverUrl}
              alt={collection.name}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4 space-y-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-indigo-600 hover:underline">Voltar para coleções</Link>
          </div>

          <h1 className="text-3xl font-bold">{collection.name}</h1>
          <p className="text-xl text-gray-600">{collection.author}</p>

          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {collection.type === 'book' ? 'Livro' : 'Mangá'}
            </span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Status da Coleção</h2>
            </div>

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

              <div className="bg-white p-6 rounded-lg shadow-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Volumes</h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600 hover:text-indigo-700'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setActiveTab('owned')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'owned' ? 'bg-white shadow-sm text-green-700' : 'text-gray-600 hover:text-green-700'}`}
              >
                Tenho
              </button>
              <button
                onClick={() => setActiveTab('missing')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'missing' ? 'bg-white shadow-sm text-amber-700' : 'text-gray-600 hover:text-amber-700'}`}
              >
                Faltando
              </button>
            </div>
          </div>
        </div>

        {/* Status counts */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-500">
              {booksInCollection.length} volumes {activeTab !== 'all' ? 'filtrados' : ''}
            </span>
            {activeTab === 'all' && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {ownedCount} adquiridos
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  {collection.totalVolumes - ownedCount} faltando
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">Passe o mouse para ver opções</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {booksInCollection.map((book) => (
            <BookCardCollection 
              key={book.id} 
              book={book}
              collectionCoverUrl={collection.coverUrl} 
            />
          ))}
        </div>

        {/* Mensagem se não houver volumes com o filtro selecionado */}
        {booksInCollection.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-6 text-center my-6">
            <p className="text-gray-600">
              {activeTab === 'owned' ? 'Você ainda não possui nenhum volume desta coleção.' : 
               activeTab === 'missing' ? 'Parabéns! Você possui todos os volumes desta coleção.' : 
               'Não há volumes para mostrar.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
