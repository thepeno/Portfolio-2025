import { PostHighlightClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

import type { PostHighlight } from '@/payload-types'

export async function PostHighlight() {
  const postHighlight: PostHighlight = await getCachedGlobal('post-highlight', 1)()

  return <PostHighlightClient postHighlight={postHighlight} />
}
