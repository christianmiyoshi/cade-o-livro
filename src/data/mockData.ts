import { Book, Collection } from '../types';
import { DEFAULT_BOOK_COVER, DEFAULT_COLLECTION_COVER } from '../constants';

export const mockCollections: Collection[] = [
  {
    id: 1,
    name: 'One Piece',
    author: 'Eiichiro Oda',
    coverUrl: 'https://m.media-amazon.com/images/I/71y+XnBXm4L._AC_UF1000,1000_QL80_.jpg',
    type: 'manga',
    totalVolumes: 5
  },
  {
    id: 2,
    name: 'Naruto',
    author: 'Masashi Kishimoto',
    coverUrl: 'https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg',
    type: 'manga',
    totalVolumes: 3
  },
  {
    id: 3,
    name: 'Harry Potter',
    author: 'J.K. Rowling',
    coverUrl: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg',
    type: 'book',
    totalVolumes: 7
  },
  {
    id: 4,
    name: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg',
    type: 'book',
    totalVolumes: 3
  },
  {
    id: 5,
    name: 'Attack on Titan',
    author: 'Hajime Isayama',
    coverUrl: 'https://m.media-amazon.com/images/I/91M9VaZWxOL._AC_UF1000,1000_QL80_.jpg',
    type: 'manga',
    totalVolumes: 4
  },
  {
    id: 6,
    name: 'Death Note',
    author: 'Tsugumi Ohba',
    coverUrl: 'https://m.media-amazon.com/images/I/71rYlm38UjL._AC_UF1000,1000_QL80_.jpg',
    type: 'manga',
    totalVolumes: 3
  }
];

// Livros padrão que podem ser adicionados pelos usuários
export const mockStandardBooks: Book[] = [
  {
    id: 101,
    title: 'Dom Quixote',
    author: 'Miguel de Cervantes',
    coverUrl: 'https://m.media-amazon.com/images/I/71c1LRLBTLL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'book',
    isStandard: true
  },
  {
    id: 102,
    title: 'Crime e Castigo',
    author: 'Fiódor Dostoiévski',
    coverUrl: 'https://m.media-amazon.com/images/I/71LRV6hUKyL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'book',
    isStandard: true
  },
  {
    id: 103,
    title: 'Cem Anos de Solidão',
    author: 'Gabriel García Márquez',
    coverUrl: 'https://m.media-amazon.com/images/I/715afDdgKfL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'book',
    isStandard: true
  },
  {
    id: 104,
    title: 'Berserk Vol. 1',
    author: 'Kentaro Miura',
    coverUrl: 'https://m.media-amazon.com/images/I/51esNsExVVL._SY445_SX342_.jpg',
    status: 'missing',
    type: 'manga',
    isStandard: true,
    volume: 1
  }
];

// Coleções padrão que podem ser adicionadas pelos usuários
export const mockStandardCollections: Collection[] = [
  {
    id: 101,
    name: 'Berserk',
    author: 'Kentaro Miura',
    coverUrl: 'https://m.media-amazon.com/images/I/51esNsExVVL._SY445_SX342_.jpg',
    type: 'manga',
    totalVolumes: 41,
    isStandard: true
  },
  {
    id: 102,
    name: 'As Crônicas de Gelo e Fogo',
    author: 'George R. R. Martin',
    coverUrl: 'https://m.media-amazon.com/images/I/91+1SUO3vUL._AC_UF1000,1000_QL80_.jpg',
    type: 'book',
    totalVolumes: 5,
    isStandard: true
  },
  {
    id: 103,
    name: 'Percy Jackson e os Olimpianos',
    author: 'Rick Riordan',
    coverUrl: 'https://m.media-amazon.com/images/I/71IVAIUT38L._AC_UF1000,1000_QL80_.jpg',
    type: 'book',
    totalVolumes: 5,
    isStandard: true
  }
];

