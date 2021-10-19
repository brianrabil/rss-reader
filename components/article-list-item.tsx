import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useTheme } from "@mui/material";
import { Article } from "../models/article";
import * as _ from "lodash";
import { useTruncateText } from "./../hooks";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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
  console.log(article);
  const { title, description, image, date } = article;

  const theme = useTheme();
  const truncatedDescription = useTruncateText(description, 40);

  const handleListItemClick = () => onClick(article);

  return (
    <ListItem onClick={handleListItemClick} key={key} alignItems="flex-start">
      <Grid></Grid>
      <ListItemAvatar>
        {article?.image && (
          <img
            style={{
              width: "64px",
              height: "64px",
              marginRight: theme.spacing(2),
              borderRadius: theme.shape.borderRadius,
            }}
            src={image}
          />
        )}
      </ListItemAvatar>
      <Grid
        container
        direction="column"
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="GrayText" variant="subtitle2">
            {date?.toLocaleDateString()}
          </Typography>
          <Typography color="GrayText" variant="subtitle2">
            {date?.toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid>
          <Typography lineHeight={1.5} variant="subtitle1">{title}</Typography>
          <Typography color="GrayText" variant="subtitle2">{truncatedDescription}</Typography>
        </Grid>
      </Grid>

      {/* <Grid direction="column">
        <Grid direction="row" alignItems="center" justifyItems="between">
          <Typography></Typography>
          <Typography>{date}</Typography>
        </Grid>

        <Typography variant="h6">{title}</Typography>

        <Typography variant="subtitle2">{truncatedDescription}</Typography>
      </Grid> */}
    </ListItem>
  );
}
