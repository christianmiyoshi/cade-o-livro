import CollectionCard from './CollectionCard';
import { Collection } from '../types';

interface CollectionGridProps {
  collections: Collection[];
}

export default function CollectionGrid({ collections }: CollectionGridProps) {
  if (collections.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhuma coleção encontrada.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
