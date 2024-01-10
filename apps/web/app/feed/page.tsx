import { InboxLayout, FeedLayout } from 'ui'
import { PrismaClient } from 'database'
import { getFeed } from 'rss-service'

const prisma = new PrismaClient()

export default async function FeedPage() {
  await getFeed()

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
      {subscriptions.map(({ id, articles, feed }) => (
        <div key={id}>
          <div>
            {!!feed.favicon && <img alt={`${feed.title} favicon`} src={feed.favicon} />}
            <h2>{feed.title}</h2>
            <p>{feed.description}</p>
            <a>{feed.url}</a>
            <span>{feed.lastUpdated?.toISOString()}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 400,
              gap: 24,
              fontFamily: 'sans-serif',
            }}
          >
            {articles.map((article) => (
              <div
                style={{ border: '1px solid lightgray', borderRadius: 8, overflow: 'hidden' }}
                key={article.guid}
              >
                {!!article?.imageUrl && (
                  <img
                    alt={`${article.title} image`}
                    src={article?.imageUrl}
                    style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '8px 16px' }}>
                  <h3>{article.title}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.3 }}>{article.description}</p>

                  <h4>{article.authorId}</h4>
                  <span style={{ fontSize: 12 }}>{article.pubDate?.toDateString()}</span>
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
