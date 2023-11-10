import {
  Card,
  CardMedia,
  Stack,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import type { Article } from "../models";

interface RelatedArticlesProps {
  articles?: Article[];
}

export function RelatedArticles({ articles = [] }: RelatedArticlesProps) {
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6">Related Articles</Typography>
      <Stack direction="row" spacing={2}>
        {articles.map((article) => (
          <Card key={article.id}>
            <CardMedia
              component="img"
              height="160"
              image={article.image}
              title={article.title}
            />
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              avatar={<Avatar aria-label="source">R</Avatar>}
              subheader={article.source}
              title={article.title}
            />
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
