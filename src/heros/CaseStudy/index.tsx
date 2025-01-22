import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import HeroClient from '../hero.client'

export const CaseStudyHero: React.FC<Page['hero']> = ({ media, title, role, duration, teamMember }) => {


  return (
    <div
      className="flex flex-col w-full gap-6 sm:gap-8 sm:flex-row"
    >
      <HeroClient />
      <div className='grow'>
        {media && typeof media === 'object' && (
          <Media
            imgClassName="object-cover rounded-[12px] w-full h-[540px]"
            priority={false}
            loading="lazy"
            resource={media}
          />
        )}
      </div>
      <div className='w-full gap-5 flex flex-col justify-between sm:gap-0 sm:w-[200px]'>
        <h1 className='text-[52px] leading-tight font-medium'>
          {title}
        </h1>
        <div className='flex flex-col gap-3 sm:gap-5 p-5 bg-[#F8F7F5] rounded-[8px]'>
          <div className='flex justify-between items-center sm:items-start sm:justify-normal sm:flex-col gap-3'>
            <p className='leading-tight text-[#928B7D]'>Role</p>
            <p className='leading-tight text-[#382E1C]'>{role}</p>
          </div>
          <div className='flex justify-between items-center sm:items-start sm:justify-normal sm:flex-col gap-3'>
            <p className='leading-tight text-[#928B7D]'>Duration</p>
            <p className='leading-tight text-[#382E1C]'>{duration}</p>
          </div>
          <div className='flex justify-between items-center sm:items-start sm:justify-normal sm:flex-col gap-3'>
            <p className='leading-tight text-[#928B7D]'>Team members</p>
            <div className='flex gap-[6px]'>
              {teamMember &&
                teamMember.map(({ name, image }, i) => (
                  image && typeof image === 'object' && (
                    <div className="w-[24px] h-[24px]" key={i}>
                      <TooltipProvider delayDuration={50}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Media
                              imgClassName="rounded-[100px] w-[24px] h-[24px]"
                              priority={false}
                              loading="lazy"
                              resource={image}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className='leading-tight text-[#382E1C]'>{name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
