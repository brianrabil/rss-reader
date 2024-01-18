import * as esbuild from 'esbuild'
import * as fs from 'fs'
import { logger } from './src/logger'

// clean output dir
logger.info('Cleaning dist')
fs.rmSync('dist', { recursive: true, force: true })

logger.info('Building')
async function main() {
  await esbuild.build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node16',
    outfile: 'dist/index.js',
    minify: true,
    sourcemap: true,
  })
}

main()
  .then(() => {
    logger.info('Done')
    process.exit(0)
  })
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })
