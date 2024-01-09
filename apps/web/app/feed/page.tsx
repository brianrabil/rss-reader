import { InboxLayout, FeedLayout } from 'ui'
import { PrismaClient, Article } from 'database'
import convert from 'xml-js'

type ParsedArticle = Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'subscriptionId'>

interface RSSItem {
  title: string
  link: string
  guid: string
  pubDate: Date
  'media:content'?: string
  description: string
  category: string
  'media:keywords': string[]
  'dc:creator': string[]
  'dc:publisher': string
  'dc:subject': string
}

function useRSS() {
  const getChannel = async (url: string) => {
    'use server'

    const res = await fetch(url, { method: 'GET' })
    const content = await res.text()

    return convert
      .xml2js(content)
      .elements.find((el) => el.name === 'rss')
      .elements.find((el) => el.name === 'channel')
      .elements.filter((el) => el.name !== 'item')
      .reduce((acc, curr) => {
        switch (curr.name) {
          case 'atom:link':
            acc['atomLink'] = curr.attributes
            break
          default:
            acc[curr.name] = curr.elements.find((el) => el.type === 'text').text
            break
        }
        return acc
      }, {})
  }

  const getFeed = async (url: string): Promise<ParsedArticle[]> => {
    'use server'

    const response = await fetch(url, {
      method: 'GET',
    })

    const content = await response.text()

    let articles: ParsedArticle[] = []

    convert
      .xml2js(content)
      .elements.find(({ name }) => name === 'rss')
      .elements.find(({ name }) => name === 'channel')
      .elements.filter(({ name }) => name === 'item')
      .map(({ elements }) =>
        elements.reduce((acc, curr) => {
          switch (curr.name) {
            case 'media:thumbnail':
            case 'media:content':
              acc[curr.name] = curr.attributes
              break
            case 'media:keywords':
            case 'dc:creator':
              acc[curr.name] = curr.elements.find((el) => el.type === 'text').text.split(', ')
              break
            case 'pubDate':
              acc[curr.name] = new Date(curr.elements?.find((el) => el.type === 'text').text)
              break
            default:
              acc[curr.name] = curr.elements?.find((el) => el.type === 'text').text
              break
          }
          return acc
        }, {})
      )
      .map((item: RSSItem) => {
        if (item.guid && item.title && item.pubDate && item.link) {
          articles.push({
            guid: item.guid,
            link: item.link,
            title: item.title,
            imageUrl: item['media:thumbnail']?.url ?? null,
            pubDate: item.pubDate,
            description: item.description ?? null,
            content: item['media:content'] ?? null,
            authorId: null,
          })
        }
      })

    return articles
  }

  return { getFeed, getChannel }
}

const prisma = new PrismaClient()

const rssFeeds = { wired: 'https://www.wired.com/feed/category/gear/latest/rss' }

export default async function FeedPage() {
  const { getFeed, getChannel } = useRSS()

  const channel = await getChannel(rssFeeds.wired)
  const articles = await getFeed(rssFeeds.wired)

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
      {subscriptions.map(({ id, feed }) => (
        <div key={id}>
          {/* <div>
            {!!feed.favicon && <img alt={`${feed.title} favicon`} src={feed.favicon} />}
            <h2>{feed.title}</h2>
            <p>{feed.description}</p>
            <a>{feed.url}</a>
            <span>{feed.lastUpdated?.toISOString()}</span>
          </div> */}
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
