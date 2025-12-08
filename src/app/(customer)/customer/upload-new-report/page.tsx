import React from 'react'
import UploadNewReportLayout from './_components/uploadNewReportLayout/UploadNewLayout.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Upload New Report',
    description: 'CENTUM Health Glance',
  })

export default function Page() {
  return (
    <>
      <UploadNewReportLayout />
    </>
  )
}
