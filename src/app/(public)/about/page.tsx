import HeroSection from '../_components/aboutUs/hero/HeroSection.component'
import WhatIsCentumSection from '../_components/aboutUs/whatIsCentumSection/WhatIsCentumSection.component'
import CoreValuesSection from '../_components/aboutUs/coreValuesSection/CoreValuesSection.component'
import HowDoesItWorkSection from '../_components/aboutUs/howDoesItWorkSection/HowDoesItWorkSection.component'
import WhyChooseCentumSection from '../_components/aboutUs/whyChooseCentumSection/WhyChooseCentumSection.component'
import WhatMakesCentumDifferentSection from '../_components/aboutUs/whatMakesCentumDifferentSection/WhatMakesCentumDifferentSection.component'
import CTA from '../_components/aboutUs/ctaSection/CTA.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'About',
  })
export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        {/* Hero Section */}
        <HeroSection />

        {/* What is Centum Section */}
        <WhatIsCentumSection />

        {/* Core Values Section */}
        <CoreValuesSection />

        {/* How Does It Work Section */}
        <HowDoesItWorkSection />

        {/* Why Choose Centum Section */}
        <WhyChooseCentumSection />

        {/* What Makes Centum Different Section */}
        <WhatMakesCentumDifferentSection />

        {/* CTA Section */}
        <CTA />
      </div>
    </>
  )
}
