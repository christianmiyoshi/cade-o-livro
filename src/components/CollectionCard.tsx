import Image from 'next/image';
import Link from 'next/link';
import { Collection } from '../types';
import { useBooks } from '../context/BookContext';
import { DEFAULT_COLLECTION_COVER } from '../constants';
import StarRating from './StarRating';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { getOwnedBooksCountInCollection } = useBooks();
  const ownedCount = getOwnedBooksCountInCollection(collection.id);
  const completionPercentage = Math.round((ownedCount / collection.totalVolumes) * 100);

  return (
    <Link href={`/collections/${collection.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 w-full">
          <Image 
            src={collection.coverUrl || DEFAULT_COLLECTION_COVER} 
            alt={`Capa de ${collection.name}`} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={false}
            onError={(e) => {
              // Fallback para imagem padrão se a URL falhar
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_COLLECTION_COVER;
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate">{collection.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{collection.author}</p>

          {collection.averageRating && collection.averageRating > 0 && (
            <div className="mb-3">
              <StarRating rating={collection.averageRating} />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Progresso:</span>
              <span className="font-semibold">{ownedCount} de {collection.totalVolumes}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 capitalize">{collection.type}</span>
              <span className="text-xs font-medium text-indigo-600">{completionPercentage}% completo</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
