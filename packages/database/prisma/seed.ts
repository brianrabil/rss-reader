import Parser from "rss-parser";
import dotenv from "dotenv";
import { FeedSpot, logger } from "rss";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

const feeds = [
	{
		name: "BBC News - World",
		url: "http://feeds.bbci.co.uk/news/world/rss.xml",
	},
	{
		name: "CNN - Top Stories",
		url: "http://rss.cnn.com/rss/edition.rss",
	},
	{
		name: "The New York Times - Home Page",
		url: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
	},
	{
		name: "The Guardian - International",
		url: "https://www.theguardian.com/world/rss",
	},
	{
		name: "NPR News",
		url: "https://www.npr.org/rss/rss.php?id=1001",
	},
	{
		name: "Al Jazeera English",
		url: "http://www.aljazeera.com/xml/rss/all.xml",
	},
	{
		name: "TechCrunch",
		url: "http://feeds.feedburner.com/TechCrunch/",
	},
	{
		name: "Wired - Latest Headlines",
		url: "https://www.wired.com/feed/rss",
	},
	{
		name: "Forbes - Top Stories",
		url: "http://www.forbes.com/real-time/feed2/",
	},
	{
		name: "The Economist - World News",
		url: "https://www.economist.com/the-world-this-week/rss.xml",
	},
	{
		name: "Science Daily - Top News",
		url: "https://www.sciencedaily.com/rss/top/science.xml",
	},
];

/**
 * Fetches and parses the news feeds
 */
async function main() {
	logger.info("Fetching feeds");
	const parser = new Parser();

	for (const feed of feeds) {
		logger.info({ feed }, "Parsing feed");
		const result = await parser.parseURL(feed.url);

		if (result) {
			logger.info(result);
			await prisma.feed.upsert({
				where: {
					url: feed.url,
				},
				update: {
					url: feed.url,
					title: feed.name,
					description: result.description,
					favicon: result.image?.url,
				},
				include: {
					items: true,
				},
				create: {
					url: feed.url,
					title: feed.name,
					items: {
						createMany: {
							skipDuplicates: true,
							data: result.items.map((item) => ({
								guid: item.guid as string,
								title: item.title as string,
								description: item.contentSnippet,
								content: item.content,
								imageUrl: item.enclosure?.url,
								link: item.link as string,
								pubDate: item.pubDate as string,
							})),
						},
					},
				},
			});
		}
	}

	logger.info("Done");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
