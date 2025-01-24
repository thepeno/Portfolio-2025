import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import CaseStudyCard from '@/components/CaseStudyCard'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const project = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div>
      <PageClient />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
        {
          project && project.docs.map(({ title, categories, meta, slug }, i) => (
            <div key={i}>
              <CaseStudyCard title={title} categories={categories} meta={meta} slug={`/projects/${slug}`} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
