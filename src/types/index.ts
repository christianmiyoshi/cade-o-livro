export interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  status: 'owned' | 'missing';
  type: 'book' | 'manga';
  collectionId?: number;
  volume?: number;
  review?: Review;
  isStandard?: boolean; // Livros padrão que podem ser adicionados por usuários
}

export interface Collection {
  id: number;
  name: string;
  author: string;
  coverUrl: string;
  type: 'book' | 'manga';
  totalVolumes: number;
  isComplete?: boolean; // Se todos os volumes estão na coleção
  averageRating?: number; // Média das avaliações dos livros
  isStandard?: boolean; // Coleções padrão que podem ser adicionadas por usuários
}

export type BookStatus = 'owned' | 'missing';

export type CollectionFilter = 'all' | 'complete' | 'incomplete' | 'wanted';

export type SubscriptionPlan = 'free' | 'premium';

export interface UserAuth {
  isAuthenticated: boolean;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  plan?: SubscriptionPlan;
  createdAt?: string;
}

export interface Review {
  overall: number; // Avaliação geral (média)
  paper: number; // Qualidade do papel
  print: number; // Impressão
  binding: number; // Encadernação
  cover: number; // Capa
  translation?: number; // Tradução (se aplicável)
  layout: number; // Diagramação
  durability: number; // Durabilidade
  comment?: string; // Comentário opcional
}
