import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidateCaseStudies: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/case-studies/${doc.slug}`

    payload.logger.info(`Revalidating post at path: ${path}`)

    revalidatePath(path)
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/case-studies/${previousDoc.slug}`

    payload.logger.info(`Revalidating old case study at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
