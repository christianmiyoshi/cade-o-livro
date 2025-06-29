"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Book, BookStatus, Collection, CollectionFilter, Review } from '../types';
import { mockBooks, mockCollections, mockStandardBooks, mockStandardCollections } from '../data/mockData';
import { DEFAULT_BOOK_COVER } from '../constants';
import { useAuth } from './AuthContext';

interface BookContextType {
  books: Book[];
  collections: Collection[];
  standardBooks: Book[];
  standardCollections: Collection[];
  addBook: (book: Omit<Book, 'id'>) => boolean;
  addCollection: (collection: Omit<Collection, 'id'>) => boolean;
  addStandardBook: (book: Omit<Book, 'id'>) => void;
  addStandardCollection: (collection: Omit<Collection, 'id'>) => void;
  filterBooks: (status?: BookStatus) => Book[];
  getBooksInCollection: (collectionId: number) => Book[];
  getOwnedBooksCountInCollection: (collectionId: number) => number;
  getCollectionById: (collectionId: number) => Collection | undefined;
  searchCollections: (query: string, filter: CollectionFilter) => Collection[];
  addReviewToBook: (bookId: number, review: Review) => void;
  updateBookStatus: (bookId: number, status: BookStatus) => boolean;
  calculateCollectionRating: (collectionId: number) => number;
  canAddMoreBooks: () => boolean;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [standardBooks, setStandardBooks] = useState<Book[]>([]);
  const [standardCollections, setStandardCollections] = useState<Collection[]>([]);

  // Free plan limit
  const FREE_PLAN_LIMIT = 50;

  useEffect(() => {
    // Carregar dados mockados quando o componente montar
    setBooks(mockBooks);
    setCollections(mockCollections);
    setStandardBooks(mockStandardBooks);
    setStandardCollections(mockStandardCollections);
  }, []);

  // Check if user can add more books based on their plan
  const canAddMoreBooks = () => {
    if (user.plan === 'premium') return true;
    return books.length < FREE_PLAN_LIMIT;
  };

  const addBook = (bookData: Omit<Book, 'id'>) => {
    // Check if user has reached their limit
    if (!canAddMoreBooks()) {
      return false;
    }

    const newBook = {
      ...bookData,
      id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1,
      // We're not using coverUrl anymore, but keep it for backward compatibility
      coverUrl: bookData.coverUrl || ''
    };
    setBooks([...books, newBook]);
    return true;
  };

  const addCollection = (collectionData: Omit<Collection, 'id'>) => {
    // Collections don't count towards the limit, but we'll check anyway for consistency
    if (!canAddMoreBooks()) {
      return false;
    }

    const newCollection = {
      ...collectionData,
      id: collections.length > 0 ? Math.max(...collections.map(collection => collection.id)) + 1 : 1
    };
    setCollections([...collections, newCollection]);
    return true;
  };

  const addStandardBook = (bookData: Omit<Book, 'id'>) => {
    const newBook = {
      ...bookData,
      id: standardBooks.length > 0 ? Math.max(...standardBooks.map(book => book.id)) + 1 : 1,
      isStandard: true,
      coverUrl: bookData.coverUrl || DEFAULT_BOOK_COVER
    };
    setStandardBooks([...standardBooks, newBook]);
  };

  const addStandardCollection = (collectionData: Omit<Collection, 'id'>) => {
    const newCollection = {
      ...collectionData,
      id: standardCollections.length > 0 ? Math.max(...standardCollections.map(collection => collection.id)) + 1 : 1,
      isStandard: true
    };
    setStandardCollections([...standardCollections, newCollection]);
  };

  const filterBooks = (status?: BookStatus) => {
    if (!status) return books;
    return books.filter(book => book.status === status);
  };

  const getBooksInCollection = (collectionId: number) => {
    return books.filter(book => book.collectionId === collectionId);
  };

  const getOwnedBooksCountInCollection = (collectionId: number) => {
    return books.filter(book => book.collectionId === collectionId && book.status === 'owned').length;
  };

  const getCollectionById = (collectionId: number) => {
    return collections.find(collection => collection.id === collectionId);
  };

  const searchCollections = (query: string, filter: CollectionFilter) => {
    let filtered = collections;

    // Aplicar filtro
    if (filter !== 'all') {
      filtered = filtered.filter(collection => {
        const booksInCollection = getBooksInCollection(collection.id);
        const ownedCount = getOwnedBooksCountInCollection(collection.id);

        switch (filter) {
          case 'complete':
            return ownedCount === collection.totalVolumes;
          case 'incomplete':
            return ownedCount > 0 && ownedCount < collection.totalVolumes;
          case 'wanted':
            return ownedCount === 0;
          default:
            return true;
        }
      });
    }

    // Aplicar busca textual
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      filtered = filtered.filter(collection => 
        collection.name.toLowerCase().includes(searchTerm) ||
        collection.author.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const addReviewToBook = (bookId: number, review: Review) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId
          ? { ...book, review }
          : book
      )
    );

    // Atualizar a avaliação média da coleção, se o livro pertencer a uma
    const book = books.find(b => b.id === bookId);
    if (book?.collectionId) {
      calculateCollectionRating(book.collectionId);
    }
  };

  const updateBookStatus = (bookId: number, status: BookStatus) => {
    // Find the book before updating to get its information
    const bookToUpdate = books.find(b => b.id === bookId);

    // If changing from missing to owned, check if user has reached their limit
    if (bookToUpdate?.status === 'missing' && status === 'owned' && !canAddMoreBooks()) {
      return false;
    }

    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId
          ? { ...book, status }
          : book
      )
    );

    // Opcional: você pode implementar uma notificação ou toast aqui
    if (bookToUpdate && status === 'owned') {
      console.log(`Livro "${bookToUpdate.title || `Volume ${bookToUpdate.volume}`}" adicionado à coleção`);
    }

    // Atualizar o status da coleção
    const book = books.find(b => b.id === bookId);
    if (book?.collectionId) {
      const updatedOwnedCount = getOwnedBooksCountInCollection(book.collectionId);
      const collection = getCollectionById(book.collectionId);

      if (collection) {
        setCollections(prevCollections => 
          prevCollections.map(c => 
            c.id === collection.id
              ? { ...c, isComplete: updatedOwnedCount === c.totalVolumes }
              : c
          )
        );
      }
    }
  };

  const calculateCollectionRating = (collectionId: number) => {
    const booksInCollection = getBooksInCollection(collectionId);
    const booksWithReviews = booksInCollection.filter(book => book.review);

    if (booksWithReviews.length === 0) return 0;

    // Calcular média de avaliações
    const totalRating = booksWithReviews.reduce((sum, book) => sum + (book.review?.overall || 0), 0);
    const averageRating = totalRating / booksWithReviews.length;

    // Atualizar a coleção com a nova média
    setCollections(prevCollections => 
      prevCollections.map(collection => 
        collection.id === collectionId
          ? { ...collection, averageRating }
          : collection
      )
    );

    return averageRating;
  };

  return (
    <BookContext.Provider value={{
      books,
      collections,
      standardBooks,
      standardCollections,
      addBook,
      addCollection,
      addStandardBook,
      addStandardCollection,
      filterBooks,
      getBooksInCollection,
      getOwnedBooksCountInCollection,
      getCollectionById,
      searchCollections,
      addReviewToBook,
      updateBookStatus,
      calculateCollectionRating,
      canAddMoreBooks
    }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}
