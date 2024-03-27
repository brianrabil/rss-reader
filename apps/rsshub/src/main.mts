import jetpack from "fs-jetpack";
import Parser from "rss-parser";
import queryString from "query-string";
import cld from "cld";

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

interface Channel {
	name: string;
	url: string;
	routes: Record<string, any>[];
}

interface Route {
	path: string;
	categories: string[];
	example: string[];
	parameters: Record<string, string>;
	features: Record<string, string>;
	radar: Array<{
		source: string[];
		target: string;
	}>;
	name: string;
	maintainers: string[];
	url: string;
	location: string;
}

try {
	await jetpack.remove(DEFAULT_CONFIG.dataDir);
	await jetpack.dir(DEFAULT_CONFIG.dataDir);

	const res = await fetch(`${BASE_URL}/api/namespace`);
	const data: Record<string, Channel> = await res.json();

	let channels = [];
	let routes = [];

	for (const channel of Object.values(data)) {
		channels.push({
			name: channel.name,
			url: channel.url,
			routes: Object.keys(channel.routes ?? {}),
		});

		for (const route of Object.values(channel.routes ?? {})) {
			let lang;

			try {
				let content = " ";
				content += channel.name ?? "" + " ";
				content += Object.values(route.parameters ?? {}).join(", ");
				const result = await cld.detect(content);
				lang = result?.languages?.map((lang) => lang.code);
			} catch (err) {
				console.error(err);
				lang = "unknown";
			}

			if (lang.includes("en") && lang.length === 1) {
				routes.push({
					favicon: `https://www.google.com/s2/favicons?domain=${channel.url}`,
					channel: channel.name,
					url: channel.url,
					path: route.path,
					categories: route.categories,
					parameters: route.parameters,
					lang: lang,
				});
			}
		}
	}

	let doc = ``;
	for (const route of routes) {
		doc += `## ${route.url}${route.path}\n\n`;
		doc += `![favicon](${route.favicon ?? ""})`;
		for (const [key, value] of Object.entries(route)) {
			doc += `**${key}**: ${value}\n\n`;
		}
		doc += `\n`;
	}

	await jetpack.write(`${DEFAULT_CONFIG.dataDir}/routes.md`, doc);
	await jetpack.write(`${DEFAULT_CONFIG.dataDir}/namespace.json`, data);
	await jetpack.write(`${DEFAULT_CONFIG.dataDir}/channels.json`, channels);
	await jetpack.write(`${DEFAULT_CONFIG.dataDir}/routes.json`, routes);
	console.log("Data fetched and saved successfully");
} catch (err) {
	console.error(err);
}
