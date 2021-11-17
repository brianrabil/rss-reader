import React, { useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Theme, useTheme } from "@mui/material";
import { Article } from "../../models/article";
import * as _ from "lodash";
import { useTruncateText } from "../../hooks";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { SxProps } from "@mui/system";

export enum THUMBNAIL_VIEW_MODE {
  HIDDEN,
  DEFAULT,
  COVER,
}

export interface ArticleListItemProps {
  article: Article;
  key: string;
  sx?: SxProps;
  onClick?: (article: Article) => void;
}

const AvatarImage = styled.img<Partial<Theme>>`
  border-radius: ${(props) => props?.shape?.borderRadius}px;
  height: 64px;
  width: 64px;
  object-fit: cover;
`;

export default function ArticleListItem({
  article,
  onClick,
  sx,
  key,
}: ArticleListItemProps) {
  const theme = useTheme();
  const { title, description, image, date } = article;
  const truncatedDescription = useTruncateText(description, 40);

  const handleListItemClick = () => onClick?.(article);

  const listItemSx: SxProps = useMemo(
    () => ({
      background: theme.palette.background.paper,
      "&:hover": {
        background: theme.palette.action.hover,
        transition: theme.transitions.create("background", {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeOut,
        }),
      },
      ...sx,
    }),
    [theme, sx]
  );

  return (
    <ListItem
      sx={listItemSx}
      onClick={handleListItemClick}
      key={key}
      alignItems="flex-start"
    >
      {image && (
        <ListItemAvatar sx={{ marginRight: theme.spacing(1) }}>
          <AvatarImage shape={theme?.shape} src={image} alt={title} />
        </ListItemAvatar>
      )}
      <Grid container direction="column">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="InfoText" variant="subtitle2">
            Technology
          </Typography>
          <Typography color="GrayText" variant="subtitle2">
            {date?.toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid>
          <Typography lineHeight={1.25} gutterBottom variant="subtitle1">
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
