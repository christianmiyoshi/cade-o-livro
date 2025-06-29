"use client";

import { useBooks } from '../../context/BookContext';
import CollectionGrid from '../../components/CollectionGrid';
import CollectionFilter from '../../components/CollectionFilter';
import Pagination from '../../components/Pagination';
import BookGrid from '../../components/BookGrid';
import { useState, useEffect } from 'react';
import { Collection, CollectionFilter as FilterType } from '../../types';
import { ITEMS_PER_PAGE } from '../../constants';

export default function CollectionsPage() {
  const { collections, searchCollections, books } = useBooks();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedCollections, setDisplayedCollections] = useState<Collection[]>([]);

  // Atualizar coleções filtradas quando os filtros ou a busca mudarem
  useEffect(() => {
    const filtered = searchCollections(searchQuery, filter);
    setFilteredCollections(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1); // Voltar para a primeira página quando os filtros mudarem
  }, [filter, searchQuery, searchCollections]);

  // Atualizar coleções exibidas com base na página atual
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedCollections(filteredCollections.slice(startIndex, endIndex));
  }, [currentPage, filteredCollections]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Minhas Coleções</h1>

      <CollectionFilter 
        onFilterChange={setFilter} 
        onSearchChange={setSearchQuery}
        currentFilter={filter}
        currentSearch={searchQuery}
      />

      {filteredCollections.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-lg text-gray-600">Nenhuma coleção encontrada com os filtros atuais.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">{filteredCollections.length} coleções encontradas</p>
            <p className="text-gray-500">Página {currentPage} de {totalPages}</p>
          </div>

          <CollectionGrid collections={displayedCollections} />

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}

      {/* Seção de Livros Avulsos */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Livros Avulsos</h2>
        <BookGrid books={books.filter(book => !book.collectionId)} />
      </div>
    </div>
  );
}
