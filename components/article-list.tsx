
import React from "react";
import { List } from "@mui/material";
import { ArticleListItem } from '@/components';
import { Article } from '@/models';

export interface ArticleListProps {
  articles?: Article[];
  onArticleClick: (article: Article) => void; 
}

export default function ArticleList({ articles, onArticleClick }: ArticleListProps) {
  
  const handleArticleClick = (article: Article) => {
    return onArticleClick && onArticleClick(article);
  }

  return (
    <List>
      {(articles || []).map((article) => (
        <ArticleListItem
          key={article.id}
          article={article}
          onClick={() => handleArticleClick(article)}
        />
      ))}
    </List>
  );
}
