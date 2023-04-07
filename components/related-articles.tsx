import {
  Card,
  CardMedia,
  Stack,
  CardHeader,
  Typography,
  Divider,
	Avatar,
	IconButton,
	useTheme
} from "@mui/material";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Article } from "./../models";

interface RelatedArticlesProps {
  articles?: Article[];
}

export default function RelatedArticles({
  articles = [],
}: RelatedArticlesProps) {
	const theme = useTheme();
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6">Related Articles</Typography>
      <Stack direction="row" spacing={2}>
        {articles.map((article) => (
          <Card key={article.id}>
 						<CardMedia
							image={article?.image}
							title={article?.title}
							height="160"
							component="img"
						/>
            <CardHeader
              avatar={
                <Avatar aria-label="source">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={article.title}
              subheader={article.source}
            />
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
