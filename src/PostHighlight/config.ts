import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHighlightedPosts } from './hooks/revalidateHighlightedPosts'

export const PostHighlight: GlobalConfig = {
  slug: 'post-highlight',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'highlightedPosts',
      label: "Highlighted posts",
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          label: 'Title',
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          label: 'Image',
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        }
      ],
      maxRows: 4,
    },

  ],
  hooks: {
    afterChange: [revalidateHighlightedPosts],
  },
}
