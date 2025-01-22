import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: "Logo",
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      label: "Name",
      type: 'text',
    },
    {
      name: 'navItems',
      label: "Navigation Items",
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: "subItems",
          label: "Sub Navigation Items",
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ]
        }
      ],
      maxRows: 6,
    },
    
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
