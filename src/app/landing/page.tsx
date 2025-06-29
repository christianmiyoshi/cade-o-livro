"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Organize sua coleção de livros e mangás
              </h1>
              <p className="text-xl text-indigo-100 dark:text-indigo-200 max-w-lg">
                Gerencie facilmente sua biblioteca pessoal, acompanhe o progresso das suas coleções e nunca mais esqueça quais volumes você já tem.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/register" 
                  className="px-6 py-3 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg font-medium text-lg transition-colors shadow-lg hover:shadow-xl">
                  Começar agora
                </Link>
                <Link href="/about"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 rounded-lg font-medium text-lg transition-colors">
                  Saiba mais
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[400px] w-full">
                <Image 
                  src="/hero-image.svg" 
                  alt="Biblioteca ilustrada" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recursos incríveis para colecionadores</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tudo que você precisa para manter sua coleção organizada em um só lugar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Catálogo completo</h3>
              <p className="text-gray-600">Adicione até 50 livros e mangás com informações detalhadas e organize-os em coleções no plano gratuito.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Acompanhamento de coleções</h3>
              <p className="text-gray-600">Veja quais volumes estão faltando e acompanhe o progresso de suas coleções com indicadores visuais.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Avaliações detalhadas</h3>
              <p className="text-gray-600">Registre suas avaliações com critérios específicos para qualidade de impressão, papel, encadernação e mais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Pronto para organizar sua coleção?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">Junte-se a milhares de colecionadores que já estão usando o Cadê Meu Livro para gerenciar suas bibliotecas. Comece grátis com até 50 livros ou mangás!</p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register" 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-lg transition-colors shadow-lg hover:shadow-xl">
              Criar uma conta grátis
            </Link>
            <Link href="/login" 
              className="px-8 py-4 bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:bg-opacity-10 rounded-lg font-medium text-lg transition-colors">
              Fazer login
            </Link>
          </div>
          <div className="mt-6">
            <Link href="/pricing" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Ver planos e preços
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O que nossos usuários dizem</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Colecionadores como você que amam nossa plataforma.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-indigo-600">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Matheus Silva</h4>
                  <p className="text-sm text-gray-500">Colecionador de mangás</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Finalmente consigo manter o controle da minha coleção de mangás! Nunca mais comprei um volume duplicado por engano."</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-indigo-600">C</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Carla Mendes</h4>
                  <p className="text-sm text-gray-500">Leitora ávida</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"A interface é intuitiva e as avaliações detalhadas me ajudam a decidir quais edições comprar. Recomendo a todos os bibliófilos!"</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-indigo-600">R</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Rafael Costa</h4>
                  <p className="text-sm text-gray-500">Colecionador de HQs</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"O sistema de acompanhamento de coleções é perfeito! Agora sei exatamente quais volumes estão faltando nas minhas séries."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Cadê Meu Livro" width={36} height={36} />
                <span className="text-xl font-bold text-gray-900">Cadê Meu Livro</span>
              </div>
              <p className="text-gray-600 mt-2">© 2025 Cadê Meu Livro. Todos os direitos reservados.</p>
            </div>

            <div className="flex gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-600 hover:text-indigo-600">Dashboard</Link></li>
                  <li><Link href="/pricing" className="text-gray-600 hover:text-indigo-600">Preços</Link></li>
                  <li><Link href="/books" className="text-gray-600 hover:text-indigo-600">Livros</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-600 hover:text-indigo-600">Sobre nós</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-indigo-600">Contato</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-gray-600 hover:text-indigo-600">Privacidade</Link></li>
                  <li><Link href="/terms" className="text-gray-600 hover:text-indigo-600">Termos</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
