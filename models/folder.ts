import { Source } from '@/models';

export interface Folder {
  name?: string;
  id: string;
  sources?: Source[];
  unreadCount?: number;
}