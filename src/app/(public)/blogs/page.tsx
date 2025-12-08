import React from 'react'
import BlogPage from '@/pages/BlogPage.page'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Blogs',
  })
export default function Page() {
  return (
    <>
      <BlogPage />
    </>

  )
}