export const mockBooks: Book[] = [
  {
    id: 1,
    title: 'O Senhor dos Anéis: A Sociedade do Anel',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'book',
    collectionId: 4,
    volume: 1
  },
  {
    id: 2,
    title: 'O Senhor dos Anéis: As Duas Torres',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'book',
    collectionId: 4,
    volume: 2
  },
  {
    id: 3,
    title: 'O Senhor dos Anéis: O Retorno do Rei',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'book',
    collectionId: 4,
    volume: 3
  },
  {
    id: 4,
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    coverUrl: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'book',
    collectionId: 3,
    volume: 1
  },
  {
    id: 5,
    title: 'Harry Potter e a Câmara Secreta',
    author: 'J.K. Rowling',
    coverUrl: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'book',
    collectionId: 3,
    volume: 2
  },
  {
    id: 6,
    title: 'Harry Potter e o Prisioneiro de Azkaban',
    author: 'J.K. Rowling',
    coverUrl: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'book',
    collectionId: 3,
    volume: 3
  },
  {
    id: 7,
    title: 'Naruto Vol. 1',
    author: 'Masashi Kishimoto',
    coverUrl: 'https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'manga',
    collectionId: 2,
    volume: 1
  },
  {
    id: 8,
    title: 'Naruto Vol. 2',
    author: 'Masashi Kishimoto',
    coverUrl: 'https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'manga',
    collectionId: 2,
    volume: 2
  },
  {
    id: 9,
    title: 'Naruto Vol. 3',
    author: 'Masashi Kishimoto',
    coverUrl: 'https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'manga',
    collectionId: 2,
    volume: 3
  },
  {
    id: 10,
    title: 'One Piece Vol. 1',
    author: 'Eiichiro Oda',
    coverUrl: 'https://m.media-amazon.com/images/I/71y+XnBXm4L._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'manga',
    collectionId: 1,
    volume: 1
  },
  {
    id: 11,
    title: 'One Piece Vol. 2',
    author: 'Eiichiro Oda',
    coverUrl: 'https://m.media-amazon.com/images/I/71y+XnBXm4L._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'manga',
    collectionId: 1,
    volume: 2
  },
  {
    id: 12,
    title: 'One Piece Vol. 3',
    author: 'Eiichiro Oda',
    coverUrl: 'https://m.media-amazon.com/images/I/71y+XnBXm4L._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'manga',
    collectionId: 1,
    volume: 3
  },
  {
    id: 13,
    title: 'One Piece Vol. 4',
    author: 'Eiichiro Oda',
    coverUrl: 'https://m.media-amazon.com/images/I/71y+XnBXm4L._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'manga',
    collectionId: 1,
    volume: 4
  },
  {
    id: 14,
    title: 'One Piece Vol. 5',
    author: 'Eiichiro Oda',
    coverUrl: 'https://m.media-amazon.com/images/I/71y+XnBXm4L._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'manga',
    collectionId: 1,
    volume: 5
  },
  {
    id: 15,
    title: 'Attack on Titan Vol. 1',
    author: 'Hajime Isayama',
    coverUrl: 'https://m.media-amazon.com/images/I/91M9VaZWxOL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'manga',
    collectionId: 5,
    volume: 1
  },
  {
    id: 16,
    title: 'Attack on Titan Vol. 2',
    author: 'Hajime Isayama',
    coverUrl: 'https://m.media-amazon.com/images/I/91M9VaZWxOL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'manga',
    collectionId: 5,
    volume: 2
  },
  {
    id: 17,
    title: 'Attack on Titan Vol. 3',
    author: 'Hajime Isayama',
    coverUrl: 'https://m.media-amazon.com/images/I/91M9VaZWxOL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'manga',
    collectionId: 5,
    volume: 3
  },
  {
    id: 18,
    title: 'Attack on Titan Vol. 4',
    author: 'Hajime Isayama',
    coverUrl: 'https://m.media-amazon.com/images/I/91M9VaZWxOL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'manga',
    collectionId: 5,
    volume: 4
  },
  {
    id: 19,
    title: 'Death Note Vol. 1',
    author: 'Tsugumi Ohba',
    coverUrl: 'https://m.media-amazon.com/images/I/71rYlm38UjL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'manga',
    collectionId: 6,
    volume: 1
  },
  {
    id: 20,
    title: 'Death Note Vol. 2',
    author: 'Tsugumi Ohba',
    coverUrl: 'https://m.media-amazon.com/images/I/71rYlm38UjL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'manga',
    collectionId: 6,
    volume: 2
  },
  {
    id: 21,
    title: 'Death Note Vol. 3',
    author: 'Tsugumi Ohba',
    coverUrl: 'https://m.media-amazon.com/images/I/71rYlm38UjL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'manga',
    collectionId: 6,
    volume: 3
  },
  {
    id: 22,
    title: 'A Metamorfose',
    author: 'Franz Kafka',
    coverUrl: 'https://m.media-amazon.com/images/I/61kRlwB8cyL._AC_UF1000,1000_QL80_.jpg',
    status: 'missing',
    type: 'book'
  },
  {
    id: 23,
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://m.media-amazon.com/images/I/91M9VaZWxOL._AC_UF1000,1000_QL80_.jpg',
    status: 'owned',
    type: 'book'
  }
];
