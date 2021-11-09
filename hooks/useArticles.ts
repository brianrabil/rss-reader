import { useState, useEffect } from 'react';
import { Article, Source, SortBy  } from '../models';
import { useMockArticles, useSort } from './../hooks';

export interface UseArticlesProps {
  source?: Source;
  sortBy?: SortBy;
  useMockData?: boolean;
}

export function useArticles({source, sortBy, useMockData}: UseArticlesProps): Article[] {
  const [articles, setArticles] = useState<Article[]>([]);
  const mockArticles = useMockArticles(25);
  const sortedArticles = useSort(articles, sortBy);

  useEffect(() => {
    if (useMockData) {
      setArticles(mockArticles);
    } {
      // TODO: fetch articles from API
    }
  }, [source, useMockData]);

  return sortedArticles;
}