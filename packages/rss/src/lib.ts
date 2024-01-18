import * as cheerio from 'cheerio'
import axios from 'axios'
import { logger } from './logger'
import Parser from 'rss-parser'
import ora from 'ora'

interface FeedSpotFeed {
  name: string
  category: string
  url: string
}

export class FeedSpot {
  private base_url = 'https://rss.feedspot.com'
  private recent_lists_url = `${this.base_url}/recent_changes_rssfeeds/?_src=home`
  private popular_lists_url = `${this.base_url}/rss_directory/?_src=home`

  private formatName(name: string): string {
    let result = name
    result = result.trim()
    result = result.split('|')[0]
    result = result.split('»')[0]
    result = result.split('–')[0]
    result = result.replace(/^Top 100/g, '')
    result = result.replace(/^\d+./g, '')
    result = result.replace(/RSS Feeds?$/g, '')
    result = result.replace(/&amp;/g, '&')
    result = result.replace(/&nbsp;/g, ' ')
    result = result.replace(/&quot;/g, '"')
    result = result.replace(/&apos;/g, "'")
    result = result.trim()
    logger.debug(`Formatted ${name} to ${result}`)
    return result
  }

  private async fetchFeeds(): Promise<FeedSpotFeed[]> {
    const res = await axios.get(this.popular_lists_url)
    const $ = cheerio.load(res.data)
    const rows = $('div.post-content > table > tbody > tr').toArray()

    const feeds = new Set<FeedSpotFeed>()

    for (const row of rows) {
      const list_url = $(row).find('td:nth-child(1)').find('a').attr('href')

      if (!list_url) continue

      try {
        const res = await axios.get(list_url)
        const $$ = cheerio.load(res.data)
        const headings = $$('h3.feed_heading').toArray()

        for (const heading of headings) {
          const name = this.formatName($$(heading).text())
          const category = this.formatName($$('h1.post_title_shot').first().text())
          const row_id = $$(heading).attr('name')
          const url = $$(`p#${row_id} > a.ext`).first().attr('href')

          if (!url) continue

          feeds.add({ name, category, url })
        }
      } catch (e) {
        logger.error(e)
        continue
      }
    }

    return Array.from(feeds)
  }

  private async parseFeed(parser: Parser, feed: FeedSpotFeed) {
    if (!feed.url) {
      logger.warn({ feedName: feed.name }, 'Feed URL is missing')
      return null
    }

    return parser
      .parseURL(feed.url)
      .then((rss) => {
        if (!rss.title) {
          logger.warn({ title: rss.title, feedUrl: feed.url }, 'Feed data is incomplete')
          return null
        }

        return {
          title: rss.title,
          url: rss.feedUrl ?? feed.url,
          description: rss.description ?? null,
          favicon: rss.image?.url ?? null,
        }
      })
      .catch((e) => {
        logger.warn({ feedName: feed.name, feedUrl: feed.url }, 'Feed could not be parsed')
        // logger.warn(e)
        return null
      })
  }

  public async getFeeds() {
    const spinner = ora('Fetching feeds...').start()

    const parser = new Parser()
    const feeds = await this.fetchFeeds()
    const totalFeeds = feeds.length
    let processedFeeds = 0

    const updateSpinner = () => {
      spinner.text = `Fetching feeds (${processedFeeds}/${totalFeeds})...`
    }

    const feedPromises = feeds.map(async (feed) => {
      const result = await this.parseFeed(parser, feed)
      processedFeeds++
      updateSpinner()
      return result
    })

    const results = await Promise.all(feedPromises)
    spinner.succeed(`All feeds fetched: ${totalFeeds} feeds processed.`)
    return results.filter((feed) => feed !== null)
  }
}
