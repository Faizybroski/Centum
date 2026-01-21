import React from 'react'
import WaitlistsTable from './_components/WaitlistTable.component'

import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Waitlist',
  })

export default function Page() {
  return <WaitlistsTable />
}
