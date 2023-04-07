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
	const { title, description, image } = article;
  const theme = useTheme();

  const handleListItemClick = () => onClick(article);

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
              src={article?.image}
							alt={`Avatar ${article?.source}`}
            />
          )}
					<div>
						Hello
					</div>
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
