import { InboxLayout, FeedLayout } from 'ui'
import { PrismaClient } from 'database'

const prisma = new PrismaClient()

export default async function FeedPage() {
  const subscriptions = await prisma.subscription.findMany({
    include: {
      articles: {
        include: {
          author: true,
        },
      },
      feed: true,
    },
  })

  return (
    <div>
      {subscriptions.map(({ id, feed, articles }) => (
        <div key={id}>
          <div>
            {!!feed.favicon && <img alt={`${feed.title} favicon`} src={feed.favicon} />}
            <h2>{feed.title}</h2>
            <p>{feed.description}</p>
            <a>{feed.url}</a>
            <span>{feed.lastUpdated?.toISOString()}</span>
          </div>
          <div>
            {articles.map((article) => (
              <div key={article.id}>
                <div>
                  {!!article.imageUrl && (
                    <img alt={`${article.title} image`} src={article.imageUrl} />
                  )}
                  <h3>{article.title}</h3>
                  <h4>{article.authorId}</h4>
                  <span>{article.pubDate.toISOString()}</span>
                  <p>{article.description}</p>
                </div>
                <div>{article.content}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
