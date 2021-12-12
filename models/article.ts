import {
  Author,
  Image,
  Meta,
  Source,
} from '@models';

export interface Article {
  authorId?: Author['id'];
  bannerImage?: Image;
  description?: string;
  id: string;
  lastModified?: Date;
  meta?: Meta;
  publishDate?: Date;
  sourceId?: Source['id'];
  title?: string;
}