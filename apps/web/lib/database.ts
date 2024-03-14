import { PrismaClient } from "@rss-reader/database";

export const database = new PrismaClient();

export type { User } from "@rss-reader/database";
