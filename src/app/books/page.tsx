"use client";

import { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import BookCardSmall from '../../components/BookCardSmall';
import Pagination from '../../components/Pagination';
import { Book } from '../../types';
import { ITEMS_PER_PAGE } from '../../constants';

export default function BooksPage() {
  const { books, updateBookStatus: contextUpdateBookStatus } = useBooks();

  // Override updateBookStatus to ensure UI refresh
  const updateBookStatus = (bookId: number, status: 'owned' | 'missing') => {
    contextUpdateBookStatus(bookId, status);
    // Force a refresh of filtered books
    setFilteredBooks([...filtered]);
  };
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'owned' | 'missing'>('all');
  const [sortOption, setSortOption] = useState<'collection' | 'title' | 'date'>('collection');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);

  // Atualizar livros filtrados quando a busca, filtro de status ou opção de ordenação mudar
  useEffect(() => {
    let filtered = [...books];

    // Aplicar busca textual
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(book => 
        (book.title?.toLowerCase().includes(searchTerm) ||
        book.author?.toLowerCase().includes(searchTerm))
      );
    }

    // Aplicar filtro de status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(book => book.status === statusFilter);
    }

    // Aplicar ordenação com base na opção selecionada
    switch (sortOption) {
      case 'title':
        // Ordenar alfabeticamente por título
        filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;

      case 'date':
        // Ordenar por data de lançamento (usando ID como proxy inverso - IDs maiores são mais recentes)
        filtered.sort((a, b) => b.id - a.id);
        break;

      case 'collection':
      default:
        // Ordenação padrão por coleção e volume
        filtered.sort((a, b) => {
          // Ordenar primeiramente por coleção
          if (a.collectionId !== b.collectionId) {
            if (a.collectionId && !b.collectionId) return -1;
            if (!a.collectionId && b.collectionId) return 1;
            if (a.collectionId && b.collectionId) {
              return a.collectionId - b.collectionId;
            }
          }

          // Se mesma coleção, ordenar por volume
          if (a.collectionId && b.collectionId && a.collectionId === b.collectionId) {
            return (a.volume || 0) - (b.volume || 0);
          }

          // Caso contrário, ordenar por título
          return (a.title || '').localeCompare(b.title || '');
        });
        break;
    }

    setFilteredBooks(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1); // Voltar para a primeira página quando a busca, filtro ou ordenação mudar
  }, [books, searchQuery, statusFilter, sortOption]);

  // Atualizar livros exibidos com base na página atual
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
  }, [currentPage, filteredBooks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Todos os Livros</h1>

      {/* Barra de busca e filtros */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          {/* Filtro de status */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${statusFilter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter('owned')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${statusFilter === 'owned' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
            >
              Tenho
            </button>
            <button
              onClick={() => setStatusFilter('missing')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${statusFilter === 'missing' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'}`}
            >
              Faltando
            </button>
          </div>

          {/* Opções de ordenação */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Ordenar por:</label>
            <div className="flex bg-gray-100 rounded-md">
              <button
                onClick={() => setSortOption('collection')}
                className={`px-3 py-1 rounded-l-md text-sm font-medium flex items-center gap-1 ${sortOption === 'collection' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Coleção</span>
              </button>
              <button
                onClick={() => setSortOption('title')}
                className={`px-3 py-1 text-sm font-medium flex items-center gap-1 ${sortOption === 'title' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span>Alfabética</span>
              </button>
              <button
                onClick={() => setSortOption('date')}
                className={`px-3 py-1 rounded-r-md text-sm font-medium flex items-center gap-1 ${sortOption === 'date' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Lançamento</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contagem de resultados e paginação */}
      {filteredBooks.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500">
            {filteredBooks.length} livros encontrados
            <span className="text-xs ml-2">
              (Exibindo {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredBooks.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredBooks.length)})
            </span>
          </p>
          <p className="text-gray-500">Página {currentPage} de {totalPages}</p>
        </div>
      )}

      {/* Information about the + and - buttons - only shown for specific filters */}
      {filteredBooks.length > 0 && statusFilter !== 'all' && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
          <p className="text-blue-800 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {statusFilter === 'missing' ? (
              <span>Passe o mouse sobre os livros faltantes e clique no botão <span className="inline-flex items-center justify-center bg-green-500 text-white rounded-full w-4 h-4 mx-1 text-xs font-bold">+</span> para adicioná-los à sua coleção.</span>
            ) : (
              <span>Passe o mouse sobre os livros que você possui e clique no botão <span className="inline-flex items-center justify-center bg-amber-500 text-white rounded-full w-4 h-4 mx-1 text-xs font-bold">−</span> para marcá-los como faltantes.</span>
            )}
          </p>
        </div>
      )}

      {/* Grid de livros */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-lg text-gray-600">Nenhum livro encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayedBooks.map((book) => (
            <BookCardSmall 
              key={book.id} 
              book={book} 
            />
          ))}
        </div>
      )}

      {/* Paginação */}
      {filteredBooks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
