import BlogItem from './blog-item'
import { LoaderData as BlogListData } from '~/routes/blog'

export default function BlogList({ blogList }: BlogListData) {
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5'>
      {blogList.map(blogItem => (
        <BlogItem key={blogItem.slug} {...blogItem} />
      ))}
    </ul>
  )
}
