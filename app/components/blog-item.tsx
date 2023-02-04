import { Link } from '~/components/link'
import type { getMdxListItems } from '~/utils/mdx.server'
import { ChevronsRight } from 'lucide-react'

type BlogItemType = Awaited<ReturnType<typeof getMdxListItems>>[0]

export default function BlogItem({ description, slug, title }: BlogItemType) {
  return (
    <li className='ripped-paper relative flex h-[250px] flex-col justify-between gap-2 rounded-t-lg bg-slate-100 bg-cover p-8 text-lg dark:bg-slate-700'>
      <Link
        prefetch='intent'
        to={`/blog/${slug}`}
        className='font-accent text-xl'
      >
        {title}
      </Link>
      <p className='text-gray-600 line-clamp-2 dark:text-gray-200'>
        {description}
      </p>
      <Link
        prefetch='intent'
        to={`/blog/${slug}`}
        className='ml-[-1.75rem] flex items-center gap-1 pr-6 pl-7 py-2 text-gray-600 dark:text-gray-200'
        shouldAnimate={true}
      >
        Read more <ChevronsRight />
      </Link>
    </li>
  )
}
