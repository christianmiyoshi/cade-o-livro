"use client";

import { useState } from 'react';
import { Review } from '../types';
import StarRating from './StarRating';
import {REVIEW_CRITERIA} from "../constants";

interface ReviewFormProps {
  initialReview?: Review;
  onSubmit: (review: Review) => void;
  bookType: 'book' | 'manga';
}

export default function ReviewForm({ initialReview, onSubmit, bookType }: ReviewFormProps) {
  const [ratings, setRatings] = useState<Record<string, number>>(
    initialReview ? {
      paper: initialReview.paper,
      print: initialReview.print,
      binding: initialReview.binding,
      cover: initialReview.cover,
      translation: initialReview.translation,
    } : {
      paper: 0,
      print: 0,
      binding: 0,
      cover: 0,
      translation: 0,
    }
  );

  const [comment, setComment] = useState(initialReview?.comment || '');

  const handleRatingChange = (criterion: string, value: number) => {
    setRatings(prev => ({ ...prev, [criterion]: value }));
  };

  const calculateOverall = () => {
    const values = Object.entries(ratings)
      .filter(([key, value]) => {
        // Ignorar tradução para mangás (assumindo que estão em japonês/original)
        if (bookType === 'manga' && key === 'translation') return false;
        return value > 0;
      })
      .map(([_, value]) => value);

    if (values.length === 0) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const overall = calculateOverall();

    const review: Review = {
      overall,
      paper: ratings.paper,
      print: ratings.print,
      binding: ratings.binding,
      cover: ratings.cover,
      comment: comment.trim() || undefined
    };

    // Adicionar tradução apenas se for um livro (não mangá)
    if (bookType === 'book') {
      review.translation = ratings.translation;
    }

    onSubmit(review);
  };

  const isFormValid = Object.values(ratings).some(rating => rating > 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold">Avalie este livro</h3>

      <div className="space-y-4">
        {REVIEW_CRITERIA.map(criterion => {
          // Pular o critério de tradução para mangás
          if (bookType === 'manga' && criterion.id === 'translation') return null;

          return (
            <div key={criterion.id} className="flex justify-between items-center">
              <span>{criterion.name}</span>
              <StarRating 
                rating={ratings[criterion.id]} 
                interactive={true}
                onRatingChange={(value) => handleRatingChange(criterion.id, value)}
              />
            </div>
          );
        })}
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Comentários (opcional)
        </label>
        <textarea
          id="comment"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">Avaliação geral:</span>
          <StarRating rating={calculateOverall()} size="lg" />
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enviar avaliação
        </button>
      </div>
    </form>
  );
}
