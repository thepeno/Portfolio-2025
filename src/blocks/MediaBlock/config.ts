import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      label: 'Media',
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      label: 'Caption',
      name: 'caption',
      type: 'text',
    },
    {
      label: 'Height',
      name: 'height',
      type: 'number',
    }
  ],
}
