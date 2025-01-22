'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { ImageMedia } from '@/components/Media/ImageMedia'
import useViewport from '@/hooks/useViewport'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [headerExpanded, setHeaderExpanded] = useState(true)

  const { headerTheme, setHeaderTheme } = useHeaderTheme()

  const pathname = usePathname()

  const isMdOrAbove = useViewport();


  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  function handleHeaderSettingClick() {
    setHeaderExpanded(!headerExpanded)
  }

  return (
    <motion.header
      className={`fixed bottom-0 w-full z-30 md:z-20 md:pb-8 md:pt-6 md:px-5 flex md:flex-col justify-between md:sticky md:top-0 md:bottom-auto md:w-[300px] md:h-screen`}
      {...(theme ? { 'data-theme': theme } : {})}
      animate={{ width: isMdOrAbove ? (headerExpanded ? "300px" : "83px") : "" }}
    >
      <div className="gap-6 flex w-full md:w-auto md:flex-col">
        <motion.div
          className='hidden md:flex gap-[10px] justify-between items-center'
          animate={{ flexDirection: headerExpanded ? "row" : "column" }}
        >
          <Link href="/">
            {headerExpanded ?
              <motion.p
                className='mx-[10px] h-[19px] whitespace-nowrap'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.25 } }}
              >
                {header.name ? header.name : "No name added"}
              </motion.p> :
              <motion.div
                className='w-[24px] h-[24px]'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.25 } }}
              >
                <ImageMedia imgClassName='rounded-[100]' resource={header.logo ? header.logo : undefined} width={24} height={24} />
              </motion.div>
            }
          </Link>
          <motion.button
            className='p-2 mx-1 hover:bg-[#EFEEEC] rounded-[8px]'
            onClick={handleHeaderSettingClick}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              animate={{ rotate: headerExpanded ? 0 : 180 }}
              layout
            >
              <path d="M9.16667 14.1666L5 9.99992L9.16667 5.83325" stroke="#928B7D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 14.1666L10.8334 9.99992L15 5.83325" stroke="#928B7D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.button>
        </motion.div>
        <HeaderNav header={header} expanded={headerExpanded} />
      </div>
      {headerExpanded &&
        <motion.p className='hidden md:block text-[#928B7D] text-sm leading-[150%] px-[10px]'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.25 } }}
        >
          It started with an idea of having our own software,  developed and owned by the movement.
          <br /><br />
          If you share our vision of creating equitable technology that empowers workers and communities, we want you in our movement.
        </motion.p>
      }
    </motion.header>
  )
}
