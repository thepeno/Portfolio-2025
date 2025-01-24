import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { Centered } from './Centered/Component'
import { CaseStudy } from './CaseStudy/Component'


const contentOptions = {
  centered: Centered,
  caseStudy: CaseStudy,
}

export const RenderContent: React.FC<ContentBlockProps> = (props) => {
  const { type } = props || {}

  if (!type) return null

  const ContentToRender = contentOptions[type]

  if (!ContentToRender) return null

  return <ContentToRender {...props} />
}
