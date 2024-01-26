import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // EmailProvider({
    //   server: "smtp.gmail.com",
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials.email != "string" || typeof credentials.password != "string") {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Any object returned will be saved in the session
          // You can choose what to return here
          return { id: user.id, name: user.name, email: user.email };
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
        }
      },
    }),
  ],
});
