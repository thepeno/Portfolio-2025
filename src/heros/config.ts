import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'caseStudyHero',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Case Study Hero',
          value: 'caseStudyHero',
        },
      ],
      required: true,
    },
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      label: 'Role',
      name: 'role',
      type: 'text',
    },
    {
      label: 'Duration',
      name: 'duration',
      type: 'text',
    },
    {
      label: 'Team member',
      name: 'teamMember',
      type: 'array',
      fields: [
        {
          label: 'Team member name',
          name: 'name',
          type: 'text',
        },
        {
          label: 'Team member image',
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'caseStudyHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
