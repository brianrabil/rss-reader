"use server";

import { logger } from "rss";
import { PrismaClient, User } from "database";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

const client = new PrismaClient();

type CreateUser = Pick<User, "email" | "password">;

export async function createUser({ email, password }: CreateUser) {
  "use server";

  const user = await client.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
    },
  });

  logger.info("✅ created user: ", user);
}

export async function authenticateUser({ email, password }: CreateUser) {
  "use server";

  const user = await client.user.findUnique({
    where: { email },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    // Any object returned will be saved in the session
    // You can choose what to return here
    logger.info("✅ user found for credentials: ", { email });
    logger.info("✅ user: ", user);
    signIn("credentials", { email, password });
    // return user;
    return user;
  } else {
    // If you return null or false then the credentials will be rejected
    logger.error("🔴 user not found for credentials: ", { email });
    return null;
  }
}
