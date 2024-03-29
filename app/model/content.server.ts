import db from '~/utils/db.server'
import { getQueue } from '~/utils/p-queue.server'
import { Content } from '@prisma/client'

const whereOptions =
  process.env.NODE_ENV !== 'development' ? { published: true } : {}

export async function getMdxCount(contentDirectory: string) {
  const count = await db.content.aggregate({
    _count: { _all: true },
    where: { ...whereOptions, contentDirectory },
  })

  return count._count._all
}

export async function requiresUpdate(contentDirectory: string) {
  const requiresUpdateCount = await db.content.aggregate({
    _count: { requiresUpdate: true },
    where: { ...whereOptions, contentDirectory },
  })

  if (requiresUpdateCount._count.requiresUpdate === 0) {
    return null
  }

  const requiresUpdate = await db.content.findMany({
    where: { requiresUpdate: true },
  })

  return requiresUpdate
}

export async function getContentList(
  contentDirectory = 'blog',
): Promise<
  Pick<
    Content,
    'slug' | 'title' | 'timestamp' | 'description' | 'frontmatter'
  >[]
> {
  const contents = await db.content.findMany({
    where: { ...whereOptions, contentDirectory },
    select: {
      slug: true,
      title: true,
      timestamp: true,
      description: true,
      frontmatter: true,
    },
    orderBy: { timestamp: 'desc' },
  })

  return contents
}

export async function getContent(slug: string) {
  const rows = await db.content.findMany({
    where: { slug, ...whereOptions },
    select: {
      code: true,
      contentDirectory: true,
      frontmatter: true,
      slug: true,
      timestamp: true,
      title: true,
      requiresUpdate: true,
      description: true,
    },
  })

  if (!rows || rows.length === 0) {
    return null
  }

  if (rows.length > 1) {
    throw new Error(`Something is very wrong for the slug ${slug}`)
  }

  const content = rows[0]

  return {
    ...content,
    frontmatter: JSON.parse(content.frontmatter) as Record<string, unknown>,
  }
}

async function setRequiresUpdateImpl({
  slug,
  contentDirectory,
}: {
  slug: string
  contentDirectory: string
}) {
  await db.content.upsert({
    where: { slug },
    create: {
      requiresUpdate: true,
      slug,
      code: '',
      contentDirectory,
      frontmatter: '',
      title: '',
      published: true
    },
    update: {
      requiresUpdate: true,
    },
  })
}

export async function setRequiresUpdate(
  ...params: Parameters<typeof setRequiresUpdateImpl>
) {
  const queue = await getQueue()
  const result = await queue.add(() => setRequiresUpdateImpl(...params))
  return result
}

async function upsertContentImpl({
  contentDirectory,
  slug,
  title,
  code,
  published,
  frontmatter,
  timestamp,
  description,
}: {
  contentDirectory: string
  slug: string
  title: string
  code: string
  published: boolean
  frontmatter: Record<string, unknown>
  timestamp: Date
  description: string
}) {
  await db.content.upsert({
    where: { slug },
    update: {
      code,
      frontmatter: JSON.stringify(frontmatter),
      published,
      title,
      requiresUpdate: false,
      description,
    },
    create: {
      contentDirectory,
      code,
      frontmatter: JSON.stringify(frontmatter),
      published,
      slug,
      title,
      timestamp,
      description,
    },
  })
}

export async function deleteSlug(slug: string) {
  return db.content.delete({ where: { slug } })
}

export async function refreshAllContent() {
  return db.content.updateMany({ data: { requiresUpdate: true } })
}

export async function upsertContent(
  ...params: Parameters<typeof upsertContentImpl>
) {
  const queue = await getQueue()

  const result = await queue.add(() => upsertContentImpl(...params))

  return result
}

export async function deleteContent(slug: string) {
  const queue = await getQueue()

  const result = await queue.add(() => deleteSlug(slug))

  return result
}
