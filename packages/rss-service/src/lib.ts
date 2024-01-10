import * as cheerio from 'cheerio'
import axios from 'axios'
import xlsx from 'xlsx'
import { logger } from './logger'
import fs from 'fs'

interface Feed {
  name: string
  category: string
  url: string
}

export class FeedSpot {
  private sheet_name = 'FeedSpot'
  private output_dir = 'data'
  private output_file = 'rss_feeds.xlsx'
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

  private async getFeeds(): Promise<Feed[]> {
    const res = await axios.get(this.popular_lists_url)
    const $ = cheerio.load(res.data)
    const rows = $('div.post-content > table > tbody > tr').toArray()

    const feeds = new Set<Feed>()

    for (const row of rows) {
      const list_url = $(row).find('td:nth-child(1)').find('a').attr('href')

      if (!list_url) break

      const res = await axios.get(list_url)
      const $$ = cheerio.load(res.data)
      const headings = $$('h3.feed_heading').toArray()

      for (const heading of headings) {
        const name = this.formatName($$(heading).text())
        const category = this.formatName($$('h1.post_title_shot').first().text())
        const row_id = $$(heading).attr('name')
        const url = $$(`p#${row_id} > a.ext`).first().attr('href')

        if (!url) break

        feeds.add({ name, category, url })
      }
    }

    return Array.from(feeds)
  }

  public async writeData() {
    const output_path = `${this.output_dir}/${this.output_file}`
    const workbook = xlsx.utils.book_new()
    const feeds = await this.getFeeds()

    const sheet = xlsx.utils.json_to_sheet(feeds, {
      header: ['name', 'category', 'url'],
      cellStyles: true,
    })

    sheet['!cols'] = [{ width: 60 }, { width: 30 }, { width: 50 }]
    sheet['!freeze'] = { xSplit: '1', ySplit: '1' }
    sheet['!type'] = 'sheet'

    xlsx.utils.book_append_sheet(workbook, sheet, this.sheet_name)

    logger.info(`Writing to ${output_path}`)
    await fs.mkdirSync(this.output_dir, { recursive: true })
    xlsx.writeFile(workbook, output_path, { cellStyles: true })
  }

  public async sync() {
    await this.writeData()
  }
}
