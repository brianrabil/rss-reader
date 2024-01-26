import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { FeedSpot, logger } from "rss";
import Parser from "rss-parser";

dotenv.config();

const prisma = new PrismaClient();

const newsFeeds = [
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

// const NUM_USERS = parseInt(process.env.SEED_NUM_USERS || '10')
// const NUM_FEEDS = parseInt(process.env.SEED_NUM_FEEDS || '5')
// const NUM_AUTHORS = parseInt(process.env.SEED_NUM_AUTHORS || '10')
// const NUM_ARTICLES_PER_AUTHOR = parseInt(process.env.SEED_NUM_ARTICLES_PER_AUTHOR || '5')
// const NUM_ARTICLES_READ_PER_USER = parseInt(process.env.SEED_NUM_ARTICLES_READ_PER_USER || '20')

async function main() {
  logger.info("Fetching feeds");

  const parser = new Parser();

  for (const feed of newsFeeds) {
    logger.info({ feed }, "Parsing feed");
    const result = await parser.parseURL(feed.url);

    if (result) {
      logger.info(result);
      await prisma.feed.upsert({
        where: { url: feed.url },

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

    console.log(result);
  }

  // const feeds = await new FeedSpot().getFeeds();

  // await Promise.all(
  //   feeds.map(async (feed) => {
  //     if (!feed) {
  //       logger.warn({ feed }, "Feed is missing");
  //       return;
  //     }

  //     logger.info({ feed }, "Creating feed");
  //     await prisma.feed.upsert({
  //       where: { url: feed.url },
  //       update: {
  //         url: feed.url,
  //         title: feed.title,
  //         description: feed.description,
  //         favicon: feed.favicon,
  //       },
  //       create: {
  //         url: feed.url,
  //         title: feed.title,
  //         description: feed.description,
  //         favicon: feed.favicon,
  //       },
  //     });
  //   })
  // );

  logger.info("Done");
}

// async function main() {
//   // Create mock users
//   for (let i = 0; i < NUM_USERS; i++) {
//     await prisma.user.create({
//       data: {
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         profileImage: faker.image.avatar(),
//         password: faker.internet.password(),
//       },
//     })
//   }

//   // Create mock feeds
//   for (let i = 0; i < NUM_FEEDS; i++) {
//     await prisma.feed.create({
//       data: {
//         url: faker.internet.url(),
//         title: faker.lorem.sentence(),
//         description: faker.lorem.paragraph(),
//         favicon: faker.image.avatarGitHub(),
//       },
//     })
//   }

//   // Fetch all users and feeds
//   const users = await prisma.user.findMany()
//   const feeds = await prisma.feed.findMany()

//   // Create subscriptions for each user to different feeds
//   for (const user of users) {
//     for (const feed of feeds) {
//       await prisma.subscription.create({
//         data: {
//           userId: user.id,
//           feedId: feed.id,
//         },
//       })
//     }
//   }

//   // Create mock authors and their articles, and link articles to feeds
//   for (let i = 0; i < NUM_AUTHORS; i++) {
//     const author = await prisma.author.create({
//       data: {
//         name: faker.person.fullName(),
//         bio: faker.lorem.paragraph(),
//         email: faker.internet.email(),
//         linkedinUrl: faker.internet.url(),
//         profileImage: faker.image.avatar(),
//         twitterHandle: faker.internet.userName(),
//         website: faker.internet.url(),
//       },
//     })

//     for (let j = 0; j < NUM_ARTICLES_PER_AUTHOR; j++) {
//       const randomFeed = faker.helpers.arrayElement(feeds)
//       await prisma.article.create({
//         data: {
//           guid: faker.string.uuid(),
//           title: faker.lorem.sentence(),
//           description: faker.lorem.paragraph(),
//           content: faker.lorem.paragraphs(5),
//           imageUrl: faker.image.urlLoremFlickr(),
//           link: faker.internet.url(),
//           pubDate: faker.date.past(),
//           authorId: author.id,
//           subscriptionId: randomFeed.id,
//         },
//       })
//     }
//   }

//   // Create UserArticle relationships
//   for (const user of users) {
//     const articles = await prisma.article.findMany({
//       take: NUM_ARTICLES_READ_PER_USER,
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })

//     for (const article of articles) {
//       await prisma.userArticle.create({
//         data: {
//           userId: user.id,
//           articleId: article.id,
//           read: faker.datatype.boolean(),
//         },
//       })
//     }
//   }
// }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
