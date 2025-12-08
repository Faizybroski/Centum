import React from 'react'
import ReportHistoryLayout from './_components/reportHistoryLayout/ReportHistoryLayout.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Report History',
  })
export default function Page() {
  return <ReportHistoryLayout />
}
