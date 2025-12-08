import React from 'react'
import { generateMeta } from '@/lib/seo'
import FaqComponent from '../_components/faq/Faq.componenet'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'FAQ',
  })
export default function Page() {
  return (
    <div>
      <FaqComponent />
    </div>
  )
}
