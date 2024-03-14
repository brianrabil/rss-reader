import * as fs from "node:fs";
import * as esbuild from "esbuild";
import { logger } from "./src/logger";

logger.info("Starting build process...");

logger.info("Cleaning 'dist' directory...");
fs.rmSync("dist", { recursive: true, force: true });
logger.info("'dist' directory cleaned.");

logger.info("Starting esbuild...");
try {
  esbuild.buildSync({
    entryPoints: ["./src/index.ts", "./src/main.ts"],
    bundle: true,
    platform: "node",
    target: "node16",
    outdir: "dist",
    minify: false,
    sourcemap: true,
    logLevel: "info",
  });
} catch (e) {
  logger.error(e);
  process.exit(1);
}
logger.info("esbuild completed.");

logger.info("Setting permissions of 'dist/main.js' to 755...");
fs.chmodSync("dist/main.js", 0o755);
logger.info("Permissions set.");
