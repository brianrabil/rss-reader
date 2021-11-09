import React from "react";
import { List } from "@mui/material";
import { ArticleListItem } from '@/components';
import { Article } from '@/models'
import { useArticles } from '@/hooks';

export interface ArticleListProps {
  onArticleClick: (article: Article) => void; 
}

export default function ArticleList({ onArticleClick }: ArticleListProps) {
  const articles = useArticles({ useMockData: true });

  const handleArticleClick = (article: Article) => onArticleClick?.(article);

  return (
    <List>
      {articles.map((article) => (
        <ArticleListItem
          key={article.id}
          article={article}
          onClick={() => handleArticleClick(article)}
        />
      ))}
    </List>
  );
}
