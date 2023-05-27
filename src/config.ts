import { DidResolver } from '@atproto/did-resolver'

export type AppContext = {
  didResolver: DidResolver
  cfg: Config
}

export type Config = {
  port: number
  hostname: string
  subscriptionEndpoint: string
  serviceDid: string
}
