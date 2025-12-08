import React from 'react'
import FailedReportsTable from './_components/FailedReportsTable.component'

import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Failed Reports',
  })
export default function Page() {
  return <FailedReportsTable />
}
