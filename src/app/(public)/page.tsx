import HeroSection from './_components/home/hero/HeroSection.component'
import CentumHealthTracker from './_components/home/centumHealthTracker/CentumHealthTracker.component'
import HealthPortalIncludes from './_components/home/healthPortalIncludes/HealthPortalIncludes.component'
import OurMembersSay from './_components/home/ourMembersSay/OurMembersSay.component'
import CTA from './_components/home/cta/CTA.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Home',
  })
export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        {/* Hero Section */}
        <HeroSection />

        {/* Why Choose CENTUM Health Tracker */}
        <CentumHealthTracker />

        {/* Your Health Portal Includes */}
        <HealthPortalIncludes />

        {/* What Our Members Say */}
        {/* <OurMembersSay /> */}

        {/* CTA Section */}
        <CTA />
      </div>
    </>
  )
}
