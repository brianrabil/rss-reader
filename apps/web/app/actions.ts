"use server";

import { logger } from "@/lib/logger";
import { PrismaClient, User } from "@rss-reader/database";
import * as bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import { auth } from "./auth";

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

export async function subscribeFeed(formData: FormData) {
	"use server";

	try {
		logger.info("🔔 Subscribing to feed..."); // Log the start of the subscription process

		const session = await auth();
		const userId = session?.user?.id;

		logger.info(`👤 User ID: ${userId}`); // Log the user ID

		if (!userId) {
			logger.error("❌ User not authenticated"); // Log an error if the user is not authenticated
			throw new Error("User not authenticated");
		}

		const feedId = Number(formData.get("feedId"));

		logger.info(`📰 Feed ID: ${feedId}`); // Log the feed ID

		await client.user.update({
			where: { id: userId },
			data: {
				feeds: {
					connect: {
						id: feedId,
					},
				},
			},
		});

		logger.info("✅ Feed subscription successful"); // Log the successful subscription
	} catch (error) {
		logger.error("❌ Error subscribing to feed:", error); // Log any errors that occur
		throw error;
	}
}
