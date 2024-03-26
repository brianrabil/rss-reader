"use server";

import { logger } from "@/lib/logger";
import type { Prisma } from "@rss-reader/database";
import { auth } from "../auth";
import { prisma } from "@/lib/database";
import { revalidateTag } from "next/cache";

export async function getAllArticles(args?: { orderBy?: Prisma.ArticleFindManyArgs["orderBy"] }) {
	"use server";

	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		logger.error("❌ User not authenticated"); // Log an error if the user is not authenticated
		throw new Error("User not authenticated");
	}

	args ??= {};
	args.orderBy ??= { pubDate: "asc" };

	const articles = await prisma.article.findMany({
		where: {
			feed: {
				userId: userId,
			},
		},
		include: {
			feed: true,
		},
		orderBy: args.orderBy,
		take: 10,
	});

	return articles;
}

export async function getSubscriptions() {
	"use server";

	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		logger.error("❌ User not authenticated"); // Log an error if the user is not authenticated
		throw new Error("User not authenticated");
	}

	const subscriptions = await prisma.user.findUnique({
		where: { id: userId },
		include: {
			feeds: true,
		},
	});

	return subscriptions;
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

		await prisma.user.update({
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

export async function unsubscribeFeed(formData: FormData) {
	"use server";

	try {
		logger.info("🔔 Unsubscribing from feed..."); // Log the start of the unsubscription process

		const session = await auth();
		const userId = session?.user?.id;

		logger.info(`👤 User ID: ${userId}`); // Log the user ID

		if (!userId) {
			logger.error("❌ User not authenticated"); // Log an error if the user is not authenticated
			throw new Error("User not authenticated");
		}

		const feedId = Number(formData.get("id"));

		logger.info(`📰 Feed ID: ${feedId}`); // Log the feed ID

		await prisma.user.update({
			where: { id: userId },
			data: {
				feeds: {
					disconnect: {
						id: feedId,
					},
				},
			},
		});

		await revalidateTag("subscriptions");

		logger.info("✅ Feed unsubscription successful"); // Log the successful unsubscription
	} catch (error) {
		logger.error("❌ Error unsubscribing from feed:", error); // Log any errors that occur
		throw error;
	}
}
