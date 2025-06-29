"use client";

import { useBooks } from '../../context/BookContext';
import BookGrid from '../../components/BookGrid';
import Link from 'next/link';
import { useState } from 'react';

export default function MissingPage() {
  const { filterBooks, collections, getCollectionById, updateBookStatus } = useBooks();
  const [editMode, setEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const missingBooks = filterBooks('missing');

  // Agrupar livros faltantes por coleção
  const missingByCollection = missingBooks.reduce((acc, book) => {
    if (book.collectionId) {
      if (!acc[book.collectionId]) {
        acc[book.collectionId] = [];
      }
      acc[book.collectionId].push(book);
    }
    return acc;
  }, {} as Record<number, typeof missingBooks>);

  // Livros faltantes que não pertencem a uma coleção
  const standaloneMissingBooks = missingBooks.filter(book => !book.collectionId);

  // Função para alternar a seleção de um livro
  const toggleSelection = (bookId: number) => {
    if (editMode) {
      setSelectedBooks(prev => {
        if (prev.includes(bookId)) {
          return prev.filter(id => id !== bookId);
        } else {
          return [...prev, bookId];
        }
      });
    }
  };

  // Função para salvar as alterações ao sair do modo de edição
  const saveChanges = () => {
    // Atualizar o status de todos os livros selecionados para 'owned'
    selectedBooks.forEach(bookId => {
      updateBookStatus(bookId, 'owned');
    });
    setSelectedBooks([]);
    setEditMode(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Itens Faltando</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-500">{missingBooks.length} itens</p>
          <button 
            onClick={() => editMode ? saveChanges() : setEditMode(true)}
            className={`px-4 py-2 rounded-md text-white font-medium ${editMode ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
          >
            {editMode ? 'Salvar' : 'Editar'}
          </button>
        </div>
      </div>

      {editMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <span className="font-bold">Modo de edição ativo:</span> Clique nas capas dos volumes faltantes para selecioná-los. Os itens selecionados ficarão muito mais claros. Clique em "Salvar" quando terminar para marcar todos os itens selecionados como adquiridos.
          </p>
          {selectedBooks.length > 0 && (
            <p className="text-green-700 mt-2 font-medium">
              {selectedBooks.length} {selectedBooks.length === 1 ? 'item selecionado' : 'itens selecionados'}
            </p>
          )}
        </div>
      )}

      {/* Todos os livros faltantes (incluindo avulsos e de coleções) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Todos os Volumes Faltando</h2>
          <span className="text-amber-600 font-medium">{missingBooks.length} itens faltando</span>
        </div>

        {/* Volumes organizados por coleção */}
        {Object.entries(missingByCollection).map(([collectionId, books]) => {
          const collection = getCollectionById(parseInt(collectionId));
          if (!collection) return null;

          return (
            <div key={collectionId} className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <Link href={`/collection/${collectionId}`} className="text-lg font-semibold hover:text-indigo-600 hover:underline">
                  {collection.name} ({books.length} de {collection.totalVolumes} volumes)
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {books.map(book => (
                  <div key={book.id} 
                    className={`border rounded-lg overflow-hidden shadow-sm ${editMode ? 'cursor-pointer' : 'hover:shadow-md'} transition-all
                      ${selectedBooks.includes(book.id) ? 'border-green-400 shadow-md' : 'hover:border-green-200'}
                      ${editMode ? 'hover:shadow-md' : ''}
                      ${selectedBooks.includes(book.id) ? 'brightness-125' : ''}`}
                    onClick={() => editMode && toggleSelection(book.id)}
                    style={{
                      opacity: selectedBooks.includes(book.id) ? 0.35 : 0.9,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className="relative">
                      <div className="aspect-[2/3] relative">
                        <img 
                          src={collection.coverUrl || '/placeholder-cover.jpg'} 
                          alt={`${collection.name} - Volume ${book.volume}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute top-0 right-0 bg-amber-500 text-white rounded-bl-lg px-2 py-1 text-sm font-bold">
                        Vol. {book.volume}
                      </div>
                      {editMode && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {selectedBooks.includes(book.id) ? 'Remover' : 'Selecionar'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2 text-center">
                      <h3 className="text-sm font-medium truncate">{collection.name} Vol. {book.volume}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Livros avulsos faltantes */}
        {standaloneMissingBooks.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Livros Avulsos</h3>
              <span className="text-amber-600 font-medium">{standaloneMissingBooks.length} itens</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {standaloneMissingBooks.map((book) => (
                <div key={book.id} 
                  className={`border rounded-lg overflow-hidden shadow-sm ${editMode ? 'cursor-pointer' : 'hover:shadow-md'} transition-all
                    ${selectedBooks.includes(book.id) ? 'border-green-400 shadow-md' : 'hover:border-green-200'}
                    ${editMode ? 'hover:shadow-md' : ''}
                    ${selectedBooks.includes(book.id) ? 'brightness-125' : ''}`}
                  onClick={() => editMode && toggleSelection(book.id)}
                  style={{
                    opacity: selectedBooks.includes(book.id) ? 0.35 : 0.9,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="relative">
                    <div className="aspect-[2/3] relative">
                      <img 
                        src={book.coverUrl || '/placeholder-cover.jpg'} 
                        alt={book.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {editMode && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {selectedBooks.includes(book.id) ? 'Remover' : 'Selecionar'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="text-sm font-medium truncate">{book.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mensagem se não houver itens faltando */}
      {missingBooks.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-lg">Parabéns! Você não tem itens faltando na sua coleção.</p>
          <Link 
            href="/add" 
            className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Adicionar Novo Item
          </Link>
        </div>
      )}
    </div>
  );
}
