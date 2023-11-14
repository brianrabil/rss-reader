import { PrismaClient, User, Feed, Article } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

faker.seed(123);

const users: Partial<User>[] = Array.from({ length: 10 }).map(() => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  createdAt: faker.date.recent(),
}));

async function main() {
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user as User,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
