"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Cadê Meu Livro" width={40} height={40} />
          <span className="text-xl font-bold">Cadê Meu Livro</span>
        </Link>

        <div className="flex space-x-4 items-center">
          <Link href="/landing" className="hover:text-indigo-200">Home</Link>
          <Link href="/" className="hover:text-indigo-200">Dashboard</Link>
          <Link href="/collections" className="hover:text-indigo-200">Coleções</Link>
          <Link href="/books" className="hover:text-indigo-200">Livros</Link>
          <Link href="/add" className="hover:text-indigo-200">Adicionar</Link>
          <Link href="/about" className="hover:text-indigo-200">Sobre</Link>
          <Link href="/pricing" className="hover:text-indigo-200">Preços</Link>

          {user.isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link href="/profile" className="text-sm hidden md:inline hover:text-indigo-200 flex items-center gap-1">
                <span>{user.name}</span>
                {user.plan === 'premium' && (
                  <span className="text-yellow-300 text-xs">✨</span>
                )}
              </Link>
              {user.isAdmin && (
                <Link 
                  href="/admin"
                  className="text-white hover:text-indigo-200 mr-2"
                >
                  Admin
                </Link>
              )}
              <Link 
                href="/profile"
                className="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-100 mr-2"
              >
                Minha Conta
              </Link>
              <button 
                onClick={logout}
                className="bg-transparent border border-white text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              className="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
