import * as React from 'react'
import BlogList from '~/components/blog-list'
import { getMdxListItems } from '~/utils/mdx.server'
import { getSeo } from '~/utils/seo'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

const [seoMeta, seoLinks] = getSeo()

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
  const blogList = await getMdxListItems({ contentDirectory: 'blog' })

  return typedjson(
    { blogList: blogList.slice(0, 10) },
    { headers: { 'cache-control': 'private, max-age=60' } },
  )
}

export default function Index() {
  const { blogList } = useTypedLoaderData<typeof loader>()

  return (
    <>
      <section className='mx-auto max-w-4xl'>
        <div className='grid h-[calc(100vh-92px)] place-content-center'>
          <h1 className='flex flex-col items-center p-4'>
            <GradientText>Remix</GradientText>
            <GradientText>Blog</GradientText>
          </h1>
        </div>
      </section>
      <section className='mx-auto mt-32 w-[90vw]'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='text-xl text-gray-800 dark:text-gray-100'>
            Recent Posts
          </h2>
          <BlogList blogList={blogList} />
        </div>
      </section>
    </>
  )
}

function GradientText(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className='bg-gradient-to-r from-sky-600 via-pink-500 to-red-600 bg-clip-text text-center text-6xl leading-snug text-transparent dark:via-blue-400 dark:to-green-300'
      {...props}
    />
  )
}
