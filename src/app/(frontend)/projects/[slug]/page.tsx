import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { CaseStudy } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const caseStudy = await payload.find({
    collection: 'case-studies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = caseStudy.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CaseStudy({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/case-study/' + slug
  const caseStudy = await queryCaseStudyBySlug({ slug })

  if (!caseStudy) return <PayloadRedirects url={url} />

  const { hero, layout } = caseStudy

  return (
    <article className="">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <RenderHero {...hero} />

      <div className='flex flex-col items-center pt-4'>
        {layout && <RenderBlocks blocks={layout} />}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryCaseStudyBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryCaseStudyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
