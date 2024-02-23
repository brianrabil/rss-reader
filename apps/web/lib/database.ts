import { PrismaClient } from "database";

export const database = new PrismaClient();

export type { User } from "database";
