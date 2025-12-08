import React from 'react'
import ProcessStep from '../_components/howItWorks/processStep/ProcessStep.component'
import PersonalHealth from '../_components/howItWorks/personalHealth/PersonalHealth.component'
import ActionPlan from '../_components/howItWorks/actionPlan/ActionPlan.component'
import HeroSection from '../_components/howItWorks/hero/HeroSection.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'How It Works',
  })
export default function Page() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Process Step */}
      <ProcessStep />

      {/* Personal Health */}
      <PersonalHealth />

      {/* Action Plan */}
      <ActionPlan />
    </div>
  )
}
