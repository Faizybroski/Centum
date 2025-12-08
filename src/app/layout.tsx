import { Toaster } from 'sonner'

import '@/lib/zod'
import './globals.css'
import { generateMeta } from '@/lib/seo'
import { ReduxProvider } from '../_providers/ReduxProvider'
import RootLayoutComponent from '@/_layouts/root/RootLayout.component'
import BProgressProviders from '../_providers/BProgressProviders'

export const generateMetadata = async () =>
  await generateMeta({
    title: '',
    description: 'CENTUM Health Glance',
    keywords: ['about', 'company', 'mission'],
  })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReduxProvider>
          <BProgressProviders>
            <RootLayoutComponent>{children}</RootLayoutComponent>
          </BProgressProviders>
        </ReduxProvider>
        <Toaster position="top-right" theme="light" richColors={true} />
      </body>
    </html>
  )
}
