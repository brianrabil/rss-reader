export type Image = {
  id: number;
  name: string;
  caption?: string;
  credits?: string;
  createdAt?: Date;
  updatedAt?: Date;
  alt: string;
} & ({
  url: string;
} | {
  data: string;
});