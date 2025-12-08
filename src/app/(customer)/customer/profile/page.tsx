import React from 'react'
import ProfileLayout from './_components/profilelayout/ProfileLayout.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Profile',
  })
export default function Page() {
  return <ProfileLayout />
}
