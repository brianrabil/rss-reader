import { useMemo } from "react";
import type { Article } from "../models";
import { generateArticles } from "../utils";

export function useMockArticles(count: number): Article[] {
  const articles = useMemo(() => {
    return generateArticles(count);
  }, [count]);

  return articles;
}
