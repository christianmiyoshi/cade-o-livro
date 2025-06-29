"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

import { useBooks } from '../context/BookContext';
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Se o usuário não estiver autenticado, redirecionar para a landing page
    if (!user.isAuthenticated) {
      router.push('/landing');
    }
  }, [user.isAuthenticated, router]);

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
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="mr-4 p-3 bg-white/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Bem-vindo ao Cadê Meu Livro?</h1>
            <p className="text-indigo-100">Seu sistema de gerenciamento de coleção de livros e mangás</p>
          </div>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status de Livros */}
        <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 bg-green-100 rounded-full opacity-50"></div>

          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Status dos Livros</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold">{totalBooks}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Tenho</p>
                <p className="text-2xl font-bold text-green-600">{ownedBooks}</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Faltando</p>
                <p className="text-2xl font-bold text-amber-600">{missingBooks}</p>
              </div>
            </div>

            <div className="relative pt-1 mb-2">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Progresso
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {ownedPercentage}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${ownedPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="text-right">
              <Link href="/books" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                <span>Ver todos os livros</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Status de Coleções */}
        <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 bg-indigo-100 rounded-full opacity-50"></div>

          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Status das Coleções</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold">{totalCollections}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Completas</p>
                <p className="text-2xl font-bold text-green-600">{completedCollections}</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Incompletas</p>
                <p className="text-2xl font-bold text-amber-600">{incompleteCollections}</p>
              </div>
            </div>

            <div className="relative pt-1 mb-2">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                    Coleções Completas
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {completedPercentage}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${completedPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="text-right">
              <Link href="/collections" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                <span>Ver todas as coleções</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lançamentos Recentes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Lançamentos Recentes</h2>
          <Link href="/books" className="text-indigo-600 hover:underline text-sm">Ver todos</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {latestReleases.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
                              <div className={`border-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all h-full
                ${book.status === 'owned' ? 'border-green-400' : 'border-amber-400'}`}>
                <div className="h-full bg-gradient-to-br from-white to-gray-50 group">
                  {/* Cabeçalho com tags */}
                  <div className="bg-indigo-600 text-white py-2 px-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-xs font-medium">{book.type === 'book' ? 'Livro' : 'Mangá'}</span>
                    </div>

                    <div className={`rounded-full w-8 h-8 flex items-center justify-center ${book.status === 'owned' ? 'bg-green-500' : 'bg-amber-500'}`}>
                      {book.status === 'owned' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Conteúdo principal */}
                  <div className="p-4 flex flex-col h-full">
                    {/* Título e autor */}
                    <div className="mb-2">
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-indigo-700 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
                    </div>

                    {/* Informações adicionais */}
                    <div className="mt-auto pt-2 flex flex-wrap gap-2">
                      {book.collectionId && book.volume && (
                        <div className="bg-indigo-50 border border-indigo-100 rounded-md px-2 py-1 text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <span className="text-indigo-700 font-medium">Vol. {book.volume}</span>
                        </div>
                      )}

                      {book.review && (
                        <div className="bg-purple-50 border border-purple-100 rounded-md px-2 py-1 text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          <span className="text-purple-700 font-medium">{book.review.overall.toFixed(1)}</span>
                        </div>
                      )}

                      <div className={`${book.status === 'owned' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'} rounded-md px-2 py-1 text-xs font-medium flex items-center ml-auto`}>
                        {book.status === 'owned' ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-medium">Tenho</span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                            <span className="font-medium">Faltando</span>
                          </>
                        )}
                      </div>
                    </div>
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
        <Link href="/add" className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md border-l-4 border-indigo-600 transition-all hover:bg-indigo-50">
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-indigo-700 transition-colors">Adicionar Novo Livro</h3>
              <p className="text-gray-600">Registre um novo livro ou mangá na sua coleção</p>
            </div>
          </div>
        </Link>

        <Link href="/collections" className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md border-l-4 border-green-600 transition-all hover:bg-green-50">
          <div className="flex items-start">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-green-700 transition-colors">Gerenciar Coleções</h3>
              <p className="text-gray-600">Veja suas coleções e acompanhe o progresso</p>
            </div>
          </div>
        </Link>

        <Link href="/books" className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md border-l-4 border-amber-600 transition-all hover:bg-amber-50">
          <div className="flex items-start">
            <div className="bg-amber-100 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-amber-700 transition-colors">Ver Todos os Livros</h3>
              <p className="text-gray-600">Explore sua biblioteca completa</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}