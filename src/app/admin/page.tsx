"use client";

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirecionar usuários não-admin
  useEffect(() => {
    if (!user.isAdmin) {
      router.push('/');
    }
  }, [user, router]);

  if (!user.isAdmin) {
    return null; // Não renderizar nada enquanto redireciona
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Painel de Administração</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/books" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-2">Gerenciar Livros Padrão</h2>
            <p className="text-gray-600">Adicione e edite os livros padrão que os usuários podem adicionar às suas coleções.</p>
          </div>
        </Link>

        <Link href="/admin/collections" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
            <h2 className="text-xl font-semibold mb-2">Gerenciar Coleções Padrão</h2>
            <p className="text-gray-600">Adicione e edite as coleções padrão que os usuários podem adicionar aos seus perfis.</p>
          </div>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-500">Livros Padrão</h3>
            <p className="text-2xl font-bold">100</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-medium text-purple-500">Coleções Padrão</h3>
            <p className="text-2xl font-bold">25</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-medium text-green-500">Usuários Ativos</h3>
            <p className="text-2xl font-bold">1,250</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <h3 className="text-sm font-medium text-amber-500">Avaliações</h3>
            <p className="text-2xl font-bold">3,542</p>
          </div>
        </div>
      </div>
    </div>
  );
}
