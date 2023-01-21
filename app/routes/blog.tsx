import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/server-runtime'
import BlogList from '~/components/blog-list'
import { getMdxListItems } from '~/utils/mdx.server'
import { getSeo } from '~/utils/seo'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

export type LoaderData = {
  blogList: Awaited<ReturnType<typeof getMdxListItems>>
}

const [seoMeta, seoLinks] = getSeo({
  title: 'Blogs',
  description: 'Awesome blogs!',
  twitter: {
    title: 'Blogs',
    description: 'Awesome blogs!',
  },
})

export function meta() {
  return { ...seoMeta }
}

export function links() {
  return [...seoLinks]
}

export function headers({ loaderHeaders }: { loaderHeaders: Headers }) {
  return {
    'cache-control':
      loaderHeaders.get('cache-control') ?? 'private, max-age=60',
    Vary: 'Cookie',
  }
}

export async function loader() {
  return typedjson(
    { blogList: await getMdxListItems({ contentDirectory: 'blog' }) },
    {
      headers: { 'cache-control': 'private, max-age=60', Vary: 'Cookie' },
    },
  )
}

export default function Blog() {
  const { blogList } = useTypedLoaderData<typeof loader>()

  return (
    <section className='mx-auto min-h-screen max-w-4xl pt-24'>
      <BlogList blogList={blogList} />
    </section>
  )
}
