import React from 'react'
import HeroSection from '../_components/contactUs/hero/HeroSection.component'
import ContactForm from '../_components/contactUs/contactForm/ContactForm.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Contact Us',
  })
export default function page() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  )
}
