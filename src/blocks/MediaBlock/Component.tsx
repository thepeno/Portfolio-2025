import type { StaticImageData } from 'next/image'

import './Component.css';

import { cn } from 'src/utilities/cn'
import React from 'react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { ImageMedia } from '@/components/Media/ImageMedia'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    caption,
    height
  } = props

  let imageHeight = 400

  if (height) {
    imageHeight = height
  }


  return (
    <div
      className={cn(
        'image-container pl-0 relative',
        {
          container: enableGutter,
        },
        className,
      )}
      style={{ height: `${imageHeight}px` }}
    >
      <div className='relative h-full'>
        <ImageMedia
          imgClassName={`border object-cover border-border rounded-[12px] ` + imgClassName}
          resource={media}
          src={staticImage}
          fill
        />
      </div>
      {caption && (
        <div
          className='caption mt-4'
        >
          <p className='italic'>
            {caption}
          </p>
        </div>
      )}
    </div>
  )
}
