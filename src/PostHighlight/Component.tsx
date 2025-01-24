import { PostHighlightClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

import * as motion from "motion/react-client"

import type { PostHighlight } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'
import Link from 'next/link'

export async function PostHighlight() {
  const postHighlight: PostHighlight = await getCachedGlobal('post-highlight', 1)()
  const { highlightedPosts } = postHighlight

  return (
    <>
      <div className='flex flex-col md:flex-row h-full gap-5'>
        {highlightedPosts && highlightedPosts.map(({ image, title, link, id }, i) => {
          let className = '';
          switch (i % 3) {
            case 0:
              className = 'justify-start mr-[90px] md:mb-[300px] md:mr-0';
              break;
            case 1:
              className = 'justify-center';
              break;
            case 2:
              className = 'justify-end ml-[90px] md:mt-[450px] md:ml-0';
              break;
          }
          return (
            <motion.div className={className + " flex flex-col flex-1 relative group overflow-hidden"} key={id}
              initial={{ flex: 1 }}
              whileHover={{ flex: 1.8 }}
            >
              <Link className="w-full h-full" href={link.url || ""} key={id}>
                <ImageMedia
                  resource={image}
                  imgClassName="w-full h-full object-cover rounded-[12px]"
                />
                <h2 className='z-20 text-[15px] whitespace-nowrap absolute bottom-0 text-white mx-6 my-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>{title}</h2>
                <div className='z-10 absolute top-0 left-0 w-full h-full rounded-[12px] pointer-events-none group-hover:bg-black-gradient transition-opacity duration-200' />
              </Link>
            </motion.div>
          )
        }
        )}
      </div>
      <PostHighlightClient postHighlight={postHighlight} />
    </>
  )
}
