import { InboxLayout, FeedLayout } from 'ui'
import { PrismaClient } from 'database'
import convert from 'xml-js'

const prisma = new PrismaClient()

const rssFeeds = { wired: 'https://www.wired.com/feed/category/gear/latest/rss' }

interface RSSArticle {
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

const fetchFeed = async () => {
  'use server'

  const response = await fetch(rssFeeds.wired, {
    method: 'GET',
  })

  return convert.xml2js(await response.text()).elements[0].elements[0].elements.map((item) => {
    let article: Partial<RSSArticle> = {}

    item.elements?.forEach((element) => {
      switch (element.name) {
        case 'media:thumbnail':
          article[element.name] = element.attributes
          break
        case 'media:content':
          article[element.name] = element.attributes
          break
        case 'media:credit':
          article[element.name] = element.elements[0].text
          break
        case 'media:keywords':
          article[element.name] = element.elements[0].text.split(', ')
          break
        case 'dc:creator':
          article[element.name] = element.elements[0].text.split(', ')
          break
        case 'pubDate':
          article[element.name] = new Date(element.elements?.[0].text)
          break
        default:
          article[element.name] = element.elements?.[0].text
          break
      }
    })

    return {
      id: article.guid,
      title: article.title,
      imageUrl: article['media:thumbnail']?.url,
      pubDate: article.pubDate?.toISOString(),
      description: article.description,
      content: article['media:content'],
      authorId: article['dc:creator'],
    }
  })
}

export default async function FeedPage() {
  const articles = await fetchFeed()

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
          <div>
            {articles.map((article) => (
              <div key={article.id}>
                <div>
                  {!!article.imageUrl && (
                    <img alt={`${article.title} image`} src={article.imageUrl} />
                  )}
                  <h3>{article.title}</h3>
                  <h4>{article.authorId}</h4>
                  <span>{article.pubDate}</span>
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
