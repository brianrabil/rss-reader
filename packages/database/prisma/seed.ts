import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const NUM_USERS = parseInt(process.env.SEED_NUM_USERS || '10')
const NUM_FEEDS = parseInt(process.env.SEED_NUM_FEEDS || '5')
const NUM_AUTHORS = parseInt(process.env.SEED_NUM_AUTHORS || '10')
const NUM_ARTICLES_PER_AUTHOR = parseInt(process.env.SEED_NUM_ARTICLES_PER_AUTHOR || '5')
const NUM_ARTICLES_READ_PER_USER = parseInt(process.env.SEED_NUM_ARTICLES_READ_PER_USER || '20')

async function main() {
  // Create mock users
  for (let i = 0; i < NUM_USERS; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        profileImage: faker.image.avatar(),
        password: faker.internet.password(),
      },
    })
  }

  // Create mock feeds
  for (let i = 0; i < NUM_FEEDS; i++) {
    await prisma.feed.create({
      data: {
        url: faker.internet.url(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        favicon: faker.image.avatarGitHub(),
      },
    })
  }

  // Fetch all users and feeds
  const users = await prisma.user.findMany()
  const feeds = await prisma.feed.findMany()

  // Create subscriptions for each user to different feeds
  for (const user of users) {
    for (const feed of feeds) {
      await prisma.subscription.create({
        data: {
          userId: user.id,
          feedId: feed.id,
        },
      })
    }
  }

  // Create mock authors and their articles, and link articles to feeds
  for (let i = 0; i < NUM_AUTHORS; i++) {
    const author = await prisma.author.create({
      data: {
        name: faker.person.fullName(),
        bio: faker.lorem.paragraph(),
        email: faker.internet.email(),
        linkedinUrl: faker.internet.url(),
        profileImage: faker.image.avatar(),
        twitterHandle: faker.internet.userName(),
        website: faker.internet.url(),
      },
    })

    for (let j = 0; j < NUM_ARTICLES_PER_AUTHOR; j++) {
      const randomFeed = faker.helpers.arrayElement(feeds)
      await prisma.article.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          content: faker.lorem.paragraphs(5),
          imageUrl: faker.image.urlLoremFlickr(),
          link: faker.internet.url(),
          pubDate: faker.date.past(),
          authorId: author.id,
          subscriptionId: randomFeed.id,
        },
      })
    }
  }

  // Create UserArticle relationships
  for (const user of users) {
    const articles = await prisma.article.findMany({
      take: NUM_ARTICLES_READ_PER_USER,
      orderBy: {
        createdAt: 'desc',
      },
    })

    for (const article of articles) {
      await prisma.userArticle.create({
        data: {
          userId: user.id,
          articleId: article.id,
          read: faker.datatype.boolean(),
        },
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
