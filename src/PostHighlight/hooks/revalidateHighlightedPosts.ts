import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHighlightedPosts: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating highlighted posts`)

  revalidateTag('global_highlighted_posts')

  return doc
}
