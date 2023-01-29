import { Link } from '@remix-run/react'
import type { getMdxListItems } from '~/utils/mdx.server'
import { RippedPaper } from '~/components/ripped-paper'

type BlogItemType = Awaited<ReturnType<typeof getMdxListItems>>[0]

export default function BlogItem({ description, slug, title }: BlogItemType) {
  return (
    <li className='ripped-paper relative mb-6 w-[300px] rounded-t-lg bg-slate-100 bg-cover p-4 dark:bg-slate-700'>
      <Link
        prefetch='intent'
        to={`/blog/${slug}`}
        className='flex h-auto flex-col gap-2'
      >
        <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-50'>
          {title}
        </h2>
        <p className='text-base text-gray-600 dark:text-gray-200'>
          {description}
        </p>
        <div className='text-base font-bold text-gray-800 dark:text-gray-100'>
          Read more
        </div>
      </Link>
      <RippedPaper />
    </li>
  )
}
