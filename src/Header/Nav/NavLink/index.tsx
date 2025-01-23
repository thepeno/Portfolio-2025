"use client"

import { Button, type ButtonProps } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

import { AnimatePresence, motion } from "motion/react"

import type { Media, Page, Post } from '@/payload-types'
import { usePathname } from 'next/navigation'
import { SubNavLink } from './SubNavLink'
import { ImageMedia } from '@/components/Media/ImageMedia'

type NavLinkType = {
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
  icon?: number | Media
  number: number
  expanded: boolean,
  subItems?: {
    link: {
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
    };
  }[] | null;
}

export const NavLink: React.FC<NavLinkType> = (props) => {
  const {
    type,
    children,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    icon,
    number,
    expanded,
    subItems = []
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

  let currentPath
  let childPath

  if (href === path) {
    currentPath = true
  } else if (path.includes(href)) {
    childPath = true
  }



  return (
    <div className='flex flex-col grow md:grow-0 md:w-full'>
      <Button asChild className={` 
        py-2 px-[10px] rounded-[8px] text-[#382E1C] hover:bg-[#EFEEEC] h-fit
        ${currentPath && "bg-white shadow-nav hover:bg-white"}
        ${childPath && "bg-white shadow-nav hover:bg-white md:bg-transparent md:shadow-none md:hover:bg-[#EFEEEC]"}
        `} size={size} variant="link">
        <Link className="hover:no-underline" href={href || url || ''} {...newTabProps}>
          <motion.div
            className='w-full flex justify-center md:justify-between items-center font-normal gap-4'
            animate={{ flexDirection: expanded ? "row" : "column" }}
          >
            <div className={`flex items-center gap-[10]`}>
              {icon &&
                <motion.div className='w-[20px]'
                  layout
                >
                  <ImageMedia imgClassName="text-[#382E1C]" resource={icon} width={20} height={20} />
                </motion.div>
              }
              <motion.div className={`hidden ${expanded && "md:flex"} w-[10px]`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.25 } }}
                layout
              >
                {expanded && label && label}
                {expanded && children && children}
              </motion.div>
            </div>
            <motion.div className='hidden md:flex items-center align-middle p-1 bg-[#EFEEEC] rounded'
              layout
            >
              <p className='w-4 text-center text-xs text-[#86785E] '>
                {number + 1}
              </p>
            </motion.div>
          </motion.div>
        </Link>
      </Button>
      <AnimatePresence>
        {
          subItems && subItems?.length > 1 && (currentPath || childPath) &&
          <div className={`${expanded && "ml-3"}`}>
            <motion.div className={`hidden md:flex flex-col gap-2 my-2 overflow-clip`}
              initial={{ height: 0, margin: 0, opacity: 0 }}
              whileInView={{ height: 'auto', margin: "8px 0 8px 0", opacity: 1 }}
              exit={{ height: 0, margin: 0, opacity: 0 }}
            >
              {
                subItems.map(({ link }, i) => (
                  <SubNavLink key={i} {...link} number={i} parentNumber={number} expanded={expanded} />
                ))
              }
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>
  )
}
