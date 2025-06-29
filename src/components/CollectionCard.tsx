
import Link from 'next/link';
import { Collection } from '../types';
import { useBooks } from '../context/BookContext';
import StarRating from './StarRating';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { getOwnedBooksCountInCollection } = useBooks();
  const ownedCount = getOwnedBooksCountInCollection(collection.id);
  const completionPercentage = Math.round((ownedCount / collection.totalVolumes) * 100);
  const isComplete = ownedCount === collection.totalVolumes;

  return (
    <Link href={`/collections/${collection.id}`} className="group block h-full">
      <div className={`border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all h-full
        ${isComplete ? 'border-green-300 bg-gradient-to-br from-green-100 to-green-50' : 'border-indigo-200 bg-gradient-to-br from-indigo-100 to-indigo-50'}`}>
        <div className="p-4 flex flex-col h-full relative">
          {/* Header com nome da coleção e badge de status */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-indigo-700 transition-colors flex-1">
              {collection.name}
            </h3>
            {isComplete && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                Completa
              </span>
            )}
          </div>

          {/* Autor */}
          <p className="text-sm text-gray-600 mb-3">{collection.author}</p>

          {/* Informações da coleção em cards */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white/80 border border-gray-100 rounded-md p-2 text-center">
              <div className="text-xs text-gray-500">Tipo</div>
              <div className="font-medium text-sm">
                {collection.type === 'book' ? 'Livros' : 'Mangás'}
              </div>
            </div>
            <div className="bg-white/80 border border-gray-100 rounded-md p-2 text-center">
              <div className="text-xs text-gray-500">Volumes</div>
              <div className="font-medium text-sm">{collection.totalVolumes}</div>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mt-auto pt-2">
            <div className="flex justify-between items-center mb-1 text-xs font-medium">
              <span>Progresso:</span>
              <span>{ownedCount}/{collection.totalVolumes} ({completionPercentage}%)</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
              <div 
                className={`h-2.5 rounded-full ${isComplete ? 'bg-green-500' : 'bg-indigo-600'}`}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            {/* Avaliação média */}
            {collection.averageRating && collection.averageRating > 0 && (
              <div className="flex items-center justify-center mt-1 bg-white/70 rounded-full py-1 border border-gray-100">
                <span className="text-xs text-gray-700 mr-1">Avaliação:</span>
                <StarRating rating={collection.averageRating} size="sm" />
                <span className="text-xs text-gray-600 ml-1">({collection.averageRating.toFixed(1)})</span>
              </div>
            )}
          </div>

          {/* Indicador visual no canto */}
          <div className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] ${isComplete ? 'border-t-green-200' : 'border-t-indigo-200'} border-l-[40px] border-l-transparent`}></div>
        </div>
      </div>
    </Link>
  );
}