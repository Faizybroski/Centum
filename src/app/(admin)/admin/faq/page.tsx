import { generateMeta } from '@/lib/seo'
import Layout from './_faqLayout/FAQLayout.component'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'FAQ',
  })

export default async function Page() {
  return <Layout />
}
