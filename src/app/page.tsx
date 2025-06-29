"use client";
"use client";

import { useBooks } from '../context/BookContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_BOOK_COVER, DEFAULT_COLLECTION_COVER } from '../constants';

export default function Dashboard() {
  const router = useRouter();
  const { books, collections, getOwnedBooksCountInCollection } = useBooks();
  const [latestReleases, setLatestReleases] = useState<any[]>([]);

  // Estatísticas
  const totalBooks = books.length;
  const ownedBooks = books.filter(book => book.status === 'owned').length;
  const missingBooks = totalBooks - ownedBooks;
  const ownedPercentage = Math.round((ownedBooks / totalBooks) * 100) || 0;

  const totalCollections = collections.length;
  const completedCollections = collections.filter(collection => {
    const ownedCount = getOwnedBooksCountInCollection(collection.id);
    return ownedCount === collection.totalVolumes;
  }).length;
  const incompleteCollections = totalCollections - completedCollections;
  const completedPercentage = Math.round((completedCollections / totalCollections) * 100) || 0;

  useEffect(() => {
    // Simular lançamentos recentes (normalmente viria de uma API)
    // Ordenando por data de adição fictícia (usando o ID como proxy)
    const recentReleases = books
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

    setLatestReleases(recentReleases);
  }, [books]);

  return (
    <div className="space-y-8">
      <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Bem-vindo ao Cadê Meu Livro</h1>
        <p>Seu sistema de gerenciamento de coleção de livros e mangás</p>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status de Livros */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Status dos Livros</h2>

          <div className="flex justify-between items-center">
            <span>Total de Livros:</span>
            <span className="font-bold">{totalBooks}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Tenho:</span>
            <span className="text-green-600 font-semibold">{ownedBooks}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Faltando:</span>
            <span className="text-amber-600 font-semibold">{missingBooks}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${ownedPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{ownedPercentage}% completo</span>
            <Link href="/books" className="text-indigo-600 hover:underline">Ver todos</Link>
          </div>
        </div>

        {/* Status de Coleções */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Status das Coleções</h2>

          <div className="flex justify-between items-center">
            <span>Total de Coleções:</span>
            <span className="font-bold">{totalCollections}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Completas:</span>
            <span className="text-green-600 font-semibold">{completedCollections}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Incompletas:</span>
            <span className="text-amber-600 font-semibold">{incompleteCollections}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{completedPercentage}% das coleções completas</span>
            <Link href="/collections" className="text-indigo-600 hover:underline">Ver todas</Link>
          </div>
        </div>
      </div>

      {/* Lançamentos Recentes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Lançamentos Recentes</h2>
          <Link href="/books" className="text-indigo-600 hover:underline text-sm">Ver todos</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {latestReleases.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="group">
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-[2/3] w-full">
                  <Image
                    src={book.coverUrl || DEFAULT_BOOK_COVER}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_BOOK_COVER;
                    }}
                  />
                </div>

                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>

                  <div className="mt-2 flex justify-between items-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${book.status === 'owned' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {book.status === 'owned' ? 'Tenho' : 'Faltando'}
                    </span>

                    {book.collectionId && (
                      <span className="text-xs text-indigo-600">
                        Vol. {book.volume}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {latestReleases.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum lançamento recente encontrado.</p>
            <Link 
              href="/add" 
              className="mt-2 inline-block text-indigo-600 hover:underline"
            >
              Adicionar novo livro
            </Link>
          </div>
        )}
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link href="/add" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md border-l-4 border-indigo-600 transition-shadow">
          <h3 className="font-semibold text-lg">Adicionar Novo Livro</h3>
          <p className="text-gray-600">Registre um novo livro ou mangá na sua coleção</p>
        </Link>

        <Link href="/collections" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md border-l-4 border-green-600 transition-shadow">
          <h3 className="font-semibold text-lg">Gerenciar Coleções</h3>
          <p className="text-gray-600">Veja suas coleções e acompanhe o progresso</p>
        </Link>

        <Link href="/books" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md border-l-4 border-amber-600 transition-shadow">
          <h3 className="font-semibold text-lg">Ver Todos os Livros</h3>
          <p className="text-gray-600">Explore sua biblioteca completa</p>
        </Link>
      </div>
    </div>
  );
}