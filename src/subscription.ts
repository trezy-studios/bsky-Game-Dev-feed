import {
  OutputSchema as RepoEvent,
  isCommit,
} from './lexicon/types/com/atproto/sync/subscribeRepos'
import { FirehoseSubscriptionBase, getOpsByType } from './util/subscription'

import {
  createSkeets,
  deleteSkeets,
} from './util/database'

export class FirehoseSubscription extends FirehoseSubscriptionBase {
  async handleEvent(evt: RepoEvent) {
    if (!isCommit(evt)) return

    const ops = await getOpsByType(evt)

    const skeetsToDelete = ops.posts.deletes.map(del => del.uri)
    const skeetsToCreate = ops.posts.creates //.filter(create => /games?\s?(?:dev|design)/giu.test(create.record.text))

    if (skeetsToDelete.length > 0) {
      await deleteSkeets(skeetsToDelete)
    }

    if (skeetsToCreate.length > 0) {
      skeetsToCreate.forEach(skeet => {
        console.log(skeet.record.text)
      })
      await createSkeets(skeetsToCreate)
    }
  }
}
