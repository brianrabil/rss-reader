import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Theme, useTheme } from "@mui/material";
import { Article } from "../../models/article";
import * as _ from "lodash";
import { useTruncateText } from "../../hooks";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

export interface ArticleListItemProps {
  article: Article;
  key: string;
  onClick?: (article: Article) => void;
}

const AvatarImage = styled.img<Partial<Theme>>`
  border-radius: ${(props) => props?.shape?.borderRadius}px;
  height: 64px;
  width: 64px;
`;

export default function ArticleListItem({
  article,
  onClick,
  key,
}: ArticleListItemProps) {
  const theme = useTheme();
  const { title, description, image, date } = article;
  const truncatedDescription = useTruncateText(description, 40);

  const handleListItemClick = () => onClick?.(article);

  return (
    <ListItem onClick={handleListItemClick} key={key} alignItems="flex-start">
      <Grid></Grid>
      <ListItemAvatar>
        {article?.image && (
          <AvatarImage shape={theme?.shape} src={image} alt={title} />
        )}
      </ListItemAvatar>
      <Grid container direction="column">
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
          <Typography lineHeight={1.5} variant="subtitle1">
            {title}
          </Typography>
          <Typography color="GrayText" variant="subtitle2">
            {truncatedDescription}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}
