import jetpack from "fs-jetpack";
import Parser from "rss-parser";
import queryString from "query-string";
import cld from "cld";
import { RSSHub } from "./lib/RSSHub/RSSHub.mts";

interface Config {
	readonly dataDir: string;
	readonly rsshubUrl: string;
}

const DEFAULT_CONFIG = {
	dataDir: "data",
	rsshubUrl: "https://rsshub.app",
} satisfies Config;

const BASE_URL = DEFAULT_CONFIG.rsshubUrl;

const RSS_URLS = {
	github: (repo) => `${BASE_URL}/github/repos/${repo}`,
	reddit: (subreddit) => `${BASE_URL}/reddit/subreddit/${subreddit}`,
	hackernews: `${BASE_URL}/hackernews/best`,
	nytimes: (section) => `${BASE_URL}/nytimes/${section}`,
	technews: `${BASE_URL}/tech`,
	cnbc: `${BASE_URL}/cnbc/rss`,
	cnnnews: `${BASE_URL}/cnn`,
	wiredmagazine: `${BASE_URL}/wired`,
	youtubechannel: (channelId) => `${BASE_URL}/youtube/channel/${channelId}`,
	twitteruser: (username) => `${BASE_URL}/twitter/user/${username}`,
	mediumuser: (username) => `${BASE_URL}/medium/user/${username}`,
};

async function fetchFeed(channel: keyof typeof RSS_URLS) {
	const parser = new Parser();
	const params = queryString.stringify({
		format: "rss",
		limit: 10,
	});
	const res = await fetch(`${RSS_URLS[channel]}?${params}`);
	const text = await res.text();
	const feed = await parser.parseString(text);

	return feed;
}

try {
	await jetpack.remove(DEFAULT_CONFIG.dataDir);
	await jetpack.dir(DEFAULT_CONFIG.dataDir);

	const rsshub = new RSSHub();

	// await jetpack.write(`${DEFAULT_CONFIG.dataDir}/namespace.json`, data);
	// await jetpack.write(`${DEFAULT_CONFIG.dataDir}/routes.json`, routes);
	console.log("Data fetched and saved successfully");
} catch (err) {
	console.error(err);
}
