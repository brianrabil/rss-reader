import { Source } from "./source";

export interface Folder {
  name?: string;
  id: string;
  sources?: Source[];
  unreadCount?: number;
}
