import { Book } from '../types';
import Link from 'next/link';

interface VolumeStatusProps {
  book: Book;
  onClick?: () => void;
  isDetailed?: boolean;
  isEditing?: boolean;
}

export default function VolumeStatus({ book, onClick, isDetailed = false, isEditing = false }: VolumeStatusProps) {
  // Render the volume with a link to book details if not in edit mode
  const VolumeContent = (
    <div 
      onClick={onClick}
      className={`
        ${isDetailed ? 'p-4' : 'p-2'} 
        border rounded-lg 
        ${book.status === 'owned' ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200 opacity-75 brightness-110'}
        ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
        ${isEditing ? 'transform hover:scale-105 active:scale-95 transition-all' : ''}
        flex flex-col items-center justify-center
        ${isEditing && book.status === 'owned' ? 'hover:bg-amber-100 hover:border-amber-300 hover:shadow-md' : ''}
        ${isEditing && book.status === 'missing' ? 'hover:bg-green-100 hover:border-green-300 hover:shadow-md hover:opacity-90' : ''}
      `}
    >
      <div className={`${isDetailed ? 'text-xl' : 'text-lg'} font-bold ${book.status === 'missing' ? 'text-amber-700/80' : ''}`}>
        {book.volume}
      </div>

      {isDetailed && (
        <div className="mt-2 text-sm">
          {book.status === 'owned' ? (
            <span className="text-green-600">Tenho</span>
          ) : (
            <span className="text-amber-600/90">Faltando</span>
          )}
        </div>
      )}

      {isEditing && (
        <div className="mt-1 text-xs font-medium">
          {book.status === 'owned' ? (
            <span className="text-amber-600">Clique para remover</span>
          ) : (
            <span className="text-green-600">Clique para adicionar</span>
          )}
        </div>
      )}
    </div>
  );

  // Only make it a link if not in edit mode and no click handler
  if (!isEditing && !onClick) {
    return (
      <Link href={`/books/${book.id}`}>
        {VolumeContent}
      </Link>
    );
  }

  return VolumeContent;
}
