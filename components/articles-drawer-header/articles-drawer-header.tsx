import DrawerHeader from '@/components/drawer-header/drawer-header';
import { Source } from '@/models';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Favicon from '@/components/favicon';

export interface ArticlesDrawerHeaderProps {
  source: Source;
}

export default function ArticlesDrawerHeader({
  source
}: ArticlesDrawerHeaderProps) {
  const { name } = source;
  return (
    <DrawerHeader>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Favicon source={source} />
        <Typography variant="h6">{name}</Typography>
      </Stack>
    </DrawerHeader>
  )
}