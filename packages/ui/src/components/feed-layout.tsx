import React from "react";
import {
  CardHeader,
  Avatar,
  CardMedia,
  Card,
  Stack,
  Container,
  IconButton,
  useTheme,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { useMockArticles } from "../hooks";
import { Article } from "../models";

function FeedCard({ article }: { article: Article }) {
  const theme = useTheme();
  return (
    <Card key={article.id}>
      <CardMedia
        image={article?.image}
        title={article?.title}
        height={theme.spacing(60)}
        component="img"
      />
      <CardHeader
        avatar={<Avatar aria-label="source">R</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.title}
        subheader={article.source}
      />
    </Card>
  );
}

function FeedCardGrid({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <Stack direction="column" spacing={theme.spacing(6)}>
      {children}
    </Stack>
  );
}

export const FeedLayout = () => {
  const theme = useTheme();
  const article = useMockArticles(1)?.[0];
  const CARD_COUNT = 4;

  return (
    <Container maxWidth="md" sx={{ paddingY: theme.spacing(3) }}>
      <FeedCardGrid>
        {new Array(CARD_COUNT).fill(article).map((cardProps) => (
          <FeedCard key={cardProps.id} article={cardProps} />
        ))}
      </FeedCardGrid>
    </Container>
  );
};
