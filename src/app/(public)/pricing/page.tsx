import React from 'react'
import PricingHero from '../_components/pricing/hero/PricingHero.component'
import PricingCards from '../_components/pricing/pricingCards/PricingCards.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Pricing - Membership Tiers',
    description: 'Choose the membership that best fits your health optimization journey. Core, Plus, and Prime tiers available.',
  })

export default function PricingPage() {
  return (
    <div>
      {/* Hero Section */}
      <PricingHero />

      {/* Pricing Cards */}
      <PricingCards />
    </div>
  )
}
