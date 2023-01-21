import BlogItem from './blog-item'
import { LoaderData as BlogListData } from '~/routes/blog'

export default function BlogList({ blogList }: BlogListData) {
  return (
    <ol className='flex flex-col'>
      {blogList.map(blogItem => (
        <BlogItem key={blogItem.slug} {...blogItem} />
      ))}
    </ol>
  )
}
