import * as cheerio from 'cheerio'
import axios from 'axios'
import xlsx from 'xlsx'
import { compact, truncate } from 'lodash-es'
import { logger } from './logger'
import fs from 'fs'

// const FEEDS = { wired: 'https://www.wired.com/feed/category/gear/latest/rss' }

interface Feed {
  name: string
  url: string
}

interface FeedList {
  name: string
  url: string
  feeds: Feed[]
}

interface FeedListDirectory {
  name: string
  url: string
  lists: FeedList[]
}

export class FeedSpot {
  private output_dir = 'data'
  private output_file = 'feed_spot_rss_feeds.xlsx'
  private base_url = 'https://rss.feedspot.com'
  private recent_rss_lists_url = `${this.base_url}/recent_changes_rssfeeds/?_src=home`
  private popular_rss_lists_url = `${this.base_url}/rss_directory/?_src=home`

  private async getFeedListDirectory(list: 'recent' | 'popular'): Promise<FeedListDirectory> {
    const directory_url = list === 'recent' ? this.recent_rss_lists_url : this.popular_rss_lists_url

    const res = await axios.get(directory_url)
    const $ = cheerio.load(res.data)

    const directory_name = $('div.post-header > h1').first().text().replace('RSS Feeds', '').trim()

    const directory_lists = compact(
      await Promise.all(
        $('div.post-content > table > tbody > tr')
          .map(async (i, el) => {
            const list_name = $(el).find('td:nth-child(1)').text().replace('RSS Feeds', '').trim()
            const list_url = $(el).find('td:nth-child(1)').find('a').attr('href')

            if (!list_url) {
              logger.warn(`No list url found for ${list_name}`)
              return
            }

            const { feeds: list_feeds } = await this.getList(list_url)

            return {
              name: list_name,
              url: list_url,
              feeds: list_feeds,
            } satisfies FeedList
          })
          .toArray()
      )
    )

    return {
      name: directory_name,
      url: directory_url,
      lists: directory_lists,
    } satisfies FeedListDirectory
  }

  private async getList(list_url: string): Promise<FeedList> {
    const res = await axios.get(list_url)
    const $ = cheerio.load(res.data)

    const list_name = $('h1.post_title_shot').first().text().replace('RSS Feeds', '').trim()

    const list_feeds = compact(
      $('h3.feed_heading')
        .map((i, h) => {
          const feed_name = $(h)
            .text()
            .trim()
            .replace(/^\d+./g, '')
            .replace(/RSS Feed$/g, '')
            .trim()

          const feed_id = $(h).attr('name')
          const feed_url = $(`p#${feed_id} > a.ext`).first().attr('href')

          if (!feed_url) {
            logger.warn(`No feed url found for ${feed_name}`)
            return
          }

          return { name: feed_name, url: feed_url } satisfies Feed
        })
        .toArray()
    )

    return {
      name: list_name,
      url: list_url,
      feeds: list_feeds,
    } satisfies FeedList
  }

  public async sync() {
    const output_path = `${this.output_dir}/${this.output_file}`
    const directory = await this.getFeedListDirectory('popular')
    const workbook = xlsx.utils.book_new()

    for (const feed_list of directory.lists) {
      const feed_list_worksheet = xlsx.utils.json_to_sheet(feed_list.feeds)
      const feed_list_sheet_name = truncate(feed_list.name, { length: 31, omission: '' })
      xlsx.utils.book_append_sheet(workbook, feed_list_worksheet, feed_list_sheet_name)
    }

    await fs.mkdirSync(this.output_dir, { recursive: true })

    logger.info(`Writing ${directory.name} to file`)
    xlsx.writeFile(workbook, output_path)
  }
}
