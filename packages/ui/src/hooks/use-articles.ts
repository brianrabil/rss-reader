"use client";
import { useState, useEffect } from "react";
import type { Article, Source } from "../models";
import { useMockArticles } from "./use-mock-articles";

export function useArticles(source: Source, useMockData?: boolean): Article[] {
  const [articles, setArticles] = useState<Article[]>([]);
  const mockArticles = useMockArticles(25);

  useEffect(() => {
    if (useMockData) {
      setArticles(mockArticles);
    }
  }, [source, useMockData, mockArticles]);

  return articles;
}
