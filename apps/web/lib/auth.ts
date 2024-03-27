import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { logger } from "@/lib/logger";
import { compareSync } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/database";

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			authorize: async (credentials) => {
				if (typeof credentials.email != "string" || typeof credentials.password != "string") {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email as string,
					},
				});

				if (user && compareSync(credentials.password, user.password)) {
					// Any object returned will be saved in the session
					// You can choose what to return here
					logger.info("✅ user found for credentials: ", credentials);
					logger.info("✅ user: ", user);
					return {
						id: user.id,
						email: user.email,
					};
				}

				// If you return null or false then the credentials will be rejected
				logger.error("🔴 user not found for credentials: ", credentials);
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id as string;
			return session;
		},
	},
	pages: {
		signIn: "/login",
		newUser: "/register",
	},
});
