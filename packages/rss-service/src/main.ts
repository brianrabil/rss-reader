#!/usr/bin/env node

import express from "express";
// import { FeedSpot } from "./lib";
import { logger } from "@rss-reader/rss-service";

const app = express();
const port = 3000;

app.get("/test", (req, res) => {
	res.json({ message: "Hello World!" });
});

app.listen(port, () => {
	logger.info(`RSS Reader backend listening at http://localhost:${port}`);
});

// async function main(): Promise<void> {
//   await new FeedSpot().getFeeds();
// }

// main()
//   .then(() => {
//     logger.info("Done");
//     process.exit(0);
//   })
//   .catch((e) => {
//     logger.error(e);
//     process.exit(1);
//   });
