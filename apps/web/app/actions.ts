"use server";

import { logger } from "rss";
import { PrismaClient, User } from "database";
import bcrypt from "bcrypt";

const client = new PrismaClient();

type CreateUser = Pick<User, "email" | "password">;

export async function createUser({ email, password }: CreateUser) {
  const data: CreateUser = {
    email,
    password: bcrypt.hashSync(password, 10),
  };

  const user = await client.user.create({ data });

  logger.info("✅ created user: ", user);
}
