import { PrismaClient } from "@rss-reader/database";

const prismaClientSingleton = () => {
	return new PrismaClient({
		log: ["query", "info", "warn", "error"],
	});
};

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
