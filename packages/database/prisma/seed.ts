import Parser from "rss-parser";
import dotenv from "dotenv";
import { PrismaClient, User, Feed } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

dotenv.config();

const prisma = new PrismaClient();

const users: Partial<User>[] = [
	{
		email: "test@gmail.com",
		name: "Test User",
		password: "password",
		image: faker.image.avatar(),
	},
	{
		email: faker.internet.email(),
		name: faker.person.fullName(),
		password: faker.internet.password(),
		image: faker.image.avatar(),
	},
];

const feeds: Omit<Feed, "id" | "description" | "favicon" | "lastUpdated" | "userId">[] = [
	{
		title: "BBC News - World",
		url: "http://feeds.bbci.co.uk/news/world/rss.xml",
	},
	{
		title: "CNN - Top Stories",
		url: "http://rss.cnn.com/rss/edition.rss",
	},
	{
		title: "The New York Times - Home Page",
		url: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
	},
	{
		title: "The Guardian - International",
		url: "https://www.theguardian.com/world/rss",
	},
	{
		title: "NPR News",
		url: "https://www.npr.org/rss/rss.php?id=1001",
	},
	{
		title: "Al Jazeera English",
		url: "http://www.aljazeera.com/xml/rss/all.xml",
	},
	{
		title: "TechCrunch",
		url: "http://feeds.feedburner.com/TechCrunch/",
	},
	{
		title: "Wired - Latest Headlines",
		url: "https://www.wired.com/feed/rss",
	},
	{
		title: "Forbes - Top Stories",
		url: "http://www.forbes.com/real-time/feed2/",
	},
	{
		title: "The Economist - World News",
		url: "https://www.economist.com/the-world-this-week/rss.xml",
	},
	{
		title: "Science Daily - Top News",
		url: "https://www.sciencedaily.com/rss/top/science.xml",
	},
];

/**
 * Fetches and parses the news feeds
 */
async function main() {
	console.info("Fetching feeds");
	const parser = new Parser();

	for (const user of users) {
		console.info({ user }, "Creating user");
		await prisma.user.create({
			data: {
				email: user.email as string,
				name: user.name,
				image: user.image,
				password: bcrypt.hashSync(user.password as string, 10),
			},
		});
	}

	for (const feed of feeds) {
		console.info({ feed }, "Parsing feed");
		const result = await parser.parseURL(feed.url);

		if (result) {
			console.info(result);
			await prisma.feed.upsert({
				where: {
					url: feed.url,
				},
				update: {
					url: feed.url,
					title: feed.title,
					description: result.description,
					favicon: result.image?.url,
				},
				include: {
					articles: true,
				},
				create: {
					url: feed.url,
					title: feed.title,
					articles: {
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

	console.info("Done");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
