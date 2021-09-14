import React, { useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useTheme } from "@mui/material";
import { Article } from "../models/article";
import * as _ from 'lodash';

export interface ArticleListItemProps {
  article: Article;
  key: string;
  onClick: (article: Article) => void;
}

export default function ArticleListItem({
  article,
  onClick,
  key,
}: ArticleListItemProps) {
  const theme = useTheme();

  const handleListItemClick = () => onClick(article);

  const title = useMemo(() => _.get(article, 'title'), [article.title]);
  const description = useMemo(() => _.get(article, 'description'), [article.description]);
  const image = useMemo(() => _.get(article, 'image'), [article.image]);

  return (
    <React.Fragment>
      <ListItem onClick={handleListItemClick} key={key} alignItems="flex-start">
        <ListItemAvatar>
          {article?.image && (
            <img
              style={{
                width: "64px",
                height: "64px",
                marginRight: theme.spacing(1),
                borderRadius: theme.shape.borderRadius,
              }}
              src={image}
            />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={description}
        />
      </ListItem>
      <Divider key={key + "--DIVIDER"} variant="middle" component="li" />
    </React.Fragment>
  );
}
