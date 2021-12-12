export interface Meta {
  dateRead?: string;
  dateSaved?: Date;
  readCount: number;
  hidden: boolean;
  blocked: boolean;
  id: string;
  rating: 'like' | 'dislike' | 'neutral' | 'none';
  dateRated?: Date;
  read: boolean;
  saved: boolean;
  tags: string[];
  notes?: string;
}
