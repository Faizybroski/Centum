import React from 'react'
import ReportDetailLayout from '../../_components/reportDetailLayout/ReportDetailLayout.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Report Detail',
  })
export default async function ReportDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ReportDetailLayout slug={slug} type="detail" />
}
