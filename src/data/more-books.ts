import { Book } from '../types';

// Additional books to demonstrate pagination
export const additionalBooks: Book[] = [
  // Classic Literature Collection (Collection ID 7)
  {
    id: 301,
    title: "Clássicos da Literatura",
    author: "Vários",
    status: "missing",
    collectionId: 7,
    volume: 1,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,classic"
  },
  {
    id: 302,
    title: "Clássicos da Literatura",
    author: "Vários",
    status: "owned",
    collectionId: 7,
    volume: 2,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,classic"
  },
  {
    id: 303,
    title: "Clássicos da Literatura",
    author: "Vários",
    status: "missing",
    collectionId: 7,
    volume: 3,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,classic"
  },
  {
    id: 304,
    title: "Clássicos da Literatura",
    author: "Vários",
    status: "missing",
    collectionId: 7,
    volume: 4,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,classic"
  },
  {
    id: 305,
    title: "Clássicos da Literatura",
    author: "Vários",
    status: "owned",
    collectionId: 7,
    volume: 5,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,classic"
  },
  // Science Books (Collection ID 8)
  {
    id: 306,
    title: "Ciência Moderna",
    author: "Academia de Ciências",
    status: "owned",
    collectionId: 8,
    volume: 1,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,science"
  },
  {
    id: 307,
    title: "Ciência Moderna",
    author: "Academia de Ciências",
    status: "owned",
    collectionId: 8,
    volume: 2,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,science"
  },
  {
    id: 308,
    title: "Ciência Moderna",
    author: "Academia de Ciências",
    status: "missing",
    collectionId: 8,
    volume: 3,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,science"
  },
  {
    id: 309,
    title: "Ciência Moderna",
    author: "Academia de Ciências",
    status: "missing",
    collectionId: 8,
    volume: 4,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,science"
  },
  {
    id: 310,
    title: "Ciência Moderna",
    author: "Academia de Ciências",
    status: "missing",
    collectionId: 8,
    volume: 5,
    coverUrl: "https://source.unsplash.com/random/600x900/?book,science"
  },
  // Fantasy Series (Collection ID 9)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 311 + i,
    title: "Fantasia Épica",
    author: "J.R. Tolkien",
    status: i % 3 === 0 ? "owned" : "missing",
    collectionId: 9,
    volume: i + 1,
    coverUrl: `https://source.unsplash.com/random/600x900/?book,fantasy${i % 5}`
  })),
  // Science Fiction Series (Collection ID 10)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: 331 + i,
    title: "Ficção Científica",
    author: "Isaac Arthur",
    status: i % 2 === 0 ? "owned" : "missing",
    collectionId: 10,
    volume: i + 1,
    coverUrl: `https://source.unsplash.com/random/600x900/?book,scifi${i % 5}`
  })),
  // Standalone books
  ...Array.from({ length: 30 }, (_, i) => ({
    id: 346 + i,
    title: `Livro Avulso ${i + 1}`,
    author: `Autor ${i + 1}`,
    status: i % 3 === 0 ? "owned" : "missing",
    coverUrl: `https://source.unsplash.com/random/600x900/?book,novel${i % 10}`
  })),
];
