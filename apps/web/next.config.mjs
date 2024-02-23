// import nextPWA from "next-pwa";

// const withPWA = nextPWA({
//   dest: 'public',
// })

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
	reactStrictMode: true,
	cleanDistDir: true,
	transpilePackages: ["ui"],
};

export default nextConfig;
