import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Planos e Preços</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Escolha o plano perfeito para sua coleção de livros e mangás
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Plano Free */}
        <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-4xl font-bold mb-6">R$ 0 <span className="text-gray-500 text-lg font-normal">/mês</span></p>

            <p className="text-gray-600 mb-6">Perfeito para começar a organizar sua coleção.</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Até <strong>50 livros/mangás</strong> em sua coleção</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Organize por coleções</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Acompanhe volumes faltantes</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Avaliações detalhadas</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Acesso à aplicação web</span>
              </li>
            </ul>

            <Link 
              href="/register" 
              className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Começar grátis
            </Link>
          </div>
        </div>

        {/* Plano Premium (Em breve) */}
        <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
            Em breve
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <p className="text-4xl font-bold mb-6">R$ 9,90 <span className="text-gray-500 text-lg font-normal">/mês</span></p>

            <p className="text-gray-600 mb-6">Para colecionadores que precisam de mais recursos.</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Livros/mangás ilimitados</strong> em sua coleção</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Tudo do plano Free</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Download de relatórios em PDF/Excel</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Marketplace para anunciar livros</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>API para integração com outras plataformas</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Suporte prioritário</span>
              </li>
            </ul>

            <button 
              disabled
              className="block w-full bg-gray-400 text-white text-center py-3 px-4 rounded-lg font-medium cursor-not-allowed"
            >
              Em desenvolvimento
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Perguntas Frequentes</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">O que acontece se eu ultrapassar o limite de 50 livros no plano gratuito?</h4>
            <p className="text-gray-600">Você poderá continuar acessando sua coleção, mas não poderá adicionar novos livros até que faça upgrade para o plano Premium ou remova alguns itens.</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Quando o plano Premium estará disponível?</h4>
            <p className="text-gray-600">Estamos trabalhando arduamente para lançar o plano Premium nos próximos meses. Registre-se para receber notificações sobre o lançamento!</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Posso mudar de plano depois?</h4>
            <p className="text-gray-600">Sim! Você poderá fazer upgrade para o plano Premium quando ele estiver disponível, mantendo todos os seus dados e coleções.</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Como funciona o marketplace de livros?</h4>
            <p className="text-gray-600">O marketplace permitirá que você anuncie livros que deseja vender ou trocar para outros usuários da plataforma. Esta funcionalidade será exclusiva do plano Premium.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
