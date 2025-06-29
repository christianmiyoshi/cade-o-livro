"use client";

import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddBookForm() {
  const router = useRouter();
  const { addBook, collections, canAddMoreBooks } = useBooks();
  const { user } = useAuth();
  const [showLimitError, setShowLimitError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverUrl: '',
    type: 'book',
    status: 'missing',
    collectionId: '',
    volume: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user can add more books (only matters if status is 'owned')
    if (formData.status === 'owned' && !canAddMoreBooks()) {
      setShowLimitError(true);
      return;
    }

    const newBook = {
      title: formData.title,
      author: formData.author,
      coverUrl: formData.coverUrl || 'https://via.placeholder.com/150',
      type: formData.type as 'book' | 'manga',
      status: formData.status as 'owned' | 'missing'
    };

    // Adicionar informações de coleção se fornecidas
    if (formData.collectionId) {
      Object.assign(newBook, {
        collectionId: parseInt(formData.collectionId),
        volume: formData.volume ? parseInt(formData.volume) : undefined
      });
    }

    const success = addBook(newBook);

    if (!success) {
      setShowLimitError(true);
      return;
    }

    // Redirecionar para a página apropriada
    if (formData.collectionId) {
      router.push(`/collection/${formData.collectionId}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Adicionar Novo Item</h2>

      {showLimitError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-1">Limite de conta atingido</h3>
          <p className="mb-3">Você atingiu o limite de 50 livros do plano gratuito.</p>
          <Link 
            href="/profile"
            className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Fazer upgrade para o plano Premium
          </Link>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Autor</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="coverUrl" className="block text-gray-700 font-medium mb-2">URL da Capa</label>
        <input
          type="url"
          id="coverUrl"
          name="coverUrl"
          value={formData.coverUrl}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Tipo</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="book">Livro</option>
            <option value="manga">Mangá</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="owned">Tenho</option>
            <option value="missing">Faltando</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="collectionId" className="block text-gray-700 font-medium mb-2">Coleção (opcional)</label>
          <select
            id="collectionId"
            name="collectionId"
            value={formData.collectionId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Nenhuma (Livro Avulso)</option>
            {collections.map(collection => (
              <option key={collection.id} value={collection.id.toString()}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="volume" className="block text-gray-700 font-medium mb-2">Volume (opcional)</label>
          <input
            type="number"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            placeholder="Ex: 1"
            disabled={!formData.collectionId}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
      >
        Adicionar à Coleção
      </button>
    </form>
  );
}
