"use client";

import { useState } from 'react';
import { CollectionFilter as FilterType } from '../types';

interface CollectionFilterProps {
  onFilterChange: (filter: FilterType) => void;
  onSearchChange: (query: string) => void;
  currentFilter: FilterType;
  currentSearch: string;
}

export default function CollectionFilter({ 
  onFilterChange, 
  onSearchChange, 
  currentFilter, 
  currentSearch 
}: CollectionFilterProps) {
  const [searchInput, setSearchInput] = useState(currentSearch);

  const handleFilterChange = (filter: FilterType) => {
    onFilterChange(filter);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-grow">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Buscar coleções..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1 rounded-md ${currentFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Todos
          </button>
          <button
            onClick={() => handleFilterChange('complete')}
            className={`px-3 py-1 rounded-md ${currentFilter === 'complete' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Completos
          </button>
          <button
            onClick={() => handleFilterChange('incomplete')}
            className={`px-3 py-1 rounded-md ${currentFilter === 'incomplete' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Incompletos
          </button>
          <button
            onClick={() => handleFilterChange('wanted')}
            className={`px-3 py-1 rounded-md ${currentFilter === 'wanted' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Desejados
          </button>
        </div>
      </div>
    </div>
  );
}
