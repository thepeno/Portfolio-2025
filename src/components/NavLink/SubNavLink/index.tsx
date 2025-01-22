"use client"

import { Button, type ButtonProps } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

import { motion } from "motion/react"

import type { Page, Post } from '@/payload-types'
import { usePathname } from 'next/navigation'

type SubNavLink = {
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  number: number
  expanded: boolean
  parentNumber: number
}

export const SubNavLink: React.FC<SubNavLink> = (props) => {
  const {
    type,
    children,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    number,
    expanded,
    parentNumber
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug
      }`
      : url

  if (!href) return null

  const size = sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const path = usePathname()

  return (
    <Button asChild className={` py-2 px-[10px] rounded-[8px] text-[#382E1C] hover:bg-[#EFEEEC] h-fit ${href === path && "bg-white shadow-nav hover:bg-white"}`} size={size} variant="link">
      <Link className="hover:no-underline" href={href || url || ''} {...newTabProps}>
        <motion.div
          className='w-full flex justify-between items-center font-normal'
          animate={{ flexDirection: expanded ? "row" : "column" }}
        >
          <div className='flex items-center gap-[10]'>
            {expanded && label && label}
            {expanded && children && children}
          </div>
          <div className='flex items-center align-middle p-1'>
            <p className='w-4 text-center text-xs text-[#86785E] '>
              {parentNumber + 1 + (number + 1) * 0.1}
            </p>
          </div>
        </motion.div>
      </Link>
    </Button>
  )
}
