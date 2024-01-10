import { FeedSpot } from './lib'
import { logger } from './logger'

async function main() {
  await new FeedSpot().sync()
}

main()
  .then(() => logger.info('Done'))
  .catch((e) => logger.error(e))
