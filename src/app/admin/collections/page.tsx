"use client";

import { useAuth } from '../../../context/AuthContext';
import { useBooks } from '../../../context/BookContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_COLLECTION_COVER } from '../../../constants';

export default function AdminCollectionsPage() {
  const { user } = useAuth();
  const { standardCollections, addStandardCollection } = useBooks();
  const router = useRouter();
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCollection, setNewCollection] = useState({
    name: '',
    author: '',
    coverUrl: '',
    type: 'book',
    totalVolumes: ''
  });

  // Redirecionar usuários não-admin
  useEffect(() => {
    if (!user.isAdmin) {
      router.push('/');
    }
  }, [user, router]);

  if (!user.isAdmin) {
    return null; // Não renderizar nada enquanto redireciona
  }

  const filteredCollections = searchQuery.trim() 
    ? standardCollections.filter(collection => 
        collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : standardCollections;

  const handleAddCollection = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCollection.totalVolumes) {
      alert('Por favor, informe a quantidade total de volumes.');
      return;
    }

    addStandardCollection({
      name: newCollection.name,
      author: newCollection.author,
      coverUrl: newCollection.coverUrl || DEFAULT_COLLECTION_COVER,
      type: newCollection.type as 'book' | 'manga',
      totalVolumes: parseInt(newCollection.totalVolumes)
    });

    // Resetar formulário
    setNewCollection({
      name: '',
      author: '',
      coverUrl: '',
      type: 'book',
      totalVolumes: ''
    });

    setIsAddingCollection(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCollection(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/admin" className="text-indigo-600 hover:underline mb-2 inline-block">← Voltar ao Painel</Link>
          <h1 className="text-3xl font-bold">Gerenciar Coleções Padrão</h1>
        </div>

        <button
          onClick={() => setIsAddingCollection(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Adicionar Coleção
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar coleções..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isAddingCollection && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Adicionar Nova Coleção</h2>
            <button 
              onClick={() => setIsAddingCollection(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleAddCollection}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Coleção
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={newCollection.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Autor
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  value={newCollection.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="coverUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Capa
                </label>
                <input
                  type="text"
                  id="coverUrl"
                  name="coverUrl"
                  value={newCollection.coverUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={newCollection.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="book">Livro</option>
                    <option value="manga">Mangá</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="totalVolumes" className="block text-sm font-medium text-gray-700 mb-1">
                    Total de Volumes
                  </label>
                  <input
                    type="number"
                    id="totalVolumes"
                    name="totalVolumes"
                    required
                    min="1"
                    value={newCollection.totalVolumes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAddingCollection(false)}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coleção
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Autor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volumes
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCollections.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Nenhuma coleção encontrada
                </td>
              </tr>
            ) : (
              filteredCollections.map((collection) => (
                <tr key={collection.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={collection.coverUrl || DEFAULT_COLLECTION_COVER}
                          alt={collection.name}
                          fill
                          className="object-cover rounded"
                          sizes="40px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = DEFAULT_COLLECTION_COVER;
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {collection.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{collection.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {collection.type === 'book' ? 'Livro' : 'Mangá'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {collection.totalVolumes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
