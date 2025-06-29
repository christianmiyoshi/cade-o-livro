"use client";

import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../context/BookContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, upgradeAccount } = useAuth();
  const { books } = useBooks();
  const [showUpgradeConfirm, setShowUpgradeConfirm] = useState(false);

  // Redirect to login if not authenticated
  if (!user.isAuthenticated) {
    router.push('/login');
    return null;
  }

  const totalBooks = books.length;
  const freeLimit = 50;
  const isApproachingLimit = user.plan === 'free' && totalBooks >= freeLimit * 0.8;
  const hasReachedLimit = user.plan === 'free' && totalBooks >= freeLimit;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  // Mock function to handle upgrade (in a real app, this would redirect to payment)
  const handleUpgrade = () => {
    // For demo purposes, directly upgrade the account
    upgradeAccount();
    setShowUpgradeConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Informações Pessoais</h2>
            <button 
              onClick={logout}
              className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              Sair
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-1">Nome</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Tipo de Conta</p>
              <div className="flex items-center">
                {user.plan === 'premium' ? (
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Premium ✨
                  </span>
                ) : (
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    Gratuito
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Membro desde</p>
              <p className="font-medium">{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status da conta e limite */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Status da Conta</h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Livros/Mangás</span>
              <span className="font-medium">
                {totalBooks} {user.plan === 'free' && <span className="text-gray-500 text-sm">/ {freeLimit}</span>}
              </span>
            </div>

            {user.plan === 'free' && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${hasReachedLimit ? 'bg-red-600' : isApproachingLimit ? 'bg-amber-500' : 'bg-green-600'}`} 
                  style={{ width: `${Math.min((totalBooks / freeLimit) * 100, 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          {user.plan === 'free' && (
            <div className={`p-4 rounded-lg mb-6 ${hasReachedLimit ? 'bg-red-50 border border-red-200' : isApproachingLimit ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
              {hasReachedLimit ? (
                <p className="text-red-800">
                  <span className="font-bold">Limite atingido!</span> Você já cadastrou o número máximo de livros permitido no plano gratuito.
                  Para continuar adicionando à sua coleção, faça upgrade para a conta Premium.
                </p>
              ) : isApproachingLimit ? (
                <p className="text-amber-800">
                  <span className="font-bold">Aviso:</span> Você está se aproximando do limite de {freeLimit} livros do plano gratuito.
                  Considere fazer upgrade para uma conta Premium para gerenciar uma coleção maior.
                </p>
              ) : (
                <p className="text-blue-800">
                  Com o plano gratuito, você pode cadastrar até {freeLimit} livros ou mangás na sua coleção.
                </p>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                {user.plan === 'free' ? (
                  <>
                    <span>Plano Gratuito</span>
                    <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">Atual</span>
                  </>
                ) : (
                  <>
                    <span>Plano Gratuito</span>
                  </>
                )}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                <li>Até {freeLimit} livros na coleção</li>
                <li>Funcionalidades básicas</li>
                <li>Sem suporte prioritário</li>
              </ul>
            </div>

            <div className={user.plan === 'premium' ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-4 rounded-lg' : 'bg-gray-100 p-4 rounded-lg'}>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                {user.plan === 'premium' ? (
                  <>
                    <span>Plano Premium</span>
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-2 py-0.5 rounded-full text-xs font-medium">Atual</span>
                  </>
                ) : (
                  <>
                    <span>Plano Premium</span>
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-medium">Recomendado</span>
                  </>
                )}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                <li>Livros/mangás ilimitados</li>
                <li>Todas as funcionalidades</li>
                <li>Acesso prioritário a novos recursos</li>
                <li>Suporte prioritário</li>
                <li>Sem anúncios</li>
              </ul>

              {user.plan === 'free' && (
                <button 
                  onClick={() => setShowUpgradeConfirm(true)}
                  className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 rounded-md hover:from-indigo-700 hover:to-indigo-800 transition-all font-medium"
                >
                  Fazer Upgrade por R$ 29,90/ano
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de upgrade */}
      {showUpgradeConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirmar Upgrade</h3>
            <p className="text-gray-700 mb-6">Você está prestes a fazer upgrade para o plano Premium por R$ 29,90/ano. Deseja continuar?</p>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowUpgradeConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleUpgrade}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Confirmar Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
