import { useState, useEffect } from 'react';
import { Article, Source } from '../models';
import { useGenerateMockArticles } from './../hooks';

export function useArticles(source: Source, useMockData?: boolean) {
  const [articles, setArticles] = useState<Article[]>([]);
  const mockArticles = useGenerateMockArticles(25);

  useEffect(() => {
    if (useMockData) {
      setArticles(mockArticles);
    } {
      // TODO: fetch articles from API
    }
  }, [source, useMockData]);

  return articles;
}