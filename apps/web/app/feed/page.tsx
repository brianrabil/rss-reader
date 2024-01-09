import { InboxLayout, FeedLayout } from 'ui'
import { PrismaClient, Article } from 'database'
import convert from 'xml-js'

type ParsedArticle = Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'subscriptionId'>

function useRSS() {
  const getFeed = async (url: string): Promise<ParsedArticle[]> => {
    'use server'

    const response = await fetch(url, {
      method: 'GET',
    })

    let articles: ParsedArticle[] = []

    convert.xml2js(await response.text()).elements[0].elements[0].elements.forEach((item) => {
      let element: Partial<{
        title: string
        link: string
        guid: string
        pubDate: Date
        'media:content': string
        description: string
        category: string
        'media:keywords': string[]
        'dc:creator': string[]
        'dc:publisher': string
        'dc:subject': string
      }> = {}

      item.elements?.forEach((el) => {
        if (!el.name) return
        switch (el.name) {
          case 'media:thumbnail':
            element[el.name] = el.attributes
            break
          case 'media:content':
            element[el.name] = el.attributes
            break
          case 'media:credit':
            element[el.name] = el.elements[0].text
            break
          case 'media:keywords':
            element[el.name] = el.elements[0].text.split(', ')
            break
          case 'dc:creator':
            element[el.name] = el.elements[0].text.split(', ')
            break
          case 'pubDate':
            element[el.name] = new Date(el.elements?.[0].text)
            break
          default:
            element[el.name] = el.elements?.[0].text
            break
        }
      })

      if (element.guid && element.title && element.pubDate && element.link) {
        articles.push({
          guid: element.guid,
          link: element.link,
          title: element.title,
          imageUrl: element['media:thumbnail']?.url ?? null,
          pubDate: element.pubDate,
          description: element.description ?? null,
          content: element['media:content'] ?? null,
          authorId: null,
        })
      }
    })

    return articles
  }

  return { getFeed }
}

const prisma = new PrismaClient()

const rssFeeds = { wired: 'https://www.wired.com/feed/category/gear/latest/rss' }

export default async function FeedPage() {
  const { getFeed } = useRSS()

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
          <div>
            {articles.map((article) => (
              <div key={article.guid}>
                <div>
                  {!!article?.imageUrl && (
                    <img alt={`${article.title} image`} src={article?.imageUrl} />
                  )}
                  <h3>{article.title}</h3>
                  <h4>{article.authorId}</h4>
                  <span>{article.pubDate?.toDateString()}</span>
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
