import 'dotenv/config'
import algos from './algos'
import FeedGenerator from './server'

const run = async () => {
  const hostname = maybeStr(process.env.FEEDGEN_HOSTNAME) ?? 'example.com'
  const serviceDid = maybeStr(process.env.FEEDGEN_SERVICE_DID) ?? ''
  const server = FeedGenerator.create({
    port: maybeInt(process.env.FEEDGEN_PORT ?? process.env.PORT) ?? 3000,
    subscriptionEndpoint:
      maybeStr(process.env.FEEDGEN_SUBSCRIPTION_ENDPOINT) ??
      'wss://bsky.social',
    hostname,
    serviceDid,
  })
  console.log({hostname,serviceDid})
  await server.start()
  console.log(`🤖 running feed generator at http://${process.env.FEEDGEN_HOSTNAME}:${server.cfg.port}`)

  console.log('')
  console.log(`Available Algos:`)
  Object.keys(algos).forEach(algoKey => console.log(`> ${algoKey}`))
  console.log('')
}

const maybeStr = (val?: string) => {
  if (!val) return undefined
  return val
}

const maybeInt = (val?: string) => {
  if (!val) return undefined
  const int = parseInt(val, 10)
  if (isNaN(int)) return undefined
  return int
}

run()
