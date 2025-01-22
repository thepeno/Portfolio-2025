import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { FullWidth } from './FullWidth/Component'
import { CaseStudy } from './CaseStudy/Component'


const contentOptions = {
  fullWidth: FullWidth,
  caseStudy: CaseStudy,
}

export const RenderContent: React.FC<ContentBlockProps> = (props) => {
  const { type } = props || {}

  if (!type) return null

  const ContentToRender = contentOptions[type]

  if (!ContentToRender) return null

  return <ContentToRender {...props} />
}
