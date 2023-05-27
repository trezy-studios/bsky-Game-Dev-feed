import 'dotenv/config'
import { getSkeets } from '../util/database'

const feedGenDid = process.env.FEEDGEN_SERVICE_DID

export const uri = `at://${feedGenDid}/app.bsky.feed.generator/${process.env.FEED_RECORD_NAME}`

export const handler = async (ctx, params) => {
  const query = {
    cursor: {
      cid: params.cursor,
    },
    orderBy: {
      indexedAt: 'desc',
    },
    skip: Number(Boolean(params.cursor)),
    take: params.limit,
  }

  if (!params.cursor) {
    delete query.cursor
  }

  const results = await getSkeets(query)

  return {
    cursor: results.at(-1)?.cid,
    feed: results.map(row => ({ post: row.uri })),
  }
}
