// @ts-check

// import { withSuperEnv } from "next-super-env/next";

// import nextPWA from "next-pwa";

// const withPWA = nextPWA({
//   dest: 'public',
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
	/* config options here */
	reactStrictMode: true,
	cleanDistDir: true,
	transpilePackages: ["@rss-reader/ui"],
	output: "standalone",
};

// export default withSuperEnv(nextConfig);

export default nextConfig;
