import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Sobre o Cadê Meu Livro</h1>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2">
          <Image 
            src="/about-image.jpg" 
            alt="Biblioteca com livros" 
            width={500} 
            height={300} 
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
          <p className="text-gray-700 mb-4">
            O Cadê Meu Livro nasceu da paixão pela leitura e da necessidade de organizar coleções crescentes de livros e mangás.
            Nossa missão é proporcionar aos amantes da literatura e das histórias em quadrinhos uma ferramenta simples e eficiente
            para gerenciar suas bibliotecas pessoais.
          </p>
          <p className="text-gray-700">
            Ajudamos colecionadores a manter o controle de suas obras, acompanhar o progresso de séries e evitar a compra de
            volumes duplicados. Queremos ser a solução definitiva para a pergunta: "Cadê meu livro?".
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nossos Valores</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Simplicidade</h3>
            <p className="text-gray-600">Acreditamos que as melhores soluções são simples e intuitivas.</p>
          </div>

          <div className="text-center p-4">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Confiabilidade</h3>
            <p className="text-gray-600">Seus dados são importantes e trabalhamos para mantê-los seguros.</p>
          </div>

          <div className="text-center p-4">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Inovação</h3>
            <p className="text-gray-600">Buscamos constantemente novas formas de melhorar sua experiência.</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Nossa História</h2>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-indigo-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">A Inspiração</h3>
              <p className="text-gray-700">
                Tudo começou quando nosso fundador perdeu o controle de sua coleção de mangás e acabou comprando
                volumes que já possuía. Frustrado com a falta de soluções específicas para colecionadores, decidiu
                criar sua própria ferramenta.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-indigo-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">O Desenvolvimento</h3>
              <p className="text-gray-700">
                Em 2024, reunimos uma equipe de desenvolvedores e designers apaixonados por livros para criar uma
                plataforma que realmente atendesse às necessidades específicas dos colecionadores de livros e mangás.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-indigo-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Hoje</h3>
              <p className="text-gray-700">
                Hoje, o Cadê Meu Livro ajuda milhares de leitores e colecionadores a organizar suas bibliotecas pessoais.
                Continuamos aprimorando nossa plataforma com base no feedback dos usuários, sempre buscando novas formas
                de tornar a gestão de coleções mais simples e eficiente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Junte-se à Nossa Comunidade</h2>
        <p className="text-gray-700 mb-6">
          Milhares de colecionadores já descobriram como é fácil manter suas coleções organizadas com o Cadê Meu Livro.
          Venha fazer parte dessa comunidade e nunca mais perca o controle da sua biblioteca.
        </p>
        <Link href="/register" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg">
          Comece agora — é grátis!
        </Link>
      </div>
    </div>
  );
}
